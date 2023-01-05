import CommonEmployee from "./CommonEmployee";
import IEmployee from "./IEmployee";
import IWorkSession from "./IWorkSession";

export default class EmployeeFactory {
  static getEmployee(type: string, name:string, schedule: IWorkSession[]):IEmployee{
      // For the moment is only one but it could grow in the future 
    if (type === 'common')return new CommonEmployee(name, schedule)
    return new CommonEmployee(name, schedule)
  }
}