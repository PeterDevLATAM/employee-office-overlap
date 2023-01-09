import EmployeeFactory from "../Employee/EmployeeFactory";
import IEmployee from "../Employee/IEmployee";
import DataLoader from "../DataFetching/DataLoader";
import TextFileLoader from "../DataFetching/TextFileLoader";
import TimePointsLinkedList from "../../utils/TimePointsLinkedList/TimePointsLinkedList";
import IntervalsLinkedList from "../../utils/IntervalLinkedList/IntervalsLinkedList";
import IWorkSession from "../Employee/IWorkSession";
type GeneralSchedule = {
  [day: string]: { timeline: TimePointsLinkedList; employees: Set<IEmployee> };
};

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

  getEmployeeOfficeOverlap() {
    // I'm constructing two datapoints map, it could be done in one step with only one map
    const generalSchedule = this.getGeneralTimeDataPoint();
    const occupancyTimeline =
      this.getOcupancyIntervalsNodeList(generalSchedule);
    let employeeCoincidenceMap: { [name: string]: Map<string, number> } = {};

    let day: keyof typeof generalSchedule;
    for (day in generalSchedule) {
      const dayOfficeOverlap = occupancyTimeline[
        day
      ].getEmployeeCoincidencePerDay(generalSchedule[day].employees);
      let employee: keyof typeof dayOfficeOverlap;
      for (employee in dayOfficeOverlap) {
        if (!employeeCoincidenceMap[employee])
          employeeCoincidenceMap[employee] = new Map();
        dayOfficeOverlap[employee].forEach((coincidentEmployee) => {
          if (!employeeCoincidenceMap[employee].has(coincidentEmployee.name)) {
            employeeCoincidenceMap[employee].set(coincidentEmployee.name, 1);
          } else {
            let count = employeeCoincidenceMap[employee].get(
              coincidentEmployee.name
            );
            employeeCoincidenceMap[employee].set(
              coincidentEmployee.name,
              count! + 1
            );
          }
        });
      }
    }
    return employeeCoincidenceMap;
  }

  getOcupancyIntervalsNodeList(generalSchedule: GeneralSchedule) {
    let occupancyIntervals: { [day: string]: IntervalsLinkedList } =
      this.getOccupancyIntervals(generalSchedule);
    return occupancyIntervals;
  }

  private getOccupancyIntervals(generalSchedule: GeneralSchedule) {
    let occupancyIntervals: { [day: string]: IntervalsLinkedList } = {};
    let day: keyof typeof generalSchedule;
    for (day in generalSchedule) {
      if (!occupancyIntervals[day])
        occupancyIntervals[day] = new IntervalsLinkedList(
          generalSchedule[day].timeline
        );
    }
    return occupancyIntervals;
  }

  getGeneralTimeDataPoint() {
    let generalSchedule: GeneralSchedule = {};
    this.employees.forEach((employee) => {
      this.addDataPoints(employee, generalSchedule);
    });
    return generalSchedule;
  }

  private addDataPoints(employee: IEmployee, generalSchedule: GeneralSchedule) {
    employee.schedule.forEach((workSession) => {
      this.createDayIfDoesntExist(generalSchedule, workSession);
      this.addEmployeeToDay(generalSchedule, workSession, employee);
      this.insertNodes(generalSchedule, workSession, employee);
    });
  }

  private insertNodes(
    generalSchedule: GeneralSchedule,
    workSession: IWorkSession,
    employee: IEmployee
  ) {
    generalSchedule[workSession.day].timeline.insertNode(
      workSession.startTime,
      "IN",
      employee
    );
    generalSchedule[workSession.day].timeline.insertNode(
      workSession.endTime,
      "OUT",
      employee
    );
  }

  private addEmployeeToDay(
    generalSchedule: GeneralSchedule,
    workSession: IWorkSession,
    employee: IEmployee
  ) {
    if (!generalSchedule[workSession.day].employees.has(employee)) {
      generalSchedule[workSession.day].employees.add(employee);
    }
  }

  private createDayIfDoesntExist(
    generalSchedule: GeneralSchedule,
    workSession: IWorkSession
  ) {
    if (!generalSchedule[workSession.day]) {
      generalSchedule[workSession.day] = {
        timeline: new TimePointsLinkedList(),
        employees: new Set(),
      };
    }
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
