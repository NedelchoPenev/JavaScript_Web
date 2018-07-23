import { Employee } from './Employee';

export class Manager extends Employee {
    divident: number

    constructor(name: string, age: number) {
        super(name, age)
        this.divident = 0
        this.tasks.push(' scheduled a meeting.')
        this.tasks.push(' is preparing a quarterly meeting.')
    }

    getSalary() : number {
       return this.salary + this.divident
    }
}