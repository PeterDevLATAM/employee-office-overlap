import EmployeeFactory from "../Employee/EmployeeFactory";
import IEmployee from "../Employee/IEmployee";
import DataLoader from "../DataFetching/DataLoader";
import TextFileLoader from "../DataFetching/TextFileLoader";
import IWorkSession from "../Employee/IWorkSession";

export default class Organization {
  name: string;
  employees: IEmployee[] = [];

  constructor(name: string, employeeFilePath: string) {
    const dataLoader = new DataLoader(employeeFilePath);
    this.employees = dataLoader.fetchEmployees(TextFileLoader);
    this.name = name;
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

  getEmployeeOfficeOverlap(): string[] {
    const overlaps: string[] = [];
    // May be slow O(n^2) for very large corporations, I'm working on a linear solution
    for (let i = 0; i < this.employees.length; i++) {
      for (let j = i + 1; j < this.employees.length; j++) {
        const { schedule1, schedule2, employee1, employee2 } = this.getEmployeesSchedules(i, j);
        let overlapCount = this.getWorkSessionsOverlapCount(schedule1, schedule2);
        overlaps.push(`${employee1.name}-${employee2.name}: ${overlapCount}`);
      }
    }
    return overlaps;
  }

  private getWorkSessionsOverlapCount(schedule1: IWorkSession[], schedule2: IWorkSession[]) {
    let overlapCount = 0;
    // This nested loop is ok bc it can only have a few worksessions
    for (const workSession1 of schedule1) {
      for (const workSession2 of schedule2) {
        if (this.isOverlapped(workSession1, workSession2)) {
          overlapCount++;
        }
      }
    }
    return overlapCount;
  }

  private isOverlapped(workSession1: IWorkSession, workSession2: IWorkSession) {
    return workSession1.day === workSession2.day &&
      workSession1.endTime > workSession2.startTime &&
      workSession1.startTime < workSession2.endTime;
  }

  private getEmployeesSchedules(i: number, j: number) {
    const employee1 = this.employees[i];
    const schedule1 = employee1.schedule;
    const employee2 = this.employees[j];
    const schedule2 = employee2.schedule;
    return { schedule1, schedule2, employee1, employee2 };
  }
}
