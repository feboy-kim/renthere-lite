export type Person = {
    realName: string;
    personId: string;
    phoneNum: string;
}

export const NAME_MIN_LENGTH = 2
export const NAME_MAX_LENGTH = 5
export const PERSONID_LENGTH = 18
export const PHONENUM_LENGTH = 11

export const realNamePattern = `^\\S.{${NAME_MIN_LENGTH - 2},${NAME_MAX_LENGTH - 2}}\\S$`
export const personIdPattern = `^[1-9][0-9]{${PERSONID_LENGTH - 2}}([0-9]|x|X)$`
export const phoneNumPattern = `^1[0-9]{${PHONENUM_LENGTH - 1}}$`

export const isPersonValid = (d: Person): boolean => {
    const realNameValid = new RegExp(realNamePattern).test(d.realName)
    const personIdValid = new RegExp(personIdPattern).test(d.personId)
    const phoneNumValid = new RegExp(phoneNumPattern).test(d.phoneNum)
    return realNameValid && personIdValid && phoneNumValid
}

export const peopleEqual = (d1: Person, d2: Person): boolean =>
    d2.realName === d1.realName && d2.personId === d2.personId && d2.phoneNum === d1.phoneNum
