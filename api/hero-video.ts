import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = "saas-dev-agribeacon";
const KEY = "hero-video.mp4";
const REGION = "ap-southeast-1";
const EXPIRES_IN = 3600; // 1 hour

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): { json(payload: unknown): void };
};

export default async function handler(_req: unknown, res: VercelResponse) {
  try {
    const client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: KEY });
    const url = await getSignedUrl(client, command, { expiresIn: EXPIRES_IN });
    res.setHeader("Cache-Control", `public, max-age=${EXPIRES_IN - 60}`);
    res.status(200).json({ url });
  } catch (err) {
    console.error("Failed to generate presigned URL:", err);
    res.status(500).json({ error: "Failed to generate video URL" });
  }
}
