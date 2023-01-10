// 使用cos上传
import { rejects } from 'assert';
import COS from 'cos-wx-sdk-v5';
import { resolve } from 'path';

export function cosUpload(config: any):Promise<string> {
  const cos = new COS({
    SimpleUploadMethod: 'putObject', // 强烈建议，高级上传、批量上传内部对小文件做简单上传时使用putObject
    getAuthorization: (options: any, callback: any) => {
      console.log('options', options);
      callback({
        TmpSecretId: config.secretId,
        TmpSecretKey: config.secretKey,
        SecurityToken: config.sessionToken,
        ExpiredTime: config.validTime
      });
    }
  });

  return new Promise((resolve) => {
    {
      cos.uploadFile({
        Bucket: config.bucketName, /* 填写自己的bucket，必须字段 */
        Region: config.region, /* 存储桶所在地域，必须字段 */
        Key: config.cosPath, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        FilePath: config.filePath, /* 上传文件路径，必须字段 */
        SliceSize: 1024 * 1024 * 10, /* 触发分块上传的阈值，超过10MB使用分块上传，小于10MB使用简单上传。可自行设置，非必须 */
        onProgress: function (progressData: any) {
          console.log(JSON.stringify(progressData));
        }
      }, (err: any, data: any) => {
        if (err) {
          uni.showToast({
            title: '图片上传失败！',
            icon: 'none'
          });
        } else {
          resolve(
            `https://${data.Location}`
          );
        }
      });
    }
  });
}

export function base64Upload(localPath: string):Promise<string>{
  return new Promise((resolve, reject) => {
    const fs = uni.getFileSystemManager();
    const suffix = localPath.substring(localPath.lastIndexOf('.')+1);
    fs.readFile({
      filePath: localPath,
      encoding: 'base64',
      success(res) {
        resolve(`data:image/${suffix};base64,${res.data}`);
      },
      fail(res) {
        reject(res);
      }
    });
  });
}
