import AWS from "aws-sdk";
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone-uploads-jake",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  return Location;
};

export const deleteInS3 = async (fileUrl) => {
  const Key = fileUrl.replace(
    "https://instaclone-uploads-jake.s3.amazonaws.com/",
    ""
  );
  await S3.deleteObject({
    Bucket,
    Key,
  }).promise();
};

0;
