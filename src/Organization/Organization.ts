import EmployeeFactory from "../Employee/EmployeeFactory";
import IEmployee from "src/Employee/IEmployee";

export default class Organization {
  name: string;
  employees: IEmployee[] = [];

  constructor(name: string, employees: IEmployee[] = []) {
    this.name = name;
    this.employees = employees;
  }

  addEmployees(employees: IEmployee[]): void {
    for (const employee of employees) {
      const newEmployee = EmployeeFactory.getEmployee(
        "common",
        employee.name,
        employee.schedule
      );
      this.employees.push(newEmployee);
    }
  }

  getEmployeeOfficeOverlap = (): string[] => {
    const overlaps: string[] = [];
  // May be slow for very large corporations
  for (let i = 0; i < this.employees.length; i++) {
    for (let j = i + 1; j < this.employees.length; j++) {
      const { schedule1, schedule2, employee1, employee2 } = this.getEmployeesSchedules(i, j);
      let overlapCount = 0;
      // This nested loop is ok bc it only has a few worksessions 
      for (const workSession1 of schedule1) {
        for (const workSession2 of schedule2) {
          if (workSession1.day === workSession2.day && workSession1.endTime > workSession2.startTime && workSession1.startTime < workSession2.endTime) {
            overlapCount++;
          }
        }
      }
      overlaps.push(`${employee1.name}-${employee2.name}: ${overlapCount}`);
    }
  }

  return overlaps;
  }
    

  private getEmployeesSchedules(i: number, j: number) {
    const employee1 = this.employees[i];
    const schedule1 = employee1.schedule;
    const employee2 = this.employees[j];
    const schedule2 = employee2.schedule;
    return { schedule1, schedule2, employee1, employee2 };
  }
}
