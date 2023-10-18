export const MIN_TEXT_LENGTH = 9
export const MAX_TEXT_LENGTH = 99

export const applianceDict: [number, string][] = [
    [0, "空调"],
    [1, "洗衣机"],
    [2, "冰箱"],
    [3, "电视"],
    [4, "燃气灶"],
    [5, "热水器"]
]

export const sundryFeeDict: [number, string][] = [
    [0, "水电费"],
    [1, "燃气费"],
    [2, "取暖费"],
    [3, "物业管理"],
    [4, "宽带费"],
    [5, "车位费"]
]

export const facilityDict: [number, string][] = [
    [0, "衣柜"],
    [1, "智能门锁"],
    [2, "沙发"],
    [3, "床具"],
    [4, "阳台"],
    [5, "办公桌椅"]
]

export const booleanumToString = (booleanum: number, dict: [number, string][]) =>
    dict.filter(kt => 1 << kt[0] & booleanum).map(kv => kv[1]).reduce((a: string, b: string) => `${a}${a && "、 "} ${b}`, "")
