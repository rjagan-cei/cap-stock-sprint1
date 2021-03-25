import { Base } from "./base";

export class Member extends Base {
    memberNumber: Number;
    memberName: String;
    statusCode: String;
    statusType: String;
    initialStockPurchaseRequired: Boolean;
    capitalStockAsset: Date;
    capitalStockAssetDate: Date;
    pendingStockAsset: Number;
    pendingStockAssetDate: Date;
    memberStockAssetDate: Date;
    memberDdaAccount: Number;
    mrcs: Boolean;
    mrcsInputDate: Date;
    mrcsRedemptionDate: Date;
    memberStockMaxRequirement: Boolean;
}
