// import { BlobServiceClient } from "@azure/storage-blob";
// import azure from "azure-storage";
// import AWS from "aws-sdk";
// import { createWriteStream } from "fs";
// AWS.config.update({
//   credentials: {
//     accessKeyId: process.env.AWS_KEY,
//     secretAccessKey: process.env.AWS_SECRET,
//   },
// });

// export const uploadToS3 = async (file, userId, folderName) => {
//   const { filename, createReadStream } = await file;
//   const readStream = createReadStream();
//   const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
//   const { Location } = await new AWS.S3()
//     .upload({
//       Bucket: "hwamoak",
//       Key: objectName,
//       ACL: "public-read",
//       Body: readStream,
//     })
//     .promise();
//   return Location;
// };

// //AWS에서 사진 삭제
// export const deleteInS3 = async (fileUrl) => {
//   const Key = fileUrl.replace("https://hwamoak.s3.amazonaws.com/", "");
//   await S3.deleteObject({
//     Bucket,
//     Key,
//   }).promise();
// };

// const blobService = azure.createBlobService(process.env.AZURE_STORAGE_KEY);

// export const UploadToAzure = async (file, userId, folderName, headers) => {
//   // const containerClient = blobServiceClient.getContainerClient("hwamoak");

//   const { createReadStream, filename, mimetype } = await file;

//   const objectName = `${userId}-${Date.now()}-${filename}`;

//   let streamSize = parseInt(headers["content-length"]);

//   const fileStream = createReadStream();

//   blobService.createBlockBlobFromStream(
//     folderName,
//     objectName,
//     fileStream,
//     streamSize,
//     (error, result, response) => {
//       if (!error) {
//         console.log("result : ", result);
//       }
//     }
//   );

//   const fileURL = `${process.env.AZURE_IMAGE_URL}${folderName}/${objectName}`;

//   return fileURL;
// };
