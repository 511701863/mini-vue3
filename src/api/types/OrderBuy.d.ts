declare namespace OrderBuy {
  /**
   * 车型
   */
  interface ModelResponse {
    /**
     * 主键ID
     */
    id?: number;
    /**
     * 基础车型代码
     */
    modelCode?: string;
    /**
     * 车型名称
     */
    modelName?: string;
    /**
     * 基础车型pc整车图url
     */
    modelPcImageUrl?: string;
    /**
     * 基础车型价格（单位 分）
     */
    modelPrice?: number;
    /**
     * 车型展示名称
     */
    modelShowName?: string;
  }
  /**
   *  车型其余配置
   */
  interface GetModelConfigureResponse {
    innerDecorateResponses?: InnerDecorateResponse[];
    modelHubResponse?: ModelHubResponse[];
    outerDecorateResponses?: ModelColor[];
    serviceOptionResponses?: ModelServer[];
  }

  /**
  * 内饰配置
  */
  interface InnerDecorateResponse {
    /**
     * 主键ID
     */
    id?: number;
    /**
     * 内饰编码
     */
    innerCode?: string;
    /**
     * 内饰名称
     */
    innerName?: string;
    /**
     * 内饰pc展示图片地址
     */
    innerPcImageUrl?: string;
    /**
     * 内饰价格（单位 分）
     */
    innerPrice?: number;
    /**
     * 内饰展示名称
     */
    innerShowName?: string;
    /**
     * 车型是否已包含价格,0:不包含，1:已包含
     */
    modelIsContainPrice?: number;
    /**
     * 关系图片
     */
    relationshipImageUrl?: string;
  }

  /**
  * 轮毂配置
  */
  interface ModelHubResponse {
    /**
     * 轮毂编码
     */
    hubCode?: string;
    /**
     * 轮毂名称
     */
    hubName?: string;
    /**
     * 轮毂pc展示图片地址
     */
    hubPcImageUrl?: string;
    /**
     * 轮毂价格（单位 分）
     */
    hubPrice?: number;
    /**
     * 轮毂展示名称
     */
    hubShowName?: string;
    /**
     * 主键ID
     */
    id?: number;
    /**
     * 车型是否已包含价格,0:不包含，1:已包含
     */
    modelIsContainPrice?: number;
  }

  /**
  * 外饰(颜色)返回类
  */
  interface ModelColor {
    /**
     * 主键ID
     */
    id?: number;
    /**
     * 车型是否已包含价格,0:不包含，1:已包含
     */
    modelIsContainPrice?: number;
    /**
     * 外饰编码
     */
    outerCode?: string;
    /**
     * 外饰名称
     */
    outerName?: string;
    /**
     * 外饰pc展示图片地址
     */
    outerPcImageUrl?: string;
    /**
     * 外饰价格（单位 分）
     */
    outerPrice?: number;
    /**
     * 外饰展示名称
     */
    outerShowName?: string;
    /**
     * 关系图片
     */
    relationshipImageUrl?: string;
  }

  /**
  * 服务选配
  */
  interface ModelServer {
    /**
     * 描述
     */
    describe?: string;
    /**
     * 主键
     */
    id?: number;
    /**
     * 车型是否已包含价格,0:不包含，1:已包含
     */
    modelIsContainPrice?: number;
    /**
     * 选配code
     */
    optionCode?: string;
    /**
     * 选配名称
     */
    optionName?: string;
    /**
     * PC端图片URL地址
     */
    pcImageUrl?: string;
    /**
     * 选装项价格（单位 分）
     */
    price?: number;
  }

  /**
 * 心愿单订单
 */
  interface WishOrder {
    /**
     * 内饰
     */
    innerDecorateId?: number;
    /**
     * 轮毂
     */
    modelHubId?: number;
    /**
     * 车型
     */
    modelId?: number;
    /**
     * 外饰
     */
    outerDecorateId?: number;
    /**
     * 配置价格(单位:分)
     */
    price?: number;
    /**
     * 服务选配
     */
    serviceOptionId?: number;
  }
  /**
  * 立即订购步骤中所有配置项
  */
  interface CarConfig {
    /**
     * 车型配置
     */
    model: ModelResponse;
    /**
    * 内饰配置
    */
    inner: InnerDecorateResponse;
    /**
    * 轮毂配置
    */
    hub: ModelHubResponse;
    /**
    * 外饰(颜色)
    */
    outer: ModelColor;
    /**
    * 服务选配
    */
    server: ModelServer;
  }
  /**
 * 支付定金-保存订单
 */
  export interface CarOrder {
    /**
     * 经销商ID
     */
    a4sID?: string;
    /**
     * 经销商名称
     */
    a4sName?: string;
    /**
     * 证件号码
     */
    certificateNo?: string;
    /**
     * 证件类型1身份证 2军官证 3护照 4暂住证 5其它 6公司组织机构代码 7台胞证 8港澳通行证 9居住证
     */
    certificateType?: string;
    /**
     * 交付店编码
     */
    deliveryDlrCode?: string;
    /**
     * 交付店ID
     */
    deliveryDlrId?: string;
    /**
     * 交付店名称
     */
    deliveryShortDlrName?: string;
    /**
     * 体验店编码
     */
    dlrCode?: string;
    /**
     * 体验店名称
     */
    dlrFullName?: string;
    /**
     * 企业代码
     */
    enterpriseCode?: string;
    /**
     * 内饰ID
     */
    innerDecorateId?: number;
    /**
     * 上牌城市id
     */
    licenceCity?: string;
    /**
     * 上牌城市名称
     */
    licenceCityName?: string;
    /**
     * 轮毂ID
     */
    modelHubId?: number;
    /**
     * 服务选配ID
     */
    optionItemIds?: number[];
    /**
     * 订单来源:1 app，2 小程序，3 公众号，4 管理端，5 数据导入 ，6 三方系统
     */
    orderSource?: number;
    /**
     * 外饰(颜色)ID
     */
    outerDecorateId?: number;
    /**
     * 车主姓名/企业名称
     */
    ownerName?: string;
    /**
     * 手机号码
     */
    ownerPhone?: string;
    /**
     * 定金额度/已付小订定金
     */
    price?: number;
    /**
     * 购买人姓名
     */
    purchaser?: string;
    /**
     * 购买类型1-个人购车、2-企业购车
     */
    purchaseType?: string;
    /**
     * 车型ID
     */
    tbModelId?: number;
    /**
     * 总价
     */
    totalPrice?: number;
    /**
     * 验证码
     */
    verificationCode?: string;
  }

}

