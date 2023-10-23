export type Sumoney = {
    numeral: number;
    sinoNum: string;
}

export const MIN_SINO_LENGTH = 3
export const MAX_SINO_LENGTH = 33

export const sinoPattern = `^\\S{${MIN_SINO_LENGTH},${MAX_SINO_LENGTH}}$`

export const isSumoneyValid = (d: Sumoney): boolean => {
    const sinoNumValid = new RegExp(sinoPattern).test(d.sinoNum)
    return d.numeral > 0 && d.numeral < 999999 && sinoNumValid
}

export const sumoneysEqual = (d1: Sumoney, d2: Sumoney): boolean => d1.numeral === d2.numeral && d1.sinoNum === d2.sinoNum
