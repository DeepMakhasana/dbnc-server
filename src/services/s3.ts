import express, { NextFunction, Request, Response } from "express";
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
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

export async function deleteObject(key: string) {
  try {
    // input validation
    if (!key) return false;

    const command = new DeleteObjectCommand({
      Bucket: config.awsS3Bucket as string,
      Key: key,
    });
    const isDeleted = await s3Client.send(command);

    if (isDeleted) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteObjects(folderPath: string) {
  try {
    let continuationToken: string | undefined = undefined;

    do {
      // Step 1: List objects in the folder
      const listParams: ListObjectsV2CommandInput = {
        Bucket: config.awsS3Bucket,
        Prefix: folderPath, // Ensure folderPath ends with '/'
        ContinuationToken: continuationToken, // For paginated results
      };

      const listCommand = new ListObjectsV2Command(listParams);
      const listResponse = await s3Client.send(listCommand);

      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        console.log("No objects found in the folder.");
        break;
      }

      // Step 2: Prepare objects for deletion
      const objectsToDelete = listResponse.Contents.map((object) => ({
        Key: object.Key!,
      }));

      const deleteParams: DeleteObjectsCommandInput = {
        Bucket: config.awsS3Bucket,
        Delete: {
          Objects: objectsToDelete,
        },
      };

      // Step 3: Send delete command
      const deleteCommand = new DeleteObjectsCommand(deleteParams);
      const deleteResponse = await s3Client.send(deleteCommand);

      console.log("Deleted objects:", deleteResponse.Deleted);

      // Step 4: Handle pagination
      continuationToken = listResponse.NextContinuationToken;
    } while (continuationToken);

    console.log(`Successfully deleted all objects in folder: ${folderPath}`);
    return true;
  } catch (error) {
    console.error("Error deleting folder:", (error as Error).message);
    return false;
  }
}

export async function deleteS3Object(req: Request, res: Response, next: NextFunction) {
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
s3Router.delete("/deleteObject", authenticationMiddleware([USER_TYPE.owner]), deleteS3Object);

export default s3Router;
