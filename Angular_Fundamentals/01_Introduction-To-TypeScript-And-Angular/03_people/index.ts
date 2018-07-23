import { Junior, Senior, Manager } from './models'

let junior = new Junior('Viktor', 25)
let senior = new Senior('Ivaylo', 30)
let manager = new Manager('Ines', 22)

manager.work()
senior.work()
junior.work()

junior.salary = 2
junior.collectSalary()

senior.salary = 3
senior.collectSalary()

manager.salary = 14
manager.divident = 10
manager.collectSalary()