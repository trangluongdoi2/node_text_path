import AWS from 'aws-sdk';
import { env } from '../configs/env';

class S3Service {
	private static s3: AWS.S3;

	public static getS3() {
		if (!this.s3) {
			this.s3 = new AWS.S3({
				apiVersion: '2006-03-01',
				accessKeyId: env.AWS_ACCESS_KEY_ID,
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
			});
		}
		return this.s3;
	}
	
	public static async get(Key: string, bucket?: string) {
		try {
			const s3 = this.getS3();
			const Bucket = `${bucket ?? env.S3_USER_CONTENT_BUCKET}`;
			const getResult = await s3.getObject({ Bucket, Key }).promise();
			return getResult;
		} catch (error) {
			console.error('S3Service.get error', error);
			return undefined;
		}
	}
}
