import express, { NextFunction, Request, Response } from "express";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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
}

const generateMultiplePresignedUrls = async (keys: Array<fileType>) => {
  return Promise.all(
    keys.map(async (key) => {
      const command = new PutObjectCommand({
        Bucket: config.awsS3Bucket as string,
        Key: key.key,
      });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1-hours expiration
      return { fileName: key.fileName, url };
    })
  );
};

export async function putMultipleObjectPresignedUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { files } = req.body as IPutMultipleObject;
    // input validation
    if (!Array.isArray(files)) return next(createHttpError(400, "Enter file name and type correctly."));

    const presignedUrls = await generateMultiplePresignedUrls(files);

    res.status(200).json(presignedUrls);
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "some thing wait wrong in s3 getObject presigned url."));
  }
}

export async function putObjectPresignedUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { fileName, fileType } = req.body;
    // input validation
    if (!fileName || !fileType) return next(createHttpError(400, "Enter file name and type correctly."));

    const command = new PutObjectCommand({
      Bucket: config.awsS3Bucket as string,
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

export async function deleteObject(req: Request, res: Response, next: NextFunction) {
  try {
    const { key } = req.body;
    // input validation
    if (!key) return next(createHttpError(400, "Enter file name (key) correctly."));

    const command = new DeleteObjectCommand({
      Bucket: config.awsS3Bucket as string,
      Key: key,
    });
    await s3Client.send(command);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

s3Router.post("/putObjectPresignedUrl", authenticationMiddleware([USER_TYPE.owner]), putObjectPresignedUrl);
s3Router.post(
  "/putMultipleObjectPresignedUrl",
  authenticationMiddleware([USER_TYPE.owner]),
  putMultipleObjectPresignedUrl
);
s3Router.delete("/deleteObject", authenticationMiddleware([USER_TYPE.owner]), deleteObject);

export default s3Router;
