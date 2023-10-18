import { MAX_TEXT_LENGTH, MIN_TEXT_LENGTH } from "./there-m";

export default class Flathing {
    id?: number
    address = ""
    descrip = ""
    layout = 0          // 户型
    storey = 0          // 楼层
    orient = 0          // 朝向
    facilities = 1      // 设施
    appliances = 1      // 电器 bitwise
    sundryFees = 1      // 杂费 bitwise

    static newEntity(
        address: string,
        descrip: string,
        layout: number,
        storey: number,
        orient: number,
        facilities: number,
        appliances: number,
        sundryFees: number,
        id?: number,
    ): Flathing {
        const entity = new Flathing()
        entity.id = id

        entity.address = address
        entity.descrip = descrip
        entity.layout = layout
        entity.storey = storey
        entity.orient = orient
        entity.facilities = facilities
        entity.appliances = appliances
        entity.sundryFees = sundryFees

        return entity
    }

    static readonly layoutDict: [number, string][] = [
        [0, "一室无厅"],
        [1, "一室一厅"],
        [2, "两室一厅"],
        [3, "三室一厅"],
        [4, "三室两厅"],
        [5, "多室多厅"]
    ]
    static readonly storeyDict: [number, string][] = [
        [0, "楼栋底层"],
        [1, "歩梯顶楼"],
        [2, "歩梯中层"],
        [3, "电梯顶楼"],
        [4, "电梯中层"],
        [5, "平房独栋"]
    ]
    static readonly orientDict: [number, string][] = [
        [0, "正南向"],
        [1, "东南向"],
        [2, "西南向"],
        [3, "正北向"],
        [4, "南北通透"],
        [5, "其他朝向"]
    ]

    get myLayout(): string {
        const pair = Flathing.layoutDict.find(kv => kv[0] === this.layout)
        return pair ? pair[1] : ""
    }

    get myStorey(): string {
        const pair = Flathing.storeyDict.find(kv => kv[0] === this.storey)
        return pair ? pair[1] : ""
    }

    get myOrient(): string {
        const pair = Flathing.orientDict.find(kv => kv[0] === this.orient)
        return pair ? pair[1] : ""
    }

    get isValid(): boolean {
        return this.address.length >= MIN_TEXT_LENGTH && this.address.length <= MAX_TEXT_LENGTH
            && this.descrip.length >= MIN_TEXT_LENGTH && this.descrip.length <= MAX_TEXT_LENGTH
    }

    equals(d: Flathing): boolean {
        return this.address === d.address
            && this.descrip === d.descrip
            && this.layout === d.layout
            && this.storey === d.storey
            && this.orient === d.orient
            && this.facilities === d.facilities
            && this.appliances === d.appliances
            && this.sundryFees === d.sundryFees
    }
}
