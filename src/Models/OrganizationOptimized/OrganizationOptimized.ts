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
type OccupancyTimeLine = { [day: string]: IntervalsLinkedList; }
type EmployeeCoincidenceMap = { [name: string]: Map<string, number>; }

export default class Organization {
  name: string;
  employees: IEmployee[] = [];

  constructor(name: string, employeeFilePath: string) {
    const dataLoader = new DataLoader(employeeFilePath);
    // This was fixed in the main branch 
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
    const timeLine = this.getOcupancyIntervalsNodeList(generalSchedule);
    let employeeCoincidenceMap = this.getEmployeeCoincidenceMap(generalSchedule, timeLine);
    return employeeCoincidenceMap;
  }

  private getEmployeeCoincidenceMap(generalSchedule: GeneralSchedule, occupancyTimeline: OccupancyTimeLine) {
    let employeeCoincidenceMap: EmployeeCoincidenceMap = {};
    this.loopOverDays(generalSchedule, occupancyTimeline, employeeCoincidenceMap);
    return employeeCoincidenceMap;
  }

  private loopOverDays(generalSchedule: GeneralSchedule, occupancyTimeline: OccupancyTimeLine, employeeCoincidenceMap: EmployeeCoincidenceMap) {
    let day: keyof typeof generalSchedule;
    for (day in generalSchedule) {
      const dayOfficeOverlap = occupancyTimeline[day].getEmployeeCoincidencePerDay(generalSchedule[day].employees);
      this.loopOverDailyEmployeeCoincidence(dayOfficeOverlap, employeeCoincidenceMap);
    }
  }

  private loopOverDailyEmployeeCoincidence(dayOfficeOverlap: { [name: string]: Set<IEmployee>; }, employeeCoincidenceMap: EmployeeCoincidenceMap) {
    let employee: keyof typeof dayOfficeOverlap;
    for (employee in dayOfficeOverlap) {
      if (!employeeCoincidenceMap[employee]) employeeCoincidenceMap[employee] = new Map();
      this.addToCoincidenceMap(dayOfficeOverlap, employee, employeeCoincidenceMap);
    }
  }

  private addToCoincidenceMap(dayOfficeOverlap: { [name: string]: Set<IEmployee>; }, employee: string, employeeCoincidenceMap: EmployeeCoincidenceMap) {
    dayOfficeOverlap[employee].forEach((e) => {
      if (!employeeCoincidenceMap[employee].has(e.name)) {
        employeeCoincidenceMap[employee].set(e.name, 1);
      } else {
        let count = employeeCoincidenceMap[employee].get(
          e.name
        );
        employeeCoincidenceMap[employee].set(
          e.name,
          count! + 1
        );
      }
    });
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
