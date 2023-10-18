import { Person, isPersonValid, peopleEqual } from "./person";
import { Sumoney, isSumoneyValid, sumoneysEqual } from "./sumoney";
import { MAX_TEXT_LENGTH } from "./there-m";

export default class Renthing {
    id?: number;
    lessor: Person = { realName: "", phoneNum: "", personId: "" }   // 出租方
    lessee: Person = { realName: "", phoneNum: "", personId: "" }   // 承租方
    flatId = 0          // 相关房屋
    shared = false      // 是否合租
    monthFee: Sumoney = { numeral: 9000, sinoNum: "" }              // 月租
    foregift: Sumoney = { numeral: 1000, sinoNum: "" }              // 押金
    startDate: Date = new Date()                                    // 开始日期
    leaseTerm = 3       // 租期（月）
    payeeDat = ""       // 收款账户
    payCycle = 1        // 付款周期（月）
    allowances = 0      // 允许改建、转租
    supplement = ""

    static newEntity(
        lessor: Person,
        lessee: Person,
        flatId: number,
        shared: boolean,
        monthFee: Sumoney,
        foregift: Sumoney,
        startDate: Date,
        leaseTerm: number,
        payeeDat: string,
        payCycle: number,
        allowances: number,
        supplement: string,
        id?: number,
    ): Renthing {
        const entity = new Renthing()
        entity.id = id

        entity.lessor = lessor
        entity.lessee = lessee
        entity.flatId = flatId
        entity.shared = shared
        entity.monthFee = monthFee
        entity.foregift = foregift
        entity.startDate = startDate
        entity.leaseTerm = leaseTerm
        entity.payeeDat = payeeDat
        entity.payCycle = payCycle
        entity.allowances = allowances
        entity.supplement = supplement

        return entity
    }

    get isValid(): boolean {
        return this.flatId > 0
            && isPersonValid(this.lessor)
            && isPersonValid(this.lessee)
            && isSumoneyValid(this.monthFee)
            && isSumoneyValid(this.foregift)
            && this.payeeDat.length <= MAX_TEXT_LENGTH
            && this.supplement.length <= MAX_TEXT_LENGTH
    }

    equals(d: Renthing): boolean {
        return this.flatId === d.flatId
            && peopleEqual(this.lessor, d.lessor)
            && peopleEqual(this.lessee, d.lessee)
            && sumoneysEqual(this.monthFee, d.monthFee)
            && sumoneysEqual(this.foregift, d.foregift)
            && this.shared === d.shared
            && this.startDate === d.startDate
            && this.leaseTerm === d.leaseTerm
            && this.payeeDat === d.payeeDat
            && this.payCycle === d.payCycle
            && this.allowances === d.allowances
            && this.supplement === d.supplement
    }

    static readonly flatSharedDict: [number, string][] = [
        [0, "整租"],
        [1, "合租"],
    ]
    static readonly allowanceDict: [number, string][] = [
        [0, "转租"],
        [1, "装修"],
    ]
}
