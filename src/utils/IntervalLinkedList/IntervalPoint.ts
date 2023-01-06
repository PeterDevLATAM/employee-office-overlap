import IEmployee from "src/Models/Employee/IEmployee";

export class IntervalPoint {
  time: string;
  employees: Set<IEmployee>;
  nextInterval: IntervalPoint | null;

  constructor(
    time: string,
    employees: Set<IEmployee>,
    nextInterval: IntervalPoint | null = null
  ) {
    this.time = time;
    this.employees = employees;
    this.nextInterval = nextInterval;
  }
}
