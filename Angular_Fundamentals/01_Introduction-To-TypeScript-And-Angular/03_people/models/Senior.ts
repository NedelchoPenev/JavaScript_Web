import { Employee } from './Employee';

export class Senior extends Employee {
    constructor(name: string, age:  number) {
        super(name, age)
        this.tasks.push(' is working on complicated task.')
        this.tasks.push(' is taking time out of work')
        this.tasks.push(' is supervising junior workers.')
    }
}