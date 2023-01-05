import Employee from "./Employee";
import IWorkSession from "./IWorkSession";

export default class CommonEmployee extends Employee{
  department:string = "CommonDepartment"
  constructor(name: string, schedule:IWorkSession[]){
    super(name, schedule);
  }
}