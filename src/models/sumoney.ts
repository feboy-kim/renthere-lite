export type Sumoney = {
    numeral: number;
    sinoNum: string;
}

export const MIN_SINO_LENGTH = 3
export const MAX_SINO_LENGTH = 33

export const isSumoneyValid = (d: Sumoney): boolean =>
    d.numeral > 0 && d.numeral < 999999 && d.sinoNum.length >= MIN_SINO_LENGTH && d.sinoNum.length <= MAX_SINO_LENGTH

export const sumoneysEqual = (d1: Sumoney, d2: Sumoney): boolean => d1.numeral === d2.numeral && d1.sinoNum === d2.sinoNum
