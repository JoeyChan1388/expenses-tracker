export default class Expense {
    id:number = 0;
    title:string = "";
    description:string = "";
    amount:number = 0;

    constructor(id:number, title:string, description:string, amount:number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.amount = amount;
    }
}
