import { Base } from "./base";

export class Member extends Base {
    memberName: String;
    status: String;
    statusType: String;
    stockMembershipDate: Date;
    financialDataDate: Date;
    totalAssets: Number;
    electedAssets: Number;
    membershipRepurchaseFlag: Boolean;
    membershipRedemptionFlag: Boolean;
    activityRepurchaseFlag: Boolean;
    activityRedemptionFlag: Boolean;
    activityAccount: Number;
    dividendAccount: Number;
    ddaAccount: Number;
}
