/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AddLogEventInput = {
    eventTime?: string | null,
    itemId: string,
    itemType: string,
    secondaryItemIds?: Array< string | null > | null,
    secondaryItemType?: string | null,
    eventType: LogEventType,
    eventModel?: string | null,
    cognitoUserId?: string | null,
    creatorOrgId?: string | null,
    endUserOrgId?: string | null,
    message: string,
    status: LogEventStatus,
    visibilityLevel: VisibilityLevel,
    retentionDays?: number | null,
    role: LogEventRole,
  };
  
  export enum LogEventType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    REMOVE = "REMOVE",
    APPROVED = "APPROVED",
    REDEEM = "REDEEM",
    GENERATE = "GENERATE",
    AUTHENTICATE = "AUTHENTICATE",
    REGISTRATION = "REGISTRATION",
  }
  
  
  export enum LogEventStatus {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE",
    SECURITY_VIOLATION = "SECURITY_VIOLATION",
    HANDLED_EXCEPTION = "HANDLED_EXCEPTION",
    UNHANDLED_EXCEPTION = "UNHANDLED_EXCEPTION",
    INFO = "INFO",
  }
  
  
  export enum VisibilityLevel {
    PUBLIC = "PUBLIC",
    ENDUSER = "ENDUSER",
    CREATOR = "CREATOR",
    OWNER = "OWNER",
    SUPPORT = "SUPPORT",
    ADMIN = "ADMIN",
  }
  
  
  export enum LogEventRole {
    UNAUTHENTICATED = "UNAUTHENTICATED",
    DESIGNER = "DESIGNER",
    ENDUSER = "ENDUSER",
    SUPPORT = "SUPPORT",
    ADMIN = "ADMIN",
  }
  
  
  export type CreateDailyAffiliateStatInput = {
    utmCampaign: string,
    utmSource: string,
    year: string,
    month: string,
    day: string,
    orderCount: number,
    netOrderSales: number,
  };
  
  export type AffiliatePeriodStat = {
    __typename: "AffiliatePeriodStat",
    id: string,
    utmCampaign: string,
    utmSource: string,
    orgId?: string | null,
    affiliateId?: string | null,
    orderId?: string | null,
    listingId?: string | null,
    referenceId?: string | null,
    orderCount?: number | null,
    netOrderSales?: number | null,
    commissionPercentage?: number | null,
    affiliateCommission?: number | null,
    payoutPeriod?: string | null,
    createdAt: string,
    updatedAt: string,
  };
  
  export type UpsertCampaignPeriodStatInput = {
    utmCampaign: string,
    utmSource: string,
    eventDate: string,
    orderCount: number,
    netOrderSales: number,
  };
  
  export type CreateAssetInput = {
    assetId?: string | null,
    assetType: AssetType,
    assetSubType: AssetSubType,
    name: string,
    filename: string,
    metadata?: string | null,
    keywords?: string | null,
    description?: string | null,
    watermarkDemo?: boolean | null,
    orgId: string,
    cognitoUserId?: string | null,
    checksum: string,
    attributes: string,
    assetVariations: Array< AssetVariationInput | null >,
    notify?: boolean | null,
    eTag?: string | null,
    orgIcon?: string | null,
    sharedAssetId?: string | null,
    itemSets?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export enum AssetType {
    GRAPHIC = "GRAPHIC",
    FONT = "FONT",
    SHAPE = "SHAPE",
    VIDEO = "VIDEO",
    DESIGN = "DESIGN",
    LISTING = "LISTING",
    OUTPUT = "OUTPUT",
  }
  
  
  export enum AssetSubType {
    IMAGE = "IMAGE",
    WOFF = "WOFF",
    GIF = "GIF",
    MOV = "MOV",
    LINE = "LINE",
    SVG = "SVG",
    SHAPE = "SHAPE",
    TEXTURE = "TEXTURE",
    PHOTO = "PHOTO",
    ICON = "ICON",
    BACKGROUND = "BACKGROUND",
    DEPTH = "DEPTH",
    FRAME = "FRAME",
    GRID = "GRID",
    OVERLAY = "OVERLAY",
  }
  
  
  export type AssetVariationInput = {
    assetVariation: AssetVariation,
    filePath: string,
    fileSize?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export enum AssetVariation {
    ORIGINAL = "ORIGINAL",
    ENCRYPT = "ENCRYPT",
    OPTIMIZED = "OPTIMIZED",
    OPTIMIZED_MOBILE = "OPTIMIZED_MOBILE",
    LAYERED_TOP = "LAYERED_TOP",
    LAYERED_BOTTOM = "LAYERED_BOTTOM",
    THUMBNAIL = "THUMBNAIL",
    DEMO = "DEMO",
    DEMO_WATERMARK = "DEMO_WATERMARK",
    DEMO_MOBILE = "DEMO_MOBILE",
    OUTPUT = "OUTPUT",
  }
  
  
  export type AssetMeta = {
    __typename: "AssetMeta",
    assetId: string,
    assetType: AssetType,
    assetSubType: AssetSubType,
    filePath?: string | null,
    thumbnailFilePath?: string | null,
    optimizedFilePath?: string | null,
    watermarkDemo?: boolean | null,
    attributes?: string | null,
    checksum?: string | null,
    name: string,
    filename: string,
    orgId: string,
    orgIcon?: string | null,
    metadata?: string | null,
    keywords?: string | null,
    description?: string | null,
    migrationVersion?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type AddAssetVariationInput = {
    assetId: string,
    assetVariation: AssetVariation,
    filePath?: string | null,
    fileSize?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type Asset = {
    __typename: "Asset",
    assetId: string,
    assetType: AssetType,
    assetSubType: AssetSubType,
    assetVariations?:  Array<AssetVariationData | null > | null,
    thumbnailFilePath?: string | null,
    optimizedFilePath?: string | null,
    watermarkDemo?: boolean | null,
    filePath?: string | null,
    attributes?: string | null,
    name: string,
    filename: string,
    orgId: string,
    orgIcon?: string | null,
    metadata?: string | null,
    keywords?: string | null,
    description?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type AssetVariationData = {
    __typename: "AssetVariationData",
    assetVariation?: AssetVariation | null,
    filePath?: string | null,
    fileSize?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type RebuildAssetMetaInput = {
    assetId: string,
    assetType: AssetType,
    assetSubType: AssetSubType,
  };
  
  export type UpdateAssetInput = {
    assetId: string,
    assetType: AssetType,
    assetSubType: AssetSubType,
    watermarkDemo?: boolean | null,
    orgIcon?: string | null,
    name?: string | null,
    filename?: string | null,
    attributes?: string | null,
    metadata?: string | null,
    keywords?: string | null,
    description?: string | null,
  };
  
  export type CopyAssetToOrgInput = {
    assetId: string,
    sourceOrgId: string,
    destinationOrgId: string,
    name: string,
    filename: string,
    shareSourceFile?: boolean | null,
  };
  
  export type DeleteAssetInput = {
    assetId: string,
    orgId?: string | null,
    assetType?: AssetType | null,
    maintainAssociations?: boolean | null,
  };
  
  export type DeleteAssetVariationInput = {
    assetId: string,
    assetVariation: AssetVariation,
  };
  
  export type CreateSubscriptionInput = {
    orgId: string,
    newPlanIds: Array< string | null >,
  };
  
  export type SubscriptionDetails = {
    __typename: "SubscriptionDetails",
    subscriptionId: string,
    customerId: string,
    status: SubscriptionStatus,
    autoRenew: boolean,
    cancellationDate?: string | null,
    currentTermStartDate?: string | null,
    currentTermEndDate?: string | null,
    serviceStartDate?: string | null,
    contractEffectiveDate?: string | null,
    contractTerm?: string | null,
    renewalTerm?: string | null,
    createdDate: string,
    updatedDate: string,
    freeTrialEndDate?: string | null,
    plans:  Array<Plan | null >,
  };
  
  export enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
    CHANGED = "CHANGED",
    DRAFT = "DRAFT",
    EXPIRED = "EXPIRED",
    RENEWED = "RENEWED",
  }
  
  
  export type Plan = {
    __typename: "Plan",
    planId: string,
    planName: string,
    planType: PlanType,
    description?: string | null,
    productId: string,
    productName: string,
    chargeName: string,
    billingPeriod: BillingPeriod,
    billingDay: string,
    billingScheduleId: string,
    revenueScheduleId: string,
    subscriptionLineId: string,
    currentPeriodStartDate?: string | null,
    currentPeriodEndDate?: string | null,
    lastChargeDate?: string | null,
    pricePerPeriod: string,
  };
  
  export enum PlanType {
    PRIMARY = "PRIMARY",
    ADDON = "ADDON",
  }
  
  
  export enum BillingPeriod {
    DAILY = "DAILY",
    MONTHLY = "MONTHLY",
    ANNUALLY = "ANNUALLY",
    FIFTEENDAYS = "FIFTEENDAYS",
    FIFTEENMONTHS = "FIFTEENMONTHS",
  }
  
  
  export type StartSignupCheckoutInput = {
    planIds?: Array< string | null > | null,
    setupIntent?: boolean | null,
  };
  
  export type StartSignupCheckoutResponse = {
    __typename: "StartSignupCheckoutResponse",
    clientSecret: string,
    setupIntentId?: string | null,
    paymentIntentId?: string | null,
  };
  
  export type FinishSignupCheckoutInput = {
    paymentIntentId: string,
    paymentMethodId: string,
    orgType?: OrgType | null,
  };
  
  export enum OrgType {
    DESIGN = "DESIGN",
    ASSET = "ASSET",
    MARKET = "MARKET",
    ENDUSER = "ENDUSER",
  }
  
  
  export type Organization = {
    __typename: "Organization",
    orgId: string,
    type: OrgType,
    status: OrgStatus,
    statusConfirmed?: boolean | null,
    name: string,
    billingUserId?: string | null,
    billingCycleDay?: number | null,
    planId?: string | null,
    paymentUserId?: string | null,
    affiliateAccountId?: string | null,
    affiliateStatus?: AffiliateStatus | null,
    pusherId: string,
    parentOrgId?: string | null,
    managementOrgId?: string | null,
    corjlVersion?: string | null,
    attributes?: string | null,
    logoUrl?: string | null,
    avatarUrl?: string | null,
    designCount?: number | null,
    imageCount?: number | null,
    fontCount?: number | null,
    firstOrderDate?: string | null,
    listingCount?: number | null,
    outputCount?: number | null,
    orderCount?: number | null,
    migrationVersion?: number | null,
    billingPeriodOrderCount?: number | null,
    billingPeriodTransactionCost?: number | null,
    pendingOrderCount?: number | null,
    contactEmail?: string | null,
    totalStorageKBytes?: number | null,
    originalStorageKBytes?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export enum OrgStatus {
    ACTIVE = "ACTIVE",
    ACTIVE_PENDING_CANCEL = "ACTIVE_PENDING_CANCEL",
    ACTIVE_TRIAL = "ACTIVE_TRIAL",
    ACTIVE_TRIAL_PENDING_CANCEL = "ACTIVE_TRIAL_PENDING_CANCEL",
    ACTIVE_NONPAYMENT_WARNING = "ACTIVE_NONPAYMENT_WARNING",
    ACTIVE_NONPAYMENT_LIMITED = "ACTIVE_NONPAYMENT_LIMITED",
    CANCELLED = "CANCELLED",
    CANCELLED_NEED_BILLING = "CANCELLED_NEED_BILLING",
    CANCELLED_NONPAYMENT = "CANCELLED_NONPAYMENT",
    CANCELLED_TRIAL = "CANCELLED_TRIAL",
    BANNED = "BANNED",
    BAD_DEBT = "BAD_DEBT",
    DELETE = "DELETE",
  }
  
  
  export enum AffiliateStatus {
    STARTED_STEP1 = "STARTED_STEP1",
    STARTED_STEP2 = "STARTED_STEP2",
    STARTED_STEP3 = "STARTED_STEP3",
    PENDING_VERIFICATION = "PENDING_VERIFICATION",
    SUSPENDED = "SUSPENDED",
    BLOCKED = "BLOCKED",
    CLOSED = "CLOSED",
    COMPLETE = "COMPLETE",
  }
  
  
  export type UpdateCachedPlansInput = {
    pageNum?: number | null,
  };
  
  export type UpdateSubscriptionInput = {
    subscriptionId: string,
    orgId: string,
    newPlanIds: Array< string | null >,
  };
  
  export type ModelSubscriptionConnection = {
    __typename: "ModelSubscriptionConnection",
    items?:  Array<SubscriptionDetails | null > | null,
  };
  
  export type CreatePrepaidOrderInput = {
    orgId: string,
    planName: PlanName,
    quantity: number,
  };
  
  export enum PlanName {
    START = "START",
    GROW = "GROW",
    SCALE = "SCALE",
  }
  
  
  export type OrderResult = {
    __typename: "OrderResult",
    orderId: string,
    customerId: string,
    orgId: string,
    status: string,
    totalPrice: number,
    orderItems:  Array<OrderItem | null >,
  };
  
  export type OrderItem = {
    __typename: "OrderItem",
    productId: string,
    productName: string,
    unitPrice: number,
    quantity: number,
    total: number,
  };
  
  export type AddItemToCartInput = {
    sessionID?: string | null,
    buyerOrgId: string,
    buyerEmail?: string | null,
    partner: number,
    quantity: number,
    internalSku: string,
    envelopeSku?: string | null,
    designId: string,
    printPageMap: Array< PrintPageInfoInput >,
    orderId?: string | null,
    duplex: boolean,
  };
  
  export type PrintPageInfoInput = {
    pageId: number,
    resultFilePath?: string | null,
    resultFileSize?: number | null,
    pageStatus?: OutputStatus | null,
    printSide?: PrintSide | null,
  };
  
  export enum OutputStatus {
    DENIED = "DENIED",
    FAILED = "FAILED",
    PROCESSING = "PROCESSING",
    GENERATED = "GENERATED",
    SUBMITTED = "SUBMITTED",
    PRINTING = "PRINTING",
    SHIPPED = "SHIPPED",
    EMAILED = "EMAILED",
    OPENED = "OPENED",
    DOWNLOADED = "DOWNLOADED",
    WORKFLOW = "WORKFLOW",
    COMPLETE = "COMPLETE",
    CANCELED = "CANCELED",
  }
  
  
  export enum PrintSide {
    FRONT = "FRONT",
    BACK = "BACK",
  }
  
  
  export type CartMeta = {
    __typename: "CartMeta",
    cartId: string,
    status: CartStatus,
    buyerOrgId?: string | null,
    buyerEmail: string,
    userId: string,
    cognitoUserId: string,
    sessionID?: string | null,
    items:  Array<CartItem >,
    shippingMethod?: ShippingMethod | null,
    shippingAddressee?: string | null,
    shippingCompany?: string | null,
    shippingAddress1?: string | null,
    shippingAddress2?: string | null,
    shippingCity?: string | null,
    shippingState?: string | null,
    shippingPostalCode?: string | null,
    shippingCountryCode?: string | null,
    fulfillmentMetaId?: string | null,
    createdAt: string,
    updatedAt: string,
  };
  
  export enum CartStatus {
    ACTIVE = "ACTIVE",
    SUBMITTED = "SUBMITTED",
    PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
    CANCELLED = "CANCELLED",
  }
  
  
  export type CartItem = {
    __typename: "CartItem",
    cartId: string,
    cartItemId: string,
    designId: string,
    designerOrgId: string,
    designerEmail: string,
    itemThumbnail?: string | null,
    printPageMap:  Array<PrintPageInfo >,
    orderId?: string | null,
    quantity: number,
    internalSku: string,
    duplex: boolean,
    partner: number,
    envelopeSku?: string | null,
    createdAt: string,
    updatedAt: string,
  };
  
  export type PrintPageInfo = {
    __typename: "PrintPageInfo",
    pageId: number,
    resultFilePath?: string | null,
    resultFileSize?: number | null,
    pageStatus?: OutputStatus | null,
    printSide?: PrintSide | null,
  };
  
  export enum ShippingMethod {
    UPS1D = "UPS1D",
    UPS2D = "UPS2D",
    UPSGROUND = "UPSGROUND",
    UPSMIEXPBPM = "UPSMIEXPBPM",
    USPSFIRSTCLASSPKG = "USPSFIRSTCLASSPKG",
    USPSFIRSTCLASSPKGINTERNATIONAL = "USPSFIRSTCLASSPKGINTERNATIONAL",
    USPSFIRSTCLASSLETTER = "USPSFIRSTCLASSLETTER",
    USPSPRIORITY = "USPSPRIORITY",
    USPSPRIORITYINTERNATIONAL = "USPSPRIORITYINTERNATIONAL",
    USPSEXPRESSMAIL = "USPSEXPRESSMAIL",
    FEDEX1D = "FEDEX1D",
    FEDEX2D = "FEDEX2D",
    FEDEXINTLPRPAK = "FEDEXINTLPRPAK",
    FEDEXGROUND = "FEDEXGROUND",
    FEDEXONERATEPAK = "FEDEXONERATEPAK",
  }
  
  
  export type RemoveCartItemInput = {
    cartItemId: string,
  };
  
  export type UpdateCartItemInput = {
    cartItemId: string,
    printPageMap?: Array< PrintPageInfoInput | null > | null,
    duplex?: boolean | null,
    quantity?: number | null,
    internalSku?: string | null,
    envelopeSku?: string | null,
  };
  
  export type UpdateCartStatusInput = {
    cartId: string,
    status: CartStatus,
  };
  
  export type UpdateCartShippingInput = {
    shippingMethod: ShippingMethod,
    shippingAddressee: string,
    shippingCompany?: string | null,
    shippingAddress1: string,
    shippingAddress2?: string | null,
    shippingCity: string,
    shippingState: string,
    shippingPostalCode: string,
    shippingCountryCode: string,
  };
  
  export type StartPurchaseCheckoutInput = {
    paymentMethodId: string,
  };
  
  export type PurchaseDetails = {
    __typename: "PurchaseDetails",
    clientSecret?: string | null,
    paymentIntentId?: string | null,
    orderConfirmationEmail?: string | null,
    nextAction?: string | null,
    setupIntentId?: string | null,
  };
  
  export type InitiateFulfillmentOrderInput = {
    cartId: string,
  };
  
  export type RebuildDesignMetaInput = {
    designId: string,
  };
  
  export type DesignMeta = {
    __typename: "DesignMeta",
    designId: string,
    designName: string,
    description?: string | null,
    metaDescription?: string | null,
    designType: DesignType,
    editorType?: EditorType | null,
    legacyId?: number | null,
    orderId?: string | null,
    draftVersion: number,
    publishedVersion: number,
    publishedEditorType?: EditorType | null,
    thumbnailFilePath?: string | null,
    orgId: string,
    sellerOrgId?: string | null,
    migrationVersion?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export enum DesignType {
    COMPOSITION = "COMPOSITION",
    CUSTOM_IMPORT = "CUSTOM_IMPORT",
    IMPORT = "IMPORT",
    TEMPLATE = "TEMPLATE",
    BLANK_PRODUCT = "BLANK_PRODUCT",
    PRODUCT = "PRODUCT",
    ORDER = "ORDER",
  }
  
  
  export enum EditorType {
    CANVAS = "CANVAS",
    SVG = "SVG",
    PRODUCT = "PRODUCT",
  }
  
  
  export type CreateDesignInput = {
    designName: string,
    description?: string | null,
    metaDescription?: string | null,
    designType: DesignType,
    defaultPageRows: number,
    defaultPageColumns: number,
    defaultPageHeight: string,
    defaultPageWidth: string,
    defaultPageBleed: string,
    defaultDisplayPageBleed?: boolean | null,
    defaultSectionHeight?: number | null,
    defaultSectionWidth?: number | null,
    displayUnit: DesignUnit,
    pixelDensityUnit: PixelDensityUnit,
    pixelsPerUnit: number,
    editorType: EditorType,
    editorVersion?: string | null,
    orgId: string,
    itemSets?: Array< string | null > | null,
  };
  
  export enum DesignUnit {
    centimeters = "centimeters",
    inches = "inches",
    millimeters = "millimeters",
    pixels = "pixels",
  }
  
  
  export enum PixelDensityUnit {
    centimeters = "centimeters",
    inches = "inches",
  }
  
  
  export type ModelDesignConditionInput = {
    designName?: ModelStringInput | null,
    createdAt?: ModelStringInput | null,
    legacyId?: ModelStringInput | null,
    designType?: ModelStringInput | null,
    updatedAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    and?: Array< ModelDesignConditionInput | null > | null,
    or?: Array< ModelDesignConditionInput | null > | null,
    not?: ModelDesignConditionInput | null,
  };
  
  export type ModelStringInput = {
    ne?: string | null,
    eq?: string | null,
    le?: string | null,
    lt?: string | null,
    ge?: string | null,
    gt?: string | null,
    contains?: string | null,
    notContains?: string | null,
    between?: Array< string | null > | null,
    beginsWith?: string | null,
    attributeExists?: boolean | null,
    attributeType?: ModelAttributeTypes | null,
    size?: ModelSizeInput | null,
  };
  
  export enum ModelAttributeTypes {
    binary = "binary",
    binarySet = "binarySet",
    bool = "bool",
    list = "list",
    map = "map",
    number = "number",
    numberSet = "numberSet",
    string = "string",
    stringSet = "stringSet",
    _null = "_null",
  }
  
  
  export type ModelSizeInput = {
    ne?: number | null,
    eq?: number | null,
    le?: number | null,
    lt?: number | null,
    ge?: number | null,
    gt?: number | null,
    between?: Array< number | null > | null,
  };
  
  export type ModelIntInput = {
    ne?: number | null,
    eq?: number | null,
    le?: number | null,
    lt?: number | null,
    ge?: number | null,
    gt?: number | null,
    between?: Array< number | null > | null,
    attributeExists?: boolean | null,
    attributeType?: ModelAttributeTypes | null,
  };
  
  export type Design = {
    __typename: "Design",
    designDetails?: DesignDetails | null,
    designPage?:  Array<DesignPage | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type DesignDetails = {
    __typename: "DesignDetails",
    designId: string,
    version: number,
    pageCount: number,
    designName: string,
    designType: DesignType,
    pageMap?:  Array<PageInfo | null > | null,
    pixelsPerUnit: number,
    displayUnit: DesignUnit,
    pixelDensityUnit: PixelDensityUnit,
    defaultPageRows: number,
    defaultPageColumns: number,
    defaultPageHeight: string,
    defaultPageWidth: string,
    defaultPageBleed: string,
    defaultDisplayPageBleed: boolean,
    defaultSectionHeight?: number | null,
    defaultSectionWidth?: number | null,
    editorType: EditorType,
    editorVersion?: string | null,
    payload?: string | null,
    customerBackgrounds?: Array< string | null > | null,
    customerFonts?: Array< string | null > | null,
    customerGraphics?: Array< string | null > | null,
    customerShapes?: Array< string | null > | null,
    designFonts?: Array< string | null > | null,
    designGraphics?: Array< string | null > | null,
    orgId?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type PageInfo = {
    __typename: "PageInfo",
    pageId: number,
    pageThumbnailFilePath?: string | null,
    name?: string | null,
    primary?: boolean | null,
  };
  
  export type DesignPage = {
    __typename: "DesignPage",
    pageId: number,
    pageRows?: number | null,
    pageColumns?: number | null,
    pageHeight?: string | null,
    pageWidth?: string | null,
    pageBleed?: string | null,
    displayPageBleed?: boolean | null,
    sectionHeight?: number | null,
    sectionWidth?: number | null,
    customThumbnail?: boolean | null,
    pageThumbnailFilePath?: string | null,
    payload?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
    pageSections?:  Array<PageSection | null > | null,
  };
  
  export type PageSection = {
    __typename: "PageSection",
    section: number,
    payload?: string | null,
    lastModifiedToken?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type MigrateDesignInput = {
    designName: string,
    designType: DesignType,
    corjlVersion?: string | null,
    legacyId?: number | null,
    thumbnailFilePath?: string | null,
    orgId: string,
    itemSets?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ImportDesignInput = {
    designId: string,
    defaultPageRows: number,
    defaultPageColumns: number,
    defaultPageHeight: string,
    defaultPageWidth: string,
    defaultPageBleed: string,
    defaultDisplayPageBleed?: boolean | null,
    defaultSectionHeight?: number | null,
    defaultSectionWidth?: number | null,
    displayUnit: DesignUnit,
    pixelDensityUnit: PixelDensityUnit,
    pixelsPerUnit: number,
    editorType: EditorType,
    editorVersion?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ImportDesign2Input = {
    designMeta?: ImportDesignMetaInput | null,
    designDetails?: ImportDesignDetailsInput | null,
    designPage?: Array< ImportPageSectionInput | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ImportDesignMetaInput = {
    designName: string,
    designType: DesignType,
    corjlVersion?: string | null,
    legacyId?: number | null,
    thumbnailFilePath?: string | null,
    publishedEditorType?: EditorType | null,
    orgId: string,
    itemSets?: Array< string | null > | null,
  };
  
  export type ImportDesignDetailsInput = {
    defaultPageRows: number,
    defaultPageColumns: number,
    defaultPageHeight: string,
    defaultPageWidth: string,
    defaultPageBleed: string,
    defaultDisplayPageBleed?: boolean | null,
    defaultSectionHeight?: number | null,
    defaultSectionWidth?: number | null,
    displayUnit: DesignUnit,
    pixelDensityUnit?: PixelDensityUnit | null,
    pixelsPerUnit: number,
    editorType: EditorType,
    editorVersion?: string | null,
    customerBackgrounds?: Array< string | null > | null,
    customerFonts?: Array< string | null > | null,
    customerGraphics?: Array< string | null > | null,
    customerShapes?: Array< string | null > | null,
    designFonts?: Array< string | null > | null,
    designGraphics?: Array< string | null > | null,
    pageMap?: Array< PageInfoInput | null > | null,
  };
  
  export type PageInfoInput = {
    pageId: number,
    pageThumbnailFilePath?: string | null,
    name?: string | null,
    primary?: boolean | null,
  };
  
  export type ImportPageSectionInput = {
    pageId: number,
    pageSections: Array< SavePageSectionInput | null >,
  };
  
  export type SavePageSectionInput = {
    section: number,
    payload: string,
    lastModifiedToken?: string | null,
  };
  
  export type StartImportDesignFromTemplettInput = {
    username: string,
    password: string,
    orgId: string,
  };
  
  export type CopyDesignInput = {
    copyDesignId: string,
    copyVersion: number,
    newDesignName?: string | null,
    copyToOrgId?: string | null,
  };
  
  export type RevertOrderDesignInput = {
    designId: string,
  };
  
  export type CopyDesignToBuyerInput = {
    designId: string,
    copyToOrgId: string,
  };
  
  export type CopyDesignToOrderInput = {
    copyDesignId: string,
    copyVersion: number,
    copyToOrgId: string,
    orderId: string,
    lineItem: string,
    sortIndex: string,
    listingId?: string | null,
    newDesignName?: string | null,
    designName?: string | null,
    designType?: string | null,
    designPrintOptions?: string | null,
    listingDesignType?: ListingDesignType | null,
    downloadsAllowed?: number | null,
    downloadsUsed?: number | null,
    expirationDate?: string | null,
    thumbnailFilePath?: string | null,
    originalRequestHeaders?: ActivityLogRequestHeadersInput | null,
  };
  
  export enum ListingDesignType {
    EDITABLE = "EDITABLE",
    INSTRUCTIONS = "INSTRUCTIONS",
  }
  
  
  export type ActivityLogRequestHeadersInput = {
    userAgent?: string | null,
    platform?: string | null,
    viewerType?: string | null,
    country?: string | null,
    ipAddress?: string | null,
  };
  
  export type GenerateDesignInput = {
    designId: string,
    version: number,
  };
  
  export type CreateDesignVersionInput = {
    designId: string,
    fromVersion: number,
    newVersionType?: DesignVersionType | null,
  };
  
  export enum DesignVersionType {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    SPECIFY = "SPECIFY",
  }
  
  
  export type PromoteDesignVersionInput = {
    designId: string,
    version: number,
    versionType?: DesignVersionType | null,
  };
  
  export type AddDesignPageInput = {
    designId: string,
    version: number,
    copyPageId?: number | null,
    numberOfPagesToAdd: number,
  };
  
  export type UpdateDesignDetailsInput = {
    designId: string,
    version: number,
    payload?: string | null,
    displayUnit?: DesignUnit | null,
    pixelDensityUnit?: PixelDensityUnit | null,
    pixelsPerUnit?: number | null,
    pageMap?: Array< PageInfoInput | null > | null,
    defaultPageRows?: number | null,
    defaultPageColumns?: number | null,
    defaultPageHeight?: string | null,
    defaultPageWidth?: string | null,
    defaultPageBleed?: string | null,
    defaultDisplayPageBleed?: boolean | null,
    defaultSectionHeight?: number | null,
    defaultSectionWidth?: number | null,
    editorType?: EditorType | null,
    editorVersion?: string | null,
    printOptions?: string | null,
    description?: string | null,
  };
  
  export type UpdateDesignMetaInput = {
    designId: string,
    sellerOrgId?: string | null,
    orderId?: string | null,
    deleteLegacyId?: boolean | null,
    designName?: string | null,
    designType?: DesignType | null,
    description?: string | null,
    metaDescription?: string | null,
    legacyId?: number | null,
    publishedEditorType?: EditorType | null,
    thumbnailFilePath?: string | null,
    skipUpdatedAt?: boolean | null,
  };
  
  export type DeleteDesignInput = {
    designId: string,
    version?: number | null,
  };
  
  export type UpdateDesignPageSectionsInput = {
    designId: string,
    pageId: number,
    version: number,
    pageSections: Array< SavePageSectionInput | null >,
  };
  
  export type UpdateDesignPageInput = {
    designId: string,
    pageId: number,
    version: number,
    pageRows?: number | null,
    pageColumns?: number | null,
    pageHeight?: string | null,
    pageWidth?: string | null,
    pageBleed?: string | null,
    displayPageBleed?: boolean | null,
    sectionHeight?: number | null,
    sectionWidth?: number | null,
    pageThumbnailFilePath?: string | null,
    customThumbnail?: boolean | null,
    displayUnit?: DesignUnit | null,
    pixelDensityUnit?: PixelDensityUnit | null,
    pixelsPerUnit?: number | null,
  };
  
  export type CustomerDesignAssetsInput = {
    designId: string,
    version: number,
    assetType: AssetType,
    assetSubType?: AssetSubType | null,
    assetIds?: Array< string | null > | null,
  };
  
  export type CreateEntitlementInstanceInput = {
    orgId: string,
    entitlementFeature: EntitlementFeature,
    entitlementTerm: PlanTerm,
    includedQuantity: number,
    ordwayOrderId?: string | null,
  };
  
  export enum EntitlementFeature {
    PREPAID_ORDERS = "PREPAID_ORDERS",
    CREATIVE_FABRICA = "CREATIVE_FABRICA",
    ASSISTANT_ACCOUNT = "ASSISTANT_ACCOUNT",
    TEAM_MEMBER_ACCOUNT = "TEAM_MEMBER_ACCOUNT",
  }
  
  
  export enum PlanTerm {
    ANNUAL = "ANNUAL",
    MONTHLY = "MONTHLY",
  }
  
  
  export type EntitlementInstance = {
    __typename: "EntitlementInstance",
    entitlementInstanceId: string,
    orgId: string,
    entitlementFeature: EntitlementFeature,
    entitlementTerm: PlanTerm,
    entitlementStatus: EntitlementStatus,
    includedQuantity: number,
    usedQuantity: number,
    startDate?: string | null,
    endDate?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export enum EntitlementStatus {
    ACTIVE = "ACTIVE",
    DEPLETED = "DEPLETED",
    EXPIRED = "EXPIRED",
    CANCELLED = "CANCELLED",
  }
  
  
  export type CreateEntitlementInstanceFromOrderInput = {
    billingUserId: string,
    entitlementFeature: EntitlementFeature,
    entitlementTerm: PlanTerm,
    includedQuantity: number,
    ordwayOrderId?: string | null,
  };
  
  export type CreateEntitlementInstanceUsageInput = {
    entitlementInstanceId: string,
    usageUsedQuantity: number,
  };
  
  export type UpdateShippingInput = {
    orderKey: string,
    shippingMethod: ShippingMethod,
    shippingAddressee: string,
    shippingCompany?: string | null,
    shippingAddress1: string,
    shippingAddress2?: string | null,
    shippingCity: string,
    shippingState: string,
    shippingPostalCode: string,
    shippingCountryCode: string,
  };
  
  export type UpdateFulfillmentMetaInput = {
    fulfillmentId: string,
    status?: FulfillmentStatus | null,
    buyerOrgId?: string | null,
    buyerEmail?: string | null,
    cognitoUserId?: string | null,
    shippingMethod?: ShippingMethod | null,
    shippingAddressee?: string | null,
    shippingCompany?: string | null,
    shippingAddress1?: string | null,
    shippingAddress2?: string | null,
    shippingCity?: string | null,
    shippingState?: string | null,
    shippingPostalCode?: string | null,
    shippingCountryCode?: string | null,
    trackingNumber?: string | null,
    expectedShipDate?: string | null,
  };
  
  export enum FulfillmentStatus {
    PENDING = "PENDING",
    SUBMITTED = "SUBMITTED",
    PRINTING = "PRINTING",
    SHIPPED = "SHIPPED",
    ERROR = "ERROR",
  }
  
  
  export type FulfillmentMeta = {
    __typename: "FulfillmentMeta",
    fulfillmentId: string,
    cartId: string,
    status: FulfillmentStatus,
    buyerOrgId: string,
    buyerEmail?: string | null,
    cognitoUserId?: string | null,
    userId: string,
    shippingMethod?: ShippingMethod | null,
    shippingAddressee?: string | null,
    shippingCompany?: string | null,
    shippingAddress1?: string | null,
    shippingAddress2?: string | null,
    shippingCity?: string | null,
    shippingState?: string | null,
    shippingPostalCode?: string | null,
    shippingCountryCode?: string | null,
    expectedShipDate?: string | null,
    trackingNumber?: string | null,
    createdAt: string,
    updatedAt: string,
  };
  
  export type UpdateFulfillmentItemInput = {
    fulfillmentId: string,
    lineItem: number,
    outputId?: string | null,
    printPageMap?: Array< PrintPageInfoInput | null > | null,
    duplex?: boolean | null,
    quantity?: number | null,
    internalSku?: string | null,
    envelopeSku?: string | null,
    trackingNumber?: string | null,
  };
  
  export type FulfillmentItem = {
    __typename: "FulfillmentItem",
    fulfillmentId: string,
    outputId?: string | null,
    designId: string,
    designerOrgId: string,
    designerEmail: string,
    itemThumbnail?: string | null,
    printPageMap:  Array<PrintPageInfo >,
    orderId?: string | null,
    quantity: number,
    internalSku: string,
    envelopeSku?: string | null,
    duplex: boolean,
    partner: number,
    lineItem: number,
    createdAt: string,
    updatedAt: string,
  };
  
  export type ConnectEtsyIntegrationInput = {
    orgId: string,
  };
  
  export type ModelIntegrationConditionInput = {
    attributes?: ModelStringInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    integrationId?: ModelIDInput | null,
    integrationUserId?: ModelStringInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelIntegrationConditionInput | null > | null,
    or?: Array< ModelIntegrationConditionInput | null > | null,
    not?: ModelIntegrationConditionInput | null,
  };
  
  export type ModelIDInput = {
    ne?: string | null,
    eq?: string | null,
    le?: string | null,
    lt?: string | null,
    ge?: string | null,
    gt?: string | null,
    contains?: string | null,
    notContains?: string | null,
    between?: Array< string | null > | null,
    beginsWith?: string | null,
    attributeExists?: boolean | null,
    attributeType?: ModelAttributeTypes | null,
    size?: ModelSizeInput | null,
  };
  
  export type CreateIntegrationInput = {
    orgId: string,
    source: IntegrationSource,
    type: IntegrationType,
    integrationUserId?: string | null,
    credentials: string,
    attributes?: string | null,
    status?: IntegrationStatus | null,
  };
  
  export enum IntegrationSource {
    CORJL = "CORJL",
    ETSY = "ETSY",
    SHOPIFY = "SHOPIFY",
    SHOPIFY_FLOW = "SHOPIFY_FLOW",
    SHOPIFY_WEBHOOK = "SHOPIFY_WEBHOOK",
    WOOCOMMERCE = "WOOCOMMERCE",
    ZAPPIER = "ZAPPIER",
    MAKE = "MAKE",
  }
  
  
  export enum IntegrationType {
    MARKETPLACE = "MARKETPLACE",
    FULFILLMENT = "FULFILLMENT",
    API = "API",
  }
  
  
  export enum IntegrationStatus {
    PENDING = "PENDING",
    CREATED = "CREATED",
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
    PAUSED = "PAUSED",
    BILLING_HOLD = "BILLING_HOLD",
  }
  
  
  export type Integration = {
    __typename: "Integration",
    integrationId: string,
    orgId: string,
    batch: number,
    source: IntegrationSource,
    type: IntegrationType,
    status: IntegrationStatus,
    integrationUserId?: string | null,
    credentials: string,
    attributes?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type UpdateIntegrationInput = {
    integrationId: string,
    source?: IntegrationSource | null,
    status?: IntegrationStatus | null,
    integrationUserId?: string | null,
    credentials?: string | null,
    attributes?: string | null,
  };
  
  export type DeleteIntegrationInput = {
    integrationId?: string | null,
  };
  
  export type IntegrationOrderCheckCompleteInput = {
    source: IntegrationSource,
    status: IntegrationStatus,
    batch: number,
  };
  
  export type IntegrationBatch = {
    __typename: "IntegrationBatch",
    source: IntegrationSource,
    status: IntegrationStatus,
    batch: number,
    lastCompletedAt?: string | null,
    lastFetchedAt?: string | null,
    createdAt: string,
    updatedAt: string,
  };
  
  export type RebuildItemSetInput = {
    setId: string,
  };
  
  export type ItemSetMeta = {
    __typename: "ItemSetMeta",
    setId: string,
    itemType: ItemType,
    setType: SetType,
    setTypeId?: string | null,
    setTypeVersion?: number | null,
    itemCount?: number | null,
    name: string,
    parentId?: string | null,
    orgId: string,
    migrationVersion?: number | null,
    hasChildren?: boolean | null,
    updatedAt?: string | null,
    createdAt?: string | null,
    expirationTime?: number | null,
  };
  
  export enum ItemType {
    DESIGN = "DESIGN",
    FONT = "FONT",
    GRAPHIC = "GRAPHIC",
    LISTING = "LISTING",
    PLUGIN = "PLUGIN",
    ITEMSET = "ITEMSET",
    ASSET = "ASSET",
    PHYSICAL = "PHYSICAL",
  }
  
  
  export enum SetType {
    SPECIAL = "SPECIAL",
    COLLECTION = "COLLECTION",
    DESIGN = "DESIGN",
    LISTING = "LISTING",
    TAG = "TAG",
    FOLDER = "FOLDER",
    VARIATION = "VARIATION",
    OPTION = "OPTION",
  }
  
  
  export type CreateItemSetInput = {
    name: string,
    itemType: ItemType,
    setType: SetType,
    setTypeId?: string | null,
    setTypeVersion?: number | null,
    parentId?: string | null,
    orgId: string,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type ModelItemSetConditionInput = {
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    itemType?: ModelItemTypeInput | null,
    itemCount?: ModelIntInput | null,
    itemKey?: ModelIDInput | null,
    name?: ModelStringInput | null,
    parentId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    setType?: ModelSetTypeInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelItemSetConditionInput | null > | null,
    or?: Array< ModelItemSetConditionInput | null > | null,
    not?: ModelItemSetConditionInput | null,
  };
  
  export type ModelItemTypeInput = {
    eq?: ItemType | null,
    ne?: ItemType | null,
  };
  
  export type ModelSetTypeInput = {
    eq?: SetType | null,
    ne?: SetType | null,
  };
  
  export type AddItemsToSetInput = {
    itemType: ItemType,
    setId: string,
    setType: SetType,
    itemIds: Array< string | null >,
    orgId?: string | null,
    notify?: boolean | null,
  };
  
  export type AddItemToSetsInput = {
    itemType: ItemType,
    itemId: string,
    setIds: Array< string | null >,
    notify?: boolean | null,
  };
  
  export type ItemSetMetaConnection = {
    __typename: "ItemSetMetaConnection",
    items?:  Array<ItemSetMeta | null > | null,
    nextToken?: string | null,
  };
  
  export type RecalculateItemSetCountInput = {
    itemType: ItemType,
    setId: string,
    setType: SetType,
    orgId?: string | null,
  };
  
  export type RemoveItemsFromSetInput = {
    itemType: ItemType,
    setId: string,
    setType: SetType,
    itemIds: Array< string | null >,
    orgId?: string | null,
    notify?: boolean | null,
  };
  
  export type UpdateItemSetInput = {
    setId: string,
    setType: SetType,
    itemType: ItemType,
    name?: string | null,
  };
  
  export type DeleteItemSetInput = {
    setId: string,
    itemType: ItemType,
    setType?: SetType | null,
  };
  
  export type CreateListingInput = {
    orgId: string,
    name: string,
    description?: string | null,
    metaDescription?: string | null,
    attributes?: string | null,
    defaultMaxDownloads?: number | null,
    defaultExpireDays?: number | null,
    listingId?: string | null,
    itemSets?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    skipNotify?: boolean | null,
  };
  
  export type ModelListingConditionInput = {
    attributes?: ModelStringInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    orgId?: ModelIDInput | null,
    name?: ModelStringInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelListingConditionInput | null > | null,
    or?: Array< ModelListingConditionInput | null > | null,
    not?: ModelListingConditionInput | null,
  };
  
  export type Listing = {
    __typename: "Listing",
    listingId: string,
    version: number,
    orgId: string,
    name: string,
    attributes?: string | null,
    defaultMaxDownloads?: number | null,
    defaultExpireDays?: number | null,
    orderCount?: number | null,
    integrations?:  Array<ListingIntegration | null > | null,
    designMap: Array< string | null >,
    designs?:  Array<ListingDesign | null > | null,
    designCount?: number | null,
    listingThumbnail?: string | null,
    migrationVersion?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ListingIntegration = {
    __typename: "ListingIntegration",
    listingId: string,
    sourceListingId?: string | null,
    source: IntegrationSource,
    integrationId: string,
    integrationAttributes?: string | null,
    demoKey?: string | null,
  };
  
  export type ListingDesign = {
    __typename: "ListingDesign",
    listingId: string,
    designId: string,
    orgId: string,
    designName: string,
    designPrintOptions?: string | null,
    designListingAttributes?: string | null,
    designType?: DesignType | null,
    maxDownloads?: number | null,
    expireDays?: number | null,
    listingDesignType?: ListingDesignType | null,
    excludeFromUsage?: ListingUsageType | null,
    designThumbnail?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export enum ListingUsageType {
    DEMO = "DEMO",
    ORDER = "ORDER",
  }
  
  
  export type ImportListingInput = {
    listingId?: string | null,
    orgId: string,
    name: string,
    description?: string | null,
    legacyListingId?: string | null,
    metaDescription?: string | null,
    attributes?: string | null,
    defaultMaxDownloads?: number | null,
    defaultExpireDays?: number | null,
    itemSets?: Array< string | null > | null,
    integrations?: Array< ImportListingIntegrationInput2 | null > | null,
    designMap: Array< string | null >,
    designs?: Array< ListingDesignInput | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ImportListingIntegrationInput2 = {
    sourceListingId: string,
    source: IntegrationSource,
    integrationId: string,
    integrationAttributes?: string | null,
    demoKey?: string | null,
  };
  
  export type ListingDesignInput = {
    designId: string,
    excludeFromUsage?: ListingUsageType | null,
    designPrintOptions?: string | null,
    designListingAttributes?: string | null,
    maxDownloads?: number | null,
    expireDays?: number | null,
    listingDesignType?: ListingDesignType | null,
  };
  
  export type UpdateListingInput = {
    listingId: string,
    version: number,
    designMap?: Array< string | null > | null,
    attributes?: string | null,
    defaultMaxDownloads?: number | null,
    defaultExpireDays?: number | null,
    name?: string | null,
    description?: string | null,
    metaDescription?: string | null,
    listingThumbnail?: string | null,
    updatedAt?: string | null,
    skipUpdatedAt?: boolean | null,
  };
  
  export type LegacyListingInput = {
    listingId: string,
    legacyListingId?: string | null,
    skipUpdatedAt?: boolean | null,
  };
  
  export type ListingMeta = {
    __typename: "ListingMeta",
    listingId: string,
    name: string,
    description?: string | null,
    metaDescription?: string | null,
    orgId: string,
    publishedVersion: number,
    legacyListingId?: string | null,
    draftVersion: number,
    orderCount?: number | null,
    migrationVersion?: number | null,
    integrationSources?: Array< IntegrationSource | null > | null,
    listingThumbnail?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type UpdateListingDesignInput = {
    listingId: string,
    version: number,
    designId: string,
    designPrintOptions?: string | null,
    excludeFromUsage?: ListingUsageType | null,
    designListingAttributes?: string | null,
    maxDownloads?: number | null,
    expireDays?: number | null,
    listingDesignType?: ListingDesignType | null,
  };
  
  export type DeleteListingInput = {
    listingId: string,
    version?: number | null,
  };
  
  export type RebuildListingMetaInput = {
    listingId: string,
  };
  
  export type CopyListingInput = {
    copyListingId: string,
    copyVersion: number,
    newListingName?: string | null,
  };
  
  export type AddDesignToListingInput = {
    listingId: string,
    version: number,
    designId: string,
    excludeFromUsage?: ListingUsageType | null,
    designPrintOptions?: string | null,
    designListingAttributes?: string | null,
    maxDownloads?: number | null,
    expireDays?: number | null,
    listingDesignType?: ListingDesignType | null,
  };
  
  export type AddListingIntegrationInput = {
    listingId: string,
    sourceListingId: string,
    source: IntegrationSource,
    integrationId: string,
    integrationAttributes?: string | null,
    demoLink?: boolean | null,
  };
  
  export type ImportListingIntegrationInput = {
    listingId: string,
    sourceListingId: string,
    source: IntegrationSource,
    integrationId: string,
    integrationAttributes?: string | null,
    demoKey?: string | null,
  };
  
  export type UpdateListingIntegrationInput = {
    listingId: string,
    sourceListingId: string,
    source: IntegrationSource,
    updatedSourceListingId?: string | null,
    integrationAttributes?: string | null,
  };
  
  export type DeleteListingIntegrationInput = {
    listingId: string,
    sourceListingId: string,
    source: IntegrationSource,
  };
  
  export type RemoveDesignFromListingInput = {
    listingId: string,
    version: number,
    designId: string,
  };
  
  export type ResendOrderInput = {
    orderId: string,
  };
  
  export type ModelOrderConditionInput = {
    buyerAttributes?: ModelStringInput | null,
    buyerEmail?: ModelStringInput | null,
    buyerId?: ModelIDInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    listingId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    source?: ModelStringInput | null,
    sourceAttributes?: ModelStringInput | null,
    sourceOrderId?: ModelStringInput | null,
    status?: ModelOrderStatusInput | null,
    inventoryStatus?: ModelInventoryStatusInput | null,
    workflowStatus?: ModelWorkflowStatusInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelOrderConditionInput | null > | null,
    or?: Array< ModelOrderConditionInput | null > | null,
    not?: ModelOrderConditionInput | null,
  };
  
  export type ModelOrderStatusInput = {
    eq?: OrderStatus | null,
    ne?: OrderStatus | null,
  };
  
  export enum OrderStatus {
    ERROR = "ERROR",
    INVENTORY = "INVENTORY",
    INVENTORY_REMAINING = "INVENTORY_REMAINING",
    INVENTORY_DEPLETED = "INVENTORY_DEPLETED",
    INVENTORY_PAUSED = "INVENTORY_PAUSED",
    UNCLAIMED = "UNCLAIMED",
    CLAIMED = "CLAIMED",
    CANCELED = "CANCELED",
    PENDING_PAYMENT = "PENDING_PAYMENT",
  }
  
  
  export type ModelInventoryStatusInput = {
    eq?: InventoryStatus | null,
    ne?: InventoryStatus | null,
  };
  
  export enum InventoryStatus {
    REMAINING = "REMAINING",
    DEPLETED = "DEPLETED",
    PAUSED = "PAUSED",
  }
  
  
  export type ModelWorkflowStatusInput = {
    eq?: WorkflowStatus | null,
    ne?: WorkflowStatus | null,
  };
  
  export enum WorkflowStatus {
    CREATED = "CREATED",
    EMAILED = "EMAILED",
    OPENED = "OPENED",
    COMPLETE = "COMPLETE",
    READY = "READY",
    CANCELED = "CANCELED",
    CUSTOM = "CUSTOM",
    APPROVED = "APPROVED",
    PARTIALLY_APPROVED = "PARTIALLY_APPROVED",
    DOWNLOADED = "DOWNLOADED",
    PARTIALLY_DOWNLOADED = "PARTIALLY_DOWNLOADED",
  }
  
  
  export type ClaimOrderInput = {
    orderClaimCode: string,
    buyerOrgId: string,
    ignoreWarning?: boolean | null,
  };
  
  export type OrderMeta = {
    __typename: "OrderMeta",
    orderId: string,
    parentOrderId?: string | null,
    buyerAttributes?: string | null,
    buyerEmail?: string | null,
    buyerOrgId?: string | null,
    buyerId?: string | null,
    contactEmail?: string | null,
    orderType?: OrderType | null,
    orderName?: string | null,
    customerOrderName?: string | null,
    customerAttributes?: string | null,
    invoiceId?: string | null,
    usageId?: string | null,
    orgId: string,
    legacyLink?: string | null,
    source: OrderSource,
    sourceAttributes?: string | null,
    orderClaimCode?: string | null,
    sourceOrderId?: string | null,
    ordersAllowed?: number | null,
    ordersUsed?: number | null,
    billingQuantity?: number | null,
    billedQuantity?: number | null,
    usageCharge?: string | null,
    usageChargeAmount?: number | null,
    billingStatus?: OrderBillingStatus | null,
    status: OrderStatus,
    inventoryStatus?: InventoryStatus | null,
    migrationVersion?: number | null,
    workflowStatus: WorkflowStatus,
    importPending?: boolean | null,
    logsImported?: boolean | null,
    exportComplete?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    thumbnailOrder?: string | null,
  };
  
  export enum OrderType {
    STANDARD = "STANDARD",
    PREORDER = "PREORDER",
  }
  
  
  export enum OrderSource {
    MANUAL = "MANUAL",
    SHARED_LINK = "SHARED_LINK",
    UNIQUE_LINK = "UNIQUE_LINK",
    ETSY = "ETSY",
    SHOPIFY = "SHOPIFY",
    TIKTOK = "TIKTOK",
    WOOCOMMERCE = "WOOCOMMERCE",
    ZAPPIER = "ZAPPIER",
    BIGCOMMERCE = "BIGCOMMERCE",
    EBAY = "EBAY",
    AMAZON = "AMAZON",
  }
  
  
  export enum OrderBillingStatus {
    PENDING = "PENDING",
    RETRY = "RETRY",
    TIMEOUT = "TIMEOUT",
    FAILED = "FAILED",
    BILLED = "BILLED",
    INVOICED = "INVOICED",
    LEGACY_SYSTEM = "LEGACY_SYSTEM",
    WRITE_OFF = "WRITE_OFF",
    CANCELED = "CANCELED",
    PAID = "PAID",
    COMPED = "COMPED",
    PREPAID = "PREPAID",
    REFUNDED = "REFUNDED",
  }
  
  
  export type InitiateManualOrderInput = {
    orgId: string,
    orderName?: string | null,
    buyerAttributes?: string | null,
    buyerEmail?: string | null,
    listings: Array< OrderListingAttributesInput | null >,
    designs: Array< OrderDesignAttributesInput | null >,
    sourceAttributes?: string | null,
    notifyBuyer?: boolean | null,
  };
  
  export type OrderListingAttributesInput = {
    listingId: string,
    quantity?: number | null,
    sourceListingId?: string | null,
    listingOrderData?: string | null,
    designs?: Array< OrderDesignAttributesInput | null > | null,
    isComplete?: boolean | null,
    expirationDate?: string | null,
    noExpiration?: boolean | null,
  };
  
  export type OrderDesignAttributesInput = {
    designId: string,
    listingId?: string | null,
    quantity?: number | null,
    buyerDesignId?: string | null,
    designStatus?: DesignOrderStatus | null,
    designListingAttributes?: string | null,
    designType?: string | null,
    designPrintOptions?: string | null,
    designName?: string | null,
    thumbnailFilePath?: string | null,
    downloadsAllowed?: number | null,
    downloadsUsed?: number | null,
    expirationDate?: string | null,
    noExpiration?: boolean | null,
    listingDesignType?: ListingDesignType | null,
  };
  
  export enum DesignOrderStatus {
    INCOMPLETE = "INCOMPLETE",
    SAVED = "SAVED",
    APPROVED = "APPROVED",
    DOWNLOADED = "DOWNLOADED",
    EXPIRED = "EXPIRED",
    COMPLETE = "COMPLETE",
  }
  
  
  export type InitiateOrderInput = {
    orgId: string,
    buyerId?: string | null,
    orderName?: string | null,
    buyerAttributes?: string | null,
    buyerEmail?: string | null,
    buyerOrgId?: string | null,
    listings: Array< OrderListingAttributesInput | null >,
    designs: Array< OrderDesignAttributesInput | null >,
    source: OrderSource,
    sourceAttributes?: string | null,
    sourceOrderId?: string | null,
    orderCost?: number | null,
    status?: OrderStatus | null,
    workflowStatus?: WorkflowStatus | null,
    notifyBuyer?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type CreatePreOrderInput = {
    orgId: string,
    buyerId?: string | null,
    orderName?: string | null,
    listings: Array< OrderListingAttributesInput | null >,
    designs: Array< OrderDesignAttributesInput | null >,
    source: OrderSource,
    sourceAttributes?: string | null,
    sourceOrderId?: string | null,
    ordersAllowed: number,
    ordersUsed?: number | null,
    orderClaimCode?: string | null,
    status?: OrderStatus | null,
    buyerAttributes?: string | null,
    inventoryStatus?: InventoryStatus | null,
    workflowStatus?: WorkflowStatus | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ImportOrderInput = {
    orgId: string,
    legacyOrderId: string,
    parentOrderId?: string | null,
    buyerId?: string | null,
    legacyLink?: string | null,
    orderName?: string | null,
    buyerAttributes?: string | null,
    buyerEmail?: string | null,
    buyerOrgId?: string | null,
    billedQuantity?: number | null,
    usageCharge?: string | null,
    usageChargeAmount?: number | null,
    usageId?: string | null,
    listings: Array< OrderListingAttributesInput | null >,
    designs: Array< OrderDesignAttributesInput | null >,
    source: OrderSource,
    sourceAttributes?: string | null,
    sourceOrderId?: string | null,
    ordersAllowed?: number | null,
    ordersUsed?: number | null,
    orderClaimCode?: string | null,
    status?: OrderStatus | null,
    workflowStatus?: WorkflowStatus | null,
    notifyBuyer?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ImportOrderMetaInput = {
    buyerAttributes?: string | null,
    buyerEmail?: string | null,
    buyerId?: string | null,
    buyerOrgId?: string | null,
    parentOrderId?: string | null,
    legacyLink?: string | null,
    legacyOrderId: string,
    notifyBuyer?: boolean | null,
    billingQuantity?: number | null,
    billedQuantity?: number | null,
    usageCharge?: string | null,
    usageChargeAmount?: number | null,
    usageId?: string | null,
    orderClaimCode?: string | null,
    orderName?: string | null,
    ordersAllowed?: number | null,
    ordersUsed?: number | null,
    orgId: string,
    source: OrderSource,
    sourceAttributes?: string | null,
    sourceOrderId?: string | null,
    status?: OrderStatus | null,
    thumbnailOrder?: string | null,
    workflowStatus?: WorkflowStatus | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ImportOrderDataInput = {
    orderId: string,
    listings: Array< OrderListingAttributesInput | null >,
    designs: Array< OrderDesignAttributesInput | null >,
  };
  
  export type ImportOrderLogInput = {
    orderId: string,
    orgId: string,
    logData: Array< ImportOrderLogDataInput | null >,
  };
  
  export type ImportOrderLogDataInput = {
    eventDateTime: string,
    eventMessage: string,
    ipAddress?: string | null,
    userAgent?: string | null,
  };
  
  export type RebuildOrderMetaInput = {
    orderId: string,
    createdAt?: string | null,
  };
  
  export type UpdateOrderInput = {
    buyerAttributes?: string | null,
    buyerEmail?: string | null,
    buyerId?: string | null,
    legacyLink?: string | null,
    createdAt?: string | null,
    contactEmail?: string | null,
    expirationTime?: number | null,
    orderId: string,
    designs?: Array< OrderDesignAttributesInput | null > | null,
    listingId?: string | null,
    orgId?: string | null,
    day?: string | null,
    month?: string | null,
    year?: string | null,
    ordersAllowed?: number | null,
    ordersUsed?: number | null,
    source?: string | null,
    orderName?: string | null,
    sourceAttributes?: string | null,
    sourceOrderId?: string | null,
    status?: OrderStatus | null,
    thumbnailOrder?: string | null,
    inventoryStatus?: InventoryStatus | null,
    exportComplete?: boolean | null,
    workflowStatus?: WorkflowStatus | null,
    updatedAt?: string | null,
  };
  
  export type Order = {
    __typename: "Order",
    orderId: string,
    parentOrderId?: string | null,
    buyerAttributes?: string | null,
    buyerEmail?: string | null,
    buyerOrgId?: string | null,
    buyerId?: string | null,
    orderCost?: number | null,
    contactEmail?: string | null,
    orderType?: OrderType | null,
    orderName?: string | null,
    customerOrderName?: string | null,
    invoiceId?: string | null,
    usageId?: string | null,
    listings:  Array<OrderListingAttributes | null >,
    designs:  Array<OrderDesignAttributes | null >,
    orgId: string,
    orderClaimCode?: string | null,
    designerClaimCode?: string | null,
    legacyOrderId?: string | null,
    source: OrderSource,
    sourceAttributes?: string | null,
    sourceOrderId?: string | null,
    ordersAllowed?: number | null,
    ordersUsed?: number | null,
    billingStatus?: OrderBillingStatus | null,
    billedQuantity?: number | null,
    usageCharge?: string | null,
    usageChargeAmount?: number | null,
    status: OrderStatus,
    inventoryStatus?: InventoryStatus | null,
    importPending?: boolean | null,
    logsImported?: boolean | null,
    exportComplete?: boolean | null,
    workflowStatus: WorkflowStatus,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type OrderListingAttributes = {
    __typename: "OrderListingAttributes",
    listingId: string,
    lineItem: string,
    listingName: string,
    listingOrderData?: string | null,
    isComplete?: boolean | null,
    expirationDate?: string | null,
  };
  
  export type OrderDesignAttributes = {
    __typename: "OrderDesignAttributes",
    designId: string,
    designVersion?: number | null,
    listingId?: string | null,
    lineItem: string,
    sortIndex: string,
    buyerDesignId?: string | null,
    designStatus?: DesignOrderStatus | null,
    designListingAttributes?: string | null,
    designPrintOptions?: string | null,
    designType?: string | null,
    designName?: string | null,
    thumbnailFilePath?: string | null,
    downloadsAllowed?: number | null,
    downloadsUsed?: number | null,
    expirationDate?: string | null,
    listingDesignType?: ListingDesignType | null,
  };
  
  export type UpdateOrderBillingStatusInput = {
    orderId: string,
    invoiceId?: string | null,
    usageId?: string | null,
    billedQuantity?: number | null,
    usageCharge?: number | null,
    usageChargeAmount?: number | null,
    billingStatus?: OrderBillingStatus | null,
  };
  
  export type OrderListingInput = {
    listingId: string,
    lineItem: string,
    listingName: string,
    listingOrderData?: string | null,
    isComplete?: boolean | null,
    expirationDate?: string | null,
    noExpiration?: boolean | null,
  };
  
  export type CustomerUpdateOrderMetaInput = {
    orderId: string,
    contactEmail?: string | null,
    customerOrderName?: string | null,
    customerAttributes?: string | null,
    buyerAttributes?: string | null,
    workflowStatus?: WorkflowStatus | null,
  };
  
  export type OrderDesignUpdateInput = {
    orderId: string,
    designId: string,
    lineItem: string,
    sortIndex?: string | null,
    listingId?: string | null,
    buyerDesignId?: string | null,
    designStatus?: DesignOrderStatus | null,
    designListingAttributes?: string | null,
    designType?: string | null,
    designPrintOptions?: string | null,
    designName?: string | null,
    thumbnailFilePath?: string | null,
    downloadsAllowed?: number | null,
    downloadsUsed?: number | null,
    expirationDate?: string | null,
    noExpiration?: boolean | null,
    listingDesignType?: ListingDesignType | null,
  };
  
  export type OrderBuyerDesignUpdateInput = {
    orderId: string,
    buyerDesignId?: string | null,
    designStatus?: DesignOrderStatus | null,
    designListingAttributes?: string | null,
    thumbnailFilePath?: string | null,
  };
  
  export type ApproveOrderDesignProofInput = {
    orderId: string,
    buyerDesignId: string,
  };
  
  export type AddDesignsToOrderInput = {
    orderId: string,
    designs: Array< OrderDesignAttributesInput | null >,
  };
  
  export type AddListingDesignsToOrderInput = {
    orderId: string,
    designs: Array< OrderDesignAttributesInput | null >,
  };
  
  export type AddListingToOrderInput = {
    orderId: string,
    listingId: string,
    lineItem?: number | null,
    listingOrderData?: string | null,
    designs?: Array< OrderDesignAttributesInput | null > | null,
    isComplete?: boolean | null,
    expirationDate?: string | null,
    noExpiration?: boolean | null,
    originalRequestHeaders?: ActivityLogRequestHeadersInput | null,
  };
  
  export type RemoveDesignFromOrderInput = {
    orderId: string,
    designId: string,
    listingId?: string | null,
    lineItem: string,
  };
  
  export type RemoveLineItemFromOrderInput = {
    orderId: string,
    lineItem: string,
  };
  
  export type BatchImportOrganizationInput = {
    importOrganizations?: Array< ImportOrganizationInput | null > | null,
  };
  
  export type ImportOrganizationInput = {
    name: string,
    type: OrgType,
    parentOrgId?: string | null,
    planId?: string | null,
    billingUserId?: string | null,
    managementOrgId?: string | null,
    contactEmail?: string | null,
    emailVerified?: boolean | null,
    attributes?: string | null,
    status: OrgStatus,
    logoUrl?: string | null,
    avatarUrl?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ModelOrganizationConditionInput = {
    attributes?: ModelStringInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    orgId?: ModelIDInput | null,
    title?: ModelStringInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelOrganizationConditionInput | null > | null,
    or?: Array< ModelOrganizationConditionInput | null > | null,
    not?: ModelOrganizationConditionInput | null,
  };
  
  export type ModelOrganizationConnection = {
    __typename: "ModelOrganizationConnection",
    items?:  Array<Organization | null > | null,
    nextToken?: string | null,
  };
  
  export type CreateOrganizationInput = {
    name: string,
    type: OrgType,
    parentOrgId?: string | null,
    managementOrgId?: string | null,
    billingUserId?: string | null,
    billingCycleDay?: number | null,
    contactEmail: string,
    emailVerified?: boolean | null,
    planId?: string | null,
    paymentUserId?: string | null,
    attributes?: string | null,
    status: OrgStatus,
    logoUrl?: string | null,
    avatarUrl?: string | null,
    corjlVersion?: string | null,
  };
  
  export type RebuildOrganizationInput = {
    orgId: string,
  };
  
  export type UpdateOrganizationInput = {
    name?: string | null,
    orgId: string,
    parentOrgId?: string | null,
    managementOrgId?: string | null,
    planId?: string | null,
    attributes?: string | null,
    status?: OrgStatus | null,
    statusConfirmed?: boolean | null,
    paymentUserId?: string | null,
    billingUserId?: string | null,
    affiliateAccountId?: string | null,
    affiliateStatus?: AffiliateStatus | null,
    billingCycleDay?: number | null,
    logoUrl?: string | null,
    avatarUrl?: string | null,
    contactEmail?: string | null,
    corjlVersion?: string | null,
    emailVerified?: boolean | null,
    migrationVersion?: number | null,
    designCount?: number | null,
    imageCount?: number | null,
    fontCount?: number | null,
    listingCount?: number | null,
    outputCount?: number | null,
    orderCount?: number | null,
    billingPeriodOrderCount?: number | null,
    totalStorageKBytes?: number | null,
    originalStorageKBytes?: number | null,
    originalRequestHeaders?: ActivityLogRequestHeadersInput | null,
  };
  
  export type IncrementOrganizationUsageEstimateInput = {
    orgId: string,
    billingPeriodOrderCount: number,
    billingPeriodTransactionCost: number,
    pendingOrderCount?: number | null,
    billingPeriodReset: boolean,
  };
  
  export type UserUpdateOrganizationInput = {
    name?: string | null,
    orgId: string,
    logoUrl?: string | null,
    avatarUrl?: string | null,
    contactEmail?: string | null,
    attributes?: string | null,
  };
  
  export type GenerateOutputCorjl1Input = {
    designId: string,
    version?: number | null,
    orderId?: string | null,
    orgId?: string | null,
    userId?: string | null,
    printPageMap: Array< PrintPageInfoInput >,
    unsavedPages?: Array< UpdateDesignPageSectionsInput | null > | null,
    checksum?: string | null,
    presetOptions?: string | null,
    copies?: number | null,
    flatten?: boolean | null,
    scaleToFit?: boolean | null,
    fitToEdge?: boolean | null,
    showBleed?: boolean | null,
    showTrimMarks?: boolean | null,
    doubleSided?: boolean | null,
    orientation?: Orientation | null,
    reverseSheetOrder?: boolean | null,
    outputHeight: string,
    outputWidth: string,
    outputUnit: DesignUnit,
    outputPixelsPerUnit: number,
    outputPageBleed?: string | null,
    outputPageRows?: number | null,
    outputPageColumns?: number | null,
    multiplePerPage?: MultiplePerPage | null,
    printInColor?: boolean | null,
    title?: string | null,
    pageFormat: PageFormat,
    outputFormat: OutputFormat,
    notifyEmail?: string | null,
  };
  
  export enum Orientation {
    PORTRAIT = "PORTRAIT",
    LANDSCAPE = "LANDSCAPE",
  }
  
  
  export enum MultiplePerPage {
    FALSE = "FALSE",
    SAME = "SAME",
    ALL = "ALL",
  }
  
  
  export enum PageFormat {
    GIF = "GIF",
    JPG = "JPG",
    PNG = "PNG",
    WEBP = "WEBP",
    PDF = "PDF",
    SVG = "SVG",
  }
  
  
  export enum OutputFormat {
    GIF = "GIF",
    JPG = "JPG",
    PNG = "PNG",
    WEBP = "WEBP",
    PDF = "PDF",
    SVG = "SVG",
    ZIP = "ZIP",
    TGZ = "TGZ",
  }
  
  
  export type Output = {
    __typename: "Output",
    designId: string,
    version: number,
    outputId: string,
    orderId?: string | null,
    orgId?: string | null,
    creatorOrgId?: string | null,
    designName?: string | null,
    source: OutputRequestSource,
    process: OutputProcess,
    outputUrl?: string | null,
    checksum: string,
    thumbnail?: string | null,
    status: OutputStatus,
    printPageMap:  Array<PrintPageInfo >,
    presetOptions?: string | null,
    copies: number,
    outputHeight: string,
    outputWidth: string,
    outputUnit: DesignUnit,
    outputPixelsPerUnit: number,
    outputPixelDensityUnit: PixelDensityUnit,
    outputPageBleed?: string | null,
    outputPageRows?: number | null,
    outputPageColumns?: number | null,
    multiplePerPage: MultiplePerPage,
    flatten: boolean,
    scaleToFit: boolean,
    fitToEdge: boolean,
    showBleed: boolean,
    showTrimMarks: boolean,
    doubleSided: boolean,
    orientation: Orientation,
    reverseSheetOrder: boolean,
    backgroundTransparent: boolean,
    printInColor: boolean,
    title: string,
    durationMbSeconds: number,
    processorVersion?: string | null,
    resultFileSize: number,
    attemptCount?: number | null,
    pageFormat: PageFormat,
    outputFormat: OutputFormat,
    notifyEmail?: string | null,
    createdAt: string,
    updatedAt: string,
  };
  
  export enum OutputRequestSource {
    CORJL = "CORJL",
    CORJL1 = "CORJL1",
    ZAPPIER = "ZAPPIER",
  }
  
  
  export enum OutputProcess {
    DOWNLOAD = "DOWNLOAD",
    PROOF = "PROOF",
    FULFILLMENT = "FULFILLMENT",
  }
  
  
  export type GenerateOutputInput = {
    designId: string,
    version: number,
    orgId: string,
    userId?: string | null,
    process?: OutputProcess | null,
    printPageMap: Array< PrintPageInfoInput >,
    unsavedPages?: Array< UpdateDesignPageSectionsInput | null > | null,
    checksum: string,
    presetOptions?: string | null,
    copies?: number | null,
    flatten?: boolean | null,
    scaleToFit?: boolean | null,
    fitToEdge?: boolean | null,
    showBleed?: boolean | null,
    showTrimMarks?: boolean | null,
    doubleSided?: boolean | null,
    orientation: Orientation,
    reverseSheetOrder?: boolean | null,
    backgroundTransparent?: boolean | null,
    outputHeight?: string | null,
    outputWidth?: string | null,
    outputUnit?: DesignUnit | null,
    outputPixelsPerUnit?: number | null,
    outputPixelDensityUnit?: PixelDensityUnit | null,
    outputPageBleed?: string | null,
    outputPageRows?: number | null,
    outputPageColumns?: number | null,
    multiplePerPage: MultiplePerPage,
    processorVersion?: string | null,
    printInColor?: boolean | null,
    title?: string | null,
    pageFormat?: PageFormat | null,
    outputFormat?: OutputFormat | null,
    notifyEmail?: string | null,
  };
  
  export type CreateOutputMetaForFulfillmentInput = {
    designId: string,
    buyerOrgId?: string | null,
    printPageMap: Array< PrintPageInfoInput >,
  };
  
  export type OutputForFulfillment = {
    __typename: "OutputForFulfillment",
    OutputMeta: Output,
    DesignPages:  Array<DesignPageForFulfillment | null >,
  };
  
  export type DesignPageForFulfillment = {
    __typename: "DesignPageForFulfillment",
    pageId: number,
    bucket: string,
    key: string,
  };
  
  export type UpdateOutputInput = {
    outputId: string,
    resultFilePath?: string | null,
    outputUrl?: string | null,
    status?: OutputStatus | null,
    pageStatus?: OutputStatus | null,
    durationMbSeconds?: number | null,
    resultFileSize?: number | null,
    thumbnail?: string | null,
    pageId?: number | null,
    notifyEmail?: string | null,
  };
  
  export type ModelOutputConditionInput = {
    source?: ModelStringInput | null,
    sourceAttributes?: ModelStringInput | null,
    sourceId?: ModelStringInput | null,
    orderId?: ModelIDInput | null,
    status?: ModelOutputStatusInput | null,
    createdAt?: ModelStringInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelOutputConditionInput | null > | null,
    or?: Array< ModelOutputConditionInput | null > | null,
    not?: ModelOutputConditionInput | null,
  };
  
  export type ModelOutputStatusInput = {
    eq?: OutputStatus | null,
    ne?: OutputStatus | null,
  };
  
  export type UpdateOutput2Input = {
    outputId: string,
    printPageMap?: Array< PrintPageInfoInput | null > | null,
    outputUrl?: string | null,
    status?: OutputStatus | null,
    durationMbSeconds?: number | null,
    notifyEmail?: string | null,
  };
  
  export type UpdateOutputEmailInput = {
    outputId: string,
    notifyEmail?: string | null,
  };
  
  export type CreatePluginInput = {
    name: string,
    slug: string,
    briefDescription: string,
    previewImage: string,
    pluginStatus?: PluginStatus | null,
    minVersion?: string | null,
    maxVersion?: string | null,
  };
  
  export enum PluginStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    DEPRICATED = "DEPRICATED",
    RETIRED = "RETIRED",
  }
  
  
  export type ModelPluginConditionInput = {
    buyerAttributes?: ModelStringInput | null,
    buyerEmail?: ModelStringInput | null,
    buyerId?: ModelIDInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    listingId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    source?: ModelStringInput | null,
    sourceAttributes?: ModelStringInput | null,
    sourceId?: ModelStringInput | null,
    pluginStatus?: ModelPluginStatusInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelPluginConditionInput | null > | null,
    or?: Array< ModelPluginConditionInput | null > | null,
    not?: ModelPluginConditionInput | null,
  };
  
  export type ModelPluginStatusInput = {
    eq?: PluginStatus | null,
    ne?: PluginStatus | null,
  };
  
  export type Plugin = {
    __typename: "Plugin",
    pluginId: string,
    name: string,
    slug: string,
    briefDescription: string,
    previewImage: string,
    pluginStatus?: PluginStatus | null,
    minVersion?: string | null,
    maxVersion?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type UpdatePluginInput = {
    pluginId: string,
    name?: string | null,
    briefDescription?: string | null,
    previewImage?: string | null,
    pluginStatus?: PluginStatus | null,
    minVersion?: string | null,
    maxVersion?: string | null,
  };
  
  export type DeletePluginInput = {
    pluginId: string,
  };
  
  export type CreateSettingInput = {
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    category: SettingCategory,
    subCategory: string,
    payload?: string | null,
    orgId: string,
  };
  
  export enum SettingEntityType {
    USER = "USER",
    ORGANIZATION = "ORGANIZATION",
    DESIGN = "DESIGN",
    LISTING = "LISTING",
  }
  
  
  export enum SettingCategory {
    PLUGIN = "PLUGIN",
    DESIGN = "DESIGN",
    EDITOR = "EDITOR",
    DEMO = "DEMO",
    PRINTING = "PRINTING",
    LISTING = "LISTING",
    ORDER = "ORDER",
    FINDER = "FINDER",
    SUPPORT = "SUPPORT",
    BILLING = "BILLING",
  }
  
  
  export type ModelSettingConditionInput = {
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    orgId?: ModelIDInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelSettingConditionInput | null > | null,
    or?: Array< ModelSettingConditionInput | null > | null,
    not?: ModelSettingConditionInput | null,
  };
  
  export type Setting = {
    __typename: "Setting",
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    category: SettingCategory,
    subCategory: string,
    payload?: string | null,
    orgId?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type UpdateSettingAttributeInput = {
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    category: SettingCategory,
    subCategory: string,
    attribute: string,
    value?: string | null,
  };
  
  export type UpdateOrderSettingAttributeInput = {
    designId: string,
    version: number,
    category: SettingCategory,
    subCategory: string,
    attribute: string,
    value?: string | null,
  };
  
  export type UpdateSettingInput = {
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    orgId?: string | null,
    category: SettingCategory,
    subCategory: string,
    payload?: string | null,
  };
  
  export type DeleteSettingInput = {
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    category: SettingCategory,
    subCategory: string,
  };
  
  export type CreateDailyStatInput = {
    entityType: EntityType,
    statType: StatType,
    listingId: string,
    quantity: number,
    netSales: number,
    year?: string | null,
    month?: string | null,
    day?: string | null,
  };
  
  export enum EntityType {
    ADMIN = "ADMIN",
    ORGANIZATION = "ORGANIZATION",
    LISTING = "LISTING",
    ORDER = "ORDER",
  }
  
  
  export enum StatType {
    PAPERLESSPOST = "PAPERLESSPOST",
    ORDER = "ORDER",
    DOWNLOAD = "DOWNLOAD",
    ALEXANDERS = "ALEXANDERS",
    ORG_TRIAL_SIGNUP = "ORG_TRIAL_SIGNUP",
    ORG_CONVERSION = "ORG_CONVERSION",
    ORG_DO_NOT_RENEW = "ORG_DO_NOT_RENEW",
    ORG_CANCEL = "ORG_CANCEL",
    ORG_REACTIVATE = "ORG_REACTIVATE",
  }
  
  
  export type Stat = {
    __typename: "Stat",
    entityId: string,
    entityType: EntityType,
    period: StatPeriod,
    statType: StatType,
    quantity: number,
    netSales?: number | null,
    corjlCommission?: number | null,
    customerCommission?: number | null,
    recordDate?: string | null,
    createdAt: string,
    updatedAt: string,
  };
  
  export enum StatPeriod {
    DAILY = "DAILY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    BILLINGPERIOD = "BILLINGPERIOD",
    CUMULATIVE = "CUMULATIVE",
  }
  
  
  export type CreateStatInput = {
    entityId: string,
    entityType: EntityType,
    statType: StatType,
    quantity: number,
    year?: string | null,
    month?: string | null,
    day?: string | null,
  };
  
  export type IncrementStatInput = {
    entityId: string,
    entityType: EntityType,
    period: StatPeriod,
    statType: StatType,
    newQuantity: number,
    newNetSales: number,
  };
  
  export type SendEmailInput = {
    recipientEmail: string,
    templateName?: string | null,
    templateArgs?: string | null,
  };
  
  export type CognitoSaveAndSendAuthCodeInput = {
    cognitoUserId: string,
    email: string,
    code: string,
    codeType: CognitoCodeType,
    expirationTime?: number | null,
  };
  
  export enum CognitoCodeType {
    AUTH = "AUTH",
    PASSWORD_RESET = "PASSWORD_RESET",
  }
  
  
  export type CreateUserInput = {
    email: string,
    userStatus: UserStatus,
    cognitoUserId?: string | null,
    attributes?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    initialOrgId: string,
    hasBuyerOrg?: boolean | null,
    ephemeralState?: string | null,
    initialOrgRole: UserOrganizationRoleType,
    language?: string | null,
    lastLogin?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export enum UserStatus {
    UNREGISTERED = "UNREGISTERED",
    NEEDS_MIGRATION = "NEEDS_MIGRATION",
    PENDING_CONFIRM = "PENDING_CONFIRM",
    LOCKED_OUT = "LOCKED_OUT",
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
    CLOSED = "CLOSED",
  }
  
  
  export enum UserOrganizationRoleType {
    ADMIN = "ADMIN",
    ASSISTANT = "ASSISTANT",
    SUPPORT = "SUPPORT",
    OWNER = "OWNER",
    MEMBER = "MEMBER",
  }
  
  
  export type ModelUserConditionInput = {
    attributes?: ModelStringInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    orgId?: ModelIDInput | null,
    title?: ModelStringInput | null,
    updatedAt?: ModelStringInput | null,
    userId?: ModelIDInput | null,
    and?: Array< ModelUserConditionInput | null > | null,
    or?: Array< ModelUserConditionInput | null > | null,
    not?: ModelUserConditionInput | null,
  };
  
  export type User = {
    __typename: "User",
    userId: string,
    email: string,
    cognitoUserId?: string | null,
    userStatus: UserStatus,
    attributes?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    userOrgs?:  Array<UserOrg | null > | null,
    language?: string | null,
    hasBuyerOrg?: boolean | null,
    ephemeralState?: string | null,
    lastLogin?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    expirationTime?: number | null,
  };
  
  export type UserOrg = {
    __typename: "UserOrg",
    role: UserOrganizationRoleType,
    orgId: string,
  };
  
  export type UpdateUserInput = {
    userId: string,
    attributes?: string | null,
    cognitoUserId?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    lastLogin?: string | null,
    ephemeralState?: string | null,
    avatar?: string | null,
    email?: string | null,
    language?: string | null,
    hasBuyerOrg?: boolean | null,
    userStatus?: UserStatus | null,
    logMessage?: string | null,
  };
  
  export type UpdateUserSelfInput = {
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    avatar?: string | null,
    language?: string | null,
  };
  
  export type InviteUserToOrgInput = {
    email: string,
    orgId: string,
    role: UserOrganizationRoleType,
  };
  
  export type AddUserToOrgInput = {
    userId: string,
    orgId: string,
    role: UserOrganizationRoleType,
  };
  
  export type UpdateUserOrgRoleInput = {
    userId: string,
    orgId: string,
    role: UserOrganizationRoleType,
  };
  
  export type RemoveUserFromOrgInput = {
    userId: string,
    orgId: string,
  };
  
  export enum ModelSortDirection {
    ASC = "ASC",
    DESC = "DESC",
  }
  
  
  export type SearchPaginationInput = {
    pageNumber?: number | null,
    resultsPerPage?: number | null,
  };
  
  export type ModelLogRecordConnection = {
    __typename: "ModelLogRecordConnection",
    items?:  Array<LogRecord | null > | null,
    pageNumber: number,
    resultsPerPage: number,
    matchCount: number,
    hasNextPage: boolean,
  };
  
  export type LogRecord = {
    __typename: "LogRecord",
    eventTime: string,
    itemId: string,
    itemType: string,
    eventType: string,
    eventModel: string,
    cognitoUserId?: string | null,
    creatorOrgId?: string | null,
    endUserOrgId?: string | null,
    country?: string | null,
    viewerType?: string | null,
    platform?: string | null,
    userAgent?: string | null,
    message: string,
    status: string,
    role: string,
  };
  
  export enum LogEventOrgType {
    ENDUSER = "ENDUSER",
    CREATOR = "CREATOR",
  }
  
  
  export type ActivityLogFiltersInput = {
    eventType?: string | null,
    eventModel?: string | null,
    itemType?: string | null,
    maxVisibilityLevel?: VisibilityLevel | null,
  };
  
  export enum IframeType {
    REGISTRATION = "REGISTRATION",
    PAYMENTS = "PAYMENTS",
    INVOICES = "INVOICES",
  }
  
  
  export type AffiliateStatPeriodSummary = {
    __typename: "AffiliateStatPeriodSummary",
    orgId?: string | null,
    payoutPeriod: string,
    summaryBySource?:  Array<AffiliateStatSourceSummary | null > | null,
    stats?:  Array<AffiliatePeriodStat | null > | null,
  };
  
  export type AffiliateStatSourceSummary = {
    __typename: "AffiliateStatSourceSummary",
    utmSource: string,
    payoutPeriod: string,
    orderCount?: number | null,
    netOrderSales?: number | null,
    affiliateCommission?: number | null,
  };
  
  export type PayeeInfo = {
    __typename: "PayeeInfo",
    tipaltiId: string,
    refCode: string,
    status: string,
    statusReason?: string | null,
    isPayable: boolean,
    paymentMethodType?: string | null,
    currency?: string | null,
  };
  
  export type AssetSearchInput = {
    searchString?: string | null,
    itemSets?: Array< string | null > | null,
    sharedOrgs?: Array< string | null > | null,
    attributes?: AssetSearchAttributesInput | null,
    sort?: AssetSortInput | null,
    filter?: ModelAssetFilterInput | null,
    searchItemSets?: boolean | null,
  };
  
  export type AssetSearchAttributesInput = {
    fileSize?: ModelSizeInput | null,
    origHeight?: ModelSizeInput | null,
    origWidth?: ModelSizeInput | null,
    numberOfColors?: ModelSizeInput | null,
    format?: string | null,
  };
  
  export type AssetSortInput = {
    sortField?: AssetSortFields | null,
    sortDirection?: ModelSortDirection | null,
  };
  
  export enum AssetSortFields {
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    filename = "filename",
    name = "name",
  }
  
  
  export type ModelAssetFilterInput = {
    assetId?: ModelIDFilterInput | null,
    assetSubType?: ModelAssetSubTypeFilterInput | null,
    assetVariation?: ModelAssetVariationFilterInput | null,
    name?: ModelStringFilterInput | null,
    attributes?: ModelAttributesFilterInput | null,
    orgId?: ModelStringFilterInput | null,
    createdAt?: SearchableDateFilterInput | null,
    updatedAt?: SearchableDateFilterInput | null,
    expirationTime?: ModelIntFilterInput | null,
    and?: Array< ModelAssetFilterInput | null > | null,
    or?: Array< ModelAssetFilterInput | null > | null,
    not?: ModelAssetFilterInput | null,
  };
  
  export type ModelIDFilterInput = {
    ne?: string | null,
    eq?: string | null,
    le?: string | null,
    lt?: string | null,
    ge?: string | null,
    gt?: string | null,
    contains?: string | null,
    notContains?: string | null,
    between?: Array< string | null > | null,
    beginsWith?: string | null,
  };
  
  export type ModelAssetSubTypeFilterInput = {
    eq?: AssetSubType | null,
    ne?: AssetSubType | null,
  };
  
  export type ModelAssetVariationFilterInput = {
    eq?: AssetVariation | null,
    ne?: AssetVariation | null,
  };
  
  export type ModelStringFilterInput = {
    ne?: string | null,
    eq?: string | null,
    le?: string | null,
    lt?: string | null,
    ge?: string | null,
    gt?: string | null,
    contains?: string | null,
    notContains?: string | null,
    between?: Array< string | null > | null,
    beginsWith?: string | null,
  };
  
  export type ModelAttributesFilterInput = {
    format?: string | null,
    origHeight?: ModelIntFilterInput | null,
    origWidth?: ModelIntFilterInput | null,
    fileSize?: ModelIntFilterInput | null,
    fontfamily?: ModelStringFilterInput | null,
    weight?: ModelStringFilterInput | null,
    source?: ModelStringFilterInput | null,
  };
  
  export type ModelIntFilterInput = {
    ne?: number | null,
    eq?: number | null,
    le?: number | null,
    lt?: number | null,
    ge?: number | null,
    gt?: number | null,
    contains?: number | null,
    notContains?: number | null,
    between?: Array< number | null > | null,
  };
  
  export type SearchableDateFilterInput = {
    ne?: string | null,
    gt?: string | null,
    lt?: string | null,
    gte?: string | null,
    lte?: string | null,
    eq?: string | null,
    range?: Array< string | null > | null,
  };
  
  export type ModelAssetSearchConnection = {
    __typename: "ModelAssetSearchConnection",
    items?:  Array<AssetMeta | null > | null,
    itemSets?:  Array<ItemSetMeta | null > | null,
    pageNumber: number,
    resultsPerPage: number,
    matchCount: number,
    hasNextPage: boolean,
  };
  
  export type ModelAssetMetaConnection = {
    __typename: "ModelAssetMetaConnection",
    items?:  Array<AssetMeta | null > | null,
    nextToken?: string | null,
  };
  
  export enum ListAssetSortFields {
    createdAt = "createdAt",
    name = "name",
  }
  
  
  export type ModelInvoiceConnection = {
    __typename: "ModelInvoiceConnection",
    items?:  Array<Invoice | null > | null,
  };
  
  export type Invoice = {
    __typename: "Invoice",
    invoiceId: string,
    invoiceNumber: string,
    invoicePdfUrl: string,
    billingDate: string,
    dueDate: string,
    amount: string,
    balance: string,
    status: InvoiceStatus,
  };
  
  export enum InvoiceStatus {
    DRAFT = "DRAFT",
    PAID = "PAID",
    PARTIALLY_PAID = "PARTIALLY_PAID",
    POSTED = "POSTED",
    REVERSED = "REVERSED",
  }
  
  
  export type BillingCustomer = {
    __typename: "BillingCustomer",
    customerId: string,
    name: string,
    accountStatus: string,
    balance: string,
    currency: string,
    paymentGatewayId?: string | null,
    lastInvoicedDate?: string | null,
    billingCycleDay: string,
    freeTrialEndDate?: string | null,
    payNowUrl: string,
  };
  
  export type BillingSchedule = {
    __typename: "BillingSchedule",
    billingScheduleId: string,
    productId: string,
    startDate: string,
    endDate: string,
    scheduleLines?:  Array<ScheduleLine | null > | null,
  };
  
  export type ScheduleLine = {
    __typename: "ScheduleLine",
    billId: string,
    description?: string | null,
    chargeReadyDate: string,
    startDate: string,
    endDate: string,
    unitPrice: number,
    quantity: number,
    amount: number,
    invoiced: boolean,
  };
  
  export type PlanDetails = {
    __typename: "PlanDetails",
    planId: string,
    name: string,
    status: string,
    corjlPlanStatus: string,
    description: string,
    planType: string,
    recurringChargeId: string,
    recurringChargeName: string,
    recurringChargeProductId: string,
    recurringChargeBillingPeriod: BillingPeriod,
    recurringChargeListPrice: string,
    usageChargeId?: string | null,
    usageChargeName?: string | null,
    usageChargeProductId?: string | null,
    usageChargeBillingPeriod?: BillingPeriod | null,
    usageChargeListPrice?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ModelPlanDetailsConnection = {
    __typename: "ModelPlanDetailsConnection",
    items?:  Array<PlanDetails | null > | null,
  };
  
  export type PrepaidPlanTier = {
    __typename: "PrepaidPlanTier",
    quantity: number,
    unitPriceInCents: number,
    basePriceInCents: number,
    saleUpfrontCost: string,
    baseUpfrontCost?: string | null,
    savings: string,
  };
  
  export type ModelPaymentMethodConnection = {
    __typename: "ModelPaymentMethodConnection",
    items?:  Array<PaymentMethod | null > | null,
  };
  
  export type PaymentMethod = {
    __typename: "PaymentMethod",
    paymentMethodId: string,
    paymentType: string,
    type: string,
    accountNumber: string,
    accountHolderName?: string | null,
    paymentGatewayId: string,
    expiry: string,
    default: boolean,
  };
  
  export type ModelUsageChargeConnection = {
    __typename: "ModelUsageChargeConnection",
    items?:  Array<UsageCharge | null > | null,
  };
  
  export type UsageCharge = {
    __typename: "UsageCharge",
    usageId: string,
    date: string,
    description: string,
    chargeAmount: string,
    quantity: number,
    runningTotal: string,
  };
  
  export type PreviewSubscriptionChangeDetails = {
    __typename: "PreviewSubscriptionChangeDetails",
    newPlan: PreviewPlanDetails,
    previousPlan?: PreviewPlanDetails | null,
    changeEffectiveDate: string,
    proratedCredit?: string | null,
    proratedCharge: string,
    totalAmountDueToday: string,
  };
  
  export type PreviewPlanDetails = {
    __typename: "PreviewPlanDetails",
    planName: string,
    recurringPrice: string,
    usagePrice?: string | null,
    billingPeriod: BillingPeriod,
  };
  
  export type Address = {
    __typename: "Address",
    id: string,
    userId?: string | null,
    cognitoUserId?: string | null,
    orgId?: string | null,
    streetAddress: string,
    streetAddress2?: string | null,
    city: string,
    stateOrProvince?: string | null,
    postalCode?: string | null,
    country: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  };
  
  export type ProductType = {
    __typename: "ProductType",
    productTypeId: string,
    productType: ProductCategory,
    name: string,
    description?: string | null,
    filterLabelInt1?: string | null,
    filterLabelInt2?: string | null,
    filterLabelDecimal1?: string | null,
    filterLabelText1?: string | null,
    attributes:  Array<ProductAttributeOptions >,
  };
  
  export enum ProductCategory {
    PRINT = "PRINT",
    ENVELOPE = "ENVELOPE",
  }
  
  
  export type ProductAttributeOptions = {
    __typename: "ProductAttributeOptions",
    attributeName: string,
    attributeValues: Array< string >,
  };
  
  export type SkuPricingTier = {
    __typename: "SkuPricingTier",
    pricingTierId: string,
    skuId?: string | null,
    internalSku?: string | null,
    quantityMin: number,
    quantityMax?: number | null,
    retailPriceInCents: number,
    wholesalePriceInCents: number,
  };
  
  export type Sku = {
    __typename: "Sku",
    skuId: string,
    productName?: string | null,
    vendorName?: string | null,
    vendorSku?: string | null,
    pricingType?: PricingType | null,
    internalSku: string,
    retailPriceInCents?: number | null,
    costInCents?: number | null,
    wholesalePriceInCents?: number | null,
    pricingTiers?:  Array<SkuPricingTier | null > | null,
    attributes?:  Array<ProductAttribute | null > | null,
    relatedItems?:  Array<RelatedItem | null > | null,
    stock?: number | null,
  };
  
  export enum PricingType {
    INDIVIDUAL = "INDIVIDUAL",
    TIERED = "TIERED",
  }
  
  
  export type ProductAttribute = {
    __typename: "ProductAttribute",
    name: string,
    value: string,
  };
  
  export type RelatedItem = {
    __typename: "RelatedItem",
    skuId: string,
    productName: string,
    vendorName: string,
    vendorSku?: string | null,
    pricingType: PricingType,
    internalSku: string,
    retailPriceInCents?: number | null,
    costInCents: number,
    wholesalePriceInCents?: number | null,
    stock?: number | null,
  };
  
  export type OrderSku = {
    __typename: "OrderSku",
    internalSku: string,
    vendorId: string,
    productName: string,
    pricingType: PricingType,
    retailPriceInCents?: number | null,
    minQuantity?: number | null,
  };
  
  export type DesignSearchInput = {
    searchString?: string | null,
    itemSets?: Array< string | null > | null,
    sharedOrgs?: Array< string | null > | null,
    sort?: DesignSortInput | null,
    filter?: ModelDesignFilterInput | null,
    searchItemSets?: boolean | null,
  };
  
  export type DesignSortInput = {
    sortField?: DesignSortFields | null,
    sortDirection?: ModelSortDirection | null,
  };
  
  export enum DesignSortFields {
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    designName = "designName",
  }
  
  
  export type ModelDesignFilterInput = {
    and?: Array< ModelDesignFilterInput | null > | null,
    designName?: ModelStringFilterInput | null,
    designType?: ModelDesignTypeFilterInput | null,
    createdAt?: SearchableDateFilterInput | null,
    updatedAt?: SearchableDateFilterInput | null,
    expirationTime?: ModelIntFilterInput | null,
    id?: ModelIDFilterInput | null,
    not?: ModelDesignFilterInput | null,
    or?: Array< ModelDesignFilterInput | null > | null,
  };
  
  export type ModelDesignTypeFilterInput = {
    eq?: DesignType | null,
    ne?: DesignType | null,
  };
  
  export type ModelDesignSearchConnection = {
    __typename: "ModelDesignSearchConnection",
    items?:  Array<DesignMeta | null > | null,
    itemSets?:  Array<ItemSetMeta | null > | null,
    pageNumber: number,
    resultsPerPage: number,
    matchCount: number,
    hasNextPage: boolean,
  };
  
  export type ModelDesignMetaConnection = {
    __typename: "ModelDesignMetaConnection",
    items?:  Array<DesignMeta | null > | null,
    nextToken?: string | null,
  };
  
  export type FulfillmentOrder = {
    __typename: "FulfillmentOrder",
    fulfillmentId: string,
    cartId?: string | null,
    fulfillmentItems?:  Array<FulfillmentItem | null > | null,
    status: FulfillmentStatus,
    buyerOrgId: string,
    buyerEmail?: string | null,
    cognitoUserId: string,
    shippingMethod?: ShippingMethod | null,
    shippingAddressee?: string | null,
    shippingCompany?: string | null,
    shippingAddress1?: string | null,
    shippingAddress2?: string | null,
    shippingCity?: string | null,
    shippingState?: string | null,
    shippingPostalCode?: string | null,
    shippingCountryCode?: string | null,
    expectedShipDate?: string | null,
    trackingNumber?: string | null,
    createdAt: string,
    updatedAt: string,
  };
  
  export type ModelIntegrationFilterInput = {
    attributes?: ModelStringInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    integrationId?: ModelIDInput | null,
    integrationUserId?: ModelStringInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelIntegrationFilterInput | null > | null,
    or?: Array< ModelIntegrationFilterInput | null > | null,
    not?: ModelIntegrationFilterInput | null,
  };
  
  export type ModelIntegrationConnection = {
    __typename: "ModelIntegrationConnection",
    items?:  Array<Integration | null > | null,
    nextToken?: string | null,
  };
  
  export type ItemSetSearchInput = {
    searchString?: string | null,
    sharedOrgs?: Array< string | null > | null,
    sort?: ItemSetSortInput | null,
    filter?: ModelItemSetFilterInput | null,
  };
  
  export type ItemSetSortInput = {
    sortField?: ItemSetSortFields | null,
    sortDirection?: ModelSortDirection | null,
  };
  
  export enum ItemSetSortFields {
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    name = "name",
    itemCount = "itemCount",
  }
  
  
  export type ModelItemSetFilterInput = {
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    setId?: ModelIDInput | null,
    itemType?: ModelItemTypeInput | null,
    itemCount?: ModelIntInput | null,
    itemKey?: ModelIDInput | null,
    name?: ModelStringInput | null,
    parentId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    setType?: ModelSetTypeInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelItemSetFilterInput | null > | null,
    or?: Array< ModelItemSetFilterInput | null > | null,
    not?: ModelItemSetFilterInput | null,
  };
  
  export type ModelItemSetSearchConnection = {
    __typename: "ModelItemSetSearchConnection",
    items?:  Array<ItemSetMeta | null > | null,
    pageNumber: number,
    resultsPerPage: number,
    matchCount: number,
    hasNextPage: boolean,
  };
  
  export type ItemConnection = {
    __typename: "ItemConnection",
    items?:  Array<ItemModels | null > | null,
    nextToken?: string | null,
  };
  
  export type ItemModels = AssetMeta | DesignMeta | ListingMeta | ItemSetMeta | Plugin
  
  
  export enum ListItemItemsSetSortFields {
    createdAt = "createdAt",
    name = "name",
  }
  
  
  export type ListingSearchInput = {
    searchString?: string | null,
    itemSets?: Array< string | null > | null,
    integrationSources?: Array< IntegrationSource | null > | null,
    withoutIntegrationSource?: IntegrationSource | null,
    sort?: ListingSearchSortInput | null,
    filter?: ModelListingFilterInput | null,
    searchItemSets?: boolean | null,
  };
  
  export type ListingSearchSortInput = {
    sortField?: ListingSearchSortFields | null,
    sortDirection?: ModelSortDirection | null,
  };
  
  export enum ListingSearchSortFields {
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    name = "name",
    defaultExpireDays = "defaultExpireDays",
    orderCount = "orderCount",
  }
  
  
  export type ModelListingFilterInput = {
    attributes?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    listingId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    name?: ModelStringInput | null,
    createdAt?: SearchableDateFilterInput | null,
    updatedAt?: SearchableDateFilterInput | null,
    and?: Array< ModelListingFilterInput | null > | null,
    or?: Array< ModelListingFilterInput | null > | null,
    not?: ModelListingFilterInput | null,
  };
  
  export type ModelListingSearchConnection = {
    __typename: "ModelListingSearchConnection",
    items?:  Array<ListingMeta | null > | null,
    itemSets?: Array< string | null > | null,
    pageNumber: number,
    resultsPerPage: number,
    matchCount: number,
    hasNextPage: boolean,
  };
  
  export enum ListingVersionType {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    SPECIFY = "SPECIFY",
  }
  
  
  export type ModelListingIntegrationConnection = {
    __typename: "ModelListingIntegrationConnection",
    items?:  Array<ListingIntegration | null > | null,
    nextToken?: string | null,
  };
  
  export type ModelListingConnection = {
    __typename: "ModelListingConnection",
    items?:  Array<ListingMeta | null > | null,
    nextToken?: string | null,
  };
  
  export enum ListingSortFields {
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    name = "name",
  }
  
  
  export type ModelOrderConnection = {
    __typename: "ModelOrderConnection",
    items?:  Array<OrderMeta | null > | null,
    nextToken?: string | null,
  };
  
  export type ModelOrderFilterInput = {
    buyerAttributes?: ModelStringInput | null,
    buyerEmail?: ModelStringInput | null,
    buyerId?: ModelIDInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    orderId?: ModelIDInput | null,
    listingId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    source?: ModelOrderSourceInput | null,
    sourceAttributes?: ModelStringInput | null,
    sourceOrderId?: ModelStringInput | null,
    status?: ModelOrderStatusInput | null,
    inventoryStatus?: ModelInventoryStatusInput | null,
    workflowStatus?: ModelWorkflowStatusInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelOrderFilterInput | null > | null,
    or?: Array< ModelOrderFilterInput | null > | null,
    not?: ModelOrderFilterInput | null,
  };
  
  export type ModelOrderSourceInput = {
    eq?: OrderSource | null,
    ne?: OrderSource | null,
  };
  
  export type OrderSearchInput = {
    searchString?: string | null,
    itemSets?: Array< string | null > | null,
    sort?: OrderSortInput | null,
    filter?: ModelOrderSearchFilterInput | null,
  };
  
  export type OrderSortInput = {
    sortField?: OrderSortFields | null,
    sortDirection?: ModelSortDirection | null,
  };
  
  export enum OrderSortFields {
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    orderName = "orderName",
    status = "status",
    workflowStatus = "workflowStatus",
    buyerEmail = "buyerEmail",
    source = "source",
  }
  
  
  export type ModelOrderSearchFilterInput = {
    createdAt?: SearchableDateFilterInput | null,
    updatedAt?: SearchableDateFilterInput | null,
    orderName?: ModelStringFilterInput | null,
    ordersAllowed?: ModelIntFilterInput | null,
    ordersUsed?: ModelIntFilterInput | null,
    invoiceId?: ModelIDFilterInput | null,
    buyerEmail?: ModelStringFilterInput | null,
    buyerOrgId?: ModelIDFilterInput | null,
    buyerId?: ModelIDFilterInput | null,
    sourceAttributes?: string | null,
    sourceOrderId?: ModelIDFilterInput | null,
    orderType?: ModelOrderTypeInput | null,
    source?: ModelOrderSourceInput | null,
    status?: ModelOrderStatusInput | null,
    inventoryStatus?: ModelInventoryStatusInput | null,
    workflowStatus?: ModelOrderWorkflowStatusInput | null,
    eq?: ModelOrderFilterInput | null,
    lte?: ModelOrderFilterInput | null,
    lt?: ModelOrderFilterInput | null,
    gte?: ModelOrderFilterInput | null,
    gt?: ModelOrderFilterInput | null,
    beginsWith?: ModelOrderSearchFilterInput | null,
  };
  
  export type ModelOrderTypeInput = {
    eq?: OrderType | null,
    ne?: OrderType | null,
  };
  
  export type ModelOrderWorkflowStatusInput = {
    eq?: WorkflowStatus | null,
    ne?: WorkflowStatus | null,
  };
  
  export type ModelOrderSearchConnection = {
    __typename: "ModelOrderSearchConnection",
    items?:  Array<OrderMeta | null > | null,
    pageNumber: number,
    resultsPerPage: number,
    matchCount: number,
    hasNextPage: boolean,
  };
  
  export type ModelOrganizationFilterInput = {
    attributes?: ModelStringInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    organizationId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    title?: ModelStringInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelOrganizationFilterInput | null > | null,
    or?: Array< ModelOrganizationFilterInput | null > | null,
    not?: ModelOrganizationFilterInput | null,
  };
  
  export type OrganizationSearchInput = {
    searchString?: string | null,
    status?: OrgStatus | null,
    itemSets?: Array< string | null > | null,
    sort?: OrganizationSortInput | null,
    filter?: ModelOrganizationFilterInput | null,
  };
  
  export type OrganizationSortInput = {
    sortField?: OrganizationSortFields | null,
    sortDirection?: ModelSortDirection | null,
  };
  
  export enum OrganizationSortFields {
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    designCount = "designCount",
    fontCount = "fontCount",
    imageCount = "imageCount",
    listingCount = "listingCount",
    orderCount = "orderCount",
    name = "name",
    originalStorageKBytes = "originalStorageKBytes",
    totalStorageKBytes = "totalStorageKBytes",
  }
  
  
  export type ModelOrganizationSearchConnection = {
    __typename: "ModelOrganizationSearchConnection",
    items?:  Array<Organization | null > | null,
    pageNumber: number,
    resultsPerPage: number,
    matchCount: number,
    hasNextPage: boolean,
  };
  
  export type ModelOutputConnection = {
    __typename: "ModelOutputConnection",
    items?:  Array<Output | null > | null,
    nextToken?: string | null,
  };
  
  export type ModelPluginFilterInput = {
    buyerAttributes?: ModelStringInput | null,
    buyerEmail?: ModelStringInput | null,
    buyerId?: ModelIDInput | null,
    createdAt?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    pluginId?: ModelIDInput | null,
    listingId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    source?: ModelStringInput | null,
    sourceAttributes?: ModelStringInput | null,
    sourceId?: ModelStringInput | null,
    pluginStatus?: ModelPluginStatusInput | null,
    updatedAt?: ModelStringInput | null,
    and?: Array< ModelPluginFilterInput | null > | null,
    or?: Array< ModelPluginFilterInput | null > | null,
    not?: ModelPluginFilterInput | null,
  };
  
  export type ModelPluginConnection = {
    __typename: "ModelPluginConnection",
    items?:  Array<Plugin | null > | null,
    nextToken?: string | null,
  };
  
  export type ModelSettingConnection = {
    __typename: "ModelSettingConnection",
    items?:  Array<Setting | null > | null,
    nextToken?: string | null,
  };
  
  export type SettingEntityCategory = {
    __typename: "SettingEntityCategory",
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    category: SettingCategory,
    setting?: string | null,
  };
  
  export type ModelStatConnection = {
    __typename: "ModelStatConnection",
    items?:  Array<Stat | null > | null,
    nextToken?: string | null,
  };
  
  export type ModelSignupStatusChangeStatConnection = {
    __typename: "ModelSignupStatusChangeStatConnection",
    items:  Array<DailySignupChangeStats >,
    nextToken?: string | null,
  };
  
  export type DailySignupChangeStats = {
    __typename: "DailySignupChangeStats",
    date: string,
    stats:  Array<SignupChangeStats >,
  };
  
  export type SignupChangeStats = {
    __typename: "SignupChangeStats",
    signupType: SignupAccountStatusType,
    statusChangeType: SignupStatusChangeType,
    count: number,
  };
  
  export enum SignupAccountStatusType {
    TRIAL = "TRIAL",
    BILLING = "BILLING",
    PAID = "PAID",
  }
  
  
  export enum SignupStatusChangeType {
    SIGNUP = "SIGNUP",
    CONVERSION = "CONVERSION",
    DO_NOT_RENEW = "DO_NOT_RENEW",
    RESTRICTED = "RESTRICTED",
    CANCEL = "CANCEL",
    REACTIVATE = "REACTIVATE",
  }
  
  
  export enum StatGranularity {
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONTH",
    YEAR = "YEAR",
  }
  
  
  export type ModelOrderCountStatConnection = {
    __typename: "ModelOrderCountStatConnection",
    items:  Array<OrderCountStat >,
    compareItems:  Array<OrderCountStat >,
    granularity?: StatGranularity | null,
    nextToken?: string | null,
  };
  
  export type OrderCountStat = {
    __typename: "OrderCountStat",
    date: string,
    stats:  Array<OrderCountStats >,
  };
  
  export type OrderCountStats = {
    __typename: "OrderCountStats",
    orderBillingStatus: OrderBillingStatus,
    count: number,
  };
  
  export type ModelSubscriptionCountStatConnection = {
    __typename: "ModelSubscriptionCountStatConnection",
    items:  Array<DailySubscriptionCountStat >,
    nextToken?: string | null,
  };
  
  export type DailySubscriptionCountStat = {
    __typename: "DailySubscriptionCountStat",
    date: string,
    stats:  Array<SubscriptionCountStat >,
  };
  
  export type SubscriptionCountStat = {
    __typename: "SubscriptionCountStat",
    count: number,
    status: OrgStatus,
  };
  
  export type UserCheck = {
    __typename: "UserCheck",
    email: string,
    userStatus: UserStatus,
    providerTypes?: Array< string | null > | null,
  };
  
  export type ModelUserFilterInput = {
    attributes?: ModelStringInput | null,
    expirationTime?: ModelIntInput | null,
    userId?: ModelIDInput | null,
    orgId?: ModelIDInput | null,
    title?: ModelStringInput | null,
    createdAt?: SearchableDateFilterInput | null,
    updatedAt?: SearchableDateFilterInput | null,
    and?: Array< ModelUserFilterInput | null > | null,
    or?: Array< ModelUserFilterInput | null > | null,
    not?: ModelUserFilterInput | null,
  };
  
  export type ModelUserConnection = {
    __typename: "ModelUserConnection",
    items?:  Array<User | null > | null,
    nextToken?: string | null,
  };
  
  export type UserSearchInput = {
    searchString?: string | null,
    status?: UserStatus | null,
    itemSets?: Array< string | null > | null,
    sort?: UserSortInput | null,
    filter?: ModelUserFilterInput | null,
  };
  
  export type UserSortInput = {
    sortField?: OrganizationSortFields | null,
    sortDirection?: ModelSortDirection | null,
  };
  
  export type ModelUserSearchConnection = {
    __typename: "ModelUserSearchConnection",
    items?:  Array<User | null > | null,
    pageNumber: number,
    resultsPerPage: number,
    matchCount: number,
    hasNextPage: boolean,
  };
  
  export type AddLogEventMutationVariables = {
    input: AddLogEventInput,
  };
  
  export type AddLogEventMutation = {
    addLogEvent?: boolean | null,
  };
  
  export type CreateDailyAffiliateStatMutationVariables = {
    input: CreateDailyAffiliateStatInput,
  };
  
  export type CreateDailyAffiliateStatMutation = {
    createDailyAffiliateStat?:  {
      __typename: "AffiliatePeriodStat",
      id: string,
      utmCampaign: string,
      utmSource: string,
      orgId?: string | null,
      affiliateId?: string | null,
      orderId?: string | null,
      listingId?: string | null,
      referenceId?: string | null,
      orderCount?: number | null,
      netOrderSales?: number | null,
      commissionPercentage?: number | null,
      affiliateCommission?: number | null,
      payoutPeriod?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type UpsertCampaignPeriodStatMutationVariables = {
    input: UpsertCampaignPeriodStatInput,
  };
  
  export type UpsertCampaignPeriodStatMutation = {
    upsertCampaignPeriodStat?:  {
      __typename: "AffiliatePeriodStat",
      id: string,
      utmCampaign: string,
      utmSource: string,
      orgId?: string | null,
      affiliateId?: string | null,
      orderId?: string | null,
      listingId?: string | null,
      referenceId?: string | null,
      orderCount?: number | null,
      netOrderSales?: number | null,
      commissionPercentage?: number | null,
      affiliateCommission?: number | null,
      payoutPeriod?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type CreateAssetMutationVariables = {
    input: CreateAssetInput,
  };
  
  export type CreateAssetMutation = {
    createAsset?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type AddAssetVariationMutationVariables = {
    input: AddAssetVariationInput,
  };
  
  export type AddAssetVariationMutation = {
    addAssetVariation?:  {
      __typename: "Asset",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      assetVariations?:  Array< {
        __typename: "AssetVariationData",
        assetVariation?: AssetVariation | null,
        filePath?: string | null,
        fileSize?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      filePath?: string | null,
      attributes?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type RebuildAssetMetaMutationVariables = {
    input: RebuildAssetMetaInput,
  };
  
  export type RebuildAssetMetaMutation = {
    rebuildAssetMeta?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateAssetMutationVariables = {
    input: UpdateAssetInput,
  };
  
  export type UpdateAssetMutation = {
    updateAsset?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateAssetVariationMutationVariables = {
    input: AddAssetVariationInput,
  };
  
  export type UpdateAssetVariationMutation = {
    updateAssetVariation?:  {
      __typename: "Asset",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      assetVariations?:  Array< {
        __typename: "AssetVariationData",
        assetVariation?: AssetVariation | null,
        filePath?: string | null,
        fileSize?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      filePath?: string | null,
      attributes?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CopyAssetToOrgMutationVariables = {
    input: CopyAssetToOrgInput,
  };
  
  export type CopyAssetToOrgMutation = {
    copyAssetToOrg?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type DeleteAssetMutationVariables = {
    input: DeleteAssetInput,
  };
  
  export type DeleteAssetMutation = {
    deleteAsset?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type DeleteAssetVariationMutationVariables = {
    input: DeleteAssetVariationInput,
  };
  
  export type DeleteAssetVariationMutation = {
    deleteAssetVariation?:  {
      __typename: "Asset",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      assetVariations?:  Array< {
        __typename: "AssetVariationData",
        assetVariation?: AssetVariation | null,
        filePath?: string | null,
        fileSize?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      filePath?: string | null,
      attributes?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type RecycleAssetMutationVariables = {
    input: DeleteAssetInput,
    restore?: boolean | null,
  };
  
  export type RecycleAssetMutation = {
    recycleAsset?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type AddPaymentMethodMutationVariables = {
    orgId: string,
    paymentMethodId: string,
  };
  
  export type AddPaymentMethodMutation = {
    addPaymentMethod?: boolean | null,
  };
  
  export type CreateSubscriptionMutationVariables = {
    input: CreateSubscriptionInput,
  };
  
  export type CreateSubscriptionMutation = {
    createSubscription?:  {
      __typename: "SubscriptionDetails",
      subscriptionId: string,
      customerId: string,
      status: SubscriptionStatus,
      autoRenew: boolean,
      cancellationDate?: string | null,
      currentTermStartDate?: string | null,
      currentTermEndDate?: string | null,
      serviceStartDate?: string | null,
      contractEffectiveDate?: string | null,
      contractTerm?: string | null,
      renewalTerm?: string | null,
      createdDate: string,
      updatedDate: string,
      freeTrialEndDate?: string | null,
      plans:  Array< {
        __typename: "Plan",
        planId: string,
        planName: string,
        planType: PlanType,
        description?: string | null,
        productId: string,
        productName: string,
        chargeName: string,
        billingPeriod: BillingPeriod,
        billingDay: string,
        billingScheduleId: string,
        revenueScheduleId: string,
        subscriptionLineId: string,
        currentPeriodStartDate?: string | null,
        currentPeriodEndDate?: string | null,
        lastChargeDate?: string | null,
        pricePerPeriod: string,
      } | null >,
    } | null,
  };
  
  export type StartSignupCheckoutMutationVariables = {
    input: StartSignupCheckoutInput,
  };
  
  export type StartSignupCheckoutMutation = {
    startSignupCheckout?:  {
      __typename: "StartSignupCheckoutResponse",
      clientSecret: string,
      setupIntentId?: string | null,
      paymentIntentId?: string | null,
    } | null,
  };
  
  export type FinishSignupCheckoutMutationVariables = {
    input: FinishSignupCheckoutInput,
  };
  
  export type FinishSignupCheckoutMutation = {
    finishSignupCheckout?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateCachedPlansMutationVariables = {
    input?: UpdateCachedPlansInput | null,
  };
  
  export type UpdateCachedPlansMutation = {
    updateCachedPlans?: boolean | null,
  };
  
  export type UpdateSubscriptionMutationVariables = {
    input: UpdateSubscriptionInput,
  };
  
  export type UpdateSubscriptionMutation = {
    updateSubscription?:  {
      __typename: "SubscriptionDetails",
      subscriptionId: string,
      customerId: string,
      status: SubscriptionStatus,
      autoRenew: boolean,
      cancellationDate?: string | null,
      currentTermStartDate?: string | null,
      currentTermEndDate?: string | null,
      serviceStartDate?: string | null,
      contractEffectiveDate?: string | null,
      contractTerm?: string | null,
      renewalTerm?: string | null,
      createdDate: string,
      updatedDate: string,
      freeTrialEndDate?: string | null,
      plans:  Array< {
        __typename: "Plan",
        planId: string,
        planName: string,
        planType: PlanType,
        description?: string | null,
        productId: string,
        productName: string,
        chargeName: string,
        billingPeriod: BillingPeriod,
        billingDay: string,
        billingScheduleId: string,
        revenueScheduleId: string,
        subscriptionLineId: string,
        currentPeriodStartDate?: string | null,
        currentPeriodEndDate?: string | null,
        lastChargeDate?: string | null,
        pricePerPeriod: string,
      } | null >,
    } | null,
  };
  
  export type ChangeFreeTrialPlanMutationVariables = {
    input: UpdateSubscriptionInput,
  };
  
  export type ChangeFreeTrialPlanMutation = {
    changeFreeTrialPlan?:  {
      __typename: "SubscriptionDetails",
      subscriptionId: string,
      customerId: string,
      status: SubscriptionStatus,
      autoRenew: boolean,
      cancellationDate?: string | null,
      currentTermStartDate?: string | null,
      currentTermEndDate?: string | null,
      serviceStartDate?: string | null,
      contractEffectiveDate?: string | null,
      contractTerm?: string | null,
      renewalTerm?: string | null,
      createdDate: string,
      updatedDate: string,
      freeTrialEndDate?: string | null,
      plans:  Array< {
        __typename: "Plan",
        planId: string,
        planName: string,
        planType: PlanType,
        description?: string | null,
        productId: string,
        productName: string,
        chargeName: string,
        billingPeriod: BillingPeriod,
        billingDay: string,
        billingScheduleId: string,
        revenueScheduleId: string,
        subscriptionLineId: string,
        currentPeriodStartDate?: string | null,
        currentPeriodEndDate?: string | null,
        lastChargeDate?: string | null,
        pricePerPeriod: string,
      } | null >,
    } | null,
  };
  
  export type CancelSubscriptionMutationVariables = {
    orgId: string,
    subscriptionId: string,
  };
  
  export type CancelSubscriptionMutation = {
    cancelSubscription?:  {
      __typename: "ModelSubscriptionConnection",
      items?:  Array< {
        __typename: "SubscriptionDetails",
        subscriptionId: string,
        customerId: string,
        status: SubscriptionStatus,
        autoRenew: boolean,
        cancellationDate?: string | null,
        currentTermStartDate?: string | null,
        currentTermEndDate?: string | null,
        serviceStartDate?: string | null,
        contractEffectiveDate?: string | null,
        contractTerm?: string | null,
        renewalTerm?: string | null,
        createdDate: string,
        updatedDate: string,
        freeTrialEndDate?: string | null,
        plans:  Array< {
          __typename: "Plan",
          planId: string,
          planName: string,
          planType: PlanType,
          description?: string | null,
          productId: string,
          productName: string,
          chargeName: string,
          billingPeriod: BillingPeriod,
          billingDay: string,
          billingScheduleId: string,
          revenueScheduleId: string,
          subscriptionLineId: string,
          currentPeriodStartDate?: string | null,
          currentPeriodEndDate?: string | null,
          lastChargeDate?: string | null,
          pricePerPeriod: string,
        } | null >,
      } | null > | null,
    } | null,
  };
  
  export type CancelUpcomingPlanChangeMutationVariables = {
    orgId: string,
    upcomingChangeSubscriptionId?: string | null,
  };
  
  export type CancelUpcomingPlanChangeMutation = {
    cancelUpcomingPlanChange?:  {
      __typename: "SubscriptionDetails",
      subscriptionId: string,
      customerId: string,
      status: SubscriptionStatus,
      autoRenew: boolean,
      cancellationDate?: string | null,
      currentTermStartDate?: string | null,
      currentTermEndDate?: string | null,
      serviceStartDate?: string | null,
      contractEffectiveDate?: string | null,
      contractTerm?: string | null,
      renewalTerm?: string | null,
      createdDate: string,
      updatedDate: string,
      freeTrialEndDate?: string | null,
      plans:  Array< {
        __typename: "Plan",
        planId: string,
        planName: string,
        planType: PlanType,
        description?: string | null,
        productId: string,
        productName: string,
        chargeName: string,
        billingPeriod: BillingPeriod,
        billingDay: string,
        billingScheduleId: string,
        revenueScheduleId: string,
        subscriptionLineId: string,
        currentPeriodStartDate?: string | null,
        currentPeriodEndDate?: string | null,
        lastChargeDate?: string | null,
        pricePerPeriod: string,
      } | null >,
    } | null,
  };
  
  export type DeletePaymentMethodMutationVariables = {
    orgId: string,
    paymentMethodId: string,
  };
  
  export type DeletePaymentMethodMutation = {
    deletePaymentMethod?: string | null,
  };
  
  export type SetDefaultPaymentMethodMutationVariables = {
    orgId: string,
    paymentMethodId: string,
  };
  
  export type SetDefaultPaymentMethodMutation = {
    setDefaultPaymentMethod?: string | null,
  };
  
  export type CreatePrepaidOrderMutationVariables = {
    input: CreatePrepaidOrderInput,
  };
  
  export type CreatePrepaidOrderMutation = {
    createPrepaidOrder?:  {
      __typename: "OrderResult",
      orderId: string,
      customerId: string,
      orgId: string,
      status: string,
      totalPrice: number,
      orderItems:  Array< {
        __typename: "OrderItem",
        productId: string,
        productName: string,
        unitPrice: number,
        quantity: number,
        total: number,
      } | null >,
    } | null,
  };
  
  export type AddItemToCartMutationVariables = {
    input: AddItemToCartInput,
  };
  
  export type AddItemToCartMutation = {
    addItemToCart?:  {
      __typename: "CartMeta",
      cartId: string,
      status: CartStatus,
      buyerOrgId?: string | null,
      buyerEmail: string,
      userId: string,
      cognitoUserId: string,
      sessionID?: string | null,
      items:  Array< {
        __typename: "CartItem",
        cartId: string,
        cartItemId: string,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        duplex: boolean,
        partner: number,
        envelopeSku?: string | null,
        createdAt: string,
        updatedAt: string,
      } >,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      fulfillmentMetaId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type RemoveCartItemMutationVariables = {
    input: RemoveCartItemInput,
  };
  
  export type RemoveCartItemMutation = {
    removeCartItem?:  {
      __typename: "CartMeta",
      cartId: string,
      status: CartStatus,
      buyerOrgId?: string | null,
      buyerEmail: string,
      userId: string,
      cognitoUserId: string,
      sessionID?: string | null,
      items:  Array< {
        __typename: "CartItem",
        cartId: string,
        cartItemId: string,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        duplex: boolean,
        partner: number,
        envelopeSku?: string | null,
        createdAt: string,
        updatedAt: string,
      } >,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      fulfillmentMetaId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type UpdateCartItemMutationVariables = {
    input: UpdateCartItemInput,
  };
  
  export type UpdateCartItemMutation = {
    updateCartItem?:  {
      __typename: "CartItem",
      cartId: string,
      cartItemId: string,
      designId: string,
      designerOrgId: string,
      designerEmail: string,
      itemThumbnail?: string | null,
      printPageMap:  Array< {
        __typename: "PrintPageInfo",
        pageId: number,
        resultFilePath?: string | null,
        resultFileSize?: number | null,
        pageStatus?: OutputStatus | null,
        printSide?: PrintSide | null,
      } >,
      orderId?: string | null,
      quantity: number,
      internalSku: string,
      duplex: boolean,
      partner: number,
      envelopeSku?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type UpdateCartStatusMutationVariables = {
    input: UpdateCartStatusInput,
  };
  
  export type UpdateCartStatusMutation = {
    updateCartStatus?:  {
      __typename: "CartMeta",
      cartId: string,
      status: CartStatus,
      buyerOrgId?: string | null,
      buyerEmail: string,
      userId: string,
      cognitoUserId: string,
      sessionID?: string | null,
      items:  Array< {
        __typename: "CartItem",
        cartId: string,
        cartItemId: string,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        duplex: boolean,
        partner: number,
        envelopeSku?: string | null,
        createdAt: string,
        updatedAt: string,
      } >,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      fulfillmentMetaId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type UpdateCartShippingMutationVariables = {
    input: UpdateCartShippingInput,
  };
  
  export type UpdateCartShippingMutation = {
    updateCartShipping?:  {
      __typename: "CartMeta",
      cartId: string,
      status: CartStatus,
      buyerOrgId?: string | null,
      buyerEmail: string,
      userId: string,
      cognitoUserId: string,
      sessionID?: string | null,
      items:  Array< {
        __typename: "CartItem",
        cartId: string,
        cartItemId: string,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        duplex: boolean,
        partner: number,
        envelopeSku?: string | null,
        createdAt: string,
        updatedAt: string,
      } >,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      fulfillmentMetaId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type StartPurchaseCheckoutMutationVariables = {
    input: StartPurchaseCheckoutInput,
  };
  
  export type StartPurchaseCheckoutMutation = {
    startPurchaseCheckout?:  {
      __typename: "PurchaseDetails",
      clientSecret?: string | null,
      paymentIntentId?: string | null,
      orderConfirmationEmail?: string | null,
      nextAction?: string | null,
      setupIntentId?: string | null,
    } | null,
  };
  
  export type InitiateFulfillmentOrderMutationVariables = {
    input: InitiateFulfillmentOrderInput,
  };
  
  export type InitiateFulfillmentOrderMutation = {
    initiateFulfillmentOrder?: string | null,
  };
  
  export type RebuildDesignMetaMutationVariables = {
    input: RebuildDesignMetaInput,
  };
  
  export type RebuildDesignMetaMutation = {
    rebuildDesignMeta?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CreateDesignMutationVariables = {
    input: CreateDesignInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type CreateDesignMutation = {
    createDesign?:  {
      __typename: "Design",
      designDetails?:  {
        __typename: "DesignDetails",
        designId: string,
        version: number,
        pageCount: number,
        designName: string,
        designType: DesignType,
        pageMap?:  Array< {
          __typename: "PageInfo",
          pageId: number,
          pageThumbnailFilePath?: string | null,
          name?: string | null,
          primary?: boolean | null,
        } | null > | null,
        pixelsPerUnit: number,
        displayUnit: DesignUnit,
        pixelDensityUnit: PixelDensityUnit,
        defaultPageRows: number,
        defaultPageColumns: number,
        defaultPageHeight: string,
        defaultPageWidth: string,
        defaultPageBleed: string,
        defaultDisplayPageBleed: boolean,
        defaultSectionHeight?: number | null,
        defaultSectionWidth?: number | null,
        editorType: EditorType,
        editorVersion?: string | null,
        payload?: string | null,
        customerBackgrounds?: Array< string | null > | null,
        customerFonts?: Array< string | null > | null,
        customerGraphics?: Array< string | null > | null,
        customerShapes?: Array< string | null > | null,
        designFonts?: Array< string | null > | null,
        designGraphics?: Array< string | null > | null,
        orgId?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null,
      designPage?:  Array< {
        __typename: "DesignPage",
        pageId: number,
        pageRows?: number | null,
        pageColumns?: number | null,
        pageHeight?: string | null,
        pageWidth?: string | null,
        pageBleed?: string | null,
        displayPageBleed?: boolean | null,
        sectionHeight?: number | null,
        sectionWidth?: number | null,
        customThumbnail?: boolean | null,
        pageThumbnailFilePath?: string | null,
        payload?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
        pageSections?:  Array< {
          __typename: "PageSection",
          section: number,
          payload?: string | null,
          lastModifiedToken?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | null > | null,
      } | null > | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type MigrateDesignMutationVariables = {
    input: MigrateDesignInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type MigrateDesignMutation = {
    migrateDesign?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type ImportDesignMutationVariables = {
    input: ImportDesignInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type ImportDesignMutation = {
    importDesign?:  {
      __typename: "Design",
      designDetails?:  {
        __typename: "DesignDetails",
        designId: string,
        version: number,
        pageCount: number,
        designName: string,
        designType: DesignType,
        pageMap?:  Array< {
          __typename: "PageInfo",
          pageId: number,
          pageThumbnailFilePath?: string | null,
          name?: string | null,
          primary?: boolean | null,
        } | null > | null,
        pixelsPerUnit: number,
        displayUnit: DesignUnit,
        pixelDensityUnit: PixelDensityUnit,
        defaultPageRows: number,
        defaultPageColumns: number,
        defaultPageHeight: string,
        defaultPageWidth: string,
        defaultPageBleed: string,
        defaultDisplayPageBleed: boolean,
        defaultSectionHeight?: number | null,
        defaultSectionWidth?: number | null,
        editorType: EditorType,
        editorVersion?: string | null,
        payload?: string | null,
        customerBackgrounds?: Array< string | null > | null,
        customerFonts?: Array< string | null > | null,
        customerGraphics?: Array< string | null > | null,
        customerShapes?: Array< string | null > | null,
        designFonts?: Array< string | null > | null,
        designGraphics?: Array< string | null > | null,
        orgId?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null,
      designPage?:  Array< {
        __typename: "DesignPage",
        pageId: number,
        pageRows?: number | null,
        pageColumns?: number | null,
        pageHeight?: string | null,
        pageWidth?: string | null,
        pageBleed?: string | null,
        displayPageBleed?: boolean | null,
        sectionHeight?: number | null,
        sectionWidth?: number | null,
        customThumbnail?: boolean | null,
        pageThumbnailFilePath?: string | null,
        payload?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
        pageSections?:  Array< {
          __typename: "PageSection",
          section: number,
          payload?: string | null,
          lastModifiedToken?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | null > | null,
      } | null > | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type ImportDesign2MutationVariables = {
    input: ImportDesign2Input,
  };
  
  export type ImportDesign2Mutation = {
    importDesign2?:  {
      __typename: "Design",
      designDetails?:  {
        __typename: "DesignDetails",
        designId: string,
        version: number,
        pageCount: number,
        designName: string,
        designType: DesignType,
        pageMap?:  Array< {
          __typename: "PageInfo",
          pageId: number,
          pageThumbnailFilePath?: string | null,
          name?: string | null,
          primary?: boolean | null,
        } | null > | null,
        pixelsPerUnit: number,
        displayUnit: DesignUnit,
        pixelDensityUnit: PixelDensityUnit,
        defaultPageRows: number,
        defaultPageColumns: number,
        defaultPageHeight: string,
        defaultPageWidth: string,
        defaultPageBleed: string,
        defaultDisplayPageBleed: boolean,
        defaultSectionHeight?: number | null,
        defaultSectionWidth?: number | null,
        editorType: EditorType,
        editorVersion?: string | null,
        payload?: string | null,
        customerBackgrounds?: Array< string | null > | null,
        customerFonts?: Array< string | null > | null,
        customerGraphics?: Array< string | null > | null,
        customerShapes?: Array< string | null > | null,
        designFonts?: Array< string | null > | null,
        designGraphics?: Array< string | null > | null,
        orgId?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null,
      designPage?:  Array< {
        __typename: "DesignPage",
        pageId: number,
        pageRows?: number | null,
        pageColumns?: number | null,
        pageHeight?: string | null,
        pageWidth?: string | null,
        pageBleed?: string | null,
        displayPageBleed?: boolean | null,
        sectionHeight?: number | null,
        sectionWidth?: number | null,
        customThumbnail?: boolean | null,
        pageThumbnailFilePath?: string | null,
        payload?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
        pageSections?:  Array< {
          __typename: "PageSection",
          section: number,
          payload?: string | null,
          lastModifiedToken?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | null > | null,
      } | null > | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type StartImportDesignFromTemplettMutationVariables = {
    input: StartImportDesignFromTemplettInput,
  };
  
  export type StartImportDesignFromTemplettMutation = {
    startImportDesignFromTemplett?: string | null,
  };
  
  export type CopyDesignMutationVariables = {
    input: CopyDesignInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type CopyDesignMutation = {
    copyDesign?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type RevertOrderDesignMutationVariables = {
    input: RevertOrderDesignInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type RevertOrderDesignMutation = {
    revertOrderDesign?:  {
      __typename: "Design",
      designDetails?:  {
        __typename: "DesignDetails",
        designId: string,
        version: number,
        pageCount: number,
        designName: string,
        designType: DesignType,
        pageMap?:  Array< {
          __typename: "PageInfo",
          pageId: number,
          pageThumbnailFilePath?: string | null,
          name?: string | null,
          primary?: boolean | null,
        } | null > | null,
        pixelsPerUnit: number,
        displayUnit: DesignUnit,
        pixelDensityUnit: PixelDensityUnit,
        defaultPageRows: number,
        defaultPageColumns: number,
        defaultPageHeight: string,
        defaultPageWidth: string,
        defaultPageBleed: string,
        defaultDisplayPageBleed: boolean,
        defaultSectionHeight?: number | null,
        defaultSectionWidth?: number | null,
        editorType: EditorType,
        editorVersion?: string | null,
        payload?: string | null,
        customerBackgrounds?: Array< string | null > | null,
        customerFonts?: Array< string | null > | null,
        customerGraphics?: Array< string | null > | null,
        customerShapes?: Array< string | null > | null,
        designFonts?: Array< string | null > | null,
        designGraphics?: Array< string | null > | null,
        orgId?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null,
      designPage?:  Array< {
        __typename: "DesignPage",
        pageId: number,
        pageRows?: number | null,
        pageColumns?: number | null,
        pageHeight?: string | null,
        pageWidth?: string | null,
        pageBleed?: string | null,
        displayPageBleed?: boolean | null,
        sectionHeight?: number | null,
        sectionWidth?: number | null,
        customThumbnail?: boolean | null,
        pageThumbnailFilePath?: string | null,
        payload?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
        pageSections?:  Array< {
          __typename: "PageSection",
          section: number,
          payload?: string | null,
          lastModifiedToken?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | null > | null,
      } | null > | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type CopyDesignToBuyerMutationVariables = {
    input: CopyDesignToBuyerInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type CopyDesignToBuyerMutation = {
    copyDesignToBuyer?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CopyDesignToOrderMutationVariables = {
    input: CopyDesignToOrderInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type CopyDesignToOrderMutation = {
    copyDesignToOrder?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GenerateDesignOutputMutationVariables = {
    input: GenerateDesignInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type GenerateDesignOutputMutation = {
    generateDesignOutput?:  {
      __typename: "DesignDetails",
      designId: string,
      version: number,
      pageCount: number,
      designName: string,
      designType: DesignType,
      pageMap?:  Array< {
        __typename: "PageInfo",
        pageId: number,
        pageThumbnailFilePath?: string | null,
        name?: string | null,
        primary?: boolean | null,
      } | null > | null,
      pixelsPerUnit: number,
      displayUnit: DesignUnit,
      pixelDensityUnit: PixelDensityUnit,
      defaultPageRows: number,
      defaultPageColumns: number,
      defaultPageHeight: string,
      defaultPageWidth: string,
      defaultPageBleed: string,
      defaultDisplayPageBleed: boolean,
      defaultSectionHeight?: number | null,
      defaultSectionWidth?: number | null,
      editorType: EditorType,
      editorVersion?: string | null,
      payload?: string | null,
      customerBackgrounds?: Array< string | null > | null,
      customerFonts?: Array< string | null > | null,
      customerGraphics?: Array< string | null > | null,
      customerShapes?: Array< string | null > | null,
      designFonts?: Array< string | null > | null,
      designGraphics?: Array< string | null > | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CreateDesignVersionMutationVariables = {
    input: CreateDesignVersionInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type CreateDesignVersionMutation = {
    createDesignVersion?:  {
      __typename: "DesignDetails",
      designId: string,
      version: number,
      pageCount: number,
      designName: string,
      designType: DesignType,
      pageMap?:  Array< {
        __typename: "PageInfo",
        pageId: number,
        pageThumbnailFilePath?: string | null,
        name?: string | null,
        primary?: boolean | null,
      } | null > | null,
      pixelsPerUnit: number,
      displayUnit: DesignUnit,
      pixelDensityUnit: PixelDensityUnit,
      defaultPageRows: number,
      defaultPageColumns: number,
      defaultPageHeight: string,
      defaultPageWidth: string,
      defaultPageBleed: string,
      defaultDisplayPageBleed: boolean,
      defaultSectionHeight?: number | null,
      defaultSectionWidth?: number | null,
      editorType: EditorType,
      editorVersion?: string | null,
      payload?: string | null,
      customerBackgrounds?: Array< string | null > | null,
      customerFonts?: Array< string | null > | null,
      customerGraphics?: Array< string | null > | null,
      customerShapes?: Array< string | null > | null,
      designFonts?: Array< string | null > | null,
      designGraphics?: Array< string | null > | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type PromoteDesignVersionMutationVariables = {
    input: PromoteDesignVersionInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type PromoteDesignVersionMutation = {
    promoteDesignVersion?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type AddDesignPageMutationVariables = {
    input: AddDesignPageInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type AddDesignPageMutation = {
    addDesignPage?:  Array< {
      __typename: "DesignPage",
      pageId: number,
      pageRows?: number | null,
      pageColumns?: number | null,
      pageHeight?: string | null,
      pageWidth?: string | null,
      pageBleed?: string | null,
      displayPageBleed?: boolean | null,
      sectionHeight?: number | null,
      sectionWidth?: number | null,
      customThumbnail?: boolean | null,
      pageThumbnailFilePath?: string | null,
      payload?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
      pageSections?:  Array< {
        __typename: "PageSection",
        section: number,
        payload?: string | null,
        lastModifiedToken?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
    } | null > | null,
  };
  
  export type UpdateDesignDetailsMutationVariables = {
    input: UpdateDesignDetailsInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type UpdateDesignDetailsMutation = {
    updateDesignDetails?:  {
      __typename: "DesignDetails",
      designId: string,
      version: number,
      pageCount: number,
      designName: string,
      designType: DesignType,
      pageMap?:  Array< {
        __typename: "PageInfo",
        pageId: number,
        pageThumbnailFilePath?: string | null,
        name?: string | null,
        primary?: boolean | null,
      } | null > | null,
      pixelsPerUnit: number,
      displayUnit: DesignUnit,
      pixelDensityUnit: PixelDensityUnit,
      defaultPageRows: number,
      defaultPageColumns: number,
      defaultPageHeight: string,
      defaultPageWidth: string,
      defaultPageBleed: string,
      defaultDisplayPageBleed: boolean,
      defaultSectionHeight?: number | null,
      defaultSectionWidth?: number | null,
      editorType: EditorType,
      editorVersion?: string | null,
      payload?: string | null,
      customerBackgrounds?: Array< string | null > | null,
      customerFonts?: Array< string | null > | null,
      customerGraphics?: Array< string | null > | null,
      customerShapes?: Array< string | null > | null,
      designFonts?: Array< string | null > | null,
      designGraphics?: Array< string | null > | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateDesignMetaMutationVariables = {
    input: UpdateDesignMetaInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type UpdateDesignMetaMutation = {
    updateDesignMeta?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type DeleteDesignMutationVariables = {
    input: DeleteDesignInput,
    condition?: ModelDesignConditionInput | null,
  };
  
  export type DeleteDesignMutation = {
    deleteDesign?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateDesignPageSectionsMutationVariables = {
    input: UpdateDesignPageSectionsInput,
  };
  
  export type UpdateDesignPageSectionsMutation = {
    updateDesignPageSections?:  Array< {
      __typename: "PageSection",
      section: number,
      payload?: string | null,
      lastModifiedToken?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null > | null,
  };
  
  export type UpdateDesignPageMutationVariables = {
    input: UpdateDesignPageInput,
  };
  
  export type UpdateDesignPageMutation = {
    updateDesignPage?:  {
      __typename: "DesignPage",
      pageId: number,
      pageRows?: number | null,
      pageColumns?: number | null,
      pageHeight?: string | null,
      pageWidth?: string | null,
      pageBleed?: string | null,
      displayPageBleed?: boolean | null,
      sectionHeight?: number | null,
      sectionWidth?: number | null,
      customThumbnail?: boolean | null,
      pageThumbnailFilePath?: string | null,
      payload?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
      pageSections?:  Array< {
        __typename: "PageSection",
        section: number,
        payload?: string | null,
        lastModifiedToken?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
    } | null,
  };
  
  export type AddCustomerAssetsToDesignMutationVariables = {
    input: CustomerDesignAssetsInput,
  };
  
  export type AddCustomerAssetsToDesignMutation = {
    addCustomerAssetsToDesign?:  {
      __typename: "DesignDetails",
      designId: string,
      version: number,
      pageCount: number,
      designName: string,
      designType: DesignType,
      pageMap?:  Array< {
        __typename: "PageInfo",
        pageId: number,
        pageThumbnailFilePath?: string | null,
        name?: string | null,
        primary?: boolean | null,
      } | null > | null,
      pixelsPerUnit: number,
      displayUnit: DesignUnit,
      pixelDensityUnit: PixelDensityUnit,
      defaultPageRows: number,
      defaultPageColumns: number,
      defaultPageHeight: string,
      defaultPageWidth: string,
      defaultPageBleed: string,
      defaultDisplayPageBleed: boolean,
      defaultSectionHeight?: number | null,
      defaultSectionWidth?: number | null,
      editorType: EditorType,
      editorVersion?: string | null,
      payload?: string | null,
      customerBackgrounds?: Array< string | null > | null,
      customerFonts?: Array< string | null > | null,
      customerGraphics?: Array< string | null > | null,
      customerShapes?: Array< string | null > | null,
      designFonts?: Array< string | null > | null,
      designGraphics?: Array< string | null > | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type RemoveCustomerAssetsFromDesignMutationVariables = {
    input: CustomerDesignAssetsInput,
  };
  
  export type RemoveCustomerAssetsFromDesignMutation = {
    removeCustomerAssetsFromDesign?:  {
      __typename: "DesignDetails",
      designId: string,
      version: number,
      pageCount: number,
      designName: string,
      designType: DesignType,
      pageMap?:  Array< {
        __typename: "PageInfo",
        pageId: number,
        pageThumbnailFilePath?: string | null,
        name?: string | null,
        primary?: boolean | null,
      } | null > | null,
      pixelsPerUnit: number,
      displayUnit: DesignUnit,
      pixelDensityUnit: PixelDensityUnit,
      defaultPageRows: number,
      defaultPageColumns: number,
      defaultPageHeight: string,
      defaultPageWidth: string,
      defaultPageBleed: string,
      defaultDisplayPageBleed: boolean,
      defaultSectionHeight?: number | null,
      defaultSectionWidth?: number | null,
      editorType: EditorType,
      editorVersion?: string | null,
      payload?: string | null,
      customerBackgrounds?: Array< string | null > | null,
      customerFonts?: Array< string | null > | null,
      customerGraphics?: Array< string | null > | null,
      customerShapes?: Array< string | null > | null,
      designFonts?: Array< string | null > | null,
      designGraphics?: Array< string | null > | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CreateEntitlementInstanceMutationVariables = {
    input: CreateEntitlementInstanceInput,
  };
  
  export type CreateEntitlementInstanceMutation = {
    createEntitlementInstance?:  {
      __typename: "EntitlementInstance",
      entitlementInstanceId: string,
      orgId: string,
      entitlementFeature: EntitlementFeature,
      entitlementTerm: PlanTerm,
      entitlementStatus: EntitlementStatus,
      includedQuantity: number,
      usedQuantity: number,
      startDate?: string | null,
      endDate?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type CreateEntitlementInstanceFromOrderMutationVariables = {
    input: CreateEntitlementInstanceFromOrderInput,
  };
  
  export type CreateEntitlementInstanceFromOrderMutation = {
    createEntitlementInstanceFromOrder?:  {
      __typename: "EntitlementInstance",
      entitlementInstanceId: string,
      orgId: string,
      entitlementFeature: EntitlementFeature,
      entitlementTerm: PlanTerm,
      entitlementStatus: EntitlementStatus,
      includedQuantity: number,
      usedQuantity: number,
      startDate?: string | null,
      endDate?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type CreateEntitlementInstanceUsageMutationVariables = {
    input: CreateEntitlementInstanceUsageInput,
  };
  
  export type CreateEntitlementInstanceUsageMutation = {
    createEntitlementInstanceUsage?:  {
      __typename: "EntitlementInstance",
      entitlementInstanceId: string,
      orgId: string,
      entitlementFeature: EntitlementFeature,
      entitlementTerm: PlanTerm,
      entitlementStatus: EntitlementStatus,
      includedQuantity: number,
      usedQuantity: number,
      startDate?: string | null,
      endDate?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type CancelPrintOrderMutationVariables = {
    fulfillmentId: string,
  };
  
  export type CancelPrintOrderMutation = {
    cancelPrintOrder?: boolean | null,
  };
  
  export type RemoveItemFromPrintOrderMutationVariables = {
    fulfillmentId: string,
    lineItem: number,
  };
  
  export type RemoveItemFromPrintOrderMutation = {
    removeItemFromPrintOrder?: boolean | null,
  };
  
  export type UpdatePrintOrderShippingMutationVariables = {
    input: UpdateShippingInput,
  };
  
  export type UpdatePrintOrderShippingMutation = {
    updatePrintOrderShipping?: boolean | null,
  };
  
  export type UpdateFulfillmentMetaMutationVariables = {
    input: UpdateFulfillmentMetaInput,
  };
  
  export type UpdateFulfillmentMetaMutation = {
    updateFulfillmentMeta?:  {
      __typename: "FulfillmentMeta",
      fulfillmentId: string,
      cartId: string,
      status: FulfillmentStatus,
      buyerOrgId: string,
      buyerEmail?: string | null,
      cognitoUserId?: string | null,
      userId: string,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      expectedShipDate?: string | null,
      trackingNumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type UpdateFulfillmentItemMutationVariables = {
    input: UpdateFulfillmentItemInput,
  };
  
  export type UpdateFulfillmentItemMutation = {
    updateFulfillmentItem?:  {
      __typename: "FulfillmentItem",
      fulfillmentId: string,
      outputId?: string | null,
      designId: string,
      designerOrgId: string,
      designerEmail: string,
      itemThumbnail?: string | null,
      printPageMap:  Array< {
        __typename: "PrintPageInfo",
        pageId: number,
        resultFilePath?: string | null,
        resultFileSize?: number | null,
        pageStatus?: OutputStatus | null,
        printSide?: PrintSide | null,
      } >,
      orderId?: string | null,
      quantity: number,
      internalSku: string,
      envelopeSku?: string | null,
      duplex: boolean,
      partner: number,
      lineItem: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type ConnectEtsyIntegrationMutationVariables = {
    input: ConnectEtsyIntegrationInput,
    condition?: ModelIntegrationConditionInput | null,
  };
  
  export type ConnectEtsyIntegrationMutation = {
    connectEtsyIntegration?: string | null,
  };
  
  export type CreateIntegrationMutationVariables = {
    input: CreateIntegrationInput,
    condition?: ModelIntegrationConditionInput | null,
  };
  
  export type CreateIntegrationMutation = {
    createIntegration?:  {
      __typename: "Integration",
      integrationId: string,
      orgId: string,
      batch: number,
      source: IntegrationSource,
      type: IntegrationType,
      status: IntegrationStatus,
      integrationUserId?: string | null,
      credentials: string,
      attributes?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateIntegrationMutationVariables = {
    input: UpdateIntegrationInput,
    condition?: ModelIntegrationConditionInput | null,
  };
  
  export type UpdateIntegrationMutation = {
    updateIntegration?:  {
      __typename: "Integration",
      integrationId: string,
      orgId: string,
      batch: number,
      source: IntegrationSource,
      type: IntegrationType,
      status: IntegrationStatus,
      integrationUserId?: string | null,
      credentials: string,
      attributes?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type DeleteIntegrationMutationVariables = {
    input: DeleteIntegrationInput,
    condition?: ModelIntegrationConditionInput | null,
  };
  
  export type DeleteIntegrationMutation = {
    deleteIntegration?:  {
      __typename: "Integration",
      integrationId: string,
      orgId: string,
      batch: number,
      source: IntegrationSource,
      type: IntegrationType,
      status: IntegrationStatus,
      integrationUserId?: string | null,
      credentials: string,
      attributes?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type IntegrationOrderCheckCompleteMutationVariables = {
    input: IntegrationOrderCheckCompleteInput,
    condition?: ModelIntegrationConditionInput | null,
  };
  
  export type IntegrationOrderCheckCompleteMutation = {
    integrationOrderCheckComplete?:  {
      __typename: "IntegrationBatch",
      source: IntegrationSource,
      status: IntegrationStatus,
      batch: number,
      lastCompletedAt?: string | null,
      lastFetchedAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type RebuildItemSetMutationVariables = {
    input: RebuildItemSetInput,
  };
  
  export type RebuildItemSetMutation = {
    rebuildItemSet?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CreateItemSetMutationVariables = {
    input: CreateItemSetInput,
    condition?: ModelItemSetConditionInput | null,
  };
  
  export type CreateItemSetMutation = {
    createItemSet?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type ImportItemsToSetMutationVariables = {
    input: AddItemsToSetInput,
    condition?: ModelItemSetConditionInput | null,
  };
  
  export type ImportItemsToSetMutation = {
    importItemsToSet?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type AddItemsToSetMutationVariables = {
    input: AddItemsToSetInput,
    condition?: ModelItemSetConditionInput | null,
  };
  
  export type AddItemsToSetMutation = {
    addItemsToSet?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type AddItemToSetsMutationVariables = {
    input: AddItemToSetsInput,
    condition?: ModelItemSetConditionInput | null,
  };
  
  export type AddItemToSetsMutation = {
    addItemToSets?:  {
      __typename: "ItemSetMetaConnection",
      items?:  Array< {
        __typename: "ItemSetMeta",
        setId: string,
        itemType: ItemType,
        setType: SetType,
        setTypeId?: string | null,
        setTypeVersion?: number | null,
        itemCount?: number | null,
        name: string,
        parentId?: string | null,
        orgId: string,
        migrationVersion?: number | null,
        hasChildren?: boolean | null,
        updatedAt?: string | null,
        createdAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type RecalculateItemSetCountMutationVariables = {
    input: RecalculateItemSetCountInput,
    condition?: ModelItemSetConditionInput | null,
  };
  
  export type RecalculateItemSetCountMutation = {
    recalculateItemSetCount?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type RemoveItemsFromSetMutationVariables = {
    input: RemoveItemsFromSetInput,
    condition?: ModelItemSetConditionInput | null,
  };
  
  export type RemoveItemsFromSetMutation = {
    removeItemsFromSet?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateItemSetMutationVariables = {
    input: UpdateItemSetInput,
    condition?: ModelItemSetConditionInput | null,
  };
  
  export type UpdateItemSetMutation = {
    updateItemSet?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type DeleteItemSetMutationVariables = {
    input: DeleteItemSetInput,
    condition?: ModelItemSetConditionInput | null,
  };
  
  export type DeleteItemSetMutation = {
    deleteItemSet?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CreateListingMutationVariables = {
    input: CreateListingInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type CreateListingMutation = {
    createListing?:  {
      __typename: "Listing",
      listingId: string,
      version: number,
      orgId: string,
      name: string,
      attributes?: string | null,
      defaultMaxDownloads?: number | null,
      defaultExpireDays?: number | null,
      orderCount?: number | null,
      integrations?:  Array< {
        __typename: "ListingIntegration",
        listingId: string,
        sourceListingId?: string | null,
        source: IntegrationSource,
        integrationId: string,
        integrationAttributes?: string | null,
        demoKey?: string | null,
      } | null > | null,
      designMap: Array< string | null >,
      designs?:  Array< {
        __typename: "ListingDesign",
        listingId: string,
        designId: string,
        orgId: string,
        designName: string,
        designPrintOptions?: string | null,
        designListingAttributes?: string | null,
        designType?: DesignType | null,
        maxDownloads?: number | null,
        expireDays?: number | null,
        listingDesignType?: ListingDesignType | null,
        excludeFromUsage?: ListingUsageType | null,
        designThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null > | null,
      designCount?: number | null,
      listingThumbnail?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type ImportListingMutationVariables = {
    input: ImportListingInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type ImportListingMutation = {
    importListing?:  {
      __typename: "Listing",
      listingId: string,
      version: number,
      orgId: string,
      name: string,
      attributes?: string | null,
      defaultMaxDownloads?: number | null,
      defaultExpireDays?: number | null,
      orderCount?: number | null,
      integrations?:  Array< {
        __typename: "ListingIntegration",
        listingId: string,
        sourceListingId?: string | null,
        source: IntegrationSource,
        integrationId: string,
        integrationAttributes?: string | null,
        demoKey?: string | null,
      } | null > | null,
      designMap: Array< string | null >,
      designs?:  Array< {
        __typename: "ListingDesign",
        listingId: string,
        designId: string,
        orgId: string,
        designName: string,
        designPrintOptions?: string | null,
        designListingAttributes?: string | null,
        designType?: DesignType | null,
        maxDownloads?: number | null,
        expireDays?: number | null,
        listingDesignType?: ListingDesignType | null,
        excludeFromUsage?: ListingUsageType | null,
        designThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null > | null,
      designCount?: number | null,
      listingThumbnail?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type UpdateListingMutationVariables = {
    input: UpdateListingInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type UpdateListingMutation = {
    updateListing?:  {
      __typename: "Listing",
      listingId: string,
      version: number,
      orgId: string,
      name: string,
      attributes?: string | null,
      defaultMaxDownloads?: number | null,
      defaultExpireDays?: number | null,
      orderCount?: number | null,
      integrations?:  Array< {
        __typename: "ListingIntegration",
        listingId: string,
        sourceListingId?: string | null,
        source: IntegrationSource,
        integrationId: string,
        integrationAttributes?: string | null,
        demoKey?: string | null,
      } | null > | null,
      designMap: Array< string | null >,
      designs?:  Array< {
        __typename: "ListingDesign",
        listingId: string,
        designId: string,
        orgId: string,
        designName: string,
        designPrintOptions?: string | null,
        designListingAttributes?: string | null,
        designType?: DesignType | null,
        maxDownloads?: number | null,
        expireDays?: number | null,
        listingDesignType?: ListingDesignType | null,
        excludeFromUsage?: ListingUsageType | null,
        designThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null > | null,
      designCount?: number | null,
      listingThumbnail?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type TmpUpdateLegacyListingIdListingMutationVariables = {
    input: LegacyListingInput,
  };
  
  export type TmpUpdateLegacyListingIdListingMutation = {
    tmpUpdateLegacyListingIdListing?:  {
      __typename: "ListingMeta",
      listingId: string,
      name: string,
      description?: string | null,
      metaDescription?: string | null,
      orgId: string,
      publishedVersion: number,
      legacyListingId?: string | null,
      draftVersion: number,
      orderCount?: number | null,
      migrationVersion?: number | null,
      integrationSources?: Array< IntegrationSource | null > | null,
      listingThumbnail?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateListingDesignMutationVariables = {
    input: UpdateListingDesignInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type UpdateListingDesignMutation = {
    updateListingDesign?:  {
      __typename: "ListingDesign",
      listingId: string,
      designId: string,
      orgId: string,
      designName: string,
      designPrintOptions?: string | null,
      designListingAttributes?: string | null,
      designType?: DesignType | null,
      maxDownloads?: number | null,
      expireDays?: number | null,
      listingDesignType?: ListingDesignType | null,
      excludeFromUsage?: ListingUsageType | null,
      designThumbnail?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type DeleteListingMutationVariables = {
    input: DeleteListingInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type DeleteListingMutation = {
    deleteListing?:  {
      __typename: "ListingMeta",
      listingId: string,
      name: string,
      description?: string | null,
      metaDescription?: string | null,
      orgId: string,
      publishedVersion: number,
      legacyListingId?: string | null,
      draftVersion: number,
      orderCount?: number | null,
      migrationVersion?: number | null,
      integrationSources?: Array< IntegrationSource | null > | null,
      listingThumbnail?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type RebuildListingMetaMutationVariables = {
    input: RebuildListingMetaInput,
  };
  
  export type RebuildListingMetaMutation = {
    rebuildListingMeta?:  {
      __typename: "ListingMeta",
      listingId: string,
      name: string,
      description?: string | null,
      metaDescription?: string | null,
      orgId: string,
      publishedVersion: number,
      legacyListingId?: string | null,
      draftVersion: number,
      orderCount?: number | null,
      migrationVersion?: number | null,
      integrationSources?: Array< IntegrationSource | null > | null,
      listingThumbnail?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CopyListingMutationVariables = {
    input: CopyListingInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type CopyListingMutation = {
    copyListing?:  {
      __typename: "ListingMeta",
      listingId: string,
      name: string,
      description?: string | null,
      metaDescription?: string | null,
      orgId: string,
      publishedVersion: number,
      legacyListingId?: string | null,
      draftVersion: number,
      orderCount?: number | null,
      migrationVersion?: number | null,
      integrationSources?: Array< IntegrationSource | null > | null,
      listingThumbnail?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type AddDesignToListingMutationVariables = {
    input: AddDesignToListingInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type AddDesignToListingMutation = {
    addDesignToListing?:  {
      __typename: "ListingDesign",
      listingId: string,
      designId: string,
      orgId: string,
      designName: string,
      designPrintOptions?: string | null,
      designListingAttributes?: string | null,
      designType?: DesignType | null,
      maxDownloads?: number | null,
      expireDays?: number | null,
      listingDesignType?: ListingDesignType | null,
      excludeFromUsage?: ListingUsageType | null,
      designThumbnail?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type AddListingIntegrationMutationVariables = {
    input: AddListingIntegrationInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type AddListingIntegrationMutation = {
    addListingIntegration?:  {
      __typename: "ListingIntegration",
      listingId: string,
      sourceListingId?: string | null,
      source: IntegrationSource,
      integrationId: string,
      integrationAttributes?: string | null,
      demoKey?: string | null,
    } | null,
  };
  
  export type ImportListingIntegrationMutationVariables = {
    input: ImportListingIntegrationInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type ImportListingIntegrationMutation = {
    importListingIntegration?:  {
      __typename: "ListingIntegration",
      listingId: string,
      sourceListingId?: string | null,
      source: IntegrationSource,
      integrationId: string,
      integrationAttributes?: string | null,
      demoKey?: string | null,
    } | null,
  };
  
  export type UpdateListingIntegrationMutationVariables = {
    input: UpdateListingIntegrationInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type UpdateListingIntegrationMutation = {
    updateListingIntegration?:  {
      __typename: "ListingIntegration",
      listingId: string,
      sourceListingId?: string | null,
      source: IntegrationSource,
      integrationId: string,
      integrationAttributes?: string | null,
      demoKey?: string | null,
    } | null,
  };
  
  export type DeleteListingIntegrationMutationVariables = {
    input: DeleteListingIntegrationInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type DeleteListingIntegrationMutation = {
    deleteListingIntegration?:  {
      __typename: "ListingIntegration",
      listingId: string,
      sourceListingId?: string | null,
      source: IntegrationSource,
      integrationId: string,
      integrationAttributes?: string | null,
      demoKey?: string | null,
    } | null,
  };
  
  export type RemoveDesignFromListingMutationVariables = {
    input: RemoveDesignFromListingInput,
    condition?: ModelListingConditionInput | null,
  };
  
  export type RemoveDesignFromListingMutation = {
    removeDesignFromListing?:  {
      __typename: "Listing",
      listingId: string,
      version: number,
      orgId: string,
      name: string,
      attributes?: string | null,
      defaultMaxDownloads?: number | null,
      defaultExpireDays?: number | null,
      orderCount?: number | null,
      integrations?:  Array< {
        __typename: "ListingIntegration",
        listingId: string,
        sourceListingId?: string | null,
        source: IntegrationSource,
        integrationId: string,
        integrationAttributes?: string | null,
        demoKey?: string | null,
      } | null > | null,
      designMap: Array< string | null >,
      designs?:  Array< {
        __typename: "ListingDesign",
        listingId: string,
        designId: string,
        orgId: string,
        designName: string,
        designPrintOptions?: string | null,
        designListingAttributes?: string | null,
        designType?: DesignType | null,
        maxDownloads?: number | null,
        expireDays?: number | null,
        listingDesignType?: ListingDesignType | null,
        excludeFromUsage?: ListingUsageType | null,
        designThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null > | null,
      designCount?: number | null,
      listingThumbnail?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type _emptyMutationMutation = {
    _emptyMutation?: boolean | null,
  };
  
  export type COrderMutationVariables = {
    input: ResendOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type COrderMutation = {
    cOrder?: boolean | null,
  };
  
  export type FixOrderLookupsMutationVariables = {
    input: ResendOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type FixOrderLookupsMutation = {
    fixOrderLookups?: boolean | null,
  };
  
  export type ClaimOrderMutationVariables = {
    input: ClaimOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type ClaimOrderMutation = {
    claimOrder?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type RedeemPreOrderMutationVariables = {
    input: ClaimOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type RedeemPreOrderMutation = {
    redeemPreOrder?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type ResendOrderEmailMutationVariables = {
    input: ResendOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type ResendOrderEmailMutation = {
    resendOrderEmail?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type InitiateManualOrderMutationVariables = {
    input: InitiateManualOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type InitiateManualOrderMutation = {
    initiateManualOrder?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type InitiateOrderMutationVariables = {
    input: InitiateOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type InitiateOrderMutation = {
    initiateOrder?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type CreatePreOrderMutationVariables = {
    input: CreatePreOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type CreatePreOrderMutation = {
    createPreOrder?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type ImportOrderMutationVariables = {
    input: ImportOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type ImportOrderMutation = {
    importOrder?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type ImportOrderMetaMutationVariables = {
    input: ImportOrderMetaInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type ImportOrderMetaMutation = {
    importOrderMeta?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type ImportOrderDataMutationVariables = {
    input: ImportOrderDataInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type ImportOrderDataMutation = {
    importOrderData?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type ImportOrderLogMutationVariables = {
    input: ImportOrderLogInput,
  };
  
  export type ImportOrderLogMutation = {
    importOrderLog?: boolean | null,
  };
  
  export type RebuildOrderMetaMutationVariables = {
    input: RebuildOrderMetaInput,
  };
  
  export type RebuildOrderMetaMutation = {
    rebuildOrderMeta?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type RebuildOrderIdMutationVariables = {
    input: RebuildOrderMetaInput,
  };
  
  export type RebuildOrderIdMutation = {
    rebuildOrderId?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type UpdateOrderMutationVariables = {
    input: UpdateOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type UpdateOrderMutation = {
    updateOrder?:  {
      __typename: "Order",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      orderCost?: number | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      listings:  Array< {
        __typename: "OrderListingAttributes",
        listingId: string,
        lineItem: string,
        listingName: string,
        listingOrderData?: string | null,
        isComplete?: boolean | null,
        expirationDate?: string | null,
      } | null >,
      designs:  Array< {
        __typename: "OrderDesignAttributes",
        designId: string,
        designVersion?: number | null,
        listingId?: string | null,
        lineItem: string,
        sortIndex: string,
        buyerDesignId?: string | null,
        designStatus?: DesignOrderStatus | null,
        designListingAttributes?: string | null,
        designPrintOptions?: string | null,
        designType?: string | null,
        designName?: string | null,
        thumbnailFilePath?: string | null,
        downloadsAllowed?: number | null,
        downloadsUsed?: number | null,
        expirationDate?: string | null,
        listingDesignType?: ListingDesignType | null,
      } | null >,
      orgId: string,
      orderClaimCode?: string | null,
      designerClaimCode?: string | null,
      legacyOrderId?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingStatus?: OrderBillingStatus | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      workflowStatus: WorkflowStatus,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type UpdateOrderBillingStatusMutationVariables = {
    input: UpdateOrderBillingStatusInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type UpdateOrderBillingStatusMutation = {
    updateOrderBillingStatus?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type UpdateOrderListingMutationVariables = {
    input: OrderListingInput,
  };
  
  export type UpdateOrderListingMutation = {
    updateOrderListing?:  {
      __typename: "OrderListingAttributes",
      listingId: string,
      lineItem: string,
      listingName: string,
      listingOrderData?: string | null,
      isComplete?: boolean | null,
      expirationDate?: string | null,
    } | null,
  };
  
  export type UpdateOrderMetaMutationVariables = {
    input: UpdateOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type UpdateOrderMetaMutation = {
    updateOrderMeta?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type CustomerUpdateOrderMetaMutationVariables = {
    input: CustomerUpdateOrderMetaInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type CustomerUpdateOrderMetaMutation = {
    customerUpdateOrderMeta?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type UpdateOrderDesignMutationVariables = {
    input: OrderDesignUpdateInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type UpdateOrderDesignMutation = {
    updateOrderDesign?:  {
      __typename: "OrderDesignAttributes",
      designId: string,
      designVersion?: number | null,
      listingId?: string | null,
      lineItem: string,
      sortIndex: string,
      buyerDesignId?: string | null,
      designStatus?: DesignOrderStatus | null,
      designListingAttributes?: string | null,
      designPrintOptions?: string | null,
      designType?: string | null,
      designName?: string | null,
      thumbnailFilePath?: string | null,
      downloadsAllowed?: number | null,
      downloadsUsed?: number | null,
      expirationDate?: string | null,
      listingDesignType?: ListingDesignType | null,
    } | null,
  };
  
  export type UpdateBuyerOrderDesignMutationVariables = {
    input: OrderBuyerDesignUpdateInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type UpdateBuyerOrderDesignMutation = {
    updateBuyerOrderDesign?:  {
      __typename: "OrderDesignAttributes",
      designId: string,
      designVersion?: number | null,
      listingId?: string | null,
      lineItem: string,
      sortIndex: string,
      buyerDesignId?: string | null,
      designStatus?: DesignOrderStatus | null,
      designListingAttributes?: string | null,
      designPrintOptions?: string | null,
      designType?: string | null,
      designName?: string | null,
      thumbnailFilePath?: string | null,
      downloadsAllowed?: number | null,
      downloadsUsed?: number | null,
      expirationDate?: string | null,
      listingDesignType?: ListingDesignType | null,
    } | null,
  };
  
  export type ApproveOrderDesignProofMutationVariables = {
    input: ApproveOrderDesignProofInput,
  };
  
  export type ApproveOrderDesignProofMutation = {
    approveOrderDesignProof?: boolean | null,
  };
  
  export type AddDesignsToOrderMutationVariables = {
    input: AddDesignsToOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type AddDesignsToOrderMutation = {
    addDesignsToOrder?:  Array< {
      __typename: "OrderDesignAttributes",
      designId: string,
      designVersion?: number | null,
      listingId?: string | null,
      lineItem: string,
      sortIndex: string,
      buyerDesignId?: string | null,
      designStatus?: DesignOrderStatus | null,
      designListingAttributes?: string | null,
      designPrintOptions?: string | null,
      designType?: string | null,
      designName?: string | null,
      thumbnailFilePath?: string | null,
      downloadsAllowed?: number | null,
      downloadsUsed?: number | null,
      expirationDate?: string | null,
      listingDesignType?: ListingDesignType | null,
    } | null > | null,
  };
  
  export type AddListingDesignsToOrderMutationVariables = {
    input: AddListingDesignsToOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type AddListingDesignsToOrderMutation = {
    addListingDesignsToOrder?:  Array< {
      __typename: "OrderDesignAttributes",
      designId: string,
      designVersion?: number | null,
      listingId?: string | null,
      lineItem: string,
      sortIndex: string,
      buyerDesignId?: string | null,
      designStatus?: DesignOrderStatus | null,
      designListingAttributes?: string | null,
      designPrintOptions?: string | null,
      designType?: string | null,
      designName?: string | null,
      thumbnailFilePath?: string | null,
      downloadsAllowed?: number | null,
      downloadsUsed?: number | null,
      expirationDate?: string | null,
      listingDesignType?: ListingDesignType | null,
    } | null > | null,
  };
  
  export type AddListingToOrderMutationVariables = {
    input: AddListingToOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type AddListingToOrderMutation = {
    addListingToOrder?:  Array< {
      __typename: "OrderDesignAttributes",
      designId: string,
      designVersion?: number | null,
      listingId?: string | null,
      lineItem: string,
      sortIndex: string,
      buyerDesignId?: string | null,
      designStatus?: DesignOrderStatus | null,
      designListingAttributes?: string | null,
      designPrintOptions?: string | null,
      designType?: string | null,
      designName?: string | null,
      thumbnailFilePath?: string | null,
      downloadsAllowed?: number | null,
      downloadsUsed?: number | null,
      expirationDate?: string | null,
      listingDesignType?: ListingDesignType | null,
    } | null > | null,
  };
  
  export type AddListingToNewOrderMutationVariables = {
    input: AddListingToOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type AddListingToNewOrderMutation = {
    addListingToNewOrder?:  Array< {
      __typename: "OrderDesignAttributes",
      designId: string,
      designVersion?: number | null,
      listingId?: string | null,
      lineItem: string,
      sortIndex: string,
      buyerDesignId?: string | null,
      designStatus?: DesignOrderStatus | null,
      designListingAttributes?: string | null,
      designPrintOptions?: string | null,
      designType?: string | null,
      designName?: string | null,
      thumbnailFilePath?: string | null,
      downloadsAllowed?: number | null,
      downloadsUsed?: number | null,
      expirationDate?: string | null,
      listingDesignType?: ListingDesignType | null,
    } | null > | null,
  };
  
  export type RemoveDesignFromOrderMutationVariables = {
    input: RemoveDesignFromOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type RemoveDesignFromOrderMutation = {
    removeDesignFromOrder?:  {
      __typename: "OrderDesignAttributes",
      designId: string,
      designVersion?: number | null,
      listingId?: string | null,
      lineItem: string,
      sortIndex: string,
      buyerDesignId?: string | null,
      designStatus?: DesignOrderStatus | null,
      designListingAttributes?: string | null,
      designPrintOptions?: string | null,
      designType?: string | null,
      designName?: string | null,
      thumbnailFilePath?: string | null,
      downloadsAllowed?: number | null,
      downloadsUsed?: number | null,
      expirationDate?: string | null,
      listingDesignType?: ListingDesignType | null,
    } | null,
  };
  
  export type RemoveLineItemFromOrderMutationVariables = {
    input: RemoveLineItemFromOrderInput,
    condition?: ModelOrderConditionInput | null,
  };
  
  export type RemoveLineItemFromOrderMutation = {
    removeLineItemFromOrder?:  {
      __typename: "Order",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      orderCost?: number | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      listings:  Array< {
        __typename: "OrderListingAttributes",
        listingId: string,
        lineItem: string,
        listingName: string,
        listingOrderData?: string | null,
        isComplete?: boolean | null,
        expirationDate?: string | null,
      } | null >,
      designs:  Array< {
        __typename: "OrderDesignAttributes",
        designId: string,
        designVersion?: number | null,
        listingId?: string | null,
        lineItem: string,
        sortIndex: string,
        buyerDesignId?: string | null,
        designStatus?: DesignOrderStatus | null,
        designListingAttributes?: string | null,
        designPrintOptions?: string | null,
        designType?: string | null,
        designName?: string | null,
        thumbnailFilePath?: string | null,
        downloadsAllowed?: number | null,
        downloadsUsed?: number | null,
        expirationDate?: string | null,
        listingDesignType?: ListingDesignType | null,
      } | null >,
      orgId: string,
      orderClaimCode?: string | null,
      designerClaimCode?: string | null,
      legacyOrderId?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingStatus?: OrderBillingStatus | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      workflowStatus: WorkflowStatus,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type BatchImportOrganizationMutationVariables = {
    input: BatchImportOrganizationInput,
    condition?: ModelOrganizationConditionInput | null,
  };
  
  export type BatchImportOrganizationMutation = {
    batchImportOrganization?:  {
      __typename: "ModelOrganizationConnection",
      items?:  Array< {
        __typename: "Organization",
        orgId: string,
        type: OrgType,
        status: OrgStatus,
        statusConfirmed?: boolean | null,
        name: string,
        billingUserId?: string | null,
        billingCycleDay?: number | null,
        planId?: string | null,
        paymentUserId?: string | null,
        affiliateAccountId?: string | null,
        affiliateStatus?: AffiliateStatus | null,
        pusherId: string,
        parentOrgId?: string | null,
        managementOrgId?: string | null,
        corjlVersion?: string | null,
        attributes?: string | null,
        logoUrl?: string | null,
        avatarUrl?: string | null,
        designCount?: number | null,
        imageCount?: number | null,
        fontCount?: number | null,
        firstOrderDate?: string | null,
        listingCount?: number | null,
        outputCount?: number | null,
        orderCount?: number | null,
        migrationVersion?: number | null,
        billingPeriodOrderCount?: number | null,
        billingPeriodTransactionCost?: number | null,
        pendingOrderCount?: number | null,
        contactEmail?: string | null,
        totalStorageKBytes?: number | null,
        originalStorageKBytes?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type CreateOrganizationMutationVariables = {
    input: CreateOrganizationInput,
    condition?: ModelOrganizationConditionInput | null,
  };
  
  export type CreateOrganizationMutation = {
    createOrganization?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type DeleteOrganizationMutationVariables = {
    input: RebuildOrganizationInput,
    condition?: ModelOrganizationConditionInput | null,
  };
  
  export type DeleteOrganizationMutation = {
    deleteOrganization?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type RebuildOrganizationMutationVariables = {
    input: RebuildOrganizationInput,
  };
  
  export type RebuildOrganizationMutation = {
    rebuildOrganization?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateOrganizationMutationVariables = {
    input: UpdateOrganizationInput,
    condition?: ModelOrganizationConditionInput | null,
  };
  
  export type UpdateOrganizationMutation = {
    updateOrganization?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type IncrementOrganizationUsageEstimateMutationVariables = {
    input: IncrementOrganizationUsageEstimateInput,
    condition?: ModelOrganizationConditionInput | null,
  };
  
  export type IncrementOrganizationUsageEstimateMutation = {
    incrementOrganizationUsageEstimate?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UserUpdateOrganizationMutationVariables = {
    input: UserUpdateOrganizationInput,
    condition?: ModelOrganizationConditionInput | null,
  };
  
  export type UserUpdateOrganizationMutation = {
    userUpdateOrganization?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GenerateOutputCorjl1MutationVariables = {
    input: GenerateOutputCorjl1Input,
  };
  
  export type GenerateOutputCorjl1Mutation = {
    generateOutputCorjl1?:  {
      __typename: "Output",
      designId: string,
      version: number,
      outputId: string,
      orderId?: string | null,
      orgId?: string | null,
      creatorOrgId?: string | null,
      designName?: string | null,
      source: OutputRequestSource,
      process: OutputProcess,
      outputUrl?: string | null,
      checksum: string,
      thumbnail?: string | null,
      status: OutputStatus,
      printPageMap:  Array< {
        __typename: "PrintPageInfo",
        pageId: number,
        resultFilePath?: string | null,
        resultFileSize?: number | null,
        pageStatus?: OutputStatus | null,
        printSide?: PrintSide | null,
      } >,
      presetOptions?: string | null,
      copies: number,
      outputHeight: string,
      outputWidth: string,
      outputUnit: DesignUnit,
      outputPixelsPerUnit: number,
      outputPixelDensityUnit: PixelDensityUnit,
      outputPageBleed?: string | null,
      outputPageRows?: number | null,
      outputPageColumns?: number | null,
      multiplePerPage: MultiplePerPage,
      flatten: boolean,
      scaleToFit: boolean,
      fitToEdge: boolean,
      showBleed: boolean,
      showTrimMarks: boolean,
      doubleSided: boolean,
      orientation: Orientation,
      reverseSheetOrder: boolean,
      backgroundTransparent: boolean,
      printInColor: boolean,
      title: string,
      durationMbSeconds: number,
      processorVersion?: string | null,
      resultFileSize: number,
      attemptCount?: number | null,
      pageFormat: PageFormat,
      outputFormat: OutputFormat,
      notifyEmail?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type GenerateOutputMutationVariables = {
    input: GenerateOutputInput,
  };
  
  export type GenerateOutputMutation = {
    generateOutput?:  {
      __typename: "Output",
      designId: string,
      version: number,
      outputId: string,
      orderId?: string | null,
      orgId?: string | null,
      creatorOrgId?: string | null,
      designName?: string | null,
      source: OutputRequestSource,
      process: OutputProcess,
      outputUrl?: string | null,
      checksum: string,
      thumbnail?: string | null,
      status: OutputStatus,
      printPageMap:  Array< {
        __typename: "PrintPageInfo",
        pageId: number,
        resultFilePath?: string | null,
        resultFileSize?: number | null,
        pageStatus?: OutputStatus | null,
        printSide?: PrintSide | null,
      } >,
      presetOptions?: string | null,
      copies: number,
      outputHeight: string,
      outputWidth: string,
      outputUnit: DesignUnit,
      outputPixelsPerUnit: number,
      outputPixelDensityUnit: PixelDensityUnit,
      outputPageBleed?: string | null,
      outputPageRows?: number | null,
      outputPageColumns?: number | null,
      multiplePerPage: MultiplePerPage,
      flatten: boolean,
      scaleToFit: boolean,
      fitToEdge: boolean,
      showBleed: boolean,
      showTrimMarks: boolean,
      doubleSided: boolean,
      orientation: Orientation,
      reverseSheetOrder: boolean,
      backgroundTransparent: boolean,
      printInColor: boolean,
      title: string,
      durationMbSeconds: number,
      processorVersion?: string | null,
      resultFileSize: number,
      attemptCount?: number | null,
      pageFormat: PageFormat,
      outputFormat: OutputFormat,
      notifyEmail?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type CreateOutputMetaForFulfillmentMutationVariables = {
    input: CreateOutputMetaForFulfillmentInput,
  };
  
  export type CreateOutputMetaForFulfillmentMutation = {
    createOutputMetaForFulfillment?:  {
      __typename: "OutputForFulfillment",
      OutputMeta:  {
        __typename: "Output",
        designId: string,
        version: number,
        outputId: string,
        orderId?: string | null,
        orgId?: string | null,
        creatorOrgId?: string | null,
        designName?: string | null,
        source: OutputRequestSource,
        process: OutputProcess,
        outputUrl?: string | null,
        checksum: string,
        thumbnail?: string | null,
        status: OutputStatus,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        presetOptions?: string | null,
        copies: number,
        outputHeight: string,
        outputWidth: string,
        outputUnit: DesignUnit,
        outputPixelsPerUnit: number,
        outputPixelDensityUnit: PixelDensityUnit,
        outputPageBleed?: string | null,
        outputPageRows?: number | null,
        outputPageColumns?: number | null,
        multiplePerPage: MultiplePerPage,
        flatten: boolean,
        scaleToFit: boolean,
        fitToEdge: boolean,
        showBleed: boolean,
        showTrimMarks: boolean,
        doubleSided: boolean,
        orientation: Orientation,
        reverseSheetOrder: boolean,
        backgroundTransparent: boolean,
        printInColor: boolean,
        title: string,
        durationMbSeconds: number,
        processorVersion?: string | null,
        resultFileSize: number,
        attemptCount?: number | null,
        pageFormat: PageFormat,
        outputFormat: OutputFormat,
        notifyEmail?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      DesignPages:  Array< {
        __typename: "DesignPageForFulfillment",
        pageId: number,
        bucket: string,
        key: string,
      } | null >,
    } | null,
  };
  
  export type UpdateOutputMutationVariables = {
    input: UpdateOutputInput,
    condition?: ModelOutputConditionInput | null,
  };
  
  export type UpdateOutputMutation = {
    updateOutput?:  {
      __typename: "Output",
      designId: string,
      version: number,
      outputId: string,
      orderId?: string | null,
      orgId?: string | null,
      creatorOrgId?: string | null,
      designName?: string | null,
      source: OutputRequestSource,
      process: OutputProcess,
      outputUrl?: string | null,
      checksum: string,
      thumbnail?: string | null,
      status: OutputStatus,
      printPageMap:  Array< {
        __typename: "PrintPageInfo",
        pageId: number,
        resultFilePath?: string | null,
        resultFileSize?: number | null,
        pageStatus?: OutputStatus | null,
        printSide?: PrintSide | null,
      } >,
      presetOptions?: string | null,
      copies: number,
      outputHeight: string,
      outputWidth: string,
      outputUnit: DesignUnit,
      outputPixelsPerUnit: number,
      outputPixelDensityUnit: PixelDensityUnit,
      outputPageBleed?: string | null,
      outputPageRows?: number | null,
      outputPageColumns?: number | null,
      multiplePerPage: MultiplePerPage,
      flatten: boolean,
      scaleToFit: boolean,
      fitToEdge: boolean,
      showBleed: boolean,
      showTrimMarks: boolean,
      doubleSided: boolean,
      orientation: Orientation,
      reverseSheetOrder: boolean,
      backgroundTransparent: boolean,
      printInColor: boolean,
      title: string,
      durationMbSeconds: number,
      processorVersion?: string | null,
      resultFileSize: number,
      attemptCount?: number | null,
      pageFormat: PageFormat,
      outputFormat: OutputFormat,
      notifyEmail?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type UpdateOutput2MutationVariables = {
    input: UpdateOutput2Input,
    condition?: ModelOutputConditionInput | null,
  };
  
  export type UpdateOutput2Mutation = {
    updateOutput2?:  {
      __typename: "Output",
      designId: string,
      version: number,
      outputId: string,
      orderId?: string | null,
      orgId?: string | null,
      creatorOrgId?: string | null,
      designName?: string | null,
      source: OutputRequestSource,
      process: OutputProcess,
      outputUrl?: string | null,
      checksum: string,
      thumbnail?: string | null,
      status: OutputStatus,
      printPageMap:  Array< {
        __typename: "PrintPageInfo",
        pageId: number,
        resultFilePath?: string | null,
        resultFileSize?: number | null,
        pageStatus?: OutputStatus | null,
        printSide?: PrintSide | null,
      } >,
      presetOptions?: string | null,
      copies: number,
      outputHeight: string,
      outputWidth: string,
      outputUnit: DesignUnit,
      outputPixelsPerUnit: number,
      outputPixelDensityUnit: PixelDensityUnit,
      outputPageBleed?: string | null,
      outputPageRows?: number | null,
      outputPageColumns?: number | null,
      multiplePerPage: MultiplePerPage,
      flatten: boolean,
      scaleToFit: boolean,
      fitToEdge: boolean,
      showBleed: boolean,
      showTrimMarks: boolean,
      doubleSided: boolean,
      orientation: Orientation,
      reverseSheetOrder: boolean,
      backgroundTransparent: boolean,
      printInColor: boolean,
      title: string,
      durationMbSeconds: number,
      processorVersion?: string | null,
      resultFileSize: number,
      attemptCount?: number | null,
      pageFormat: PageFormat,
      outputFormat: OutputFormat,
      notifyEmail?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type UpdateOutputNotifyEmailMutationVariables = {
    input: UpdateOutputEmailInput,
  };
  
  export type UpdateOutputNotifyEmailMutation = {
    updateOutputNotifyEmail?:  {
      __typename: "Output",
      designId: string,
      version: number,
      outputId: string,
      orderId?: string | null,
      orgId?: string | null,
      creatorOrgId?: string | null,
      designName?: string | null,
      source: OutputRequestSource,
      process: OutputProcess,
      outputUrl?: string | null,
      checksum: string,
      thumbnail?: string | null,
      status: OutputStatus,
      printPageMap:  Array< {
        __typename: "PrintPageInfo",
        pageId: number,
        resultFilePath?: string | null,
        resultFileSize?: number | null,
        pageStatus?: OutputStatus | null,
        printSide?: PrintSide | null,
      } >,
      presetOptions?: string | null,
      copies: number,
      outputHeight: string,
      outputWidth: string,
      outputUnit: DesignUnit,
      outputPixelsPerUnit: number,
      outputPixelDensityUnit: PixelDensityUnit,
      outputPageBleed?: string | null,
      outputPageRows?: number | null,
      outputPageColumns?: number | null,
      multiplePerPage: MultiplePerPage,
      flatten: boolean,
      scaleToFit: boolean,
      fitToEdge: boolean,
      showBleed: boolean,
      showTrimMarks: boolean,
      doubleSided: boolean,
      orientation: Orientation,
      reverseSheetOrder: boolean,
      backgroundTransparent: boolean,
      printInColor: boolean,
      title: string,
      durationMbSeconds: number,
      processorVersion?: string | null,
      resultFileSize: number,
      attemptCount?: number | null,
      pageFormat: PageFormat,
      outputFormat: OutputFormat,
      notifyEmail?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type CreatePluginMutationVariables = {
    input: CreatePluginInput,
    condition?: ModelPluginConditionInput | null,
  };
  
  export type CreatePluginMutation = {
    createPlugin?:  {
      __typename: "Plugin",
      pluginId: string,
      name: string,
      slug: string,
      briefDescription: string,
      previewImage: string,
      pluginStatus?: PluginStatus | null,
      minVersion?: string | null,
      maxVersion?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdatePluginMutationVariables = {
    input: UpdatePluginInput,
    condition?: ModelPluginConditionInput | null,
  };
  
  export type UpdatePluginMutation = {
    updatePlugin?:  {
      __typename: "Plugin",
      pluginId: string,
      name: string,
      slug: string,
      briefDescription: string,
      previewImage: string,
      pluginStatus?: PluginStatus | null,
      minVersion?: string | null,
      maxVersion?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type DeletePluginMutationVariables = {
    input: DeletePluginInput,
    condition?: ModelPluginConditionInput | null,
  };
  
  export type DeletePluginMutation = {
    deletePlugin?:  {
      __typename: "Plugin",
      pluginId: string,
      name: string,
      slug: string,
      briefDescription: string,
      previewImage: string,
      pluginStatus?: PluginStatus | null,
      minVersion?: string | null,
      maxVersion?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CreateSettingMutationVariables = {
    input: CreateSettingInput,
    condition?: ModelSettingConditionInput | null,
  };
  
  export type CreateSettingMutation = {
    createSetting?:  {
      __typename: "Setting",
      entityType: SettingEntityType,
      entityId: string,
      entityVersion?: number | null,
      category: SettingCategory,
      subCategory: string,
      payload?: string | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateSettingAttributeMutationVariables = {
    input: UpdateSettingAttributeInput,
    condition?: ModelSettingConditionInput | null,
  };
  
  export type UpdateSettingAttributeMutation = {
    updateSettingAttribute?:  {
      __typename: "Setting",
      entityType: SettingEntityType,
      entityId: string,
      entityVersion?: number | null,
      category: SettingCategory,
      subCategory: string,
      payload?: string | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateOrderSettingAttributeMutationVariables = {
    input: UpdateOrderSettingAttributeInput,
  };
  
  export type UpdateOrderSettingAttributeMutation = {
    updateOrderSettingAttribute?:  {
      __typename: "DesignDetails",
      designId: string,
      version: number,
      pageCount: number,
      designName: string,
      designType: DesignType,
      pageMap?:  Array< {
        __typename: "PageInfo",
        pageId: number,
        pageThumbnailFilePath?: string | null,
        name?: string | null,
        primary?: boolean | null,
      } | null > | null,
      pixelsPerUnit: number,
      displayUnit: DesignUnit,
      pixelDensityUnit: PixelDensityUnit,
      defaultPageRows: number,
      defaultPageColumns: number,
      defaultPageHeight: string,
      defaultPageWidth: string,
      defaultPageBleed: string,
      defaultDisplayPageBleed: boolean,
      defaultSectionHeight?: number | null,
      defaultSectionWidth?: number | null,
      editorType: EditorType,
      editorVersion?: string | null,
      payload?: string | null,
      customerBackgrounds?: Array< string | null > | null,
      customerFonts?: Array< string | null > | null,
      customerGraphics?: Array< string | null > | null,
      customerShapes?: Array< string | null > | null,
      designFonts?: Array< string | null > | null,
      designGraphics?: Array< string | null > | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateSettingMutationVariables = {
    input: UpdateSettingInput,
    condition?: ModelSettingConditionInput | null,
  };
  
  export type UpdateSettingMutation = {
    updateSetting?:  {
      __typename: "Setting",
      entityType: SettingEntityType,
      entityId: string,
      entityVersion?: number | null,
      category: SettingCategory,
      subCategory: string,
      payload?: string | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type DeleteSettingMutationVariables = {
    input: DeleteSettingInput,
    condition?: ModelSettingConditionInput | null,
  };
  
  export type DeleteSettingMutation = {
    deleteSetting?:  {
      __typename: "Setting",
      entityType: SettingEntityType,
      entityId: string,
      entityVersion?: number | null,
      category: SettingCategory,
      subCategory: string,
      payload?: string | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type CreateDailyStatMutationVariables = {
    input: CreateDailyStatInput,
  };
  
  export type CreateDailyStatMutation = {
    createDailyStat?:  {
      __typename: "Stat",
      entityId: string,
      entityType: EntityType,
      period: StatPeriod,
      statType: StatType,
      quantity: number,
      netSales?: number | null,
      corjlCommission?: number | null,
      customerCommission?: number | null,
      recordDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type CreateStatMutationVariables = {
    input: CreateStatInput,
  };
  
  export type CreateStatMutation = {
    createStat?:  {
      __typename: "Stat",
      entityId: string,
      entityType: EntityType,
      period: StatPeriod,
      statType: StatType,
      quantity: number,
      netSales?: number | null,
      corjlCommission?: number | null,
      customerCommission?: number | null,
      recordDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type IncrementStatMutationVariables = {
    input: IncrementStatInput,
  };
  
  export type IncrementStatMutation = {
    incrementStat?:  {
      __typename: "Stat",
      entityId: string,
      entityType: EntityType,
      period: StatPeriod,
      statType: StatType,
      quantity: number,
      netSales?: number | null,
      corjlCommission?: number | null,
      customerCommission?: number | null,
      recordDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type SendEmailMutationVariables = {
    input: SendEmailInput,
  };
  
  export type SendEmailMutation = {
    sendEmail?: boolean | null,
  };
  
  export type CognitoSaveAndSendAuthCodeMutationVariables = {
    input: CognitoSaveAndSendAuthCodeInput,
  };
  
  export type CognitoSaveAndSendAuthCodeMutation = {
    cognitoSaveAndSendAuthCode?: string | null,
  };
  
  export type CreateUserMutationVariables = {
    input: CreateUserInput,
    condition?: ModelUserConditionInput | null,
  };
  
  export type CreateUserMutation = {
    createUser?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateUserMutationVariables = {
    input: UpdateUserInput,
    condition?: ModelUserConditionInput | null,
  };
  
  export type UpdateUserMutation = {
    updateUser?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateUserSelfMutationVariables = {
    input: UpdateUserSelfInput,
  };
  
  export type UpdateUserSelfMutation = {
    updateUserSelf?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type InviteUserToOrgMutationVariables = {
    input: InviteUserToOrgInput,
  };
  
  export type InviteUserToOrgMutation = {
    inviteUserToOrg?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type AddUserToOrgMutationVariables = {
    input: AddUserToOrgInput,
  };
  
  export type AddUserToOrgMutation = {
    addUserToOrg?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type UpdateUserOrgRoleMutationVariables = {
    input: UpdateUserOrgRoleInput,
  };
  
  export type UpdateUserOrgRoleMutation = {
    updateUserOrgRole?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type RemoveUserFromOrgMutationVariables = {
    input: RemoveUserFromOrgInput,
  };
  
  export type RemoveUserFromOrgMutation = {
    removeUserFromOrg?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type FetchOrderLogsQueryVariables = {
    orderId: string,
    orgId: string,
    sortDirection?: ModelSortDirection | null,
    pagination?: SearchPaginationInput | null,
  };
  
  export type FetchOrderLogsQuery = {
    fetchOrderLogs?:  {
      __typename: "ModelLogRecordConnection",
      items?:  Array< {
        __typename: "LogRecord",
        eventTime: string,
        itemId: string,
        itemType: string,
        eventType: string,
        eventModel: string,
        cognitoUserId?: string | null,
        creatorOrgId?: string | null,
        endUserOrgId?: string | null,
        country?: string | null,
        viewerType?: string | null,
        platform?: string | null,
        userAgent?: string | null,
        message: string,
        status: string,
        role: string,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type FetchActivityLogsQueryVariables = {
    orgId: string,
    type: LogEventOrgType,
    filters?: ActivityLogFiltersInput | null,
    sortDirection?: ModelSortDirection | null,
    pagination?: SearchPaginationInput | null,
  };
  
  export type FetchActivityLogsQuery = {
    fetchActivityLogs?:  {
      __typename: "ModelLogRecordConnection",
      items?:  Array< {
        __typename: "LogRecord",
        eventTime: string,
        itemId: string,
        itemType: string,
        eventType: string,
        eventModel: string,
        cognitoUserId?: string | null,
        creatorOrgId?: string | null,
        endUserOrgId?: string | null,
        country?: string | null,
        viewerType?: string | null,
        platform?: string | null,
        userAgent?: string | null,
        message: string,
        status: string,
        role: string,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type FetchUserActivityLogsQueryVariables = {
    userId: string,
    sortDirection?: ModelSortDirection | null,
    pagination?: SearchPaginationInput | null,
  };
  
  export type FetchUserActivityLogsQuery = {
    fetchUserActivityLogs?:  {
      __typename: "ModelLogRecordConnection",
      items?:  Array< {
        __typename: "LogRecord",
        eventTime: string,
        itemId: string,
        itemType: string,
        eventType: string,
        eventModel: string,
        cognitoUserId?: string | null,
        creatorOrgId?: string | null,
        endUserOrgId?: string | null,
        country?: string | null,
        viewerType?: string | null,
        platform?: string | null,
        userAgent?: string | null,
        message: string,
        status: string,
        role: string,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type SupportSearchActivityLogsQueryVariables = {
    orgId: string,
    sortDirection?: ModelSortDirection | null,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SupportSearchActivityLogsQuery = {
    supportSearchActivityLogs?:  {
      __typename: "ModelLogRecordConnection",
      items?:  Array< {
        __typename: "LogRecord",
        eventTime: string,
        itemId: string,
        itemType: string,
        eventType: string,
        eventModel: string,
        cognitoUserId?: string | null,
        creatorOrgId?: string | null,
        endUserOrgId?: string | null,
        country?: string | null,
        viewerType?: string | null,
        platform?: string | null,
        userAgent?: string | null,
        message: string,
        status: string,
        role: string,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type GetAffiliateIframeQueryStringQueryVariables = {
    orgId: string,
    iframeType: IframeType,
  };
  
  export type GetAffiliateIframeQueryStringQuery = {
    getAffiliateIframeQueryString?: string | null,
  };
  
  export type GetStatByCampaignPeriodQueryVariables = {
    utmCampaign: string,
    utmSource: string,
    year?: string | null,
    month?: string | null,
  };
  
  export type GetStatByCampaignPeriodQuery = {
    getStatByCampaignPeriod?:  {
      __typename: "AffiliatePeriodStat",
      id: string,
      utmCampaign: string,
      utmSource: string,
      orgId?: string | null,
      affiliateId?: string | null,
      orderId?: string | null,
      listingId?: string | null,
      referenceId?: string | null,
      orderCount?: number | null,
      netOrderSales?: number | null,
      commissionPercentage?: number | null,
      affiliateCommission?: number | null,
      payoutPeriod?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type ListAffiliateStatsByPeriodQueryVariables = {
    utmSource: string,
    year: string,
    month: string,
  };
  
  export type ListAffiliateStatsByPeriodQuery = {
    listAffiliateStatsByPeriod?:  Array< {
      __typename: "AffiliatePeriodStat",
      id: string,
      utmCampaign: string,
      utmSource: string,
      orgId?: string | null,
      affiliateId?: string | null,
      orderId?: string | null,
      listingId?: string | null,
      referenceId?: string | null,
      orderCount?: number | null,
      netOrderSales?: number | null,
      commissionPercentage?: number | null,
      affiliateCommission?: number | null,
      payoutPeriod?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
  };
  
  export type ListAffiliateStatsByOrgQueryVariables = {
    orgId: string,
    year: string,
    month: string,
    utmSource?: string | null,
  };
  
  export type ListAffiliateStatsByOrgQuery = {
    listAffiliateStatsByOrg?:  Array< {
      __typename: "AffiliatePeriodStat",
      id: string,
      utmCampaign: string,
      utmSource: string,
      orgId?: string | null,
      affiliateId?: string | null,
      orderId?: string | null,
      listingId?: string | null,
      referenceId?: string | null,
      orderCount?: number | null,
      netOrderSales?: number | null,
      commissionPercentage?: number | null,
      affiliateCommission?: number | null,
      payoutPeriod?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
  };
  
  export type GetAffiliateStatSummaryQueryVariables = {
    orgId: string,
    year?: string | null,
    month?: string | null,
  };
  
  export type GetAffiliateStatSummaryQuery = {
    getAffiliateStatSummary?:  {
      __typename: "AffiliateStatPeriodSummary",
      orgId?: string | null,
      payoutPeriod: string,
      summaryBySource?:  Array< {
        __typename: "AffiliateStatSourceSummary",
        utmSource: string,
        payoutPeriod: string,
        orderCount?: number | null,
        netOrderSales?: number | null,
        affiliateCommission?: number | null,
      } | null > | null,
      stats?:  Array< {
        __typename: "AffiliatePeriodStat",
        id: string,
        utmCampaign: string,
        utmSource: string,
        orgId?: string | null,
        affiliateId?: string | null,
        orderId?: string | null,
        listingId?: string | null,
        referenceId?: string | null,
        orderCount?: number | null,
        netOrderSales?: number | null,
        commissionPercentage?: number | null,
        affiliateCommission?: number | null,
        payoutPeriod?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
    } | null,
  };
  
  export type GetPayeeInfoQueryVariables = {
    orgId: string,
  };
  
  export type GetPayeeInfoQuery = {
    getPayeeInfo?:  {
      __typename: "PayeeInfo",
      tipaltiId: string,
      refCode: string,
      status: string,
      statusReason?: string | null,
      isPayable: boolean,
      paymentMethodType?: string | null,
      currency?: string | null,
    } | null,
  };
  
  export type SearchAssetsQueryVariables = {
    orgId: string,
    assetType: AssetType,
    searchTerms: AssetSearchInput,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SearchAssetsQuery = {
    searchAssets?:  {
      __typename: "ModelAssetSearchConnection",
      items?:  Array< {
        __typename: "AssetMeta",
        assetId: string,
        assetType: AssetType,
        assetSubType: AssetSubType,
        filePath?: string | null,
        thumbnailFilePath?: string | null,
        optimizedFilePath?: string | null,
        watermarkDemo?: boolean | null,
        attributes?: string | null,
        checksum?: string | null,
        name: string,
        filename: string,
        orgId: string,
        orgIcon?: string | null,
        metadata?: string | null,
        keywords?: string | null,
        description?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      itemSets?:  Array< {
        __typename: "ItemSetMeta",
        setId: string,
        itemType: ItemType,
        setType: SetType,
        setTypeId?: string | null,
        setTypeVersion?: number | null,
        itemCount?: number | null,
        name: string,
        parentId?: string | null,
        orgId: string,
        migrationVersion?: number | null,
        hasChildren?: boolean | null,
        updatedAt?: string | null,
        createdAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type GetAssetQueryVariables = {
    assetId: string,
    assetType: AssetType,
    assetSubType?: AssetSubType | null,
    assetVariations?: Array< AssetVariation | null > | null,
  };
  
  export type GetAssetQuery = {
    getAsset?:  {
      __typename: "Asset",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      assetVariations?:  Array< {
        __typename: "AssetVariationData",
        assetVariation?: AssetVariation | null,
        filePath?: string | null,
        fileSize?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      filePath?: string | null,
      attributes?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetAssetByOrgETagQueryVariables = {
    eTag: string,
    orgId?: string | null,
  };
  
  export type GetAssetByOrgETagQuery = {
    getAssetByOrgETag?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetAssetByETagQueryVariables = {
    eTag: string,
  };
  
  export type GetAssetByETagQuery = {
    getAssetByETag?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetAssetByChecksumQueryVariables = {
    checksum: string,
    assetType: AssetType,
  };
  
  export type GetAssetByChecksumQuery = {
    getAssetByChecksum?:  {
      __typename: "AssetMeta",
      assetId: string,
      assetType: AssetType,
      assetSubType: AssetSubType,
      filePath?: string | null,
      thumbnailFilePath?: string | null,
      optimizedFilePath?: string | null,
      watermarkDemo?: boolean | null,
      attributes?: string | null,
      checksum?: string | null,
      name: string,
      filename: string,
      orgId: string,
      orgIcon?: string | null,
      metadata?: string | null,
      keywords?: string | null,
      description?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type ListAssetsByChecksumQueryVariables = {
    checksum: string,
    assetType: AssetType,
  };
  
  export type ListAssetsByChecksumQuery = {
    listAssetsByChecksum?:  {
      __typename: "ModelAssetMetaConnection",
      items?:  Array< {
        __typename: "AssetMeta",
        assetId: string,
        assetType: AssetType,
        assetSubType: AssetSubType,
        filePath?: string | null,
        thumbnailFilePath?: string | null,
        optimizedFilePath?: string | null,
        watermarkDemo?: boolean | null,
        attributes?: string | null,
        checksum?: string | null,
        name: string,
        filename: string,
        orgId: string,
        orgIcon?: string | null,
        metadata?: string | null,
        keywords?: string | null,
        description?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListAssetsByOrgByTypeQueryVariables = {
    orgId: string,
    assetType: AssetType,
    assetSubType?: AssetSubType | null,
    sortBy?: ListAssetSortFields | null,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelAssetFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListAssetsByOrgByTypeQuery = {
    listAssetsByOrgByType?:  {
      __typename: "ModelAssetMetaConnection",
      items?:  Array< {
        __typename: "AssetMeta",
        assetId: string,
        assetType: AssetType,
        assetSubType: AssetSubType,
        filePath?: string | null,
        thumbnailFilePath?: string | null,
        optimizedFilePath?: string | null,
        watermarkDemo?: boolean | null,
        attributes?: string | null,
        checksum?: string | null,
        name: string,
        filename: string,
        orgId: string,
        orgIcon?: string | null,
        metadata?: string | null,
        keywords?: string | null,
        description?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListAssetsByIdsQueryVariables = {
    assetIds: Array< string | null >,
    assetVariation?: AssetVariation | null,
    assetType?: AssetType | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListAssetsByIdsQuery = {
    listAssetsByIds?:  {
      __typename: "ModelAssetMetaConnection",
      items?:  Array< {
        __typename: "AssetMeta",
        assetId: string,
        assetType: AssetType,
        assetSubType: AssetSubType,
        filePath?: string | null,
        thumbnailFilePath?: string | null,
        optimizedFilePath?: string | null,
        watermarkDemo?: boolean | null,
        attributes?: string | null,
        checksum?: string | null,
        name: string,
        filename: string,
        orgId: string,
        orgIcon?: string | null,
        metadata?: string | null,
        keywords?: string | null,
        description?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListAssetsByDesignQueryVariables = {
    designId: string,
    version: string,
    assetType: AssetType,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListAssetsByDesignQuery = {
    listAssetsByDesign?:  {
      __typename: "ModelAssetMetaConnection",
      items?:  Array< {
        __typename: "AssetMeta",
        assetId: string,
        assetType: AssetType,
        assetSubType: AssetSubType,
        filePath?: string | null,
        thumbnailFilePath?: string | null,
        optimizedFilePath?: string | null,
        watermarkDemo?: boolean | null,
        attributes?: string | null,
        checksum?: string | null,
        name: string,
        filename: string,
        orgId: string,
        orgIcon?: string | null,
        metadata?: string | null,
        keywords?: string | null,
        description?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListCustomerAssetsByDesignQueryVariables = {
    designId: string,
    version: string,
    assetType: AssetType,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListCustomerAssetsByDesignQuery = {
    listCustomerAssetsByDesign?:  {
      __typename: "ModelAssetMetaConnection",
      items?:  Array< {
        __typename: "AssetMeta",
        assetId: string,
        assetType: AssetType,
        assetSubType: AssetSubType,
        filePath?: string | null,
        thumbnailFilePath?: string | null,
        optimizedFilePath?: string | null,
        watermarkDemo?: boolean | null,
        attributes?: string | null,
        checksum?: string | null,
        name: string,
        filename: string,
        orgId: string,
        orgIcon?: string | null,
        metadata?: string | null,
        keywords?: string | null,
        description?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListAssetsByDemoDesignQueryVariables = {
    designId: string,
    assetType: AssetType,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListAssetsByDemoDesignQuery = {
    listAssetsByDemoDesign?:  {
      __typename: "ModelAssetMetaConnection",
      items?:  Array< {
        __typename: "AssetMeta",
        assetId: string,
        assetType: AssetType,
        assetSubType: AssetSubType,
        filePath?: string | null,
        thumbnailFilePath?: string | null,
        optimizedFilePath?: string | null,
        watermarkDemo?: boolean | null,
        attributes?: string | null,
        checksum?: string | null,
        name: string,
        filename: string,
        orgId: string,
        orgIcon?: string | null,
        metadata?: string | null,
        keywords?: string | null,
        description?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListInvoicesQueryVariables = {
    orgId: string,
    pageNum?: number | null,
  };
  
  export type ListInvoicesQuery = {
    listInvoices?:  {
      __typename: "ModelInvoiceConnection",
      items?:  Array< {
        __typename: "Invoice",
        invoiceId: string,
        invoiceNumber: string,
        invoicePdfUrl: string,
        billingDate: string,
        dueDate: string,
        amount: string,
        balance: string,
        status: InvoiceStatus,
      } | null > | null,
    } | null,
  };
  
  export type ListSubscriptionsQueryVariables = {
    orgId: string,
    status?: SubscriptionStatus | null,
  };
  
  export type ListSubscriptionsQuery = {
    listSubscriptions?:  {
      __typename: "ModelSubscriptionConnection",
      items?:  Array< {
        __typename: "SubscriptionDetails",
        subscriptionId: string,
        customerId: string,
        status: SubscriptionStatus,
        autoRenew: boolean,
        cancellationDate?: string | null,
        currentTermStartDate?: string | null,
        currentTermEndDate?: string | null,
        serviceStartDate?: string | null,
        contractEffectiveDate?: string | null,
        contractTerm?: string | null,
        renewalTerm?: string | null,
        createdDate: string,
        updatedDate: string,
        freeTrialEndDate?: string | null,
        plans:  Array< {
          __typename: "Plan",
          planId: string,
          planName: string,
          planType: PlanType,
          description?: string | null,
          productId: string,
          productName: string,
          chargeName: string,
          billingPeriod: BillingPeriod,
          billingDay: string,
          billingScheduleId: string,
          revenueScheduleId: string,
          subscriptionLineId: string,
          currentPeriodStartDate?: string | null,
          currentPeriodEndDate?: string | null,
          lastChargeDate?: string | null,
          pricePerPeriod: string,
        } | null >,
      } | null > | null,
    } | null,
  };
  
  export type GetBillingCustomerQueryVariables = {
    orgId: string,
  };
  
  export type GetBillingCustomerQuery = {
    getBillingCustomer?:  {
      __typename: "BillingCustomer",
      customerId: string,
      name: string,
      accountStatus: string,
      balance: string,
      currency: string,
      paymentGatewayId?: string | null,
      lastInvoicedDate?: string | null,
      billingCycleDay: string,
      freeTrialEndDate?: string | null,
      payNowUrl: string,
    } | null,
  };
  
  export type GetBillingScheduleQueryVariables = {
    billingScheduleId: string,
  };
  
  export type GetBillingScheduleQuery = {
    getBillingSchedule?:  {
      __typename: "BillingSchedule",
      billingScheduleId: string,
      productId: string,
      startDate: string,
      endDate: string,
      scheduleLines?:  Array< {
        __typename: "ScheduleLine",
        billId: string,
        description?: string | null,
        chargeReadyDate: string,
        startDate: string,
        endDate: string,
        unitPrice: number,
        quantity: number,
        amount: number,
        invoiced: boolean,
      } | null > | null,
    } | null,
  };
  
  export type GetPlanQueryVariables = {
    planId: string,
  };
  
  export type GetPlanQuery = {
    getPlan?:  {
      __typename: "PlanDetails",
      planId: string,
      name: string,
      status: string,
      corjlPlanStatus: string,
      description: string,
      planType: string,
      recurringChargeId: string,
      recurringChargeName: string,
      recurringChargeProductId: string,
      recurringChargeBillingPeriod: BillingPeriod,
      recurringChargeListPrice: string,
      usageChargeId?: string | null,
      usageChargeName?: string | null,
      usageChargeProductId?: string | null,
      usageChargeBillingPeriod?: BillingPeriod | null,
      usageChargeListPrice?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type ListActivePlansQueryVariables = {
    planType?: PlanType | null,
    currentPlanId?: string | null,
  };
  
  export type ListActivePlansQuery = {
    listActivePlans?:  {
      __typename: "ModelPlanDetailsConnection",
      items?:  Array< {
        __typename: "PlanDetails",
        planId: string,
        name: string,
        status: string,
        corjlPlanStatus: string,
        description: string,
        planType: string,
        recurringChargeId: string,
        recurringChargeName: string,
        recurringChargeProductId: string,
        recurringChargeBillingPeriod: BillingPeriod,
        recurringChargeListPrice: string,
        usageChargeId?: string | null,
        usageChargeName?: string | null,
        usageChargeProductId?: string | null,
        usageChargeBillingPeriod?: BillingPeriod | null,
        usageChargeListPrice?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null > | null,
    } | null,
  };
  
  export type ListPrepaidPlansQueryVariables = {
    planName: PlanName,
  };
  
  export type ListPrepaidPlansQuery = {
    listPrepaidPlans?:  Array< {
      __typename: "PrepaidPlanTier",
      quantity: number,
      unitPriceInCents: number,
      basePriceInCents: number,
      saleUpfrontCost: string,
      baseUpfrontCost?: string | null,
      savings: string,
    } | null > | null,
  };
  
  export type ListPaymentMethodsQueryVariables = {
    orgId: string,
  };
  
  export type ListPaymentMethodsQuery = {
    listPaymentMethods?:  {
      __typename: "ModelPaymentMethodConnection",
      items?:  Array< {
        __typename: "PaymentMethod",
        paymentMethodId: string,
        paymentType: string,
        type: string,
        accountNumber: string,
        accountHolderName?: string | null,
        paymentGatewayId: string,
        expiry: string,
        default: boolean,
      } | null > | null,
    } | null,
  };
  
  export type GetPaymentMethodQueryVariables = {
    orgId: string,
    paymentMethodId: string,
  };
  
  export type GetPaymentMethodQuery = {
    getPaymentMethod?:  {
      __typename: "PaymentMethod",
      paymentMethodId: string,
      paymentType: string,
      type: string,
      accountNumber: string,
      accountHolderName?: string | null,
      paymentGatewayId: string,
      expiry: string,
      default: boolean,
    } | null,
  };
  
  export type ListUpcomingUsageChargesQueryVariables = {
    orgId: string,
    pageNum?: number | null,
  };
  
  export type ListUpcomingUsageChargesQuery = {
    listUpcomingUsageCharges?:  {
      __typename: "ModelUsageChargeConnection",
      items?:  Array< {
        __typename: "UsageCharge",
        usageId: string,
        date: string,
        description: string,
        chargeAmount: string,
        quantity: number,
        runningTotal: string,
      } | null > | null,
    } | null,
  };
  
  export type PreviewSubscriptionChangeQueryVariables = {
    orgId: string,
    newPlanId: string,
  };
  
  export type PreviewSubscriptionChangeQuery = {
    previewSubscriptionChange?:  {
      __typename: "PreviewSubscriptionChangeDetails",
      newPlan:  {
        __typename: "PreviewPlanDetails",
        planName: string,
        recurringPrice: string,
        usagePrice?: string | null,
        billingPeriod: BillingPeriod,
      },
      previousPlan?:  {
        __typename: "PreviewPlanDetails",
        planName: string,
        recurringPrice: string,
        usagePrice?: string | null,
        billingPeriod: BillingPeriod,
      } | null,
      changeEffectiveDate: string,
      proratedCredit?: string | null,
      proratedCharge: string,
      totalAmountDueToday: string,
    } | null,
  };
  
  export type ListAddressesByOrgQueryVariables = {
    orgId: string,
  };
  
  export type ListAddressesByOrgQuery = {
    listAddressesByOrg?:  Array< {
      __typename: "Address",
      id: string,
      userId?: string | null,
      cognitoUserId?: string | null,
      orgId?: string | null,
      streetAddress: string,
      streetAddress2?: string | null,
      city: string,
      stateOrProvince?: string | null,
      postalCode?: string | null,
      country: string,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null > | null,
  };
  
  export type GetCartByIdQueryVariables = {
    cartId: string,
  };
  
  export type GetCartByIdQuery = {
    getCartById?:  {
      __typename: "CartMeta",
      cartId: string,
      status: CartStatus,
      buyerOrgId?: string | null,
      buyerEmail: string,
      userId: string,
      cognitoUserId: string,
      sessionID?: string | null,
      items:  Array< {
        __typename: "CartItem",
        cartId: string,
        cartItemId: string,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        duplex: boolean,
        partner: number,
        envelopeSku?: string | null,
        createdAt: string,
        updatedAt: string,
      } >,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      fulfillmentMetaId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type GetCartByUserIdQueryVariables = {
    userId: string,
    status?: CartStatus | null,
  };
  
  export type GetCartByUserIdQuery = {
    getCartByUserId?:  {
      __typename: "CartMeta",
      cartId: string,
      status: CartStatus,
      buyerOrgId?: string | null,
      buyerEmail: string,
      userId: string,
      cognitoUserId: string,
      sessionID?: string | null,
      items:  Array< {
        __typename: "CartItem",
        cartId: string,
        cartItemId: string,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        duplex: boolean,
        partner: number,
        envelopeSku?: string | null,
        createdAt: string,
        updatedAt: string,
      } >,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      fulfillmentMetaId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type GetCartBySessionIdQueryVariables = {
    sessionId: string,
  };
  
  export type GetCartBySessionIdQuery = {
    getCartBySessionId?:  {
      __typename: "CartMeta",
      cartId: string,
      status: CartStatus,
      buyerOrgId?: string | null,
      buyerEmail: string,
      userId: string,
      cognitoUserId: string,
      sessionID?: string | null,
      items:  Array< {
        __typename: "CartItem",
        cartId: string,
        cartItemId: string,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        duplex: boolean,
        partner: number,
        envelopeSku?: string | null,
        createdAt: string,
        updatedAt: string,
      } >,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      fulfillmentMetaId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type GetCartForCurrentUserQuery = {
    getCartForCurrentUser?:  {
      __typename: "CartMeta",
      cartId: string,
      status: CartStatus,
      buyerOrgId?: string | null,
      buyerEmail: string,
      userId: string,
      cognitoUserId: string,
      sessionID?: string | null,
      items:  Array< {
        __typename: "CartItem",
        cartId: string,
        cartItemId: string,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        duplex: boolean,
        partner: number,
        envelopeSku?: string | null,
        createdAt: string,
        updatedAt: string,
      } >,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      fulfillmentMetaId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type ListProductTypesQuery = {
    listProductTypes?:  Array< {
      __typename: "ProductType",
      productTypeId: string,
      productType: ProductCategory,
      name: string,
      description?: string | null,
      filterLabelInt1?: string | null,
      filterLabelInt2?: string | null,
      filterLabelDecimal1?: string | null,
      filterLabelText1?: string | null,
      attributes:  Array< {
        __typename: "ProductAttributeOptions",
        attributeName: string,
        attributeValues: Array< string >,
      } >,
    } | null > | null,
  };
  
  export type GetProductTypeQueryVariables = {
    productCategory: ProductCategory,
  };
  
  export type GetProductTypeQuery = {
    getProductType?:  {
      __typename: "ProductType",
      productTypeId: string,
      productType: ProductCategory,
      name: string,
      description?: string | null,
      filterLabelInt1?: string | null,
      filterLabelInt2?: string | null,
      filterLabelDecimal1?: string | null,
      filterLabelText1?: string | null,
      attributes:  Array< {
        __typename: "ProductAttributeOptions",
        attributeName: string,
        attributeValues: Array< string >,
      } >,
    } | null,
  };
  
  export type ListPricingTiersBySkuIdQueryVariables = {
    skuId: number,
    quantity?: number | null,
  };
  
  export type ListPricingTiersBySkuIdQuery = {
    listPricingTiersBySkuId?:  Array< {
      __typename: "SkuPricingTier",
      pricingTierId: string,
      skuId?: string | null,
      internalSku?: string | null,
      quantityMin: number,
      quantityMax?: number | null,
      retailPriceInCents: number,
      wholesalePriceInCents: number,
    } | null > | null,
  };
  
  export type GetSkuByIdQueryVariables = {
    skuId: number,
  };
  
  export type GetSkuByIdQuery = {
    getSkuById?:  {
      __typename: "Sku",
      skuId: string,
      productName?: string | null,
      vendorName?: string | null,
      vendorSku?: string | null,
      pricingType?: PricingType | null,
      internalSku: string,
      retailPriceInCents?: number | null,
      costInCents?: number | null,
      wholesalePriceInCents?: number | null,
      pricingTiers?:  Array< {
        __typename: "SkuPricingTier",
        pricingTierId: string,
        skuId?: string | null,
        internalSku?: string | null,
        quantityMin: number,
        quantityMax?: number | null,
        retailPriceInCents: number,
        wholesalePriceInCents: number,
      } | null > | null,
      attributes?:  Array< {
        __typename: "ProductAttribute",
        name: string,
        value: string,
      } | null > | null,
      relatedItems?:  Array< {
        __typename: "RelatedItem",
        skuId: string,
        productName: string,
        vendorName: string,
        vendorSku?: string | null,
        pricingType: PricingType,
        internalSku: string,
        retailPriceInCents?: number | null,
        costInCents: number,
        wholesalePriceInCents?: number | null,
        stock?: number | null,
      } | null > | null,
      stock?: number | null,
    } | null,
  };
  
  export type GetSkuQueryVariables = {
    internalSku: string,
  };
  
  export type GetSkuQuery = {
    getSku?:  {
      __typename: "OrderSku",
      internalSku: string,
      vendorId: string,
      productName: string,
      pricingType: PricingType,
      retailPriceInCents?: number | null,
      minQuantity?: number | null,
    } | null,
  };
  
  export type ListSkusByCriteriaQueryVariables = {
    productCategory: ProductCategory,
    field1: string,
    field2?: string | null,
    field3?: string | null,
  };
  
  export type ListSkusByCriteriaQuery = {
    listSkusByCriteria?:  Array< {
      __typename: "OrderSku",
      internalSku: string,
      vendorId: string,
      productName: string,
      pricingType: PricingType,
      retailPriceInCents?: number | null,
      minQuantity?: number | null,
    } | null > | null,
  };
  
  export type ListRelatedSkusQueryVariables = {
    internalSku: string,
  };
  
  export type ListRelatedSkusQuery = {
    listRelatedSkus?:  Array< {
      __typename: "OrderSku",
      internalSku: string,
      vendorId: string,
      productName: string,
      pricingType: PricingType,
      retailPriceInCents?: number | null,
      minQuantity?: number | null,
    } | null > | null,
  };
  
  export type ListPricingTiersBySkuQueryVariables = {
    internalSku: string,
    quantity?: number | null,
  };
  
  export type ListPricingTiersBySkuQuery = {
    listPricingTiersBySku?:  Array< {
      __typename: "SkuPricingTier",
      pricingTierId: string,
      skuId?: string | null,
      internalSku?: string | null,
      quantityMin: number,
      quantityMax?: number | null,
      retailPriceInCents: number,
      wholesalePriceInCents: number,
    } | null > | null,
  };
  
  export type SearchDesignsQueryVariables = {
    orgId: string,
    designType?: DesignType | null,
    searchTerms: DesignSearchInput,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SearchDesignsQuery = {
    searchDesigns?:  {
      __typename: "ModelDesignSearchConnection",
      items?:  Array< {
        __typename: "DesignMeta",
        designId: string,
        designName: string,
        description?: string | null,
        metaDescription?: string | null,
        designType: DesignType,
        editorType?: EditorType | null,
        legacyId?: number | null,
        orderId?: string | null,
        draftVersion: number,
        publishedVersion: number,
        publishedEditorType?: EditorType | null,
        thumbnailFilePath?: string | null,
        orgId: string,
        sellerOrgId?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      itemSets?:  Array< {
        __typename: "ItemSetMeta",
        setId: string,
        itemType: ItemType,
        setType: SetType,
        setTypeId?: string | null,
        setTypeVersion?: number | null,
        itemCount?: number | null,
        name: string,
        parentId?: string | null,
        orgId: string,
        migrationVersion?: number | null,
        hasChildren?: boolean | null,
        updatedAt?: string | null,
        createdAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type GetDesignQueryVariables = {
    designId: string,
    designVersionType: DesignVersionType,
    pageId?: number | null,
    version?: number | null,
  };
  
  export type GetDesignQuery = {
    getDesign?:  {
      __typename: "Design",
      designDetails?:  {
        __typename: "DesignDetails",
        designId: string,
        version: number,
        pageCount: number,
        designName: string,
        designType: DesignType,
        pageMap?:  Array< {
          __typename: "PageInfo",
          pageId: number,
          pageThumbnailFilePath?: string | null,
          name?: string | null,
          primary?: boolean | null,
        } | null > | null,
        pixelsPerUnit: number,
        displayUnit: DesignUnit,
        pixelDensityUnit: PixelDensityUnit,
        defaultPageRows: number,
        defaultPageColumns: number,
        defaultPageHeight: string,
        defaultPageWidth: string,
        defaultPageBleed: string,
        defaultDisplayPageBleed: boolean,
        defaultSectionHeight?: number | null,
        defaultSectionWidth?: number | null,
        editorType: EditorType,
        editorVersion?: string | null,
        payload?: string | null,
        customerBackgrounds?: Array< string | null > | null,
        customerFonts?: Array< string | null > | null,
        customerGraphics?: Array< string | null > | null,
        customerShapes?: Array< string | null > | null,
        designFonts?: Array< string | null > | null,
        designGraphics?: Array< string | null > | null,
        orgId?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null,
      designPage?:  Array< {
        __typename: "DesignPage",
        pageId: number,
        pageRows?: number | null,
        pageColumns?: number | null,
        pageHeight?: string | null,
        pageWidth?: string | null,
        pageBleed?: string | null,
        displayPageBleed?: boolean | null,
        sectionHeight?: number | null,
        sectionWidth?: number | null,
        customThumbnail?: boolean | null,
        pageThumbnailFilePath?: string | null,
        payload?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
        pageSections?:  Array< {
          __typename: "PageSection",
          section: number,
          payload?: string | null,
          lastModifiedToken?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | null > | null,
      } | null > | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type GetDesignMetaQueryVariables = {
    designId: string,
  };
  
  export type GetDesignMetaQuery = {
    getDesignMeta?:  {
      __typename: "DesignMeta",
      designId: string,
      designName: string,
      description?: string | null,
      metaDescription?: string | null,
      designType: DesignType,
      editorType?: EditorType | null,
      legacyId?: number | null,
      orderId?: string | null,
      draftVersion: number,
      publishedVersion: number,
      publishedEditorType?: EditorType | null,
      thumbnailFilePath?: string | null,
      orgId: string,
      sellerOrgId?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetDesignDetailsQueryVariables = {
    designId: string,
    version: number,
  };
  
  export type GetDesignDetailsQuery = {
    getDesignDetails?:  {
      __typename: "DesignDetails",
      designId: string,
      version: number,
      pageCount: number,
      designName: string,
      designType: DesignType,
      pageMap?:  Array< {
        __typename: "PageInfo",
        pageId: number,
        pageThumbnailFilePath?: string | null,
        name?: string | null,
        primary?: boolean | null,
      } | null > | null,
      pixelsPerUnit: number,
      displayUnit: DesignUnit,
      pixelDensityUnit: PixelDensityUnit,
      defaultPageRows: number,
      defaultPageColumns: number,
      defaultPageHeight: string,
      defaultPageWidth: string,
      defaultPageBleed: string,
      defaultDisplayPageBleed: boolean,
      defaultSectionHeight?: number | null,
      defaultSectionWidth?: number | null,
      editorType: EditorType,
      editorVersion?: string | null,
      payload?: string | null,
      customerBackgrounds?: Array< string | null > | null,
      customerFonts?: Array< string | null > | null,
      customerGraphics?: Array< string | null > | null,
      customerShapes?: Array< string | null > | null,
      designFonts?: Array< string | null > | null,
      designGraphics?: Array< string | null > | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetDesignPageQueryVariables = {
    designId: string,
    pageId: number,
    version: number,
  };
  
  export type GetDesignPageQuery = {
    getDesignPage?:  {
      __typename: "DesignPage",
      pageId: number,
      pageRows?: number | null,
      pageColumns?: number | null,
      pageHeight?: string | null,
      pageWidth?: string | null,
      pageBleed?: string | null,
      displayPageBleed?: boolean | null,
      sectionHeight?: number | null,
      sectionWidth?: number | null,
      customThumbnail?: boolean | null,
      pageThumbnailFilePath?: string | null,
      payload?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
      pageSections?:  Array< {
        __typename: "PageSection",
        section: number,
        payload?: string | null,
        lastModifiedToken?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
    } | null,
  };
  
  export type ListDesignsByOrgQueryVariables = {
    orgId: string,
    designType: DesignType,
    sortBy?: DesignSortFields | null,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelDesignFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListDesignsByOrgQuery = {
    listDesignsByOrg?:  {
      __typename: "ModelDesignMetaConnection",
      items?:  Array< {
        __typename: "DesignMeta",
        designId: string,
        designName: string,
        description?: string | null,
        metaDescription?: string | null,
        designType: DesignType,
        editorType?: EditorType | null,
        legacyId?: number | null,
        orderId?: string | null,
        draftVersion: number,
        publishedVersion: number,
        publishedEditorType?: EditorType | null,
        thumbnailFilePath?: string | null,
        orgId: string,
        sellerOrgId?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListDesignsByAssetQueryVariables = {
    assetId: string,
    assetType: AssetType,
    orgId?: string | null,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelDesignFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListDesignsByAssetQuery = {
    listDesignsByAsset?:  {
      __typename: "ModelDesignMetaConnection",
      items?:  Array< {
        __typename: "DesignMeta",
        designId: string,
        designName: string,
        description?: string | null,
        metaDescription?: string | null,
        designType: DesignType,
        editorType?: EditorType | null,
        legacyId?: number | null,
        orderId?: string | null,
        draftVersion: number,
        publishedVersion: number,
        publishedEditorType?: EditorType | null,
        thumbnailFilePath?: string | null,
        orgId: string,
        sellerOrgId?: string | null,
        migrationVersion?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListActiveEntitlementsByOrgByFeatureQueryVariables = {
    orgId: string,
    entitlementFeature: EntitlementFeature,
  };
  
  export type ListActiveEntitlementsByOrgByFeatureQuery = {
    listActiveEntitlementsByOrgByFeature:  Array< {
      __typename: "EntitlementInstance",
      entitlementInstanceId: string,
      orgId: string,
      entitlementFeature: EntitlementFeature,
      entitlementTerm: PlanTerm,
      entitlementStatus: EntitlementStatus,
      includedQuantity: number,
      usedQuantity: number,
      startDate?: string | null,
      endDate?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
  };
  
  export type ListEntitlementsByOrgQueryVariables = {
    orgId: string,
    entitlementStatus: EntitlementStatus,
  };
  
  export type ListEntitlementsByOrgQuery = {
    listEntitlementsByOrg:  Array< {
      __typename: "EntitlementInstance",
      entitlementInstanceId: string,
      orgId: string,
      entitlementFeature: EntitlementFeature,
      entitlementTerm: PlanTerm,
      entitlementStatus: EntitlementStatus,
      includedQuantity: number,
      usedQuantity: number,
      startDate?: string | null,
      endDate?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
  };
  
  export type GetFulfillmentMetaQueryVariables = {
    fulfillmentId: string,
  };
  
  export type GetFulfillmentMetaQuery = {
    getFulfillmentMeta?:  {
      __typename: "FulfillmentMeta",
      fulfillmentId: string,
      cartId: string,
      status: FulfillmentStatus,
      buyerOrgId: string,
      buyerEmail?: string | null,
      cognitoUserId?: string | null,
      userId: string,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      expectedShipDate?: string | null,
      trackingNumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type GetFulfillmentOrderQueryVariables = {
    fulfillmentId: string,
  };
  
  export type GetFulfillmentOrderQuery = {
    getFulfillmentOrder?:  {
      __typename: "FulfillmentOrder",
      fulfillmentId: string,
      cartId?: string | null,
      fulfillmentItems?:  Array< {
        __typename: "FulfillmentItem",
        fulfillmentId: string,
        outputId?: string | null,
        designId: string,
        designerOrgId: string,
        designerEmail: string,
        itemThumbnail?: string | null,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        orderId?: string | null,
        quantity: number,
        internalSku: string,
        envelopeSku?: string | null,
        duplex: boolean,
        partner: number,
        lineItem: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      status: FulfillmentStatus,
      buyerOrgId: string,
      buyerEmail?: string | null,
      cognitoUserId: string,
      shippingMethod?: ShippingMethod | null,
      shippingAddressee?: string | null,
      shippingCompany?: string | null,
      shippingAddress1?: string | null,
      shippingAddress2?: string | null,
      shippingCity?: string | null,
      shippingState?: string | null,
      shippingPostalCode?: string | null,
      shippingCountryCode?: string | null,
      expectedShipDate?: string | null,
      trackingNumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type GetIntegrationMetaQueryVariables = {
    integrationId: string,
  };
  
  export type GetIntegrationMetaQuery = {
    getIntegrationMeta?:  {
      __typename: "Integration",
      integrationId: string,
      orgId: string,
      batch: number,
      source: IntegrationSource,
      type: IntegrationType,
      status: IntegrationStatus,
      integrationUserId?: string | null,
      credentials: string,
      attributes?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type ListIntegrationsByOrgQueryVariables = {
    orgId: string,
    source?: IntegrationSource | null,
    filter?: ModelIntegrationFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListIntegrationsByOrgQuery = {
    listIntegrationsByOrg?:  {
      __typename: "ModelIntegrationConnection",
      items?:  Array< {
        __typename: "Integration",
        integrationId: string,
        orgId: string,
        batch: number,
        source: IntegrationSource,
        type: IntegrationType,
        status: IntegrationStatus,
        integrationUserId?: string | null,
        credentials: string,
        attributes?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type FetchNextIntegrationBatchQueryVariables = {
    source: IntegrationSource,
    status: IntegrationStatus,
    batch?: number | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type FetchNextIntegrationBatchQuery = {
    fetchNextIntegrationBatch?:  {
      __typename: "ModelIntegrationConnection",
      items?:  Array< {
        __typename: "Integration",
        integrationId: string,
        orgId: string,
        batch: number,
        source: IntegrationSource,
        type: IntegrationType,
        status: IntegrationStatus,
        integrationUserId?: string | null,
        credentials: string,
        attributes?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type SearchItemSetsQueryVariables = {
    orgId: string,
    itemType: ItemType,
    setType: SetType,
    searchTerms: ItemSetSearchInput,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SearchItemSetsQuery = {
    searchItemSets?:  {
      __typename: "ModelItemSetSearchConnection",
      items?:  Array< {
        __typename: "ItemSetMeta",
        setId: string,
        itemType: ItemType,
        setType: SetType,
        setTypeId?: string | null,
        setTypeVersion?: number | null,
        itemCount?: number | null,
        name: string,
        parentId?: string | null,
        orgId: string,
        migrationVersion?: number | null,
        hasChildren?: boolean | null,
        updatedAt?: string | null,
        createdAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type ListItemSetsByOrgQueryVariables = {
    itemType: ItemType,
    setType: SetType,
    orgId: string,
    parentId?: string | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListItemSetsByOrgQuery = {
    listItemSetsByOrg?:  {
      __typename: "ItemSetMetaConnection",
      items?:  Array< {
        __typename: "ItemSetMeta",
        setId: string,
        itemType: ItemType,
        setType: SetType,
        setTypeId?: string | null,
        setTypeVersion?: number | null,
        itemCount?: number | null,
        name: string,
        parentId?: string | null,
        orgId: string,
        migrationVersion?: number | null,
        hasChildren?: boolean | null,
        updatedAt?: string | null,
        createdAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListSetsByItemQueryVariables = {
    itemId: string,
    itemType: ItemType,
    setType: Array< SetType >,
    orgId?: string | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListSetsByItemQuery = {
    listSetsByItem?:  {
      __typename: "ItemSetMetaConnection",
      items?:  Array< {
        __typename: "ItemSetMeta",
        setId: string,
        itemType: ItemType,
        setType: SetType,
        setTypeId?: string | null,
        setTypeVersion?: number | null,
        itemCount?: number | null,
        name: string,
        parentId?: string | null,
        orgId: string,
        migrationVersion?: number | null,
        hasChildren?: boolean | null,
        updatedAt?: string | null,
        createdAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListSetsBySetTypeQueryVariables = {
    setType: SetType,
    setTypeId: string,
    setTypeVersion?: number | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListSetsBySetTypeQuery = {
    listSetsBySetType?:  {
      __typename: "ItemSetMetaConnection",
      items?:  Array< {
        __typename: "ItemSetMeta",
        setId: string,
        itemType: ItemType,
        setType: SetType,
        setTypeId?: string | null,
        setTypeVersion?: number | null,
        itemCount?: number | null,
        name: string,
        parentId?: string | null,
        orgId: string,
        migrationVersion?: number | null,
        hasChildren?: boolean | null,
        updatedAt?: string | null,
        createdAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListItemsBySetTypeQueryVariables = {
    setTypeId: string,
    setType: SetType,
    itemType: ItemType,
    setTypeVersion?: number | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListItemsBySetTypeQuery = {
    listItemsBySetType?:  {
      __typename: "ItemConnection",
      items:  Array<( {
          __typename: "AssetMeta",
          assetId: string,
          assetType: AssetType,
          assetSubType: AssetSubType,
          filePath?: string | null,
          thumbnailFilePath?: string | null,
          optimizedFilePath?: string | null,
          watermarkDemo?: boolean | null,
          attributes?: string | null,
          checksum?: string | null,
          name: string,
          filename: string,
          orgId: string,
          orgIcon?: string | null,
          metadata?: string | null,
          keywords?: string | null,
          description?: string | null,
          migrationVersion?: number | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | {
          __typename: "DesignMeta",
          designId: string,
          designName: string,
          description?: string | null,
          metaDescription?: string | null,
          designType: DesignType,
          editorType?: EditorType | null,
          legacyId?: number | null,
          orderId?: string | null,
          draftVersion: number,
          publishedVersion: number,
          publishedEditorType?: EditorType | null,
          thumbnailFilePath?: string | null,
          orgId: string,
          sellerOrgId?: string | null,
          migrationVersion?: number | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | {
          __typename: "ListingMeta",
          listingId: string,
          name: string,
          description?: string | null,
          metaDescription?: string | null,
          orgId: string,
          publishedVersion: number,
          legacyListingId?: string | null,
          draftVersion: number,
          orderCount?: number | null,
          migrationVersion?: number | null,
          integrationSources?: Array< IntegrationSource | null > | null,
          listingThumbnail?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | {
          __typename: "ItemSetMeta",
          setId: string,
          itemType: ItemType,
          setType: SetType,
          setTypeId?: string | null,
          setTypeVersion?: number | null,
          itemCount?: number | null,
          name: string,
          parentId?: string | null,
          orgId: string,
          migrationVersion?: number | null,
          hasChildren?: boolean | null,
          updatedAt?: string | null,
          createdAt?: string | null,
          expirationTime?: number | null,
        } | {
          __typename: "Plugin",
          pluginId: string,
          name: string,
          slug: string,
          briefDescription: string,
          previewImage: string,
          pluginStatus?: PluginStatus | null,
          minVersion?: string | null,
          maxVersion?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        }
      ) | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListItemsBySetQueryVariables = {
    setId: string,
    setType: SetType,
    itemType: ItemType,
    orgId?: string | null,
    limit?: number | null,
    sortBy?: ListItemItemsSetSortFields | null,
    sortDirection?: ModelSortDirection | null,
    nextToken?: string | null,
  };
  
  export type ListItemsBySetQuery = {
    listItemsBySet?:  {
      __typename: "ItemConnection",
      items:  Array<( {
          __typename: "AssetMeta",
          assetId: string,
          assetType: AssetType,
          assetSubType: AssetSubType,
          filePath?: string | null,
          thumbnailFilePath?: string | null,
          optimizedFilePath?: string | null,
          watermarkDemo?: boolean | null,
          attributes?: string | null,
          checksum?: string | null,
          name: string,
          filename: string,
          orgId: string,
          orgIcon?: string | null,
          metadata?: string | null,
          keywords?: string | null,
          description?: string | null,
          migrationVersion?: number | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | {
          __typename: "DesignMeta",
          designId: string,
          designName: string,
          description?: string | null,
          metaDescription?: string | null,
          designType: DesignType,
          editorType?: EditorType | null,
          legacyId?: number | null,
          orderId?: string | null,
          draftVersion: number,
          publishedVersion: number,
          publishedEditorType?: EditorType | null,
          thumbnailFilePath?: string | null,
          orgId: string,
          sellerOrgId?: string | null,
          migrationVersion?: number | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | {
          __typename: "ListingMeta",
          listingId: string,
          name: string,
          description?: string | null,
          metaDescription?: string | null,
          orgId: string,
          publishedVersion: number,
          legacyListingId?: string | null,
          draftVersion: number,
          orderCount?: number | null,
          migrationVersion?: number | null,
          integrationSources?: Array< IntegrationSource | null > | null,
          listingThumbnail?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        } | {
          __typename: "ItemSetMeta",
          setId: string,
          itemType: ItemType,
          setType: SetType,
          setTypeId?: string | null,
          setTypeVersion?: number | null,
          itemCount?: number | null,
          name: string,
          parentId?: string | null,
          orgId: string,
          migrationVersion?: number | null,
          hasChildren?: boolean | null,
          updatedAt?: string | null,
          createdAt?: string | null,
          expirationTime?: number | null,
        } | {
          __typename: "Plugin",
          pluginId: string,
          name: string,
          slug: string,
          briefDescription: string,
          previewImage: string,
          pluginStatus?: PluginStatus | null,
          minVersion?: string | null,
          maxVersion?: string | null,
          createdAt?: string | null,
          updatedAt?: string | null,
          expirationTime?: number | null,
        }
      ) | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type GetItemSetMetaQueryVariables = {
    setId: string,
    itemType: ItemType,
    setType: SetType,
    orgId?: string | null,
  };
  
  export type GetItemSetMetaQuery = {
    getItemSetMeta?:  {
      __typename: "ItemSetMeta",
      setId: string,
      itemType: ItemType,
      setType: SetType,
      setTypeId?: string | null,
      setTypeVersion?: number | null,
      itemCount?: number | null,
      name: string,
      parentId?: string | null,
      orgId: string,
      migrationVersion?: number | null,
      hasChildren?: boolean | null,
      updatedAt?: string | null,
      createdAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type SearchListingsQueryVariables = {
    orgId: string,
    searchTerms: ListingSearchInput,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SearchListingsQuery = {
    searchListings?:  {
      __typename: "ModelListingSearchConnection",
      items?:  Array< {
        __typename: "ListingMeta",
        listingId: string,
        name: string,
        description?: string | null,
        metaDescription?: string | null,
        orgId: string,
        publishedVersion: number,
        legacyListingId?: string | null,
        draftVersion: number,
        orderCount?: number | null,
        migrationVersion?: number | null,
        integrationSources?: Array< IntegrationSource | null > | null,
        listingThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      itemSets?: Array< string | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type GetListingQueryVariables = {
    listingId: string,
    listingVersionType: ListingVersionType,
    version?: number | null,
  };
  
  export type GetListingQuery = {
    getListing?:  {
      __typename: "Listing",
      listingId: string,
      version: number,
      orgId: string,
      name: string,
      attributes?: string | null,
      defaultMaxDownloads?: number | null,
      defaultExpireDays?: number | null,
      orderCount?: number | null,
      integrations?:  Array< {
        __typename: "ListingIntegration",
        listingId: string,
        sourceListingId?: string | null,
        source: IntegrationSource,
        integrationId: string,
        integrationAttributes?: string | null,
        demoKey?: string | null,
      } | null > | null,
      designMap: Array< string | null >,
      designs?:  Array< {
        __typename: "ListingDesign",
        listingId: string,
        designId: string,
        orgId: string,
        designName: string,
        designPrintOptions?: string | null,
        designListingAttributes?: string | null,
        designType?: DesignType | null,
        maxDownloads?: number | null,
        expireDays?: number | null,
        listingDesignType?: ListingDesignType | null,
        excludeFromUsage?: ListingUsageType | null,
        designThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null > | null,
      designCount?: number | null,
      listingThumbnail?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type GetListingByDemoKeyQueryVariables = {
    demoKey: string,
  };
  
  export type GetListingByDemoKeyQuery = {
    getListingByDemoKey?:  {
      __typename: "Listing",
      listingId: string,
      version: number,
      orgId: string,
      name: string,
      attributes?: string | null,
      defaultMaxDownloads?: number | null,
      defaultExpireDays?: number | null,
      orderCount?: number | null,
      integrations?:  Array< {
        __typename: "ListingIntegration",
        listingId: string,
        sourceListingId?: string | null,
        source: IntegrationSource,
        integrationId: string,
        integrationAttributes?: string | null,
        demoKey?: string | null,
      } | null > | null,
      designMap: Array< string | null >,
      designs?:  Array< {
        __typename: "ListingDesign",
        listingId: string,
        designId: string,
        orgId: string,
        designName: string,
        designPrintOptions?: string | null,
        designListingAttributes?: string | null,
        designType?: DesignType | null,
        maxDownloads?: number | null,
        expireDays?: number | null,
        listingDesignType?: ListingDesignType | null,
        excludeFromUsage?: ListingUsageType | null,
        designThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null > | null,
      designCount?: number | null,
      listingThumbnail?: string | null,
      migrationVersion?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type IsVersion2DemoKeyQueryVariables = {
    demoKey: string,
  };
  
  export type IsVersion2DemoKeyQuery = {
    isVersion2DemoKey?: boolean | null,
  };
  
  export type GetListingByIntegrationSourceListingIdQueryVariables = {
    sourceListingId: string,
    source: IntegrationSource,
    integrationId?: string | null,
  };
  
  export type GetListingByIntegrationSourceListingIdQuery = {
    getListingByIntegrationSourceListingId?:  {
      __typename: "ListingMeta",
      listingId: string,
      name: string,
      description?: string | null,
      metaDescription?: string | null,
      orgId: string,
      publishedVersion: number,
      legacyListingId?: string | null,
      draftVersion: number,
      orderCount?: number | null,
      migrationVersion?: number | null,
      integrationSources?: Array< IntegrationSource | null > | null,
      listingThumbnail?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type ListListingsByIntegrationSourceListingIdQueryVariables = {
    sourceListingId: string,
    source: IntegrationSource,
    integrationId?: string | null,
  };
  
  export type ListListingsByIntegrationSourceListingIdQuery = {
    listListingsByIntegrationSourceListingId?:  {
      __typename: "ModelListingIntegrationConnection",
      items?:  Array< {
        __typename: "ListingIntegration",
        listingId: string,
        sourceListingId?: string | null,
        source: IntegrationSource,
        integrationId: string,
        integrationAttributes?: string | null,
        demoKey?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListListingsByDesignQueryVariables = {
    designId: string,
  };
  
  export type ListListingsByDesignQuery = {
    listListingsByDesign?:  {
      __typename: "ModelListingConnection",
      items?:  Array< {
        __typename: "ListingMeta",
        listingId: string,
        name: string,
        description?: string | null,
        metaDescription?: string | null,
        orgId: string,
        publishedVersion: number,
        legacyListingId?: string | null,
        draftVersion: number,
        orderCount?: number | null,
        migrationVersion?: number | null,
        integrationSources?: Array< IntegrationSource | null > | null,
        listingThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListListingsByOrgQueryVariables = {
    orgId: string,
    sortBy?: ListingSortFields | null,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelListingFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListListingsByOrgQuery = {
    listListingsByOrg?:  {
      __typename: "ModelListingConnection",
      items?:  Array< {
        __typename: "ListingMeta",
        listingId: string,
        name: string,
        description?: string | null,
        metaDescription?: string | null,
        orgId: string,
        publishedVersion: number,
        legacyListingId?: string | null,
        draftVersion: number,
        orderCount?: number | null,
        migrationVersion?: number | null,
        integrationSources?: Array< IntegrationSource | null > | null,
        listingThumbnail?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type _emptyQueryQuery = {
    _emptyQuery?: boolean | null,
  };
  
  export type GetOrderQueryVariables = {
    orderId: string,
  };
  
  export type GetOrderQuery = {
    getOrder?:  {
      __typename: "Order",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      orderCost?: number | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      listings:  Array< {
        __typename: "OrderListingAttributes",
        listingId: string,
        lineItem: string,
        listingName: string,
        listingOrderData?: string | null,
        isComplete?: boolean | null,
        expirationDate?: string | null,
      } | null >,
      designs:  Array< {
        __typename: "OrderDesignAttributes",
        designId: string,
        designVersion?: number | null,
        listingId?: string | null,
        lineItem: string,
        sortIndex: string,
        buyerDesignId?: string | null,
        designStatus?: DesignOrderStatus | null,
        designListingAttributes?: string | null,
        designPrintOptions?: string | null,
        designType?: string | null,
        designName?: string | null,
        thumbnailFilePath?: string | null,
        downloadsAllowed?: number | null,
        downloadsUsed?: number | null,
        expirationDate?: string | null,
        listingDesignType?: ListingDesignType | null,
      } | null >,
      orgId: string,
      orderClaimCode?: string | null,
      designerClaimCode?: string | null,
      legacyOrderId?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingStatus?: OrderBillingStatus | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      workflowStatus: WorkflowStatus,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
  };
  
  export type ValidateOrderEmailQueryVariables = {
    orderClaimCode: string,
    emailAddress: string,
  };
  
  export type ValidateOrderEmailQuery = {
    validateOrderEmail?: boolean | null,
  };
  
  export type GetOrderBySourceOrderIdQueryVariables = {
    source: OrderSource,
    sourceOrderId: string,
    buyerEmail?: string | null,
  };
  
  export type GetOrderBySourceOrderIdQuery = {
    getOrderBySourceOrderId?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type GetOrderByClaimCodeQueryVariables = {
    claimCode: string,
  };
  
  export type GetOrderByClaimCodeQuery = {
    getOrderByClaimCode?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type GetOrderByLegacyLinkQueryVariables = {
    legacyLink?: string | null,
  };
  
  export type GetOrderByLegacyLinkQuery = {
    getOrderByLegacyLink?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type GetOrderByCorjl1OrderIdQueryVariables = {
    corjl1OrderId?: string | null,
  };
  
  export type GetOrderByCorjl1OrderIdQuery = {
    getOrderByCorjl1OrderId?:  {
      __typename: "OrderMeta",
      orderId: string,
      parentOrderId?: string | null,
      buyerAttributes?: string | null,
      buyerEmail?: string | null,
      buyerOrgId?: string | null,
      buyerId?: string | null,
      contactEmail?: string | null,
      orderType?: OrderType | null,
      orderName?: string | null,
      customerOrderName?: string | null,
      customerAttributes?: string | null,
      invoiceId?: string | null,
      usageId?: string | null,
      orgId: string,
      legacyLink?: string | null,
      source: OrderSource,
      sourceAttributes?: string | null,
      orderClaimCode?: string | null,
      sourceOrderId?: string | null,
      ordersAllowed?: number | null,
      ordersUsed?: number | null,
      billingQuantity?: number | null,
      billedQuantity?: number | null,
      usageCharge?: string | null,
      usageChargeAmount?: number | null,
      billingStatus?: OrderBillingStatus | null,
      status: OrderStatus,
      inventoryStatus?: InventoryStatus | null,
      migrationVersion?: number | null,
      workflowStatus: WorkflowStatus,
      importPending?: boolean | null,
      logsImported?: boolean | null,
      exportComplete?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      thumbnailOrder?: string | null,
    } | null,
  };
  
  export type GetOrderLineItemQueryVariables = {
    emailAddress: string,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type GetOrderLineItemQuery = {
    getOrderLineItem?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListOrdersByEmailQueryVariables = {
    emailAddress: string,
    sortDirection?: ModelSortDirection | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListOrdersByEmailQuery = {
    listOrdersByEmail?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListPrepaidOrdersQueryVariables = {
    entitlementInstanceId: string,
    sortDirection?: ModelSortDirection | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListPrepaidOrdersQuery = {
    listPrepaidOrders?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListOrdersByBuyerOrgIdQueryVariables = {
    buyerOrgId: string,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelOrderFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListOrdersByBuyerOrgIdQuery = {
    listOrdersByBuyerOrgId?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListUnclaimedOrdersByBuyerOrgIdQueryVariables = {
    buyerOrgId: string,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelOrderFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListUnclaimedOrdersByBuyerOrgIdQuery = {
    listUnclaimedOrdersByBuyerOrgId?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListOrdersByOrgQueryVariables = {
    orgId: string,
    year: string,
    month: string,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelOrderFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListOrdersByOrgQuery = {
    listOrdersByOrg?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListPreOrdersByOrgQueryVariables = {
    orgId: string,
    inventoryStatus: InventoryStatus,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelOrderFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListPreOrdersByOrgQuery = {
    listPreOrdersByOrg?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListOrdersByStatusQueryVariables = {
    year: string,
    month: string,
    day: string,
    billingStatus: OrderBillingStatus,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListOrdersByStatusQuery = {
    listOrdersByStatus?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListOrdersByPreOrderIdQueryVariables = {
    orderId: string,
    billingStatus: OrderBillingStatus,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListOrdersByPreOrderIdQuery = {
    listOrdersByPreOrderId?:  {
      __typename: "ModelOrderConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type SearchOrdersQueryVariables = {
    orgId: string,
    asBuyer?: boolean | null,
    status?: OrderStatus | null,
    workflowStatus?: WorkflowStatus | null,
    source?: OrderSource | null,
    searchTerms: OrderSearchInput,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SearchOrdersQuery = {
    searchOrders?:  {
      __typename: "ModelOrderSearchConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type SupportSearchOrdersQueryVariables = {
    orgId?: string | null,
    status?: OrderStatus | null,
    workflowStatus?: WorkflowStatus | null,
    source?: OrderSource | null,
    searchTerms: OrderSearchInput,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SupportSearchOrdersQuery = {
    supportSearchOrders?:  {
      __typename: "ModelOrderSearchConnection",
      items?:  Array< {
        __typename: "OrderMeta",
        orderId: string,
        parentOrderId?: string | null,
        buyerAttributes?: string | null,
        buyerEmail?: string | null,
        buyerOrgId?: string | null,
        buyerId?: string | null,
        contactEmail?: string | null,
        orderType?: OrderType | null,
        orderName?: string | null,
        customerOrderName?: string | null,
        customerAttributes?: string | null,
        invoiceId?: string | null,
        usageId?: string | null,
        orgId: string,
        legacyLink?: string | null,
        source: OrderSource,
        sourceAttributes?: string | null,
        orderClaimCode?: string | null,
        sourceOrderId?: string | null,
        ordersAllowed?: number | null,
        ordersUsed?: number | null,
        billingQuantity?: number | null,
        billedQuantity?: number | null,
        usageCharge?: string | null,
        usageChargeAmount?: number | null,
        billingStatus?: OrderBillingStatus | null,
        status: OrderStatus,
        inventoryStatus?: InventoryStatus | null,
        migrationVersion?: number | null,
        workflowStatus: WorkflowStatus,
        importPending?: boolean | null,
        logsImported?: boolean | null,
        exportComplete?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        thumbnailOrder?: string | null,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type GetOrganizationQueryVariables = {
    orgId: string,
  };
  
  export type GetOrganizationQuery = {
    getOrganization?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetOrganizationByBillingUserIdQueryVariables = {
    billingUserId: string,
  };
  
  export type GetOrganizationByBillingUserIdQuery = {
    getOrganizationByBillingUserId?:  {
      __typename: "ModelOrganizationConnection",
      items?:  Array< {
        __typename: "Organization",
        orgId: string,
        type: OrgType,
        status: OrgStatus,
        statusConfirmed?: boolean | null,
        name: string,
        billingUserId?: string | null,
        billingCycleDay?: number | null,
        planId?: string | null,
        paymentUserId?: string | null,
        affiliateAccountId?: string | null,
        affiliateStatus?: AffiliateStatus | null,
        pusherId: string,
        parentOrgId?: string | null,
        managementOrgId?: string | null,
        corjlVersion?: string | null,
        attributes?: string | null,
        logoUrl?: string | null,
        avatarUrl?: string | null,
        designCount?: number | null,
        imageCount?: number | null,
        fontCount?: number | null,
        firstOrderDate?: string | null,
        listingCount?: number | null,
        outputCount?: number | null,
        orderCount?: number | null,
        migrationVersion?: number | null,
        billingPeriodOrderCount?: number | null,
        billingPeriodTransactionCost?: number | null,
        pendingOrderCount?: number | null,
        contactEmail?: string | null,
        totalStorageKBytes?: number | null,
        originalStorageKBytes?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type GetOrganizationByAffiliateAccountIdQueryVariables = {
    affiliateAccountId: string,
  };
  
  export type GetOrganizationByAffiliateAccountIdQuery = {
    getOrganizationByAffiliateAccountId?:  {
      __typename: "Organization",
      orgId: string,
      type: OrgType,
      status: OrgStatus,
      statusConfirmed?: boolean | null,
      name: string,
      billingUserId?: string | null,
      billingCycleDay?: number | null,
      planId?: string | null,
      paymentUserId?: string | null,
      affiliateAccountId?: string | null,
      affiliateStatus?: AffiliateStatus | null,
      pusherId: string,
      parentOrgId?: string | null,
      managementOrgId?: string | null,
      corjlVersion?: string | null,
      attributes?: string | null,
      logoUrl?: string | null,
      avatarUrl?: string | null,
      designCount?: number | null,
      imageCount?: number | null,
      fontCount?: number | null,
      firstOrderDate?: string | null,
      listingCount?: number | null,
      outputCount?: number | null,
      orderCount?: number | null,
      migrationVersion?: number | null,
      billingPeriodOrderCount?: number | null,
      billingPeriodTransactionCost?: number | null,
      pendingOrderCount?: number | null,
      contactEmail?: string | null,
      totalStorageKBytes?: number | null,
      originalStorageKBytes?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type ListOrganizationsByOrgQueryVariables = {
    orgId: string,
    filter?: ModelOrganizationFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListOrganizationsByOrgQuery = {
    listOrganizationsByOrg?:  {
      __typename: "ModelOrganizationConnection",
      items?:  Array< {
        __typename: "Organization",
        orgId: string,
        type: OrgType,
        status: OrgStatus,
        statusConfirmed?: boolean | null,
        name: string,
        billingUserId?: string | null,
        billingCycleDay?: number | null,
        planId?: string | null,
        paymentUserId?: string | null,
        affiliateAccountId?: string | null,
        affiliateStatus?: AffiliateStatus | null,
        pusherId: string,
        parentOrgId?: string | null,
        managementOrgId?: string | null,
        corjlVersion?: string | null,
        attributes?: string | null,
        logoUrl?: string | null,
        avatarUrl?: string | null,
        designCount?: number | null,
        imageCount?: number | null,
        fontCount?: number | null,
        firstOrderDate?: string | null,
        listingCount?: number | null,
        outputCount?: number | null,
        orderCount?: number | null,
        migrationVersion?: number | null,
        billingPeriodOrderCount?: number | null,
        billingPeriodTransactionCost?: number | null,
        pendingOrderCount?: number | null,
        contactEmail?: string | null,
        totalStorageKBytes?: number | null,
        originalStorageKBytes?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListOrganizationsQueryVariables = {
    status: OrgStatus,
    type: OrgType,
    bucket: number,
    billingCycleDay?: number | null,
    filter?: ModelOrganizationFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListOrganizationsQuery = {
    listOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      items?:  Array< {
        __typename: "Organization",
        orgId: string,
        type: OrgType,
        status: OrgStatus,
        statusConfirmed?: boolean | null,
        name: string,
        billingUserId?: string | null,
        billingCycleDay?: number | null,
        planId?: string | null,
        paymentUserId?: string | null,
        affiliateAccountId?: string | null,
        affiliateStatus?: AffiliateStatus | null,
        pusherId: string,
        parentOrgId?: string | null,
        managementOrgId?: string | null,
        corjlVersion?: string | null,
        attributes?: string | null,
        logoUrl?: string | null,
        avatarUrl?: string | null,
        designCount?: number | null,
        imageCount?: number | null,
        fontCount?: number | null,
        firstOrderDate?: string | null,
        listingCount?: number | null,
        outputCount?: number | null,
        orderCount?: number | null,
        migrationVersion?: number | null,
        billingPeriodOrderCount?: number | null,
        billingPeriodTransactionCost?: number | null,
        pendingOrderCount?: number | null,
        contactEmail?: string | null,
        totalStorageKBytes?: number | null,
        originalStorageKBytes?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListMyOrganizationsQueryVariables = {
    filter?: ModelOrganizationFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListMyOrganizationsQuery = {
    listMyOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      items?:  Array< {
        __typename: "Organization",
        orgId: string,
        type: OrgType,
        status: OrgStatus,
        statusConfirmed?: boolean | null,
        name: string,
        billingUserId?: string | null,
        billingCycleDay?: number | null,
        planId?: string | null,
        paymentUserId?: string | null,
        affiliateAccountId?: string | null,
        affiliateStatus?: AffiliateStatus | null,
        pusherId: string,
        parentOrgId?: string | null,
        managementOrgId?: string | null,
        corjlVersion?: string | null,
        attributes?: string | null,
        logoUrl?: string | null,
        avatarUrl?: string | null,
        designCount?: number | null,
        imageCount?: number | null,
        fontCount?: number | null,
        firstOrderDate?: string | null,
        listingCount?: number | null,
        outputCount?: number | null,
        orderCount?: number | null,
        migrationVersion?: number | null,
        billingPeriodOrderCount?: number | null,
        billingPeriodTransactionCost?: number | null,
        pendingOrderCount?: number | null,
        contactEmail?: string | null,
        totalStorageKBytes?: number | null,
        originalStorageKBytes?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type SupportSearchOrganizationsQueryVariables = {
    orgType?: OrgType | null,
    searchTerms: OrganizationSearchInput,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SupportSearchOrganizationsQuery = {
    supportSearchOrganizations?:  {
      __typename: "ModelOrganizationSearchConnection",
      items?:  Array< {
        __typename: "Organization",
        orgId: string,
        type: OrgType,
        status: OrgStatus,
        statusConfirmed?: boolean | null,
        name: string,
        billingUserId?: string | null,
        billingCycleDay?: number | null,
        planId?: string | null,
        paymentUserId?: string | null,
        affiliateAccountId?: string | null,
        affiliateStatus?: AffiliateStatus | null,
        pusherId: string,
        parentOrgId?: string | null,
        managementOrgId?: string | null,
        corjlVersion?: string | null,
        attributes?: string | null,
        logoUrl?: string | null,
        avatarUrl?: string | null,
        designCount?: number | null,
        imageCount?: number | null,
        fontCount?: number | null,
        firstOrderDate?: string | null,
        listingCount?: number | null,
        outputCount?: number | null,
        orderCount?: number | null,
        migrationVersion?: number | null,
        billingPeriodOrderCount?: number | null,
        billingPeriodTransactionCost?: number | null,
        pendingOrderCount?: number | null,
        contactEmail?: string | null,
        totalStorageKBytes?: number | null,
        originalStorageKBytes?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type GetOutputQueryVariables = {
    outputId: string,
  };
  
  export type GetOutputQuery = {
    getOutput?:  {
      __typename: "Output",
      designId: string,
      version: number,
      outputId: string,
      orderId?: string | null,
      orgId?: string | null,
      creatorOrgId?: string | null,
      designName?: string | null,
      source: OutputRequestSource,
      process: OutputProcess,
      outputUrl?: string | null,
      checksum: string,
      thumbnail?: string | null,
      status: OutputStatus,
      printPageMap:  Array< {
        __typename: "PrintPageInfo",
        pageId: number,
        resultFilePath?: string | null,
        resultFileSize?: number | null,
        pageStatus?: OutputStatus | null,
        printSide?: PrintSide | null,
      } >,
      presetOptions?: string | null,
      copies: number,
      outputHeight: string,
      outputWidth: string,
      outputUnit: DesignUnit,
      outputPixelsPerUnit: number,
      outputPixelDensityUnit: PixelDensityUnit,
      outputPageBleed?: string | null,
      outputPageRows?: number | null,
      outputPageColumns?: number | null,
      multiplePerPage: MultiplePerPage,
      flatten: boolean,
      scaleToFit: boolean,
      fitToEdge: boolean,
      showBleed: boolean,
      showTrimMarks: boolean,
      doubleSided: boolean,
      orientation: Orientation,
      reverseSheetOrder: boolean,
      backgroundTransparent: boolean,
      printInColor: boolean,
      title: string,
      durationMbSeconds: number,
      processorVersion?: string | null,
      resultFileSize: number,
      attemptCount?: number | null,
      pageFormat: PageFormat,
      outputFormat: OutputFormat,
      notifyEmail?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type ListOutputByDesignQueryVariables = {
    designId: string,
    status?: OutputStatus | null,
  };
  
  export type ListOutputByDesignQuery = {
    listOutputByDesign?:  {
      __typename: "ModelOutputConnection",
      items?:  Array< {
        __typename: "Output",
        designId: string,
        version: number,
        outputId: string,
        orderId?: string | null,
        orgId?: string | null,
        creatorOrgId?: string | null,
        designName?: string | null,
        source: OutputRequestSource,
        process: OutputProcess,
        outputUrl?: string | null,
        checksum: string,
        thumbnail?: string | null,
        status: OutputStatus,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        presetOptions?: string | null,
        copies: number,
        outputHeight: string,
        outputWidth: string,
        outputUnit: DesignUnit,
        outputPixelsPerUnit: number,
        outputPixelDensityUnit: PixelDensityUnit,
        outputPageBleed?: string | null,
        outputPageRows?: number | null,
        outputPageColumns?: number | null,
        multiplePerPage: MultiplePerPage,
        flatten: boolean,
        scaleToFit: boolean,
        fitToEdge: boolean,
        showBleed: boolean,
        showTrimMarks: boolean,
        doubleSided: boolean,
        orientation: Orientation,
        reverseSheetOrder: boolean,
        backgroundTransparent: boolean,
        printInColor: boolean,
        title: string,
        durationMbSeconds: number,
        processorVersion?: string | null,
        resultFileSize: number,
        attemptCount?: number | null,
        pageFormat: PageFormat,
        outputFormat: OutputFormat,
        notifyEmail?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListOutputByHourQueryVariables = {
    year: number,
    month: number,
    day: number,
    hour: number,
  };
  
  export type ListOutputByHourQuery = {
    listOutputByHour?:  {
      __typename: "ModelOutputConnection",
      items?:  Array< {
        __typename: "Output",
        designId: string,
        version: number,
        outputId: string,
        orderId?: string | null,
        orgId?: string | null,
        creatorOrgId?: string | null,
        designName?: string | null,
        source: OutputRequestSource,
        process: OutputProcess,
        outputUrl?: string | null,
        checksum: string,
        thumbnail?: string | null,
        status: OutputStatus,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        presetOptions?: string | null,
        copies: number,
        outputHeight: string,
        outputWidth: string,
        outputUnit: DesignUnit,
        outputPixelsPerUnit: number,
        outputPixelDensityUnit: PixelDensityUnit,
        outputPageBleed?: string | null,
        outputPageRows?: number | null,
        outputPageColumns?: number | null,
        multiplePerPage: MultiplePerPage,
        flatten: boolean,
        scaleToFit: boolean,
        fitToEdge: boolean,
        showBleed: boolean,
        showTrimMarks: boolean,
        doubleSided: boolean,
        orientation: Orientation,
        reverseSheetOrder: boolean,
        backgroundTransparent: boolean,
        printInColor: boolean,
        title: string,
        durationMbSeconds: number,
        processorVersion?: string | null,
        resultFileSize: number,
        attemptCount?: number | null,
        pageFormat: PageFormat,
        outputFormat: OutputFormat,
        notifyEmail?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListOutputByOrganizationQueryVariables = {
    orgId: string,
    status?: OutputStatus | null,
  };
  
  export type ListOutputByOrganizationQuery = {
    listOutputByOrganization?:  {
      __typename: "ModelOutputConnection",
      items?:  Array< {
        __typename: "Output",
        designId: string,
        version: number,
        outputId: string,
        orderId?: string | null,
        orgId?: string | null,
        creatorOrgId?: string | null,
        designName?: string | null,
        source: OutputRequestSource,
        process: OutputProcess,
        outputUrl?: string | null,
        checksum: string,
        thumbnail?: string | null,
        status: OutputStatus,
        printPageMap:  Array< {
          __typename: "PrintPageInfo",
          pageId: number,
          resultFilePath?: string | null,
          resultFileSize?: number | null,
          pageStatus?: OutputStatus | null,
          printSide?: PrintSide | null,
        } >,
        presetOptions?: string | null,
        copies: number,
        outputHeight: string,
        outputWidth: string,
        outputUnit: DesignUnit,
        outputPixelsPerUnit: number,
        outputPixelDensityUnit: PixelDensityUnit,
        outputPageBleed?: string | null,
        outputPageRows?: number | null,
        outputPageColumns?: number | null,
        multiplePerPage: MultiplePerPage,
        flatten: boolean,
        scaleToFit: boolean,
        fitToEdge: boolean,
        showBleed: boolean,
        showTrimMarks: boolean,
        doubleSided: boolean,
        orientation: Orientation,
        reverseSheetOrder: boolean,
        backgroundTransparent: boolean,
        printInColor: boolean,
        title: string,
        durationMbSeconds: number,
        processorVersion?: string | null,
        resultFileSize: number,
        attemptCount?: number | null,
        pageFormat: PageFormat,
        outputFormat: OutputFormat,
        notifyEmail?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type GetPluginQueryVariables = {
    pluginId: string,
  };
  
  export type GetPluginQuery = {
    getPlugin?:  {
      __typename: "Plugin",
      pluginId: string,
      name: string,
      slug: string,
      briefDescription: string,
      previewImage: string,
      pluginStatus?: PluginStatus | null,
      minVersion?: string | null,
      maxVersion?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetPluginBySlugQueryVariables = {
    slug: string,
  };
  
  export type GetPluginBySlugQuery = {
    getPluginBySlug?:  {
      __typename: "Plugin",
      pluginId: string,
      name: string,
      slug: string,
      briefDescription: string,
      previewImage: string,
      pluginStatus?: PluginStatus | null,
      minVersion?: string | null,
      maxVersion?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type ListAllPluginsQueryVariables = {
    pluginStatus: PluginStatus,
    sortDirection?: ModelSortDirection | null,
    filter?: ModelPluginFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListAllPluginsQuery = {
    listAllPlugins?:  {
      __typename: "ModelPluginConnection",
      items?:  Array< {
        __typename: "Plugin",
        pluginId: string,
        name: string,
        slug: string,
        briefDescription: string,
        previewImage: string,
        pluginStatus?: PluginStatus | null,
        minVersion?: string | null,
        maxVersion?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type GetSettingQueryVariables = {
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    category?: SettingCategory | null,
    subCategory: string,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type GetSettingQuery = {
    getSetting?:  {
      __typename: "Setting",
      entityType: SettingEntityType,
      entityId: string,
      entityVersion?: number | null,
      category: SettingCategory,
      subCategory: string,
      payload?: string | null,
      orgId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetSettingByEntityQueryVariables = {
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    category?: SettingCategory | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type GetSettingByEntityQuery = {
    getSettingByEntity?:  {
      __typename: "ModelSettingConnection",
      items?:  Array< {
        __typename: "Setting",
        entityType: SettingEntityType,
        entityId: string,
        entityVersion?: number | null,
        category: SettingCategory,
        subCategory: string,
        payload?: string | null,
        orgId?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type GetSettingByEntityCategoryQueryVariables = {
    entityType: SettingEntityType,
    entityId: string,
    entityVersion?: number | null,
    category: SettingCategory,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type GetSettingByEntityCategoryQuery = {
    getSettingByEntityCategory?:  {
      __typename: "SettingEntityCategory",
      entityType: SettingEntityType,
      entityId: string,
      entityVersion?: number | null,
      category: SettingCategory,
      setting?: string | null,
    } | null,
  };
  
  export type GetStatByEntityQueryVariables = {
    statType: StatType,
    period: StatPeriod,
    entityId: string,
    year?: string | null,
    month?: string | null,
    day?: string | null,
  };
  
  export type GetStatByEntityQuery = {
    getStatByEntity?:  {
      __typename: "Stat",
      entityId: string,
      entityType: EntityType,
      period: StatPeriod,
      statType: StatType,
      quantity: number,
      netSales?: number | null,
      corjlCommission?: number | null,
      customerCommission?: number | null,
      recordDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  };
  
  export type ListStatsByDateQueryVariables = {
    statType: StatType,
    entityType: EntityType,
    year: string,
    month: string,
    day?: string | null,
    nextToken?: string | null,
  };
  
  export type ListStatsByDateQuery = {
    listStatsByDate?:  {
      __typename: "ModelStatConnection",
      items?:  Array< {
        __typename: "Stat",
        entityId: string,
        entityType: EntityType,
        period: StatPeriod,
        statType: StatType,
        quantity: number,
        netSales?: number | null,
        corjlCommission?: number | null,
        customerCommission?: number | null,
        recordDate?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type FetchSignupStatusChangesQueryVariables = {
    startDate: string,
    endDate: string,
  };
  
  export type FetchSignupStatusChangesQuery = {
    fetchSignupStatusChanges?:  {
      __typename: "ModelSignupStatusChangeStatConnection",
      items:  Array< {
        __typename: "DailySignupChangeStats",
        date: string,
        stats:  Array< {
          __typename: "SignupChangeStats",
          signupType: SignupAccountStatusType,
          statusChangeType: SignupStatusChangeType,
          count: number,
        } >,
      } >,
      nextToken?: string | null,
    } | null,
  };
  
  export type FetchOrderCountQueryVariables = {
    startDate: string,
    endDate: string,
    granularity?: StatGranularity | null,
  };
  
  export type FetchOrderCountQuery = {
    fetchOrderCount?:  {
      __typename: "ModelOrderCountStatConnection",
      items:  Array< {
        __typename: "OrderCountStat",
        date: string,
        stats:  Array< {
          __typename: "OrderCountStats",
          orderBillingStatus: OrderBillingStatus,
          count: number,
        } >,
      } >,
      compareItems:  Array< {
        __typename: "OrderCountStat",
        date: string,
        stats:  Array< {
          __typename: "OrderCountStats",
          orderBillingStatus: OrderBillingStatus,
          count: number,
        } >,
      } >,
      granularity?: StatGranularity | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type FetchSubscriptionCountsQueryVariables = {
    startDate: string,
    endDate: string,
  };
  
  export type FetchSubscriptionCountsQuery = {
    fetchSubscriptionCounts?:  {
      __typename: "ModelSubscriptionCountStatConnection",
      items:  Array< {
        __typename: "DailySubscriptionCountStat",
        date: string,
        stats:  Array< {
          __typename: "SubscriptionCountStat",
          count: number,
          status: OrgStatus,
        } >,
      } >,
      nextToken?: string | null,
    } | null,
  };
  
  export type GetUserQueryVariables = {
    userId: string,
  };
  
  export type GetUserQuery = {
    getUser?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type LoginQueryVariables = {
    email: string,
  };
  
  export type LoginQuery = {
    login?:  {
      __typename: "UserCheck",
      email: string,
      userStatus: UserStatus,
      providerTypes?: Array< string | null > | null,
    } | null,
  };
  
  export type GetUserByCognitoIdQueryVariables = {
    cognitoUserId: string,
  };
  
  export type GetUserByCognitoIdQuery = {
    getUserByCognitoId?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetUserSelfQuery = {
    getUserSelf?:  {
      __typename: "User",
      userId: string,
      email: string,
      cognitoUserId?: string | null,
      userStatus: UserStatus,
      attributes?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      userOrgs?:  Array< {
        __typename: "UserOrg",
        role: UserOrganizationRoleType,
        orgId: string,
      } | null > | null,
      language?: string | null,
      hasBuyerOrg?: boolean | null,
      ephemeralState?: string | null,
      lastLogin?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      expirationTime?: number | null,
    } | null,
  };
  
  export type GetMyOrgsQuery = {
    getMyOrgs?:  {
      __typename: "ModelOrganizationConnection",
      items?:  Array< {
        __typename: "Organization",
        orgId: string,
        type: OrgType,
        status: OrgStatus,
        statusConfirmed?: boolean | null,
        name: string,
        billingUserId?: string | null,
        billingCycleDay?: number | null,
        planId?: string | null,
        paymentUserId?: string | null,
        affiliateAccountId?: string | null,
        affiliateStatus?: AffiliateStatus | null,
        pusherId: string,
        parentOrgId?: string | null,
        managementOrgId?: string | null,
        corjlVersion?: string | null,
        attributes?: string | null,
        logoUrl?: string | null,
        avatarUrl?: string | null,
        designCount?: number | null,
        imageCount?: number | null,
        fontCount?: number | null,
        firstOrderDate?: string | null,
        listingCount?: number | null,
        outputCount?: number | null,
        orderCount?: number | null,
        migrationVersion?: number | null,
        billingPeriodOrderCount?: number | null,
        billingPeriodTransactionCost?: number | null,
        pendingOrderCount?: number | null,
        contactEmail?: string | null,
        totalStorageKBytes?: number | null,
        originalStorageKBytes?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListUsersByOrgQueryVariables = {
    orgId: string,
    role?: UserOrganizationRoleType | null,
    filter?: ModelUserFilterInput | null,
    limit?: number | null,
    nextToken?: string | null,
  };
  
  export type ListUsersByOrgQuery = {
    listUsersByOrg?:  {
      __typename: "ModelUserConnection",
      items?:  Array< {
        __typename: "User",
        userId: string,
        email: string,
        cognitoUserId?: string | null,
        userStatus: UserStatus,
        attributes?: string | null,
        firstName?: string | null,
        lastName?: string | null,
        avatar?: string | null,
        userOrgs?:  Array< {
          __typename: "UserOrg",
          role: UserOrganizationRoleType,
          orgId: string,
        } | null > | null,
        language?: string | null,
        hasBuyerOrg?: boolean | null,
        ephemeralState?: string | null,
        lastLogin?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type ListUserOrgsQueryVariables = {
    userId: string,
    role: UserOrganizationRoleType,
  };
  
  export type ListUserOrgsQuery = {
    listUserOrgs?:  {
      __typename: "ModelOrganizationConnection",
      items?:  Array< {
        __typename: "Organization",
        orgId: string,
        type: OrgType,
        status: OrgStatus,
        statusConfirmed?: boolean | null,
        name: string,
        billingUserId?: string | null,
        billingCycleDay?: number | null,
        planId?: string | null,
        paymentUserId?: string | null,
        affiliateAccountId?: string | null,
        affiliateStatus?: AffiliateStatus | null,
        pusherId: string,
        parentOrgId?: string | null,
        managementOrgId?: string | null,
        corjlVersion?: string | null,
        attributes?: string | null,
        logoUrl?: string | null,
        avatarUrl?: string | null,
        designCount?: number | null,
        imageCount?: number | null,
        fontCount?: number | null,
        firstOrderDate?: string | null,
        listingCount?: number | null,
        outputCount?: number | null,
        orderCount?: number | null,
        migrationVersion?: number | null,
        billingPeriodOrderCount?: number | null,
        billingPeriodTransactionCost?: number | null,
        pendingOrderCount?: number | null,
        contactEmail?: string | null,
        totalStorageKBytes?: number | null,
        originalStorageKBytes?: number | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  };
  
  export type SupportSearchUsersQueryVariables = {
    searchTerms: UserSearchInput,
    pagination?: SearchPaginationInput | null,
  };
  
  export type SupportSearchUsersQuery = {
    supportSearchUsers?:  {
      __typename: "ModelUserSearchConnection",
      items?:  Array< {
        __typename: "User",
        userId: string,
        email: string,
        cognitoUserId?: string | null,
        userStatus: UserStatus,
        attributes?: string | null,
        firstName?: string | null,
        lastName?: string | null,
        avatar?: string | null,
        userOrgs?:  Array< {
          __typename: "UserOrg",
          role: UserOrganizationRoleType,
          orgId: string,
        } | null > | null,
        language?: string | null,
        hasBuyerOrg?: boolean | null,
        ephemeralState?: string | null,
        lastLogin?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        expirationTime?: number | null,
      } | null > | null,
      pageNumber: number,
      resultsPerPage: number,
      matchCount: number,
      hasNextPage: boolean,
    } | null,
  };
  
  export type CognitoSendAuthCodeQueryVariables = {
    cognitoUserId: string,
    codeType: CognitoCodeType,
  };
  
  export type CognitoSendAuthCodeQuery = {
    cognitoSendAuthCode?: boolean | null,
  };
  