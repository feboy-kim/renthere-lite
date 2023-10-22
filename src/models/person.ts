export type Person = {
    realName: string;
    personId: string;
    phoneNum: string;
}

export const NAME_MIN_LENGTH = 2
export const NAME_MAX_LENGTH = 6
export const PERSONID_LENGTH = 18
export const PHONENUM_LENGTH = 11

export const isPersonValid = (d: Person): boolean =>
    d.realName.length >= NAME_MIN_LENGTH && d.realName.length <= NAME_MAX_LENGTH
    && d.personId.length === PERSONID_LENGTH && d.phoneNum.length === PHONENUM_LENGTH


export const peopleEqual = (d1: Person, d2: Person): boolean =>
    d2.realName === d1.realName && d2.personId === d2.personId && d2.phoneNum === d1.phoneNum

