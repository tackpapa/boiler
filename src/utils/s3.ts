import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'ap-northeast-2',
});

const upload = async (param: any) => {
  return await s3.upload(param).promise();
};

export const remove = async (param: any) => {
  return await s3.deleteObject(param).promise();
};

export default upload;
