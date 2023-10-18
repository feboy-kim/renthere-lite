import Flathing from "./flathing";
import { Person } from "./person";
import Renthing from "./renthing";
import { Sumoney } from "./sumoney";
import { applianceDict, sundryFeeDict } from "./there-m";

export default class Leasegg {
    lessor: Person;
    lessee: Person;
    address: string;
    shared: boolean;
    monthFee: Sumoney;
    foregift: Sumoney;
    startDate: string;
    leaseTerm: number;
    payCycle: number;
    payeeDat: string;
    allowances: number;
    appliances: string[];
    sundryFees: string[];
    supplement: string;

    constructor(rent: Renthing, flat?: Flathing) {
        this.lessor = rent.lessor
        this.lessee = rent.lessee
        this.address = flat?.address ?? ""
        this.shared = rent.shared
        this.monthFee = rent.monthFee
        this.foregift = rent.foregift
        this.startDate = Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(rent.startDate)
        this.leaseTerm = rent.leaseTerm
        this.payCycle = rent.payCycle
        this.payeeDat = rent.payeeDat
        this.allowances = rent.allowances
        this.supplement = rent.supplement
        if (flat) {
            this.appliances = applianceDict.filter(kt => 1 << kt[0] & flat.appliances).map(kt => kt[1])
            this.sundryFees = sundryFeeDict.filter(kt => 1 << kt[0] & flat.sundryFees).map(kt => kt[1])
        } else {
            this.appliances = []
            this.sundryFees = []

        }
    }
}
