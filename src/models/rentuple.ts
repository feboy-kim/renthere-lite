export default class Rentuple {
    rentId: number;
    lessor: string;
    lessee: string; 
    myDate: Date;

    constructor(rentId: number, lessor: string, lessee: string, startDate: Date) {
        this.rentId = rentId
        this.lessor = lessor
        this.lessee = lessee
        this.myDate = startDate
    }
}