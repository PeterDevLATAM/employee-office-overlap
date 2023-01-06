import IEmployee from "src/Models/Employee/IEmployee";

export class TimePoint {
  timePoint: string;
  type: "IN" | "OUT" | undefined;
  employee: IEmployee | undefined;
  nextDataPoint: TimePoint | null;

  constructor(
    timePoint: string,
    type: "IN" | "OUT" | undefined,
    employee: IEmployee | undefined = undefined,
    nextDataPoint: TimePoint | null = null
  ) {
    this.timePoint = timePoint;
    this.type = type;
    this.employee = employee;
    this.nextDataPoint = nextDataPoint;
  }
}
