
export interface BannerListResponse {
   responseList?: GetBannerResponse[],
   type?: string,
}

export interface GetBannerResponse {
   bannerInfoResponse?: BannerDetail,
   seriesInnfoResponse?: SeriesInnfoResponse,
}

export interface BannerDetail {
   carouselPictureDetailsUrl?: string,
   carouselPictureUrl?: string,
   id?: number,
}

export interface SeriesInnfoResponse {
   id?: number,
   seriesCode?: string,
   seriesName?: string,
}
