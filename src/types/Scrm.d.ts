declare namespace Scrm {

  interface DealerRes {
    /**
     *  经销商列表
     */
    dataList?: Dealer[];
    page?: Page;
  }

  interface DealerReq {
    cityCode?: string,
    name?: string,
    pageSize?: number,
    pageIndex?: number,
  }

  interface Dealer {
    /**
     * 经销商地址
     */
    address?: string;
    /**
     * 经销商code
     */
    code?: string;
    /**
     * 销售人员信息
     */
    employee?: SaleInfo;
    /**
     * 经销商热线
     */
    hotPhone?: string;
    /**
     * 经销商Id
     */
    id?: number;
    /**
     * 经销商名称
     */
    name?: string;
    /**
     * 在线看车地址
     */
    onlineAddress?: string;
  }

  /**
   * 销售人员信息
   */
  interface SaleInfo {
    /**
     * 销售人员头像
     */
    avatar?: string;
    /**
     * id
     */
    id?: number;
    /**
     * 销售手机号
     */
    mobile?: string;
    /**
     * 销售姓名
     */
    name?: string;
    /**
     * 企业二维码
     */
    qrCode?: string;
  }

  /**
   * Page
   */
  interface Page {
    /**
     * 页码
     */
    pageIndex?: number;
    /**
     * 每页大小
     */
    pageSize?: number;
    /**
     * 总页数
     */
    pageTotal?: number;
    /**
     * 总记录数
     */
    totalCount?: number;
  }

}

