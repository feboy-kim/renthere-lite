export default class Rentuple {
    rentId: number;
    lessor: string;
    lessee: string; 
    startDate: Date;

    constructor(rentId: number, lessor: string, lessee: string, startDate: Date) {
        this.rentId = rentId
        this.lessor = lessor
        this.lessee = lessee
        this.startDate = startDate
    }
}