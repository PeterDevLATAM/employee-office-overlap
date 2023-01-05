import IEmployee from "./IEmployee";
import IWorkSession from "./IWorkSession";

export default class Employee implements IEmployee{
  name: string;
  schedule: IWorkSession[]
  constructor (name: string, schedule:IWorkSession[]){
    this.name= name;
    this.schedule = schedule;
  }
}