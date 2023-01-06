import EmployeeFactory from "../Employee/EmployeeFactory";
import IEmployee from "../Employee/IEmployee";
import DataLoader from "../DataFetching/DataLoader";
import TextFileLoader from "../DataFetching/TextFileLoader";
import TimePointsLinkedList from "../../utils/TimePointsLinkedList/TimePointsLinkedList";
import IntervalsLinkedList from "../../utils/IntervalLinkedList/IntervalsLinkedList";

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
    this.getOcupancyIntervalsNodeList();

    return [];
  }

  getOcupancyIntervalsNodeList() {
    const generalSchedule = this.getGeneralTimeDataPoint();
    let occupancyIntervals: { [day: string]: IntervalsLinkedList } = {};
    let day: keyof typeof generalSchedule;
    for (day in generalSchedule) {
      if (!occupancyIntervals[day])
        occupancyIntervals[day] = new IntervalsLinkedList(generalSchedule[day]);
    }
    return occupancyIntervals
  }

  getGeneralTimeDataPoint() {
    let generalSchedule: { [day: string]: TimePointsLinkedList } = {};
    this.employees.forEach((employee) => {
      this.addDataPoints(employee, generalSchedule);
    });
    return generalSchedule;
  }

  private addDataPoints(
    employee: IEmployee,
    generalSchedule: { [day: string]: TimePointsLinkedList }
  ) {
    employee.schedule.forEach((workSession) => {
      if (!generalSchedule[workSession.day]) {
        generalSchedule[workSession.day] = new TimePointsLinkedList();
      }
      generalSchedule[workSession.day].insertNode(
        workSession.startTime,
        "IN",
        employee
      );
      generalSchedule[workSession.day].insertNode(
        workSession.endTime,
        "OUT",
        employee
      );
    });
  }

  private printGeneralDataPoints(generalSchedule: {
    [day: string]: TimePointsLinkedList;
  }) {
    Object.keys(generalSchedule).forEach((key) => {
      console.log(key);
      generalSchedule[key].printList();
    });
  }
}
