import {post, get} from '@/http/index';

export async function getPrivacyAgreement(){
  return get(
    {
      url: '/exterior/agreement/type/1'
    }
  );
}

export async function getRegisterAgreement(){
  return get(
    {
      url: '/exterior/agreement/type/2'
    }
  );
}
