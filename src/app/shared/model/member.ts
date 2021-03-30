import { Base } from "./base";
import { Lookup } from "./Lookup";

export class Member extends Base {
    memberNumber: Number;
    memberName: String;
    statusCode: Lookup;
    statusType: Lookup;
    initialStockPurchaseRequired: Number;
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

export const mockedMemberProfile: Member[] = [{
    id: 1,
    active: true,
    memberNumber: 1001,
    memberName: 'testMember',
    statusCode: new Lookup("1","Active"),
    statusType: new Lookup("1","Charter termination"),
    initialStockPurchaseRequired: 1234567.00,
    capitalStockAsset: new Date(2021, 3, 15),
    capitalStockAssetDate: new Date(2021, 3, 25),
    pendingStockAsset: 2345678.00,
    pendingStockAssetDate: new Date(2021, 2, 20),
    memberStockAssetDate: new Date(2021, 1, 10),
    memberDdaAccount: 123456789,
    mrcs: true,
    mrcsInputDate: new Date(2021, 4, 1),
    mrcsRedemptionDate: new Date(2021, 5, 30),
    memberStockMaxRequirement: true
}];
