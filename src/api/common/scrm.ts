import {post, get} from '@/http/index';

export async function getDealerList(data: Scrm.DealerReq) {
  return get<Scrm.DealerRes>(
    {
      url: '/app-scrm/exterior/dealer/v1/page',
      data
    }
  );
}

