import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import express, { NextFunction, Request, Response } from "express";
import config from "../config";
import createHttpError from "http-errors";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { USER_TYPE } from "../utils/constant";

const s3Router = express.Router();

const s3Client = new S3Client({
  region: config.awsRegion as string,
  credentials: {
    accessKeyId: config.s3AccessKey as string,
    secretAccessKey: config.s3SecretAccessKey as string,
  },
});

type fileType = {
  fileName: string;
  key: string;
};

interface IPutMultipleObject {
  files: fileType[];
  bucket: string;
}

const generateMultiplePresignedUrls = async (bucket: string, keys: Array<fileType>) => {
  return Promise.all(
    keys.map(async (key) => {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key.key,
      });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1-hours expiration
      return { fileName: key.fileName, url };
    })
  );
};

export async function putMultipleObjectPresignedUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { files, bucket } = req.body as IPutMultipleObject;
    // input validation
    if (!Array.isArray(files) || !bucket) return next(createHttpError(400, "Enter file name and type correctly."));

    const presignedUrls = await generateMultiplePresignedUrls(bucket, files);

    res.status(200).json({ presignedUrls });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "some thing wait wrong in s3 getObject presigned url."));
  }
}

export async function putObjectPresignedUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { fileName, fileType, bucket } = req.body;
    // input validation
    if (!fileName || !fileType || !bucket) return next(createHttpError(400, "Enter file name and type correctly."));

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      ContentType: fileType,
    });

    const putObjetUrl = await getSignedUrl(s3Client, command);

    res.status(200).json({ url: putObjetUrl });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "some thing wait wrong in s3 putObjectPresignedUrl presigned url."));
  }
}

s3Router.post("/putObjectPresignedUrl", authenticationMiddleware([USER_TYPE.owner]), putObjectPresignedUrl);
s3Router.post(
  "/putMultipleObjectPresignedUrl",
  authenticationMiddleware([USER_TYPE.owner]),
  putMultipleObjectPresignedUrl
);

export default s3Router;
