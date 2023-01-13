import {post, get} from '@/http/index';

/**
 * CosTmpKeyRequest
 */
 export interface cosFiles {
  cosFiles?: CosFile[];
  uid?: string;
}

/**
* CosFile
*/
export interface CosFile {
  fileName?: string;
  filePath?: string;
}

export async function getCosKeyByFilePath(cosFile: CosFile) {
  return post(
    {
      url: '/tencent-saas/cos/cloud/getCommunityBucketTmpKey',
      data: {
        uid: 1668306506078,
        cosFiles: [
          cosFile
        ]
      }
    }
  );
}
