import IEmployee from "../Employee/IEmployee";
import IWorkSession from "src/Employee/IWorkSession";
import IDataFetcher from "./IDataFetcher";
import * as fs from "fs";

const SAMPLE_DATA = [
  {
    name: "Pedro",
    schedule: [
      { day: "MO", startTime: "10:00", endTime: "12:00" },
      { day: "MO", startTime: "10:00", endTime: "12:00" },
    ],
  },
  {
    name: "Ana",
    schedule: [
      { day: "MO", startTime: "10:00", endTime: "12:00" },
      { day: "MO", startTime: "10:00", endTime: "12:00" },
    ],
  },
];

export default class TextFileLoader implements IDataFetcher {
  fetchEmployees(path: string): IEmployee[] {
    let fileContent: string = "";
    try {
      fileContent = fs.readFileSync(path, "utf-8");
    } catch (e) {
      if (typeof e === "string") {
        e.toUpperCase();
      } else if (e instanceof Error) {
        console.log(e.message);
      }
    }
    if (fileContent === "") return [];
    if (!this.isValidFormat(fileContent)) return [];
    return this.extractEmployeeData(fileContent);
  }

  private isValidFormat(fileContent: string): boolean {
    let isValid: boolean = true;
    for (const line of fileContent.split("\n")) {
      if (this.isValidLine(line) === false) isValid = false;
    }
    if (!isValid) console.log("Wrong file format");
    return isValid;
  }

  private isValidLine(line: string): boolean {
    if (line === "") return true;
    const regex =
      /^[A-Z]+=[A-Z]{2}\d{2}:\d{2}-\d{2}:\d{2}(,([A-Z]{2}\d{2}:\d{2}-\d{2}:\d{2}))*$/;
    const isValid = regex.test(line);
    return isValid;
  }

  private extractEmployeeData(fileContent: string): IEmployee[] {
    const employees: IEmployee[] = [];
    for (const line of fileContent.split("\n")) {
      if (line === "") continue;
      const { name, workSessionsArr } = this.getNameAndWorkSessions(line);
      const schedule: IWorkSession[] = this.getEmployeeSchedule(workSessionsArr);
      employees.push({name, schedule});
    }
    return employees;
  }

  // I could also check if startTime < endTime, if the days are valid but I'm going to assume they are checked already....
  private getEmployeeSchedule(workSessionsArr: string[]) {
    return workSessionsArr.map((workSessionStr) => {
      const { dayStr, startTimeStr, endTimeStr } = this.sliceData(workSessionStr);
      return {
        day: dayStr,
        startTime: startTimeStr,
        endTime: endTimeStr,
      };
    });
  }

  private sliceData(workSessionStr: string) {
    const dayStr = workSessionStr.slice(0, 2);
    const startTimeStr = workSessionStr.slice(2, 7);
    const endTimeStr = workSessionStr.slice(8, 13);
    return { dayStr, startTimeStr, endTimeStr };
  }

  private getNameAndWorkSessions(line: string): {
    name: string;
    workSessionsArr: string[];
  } {
    const [name, workSessionsStr] = line.split("=");
    const workSessionsArr = workSessionsStr.split(",");
    return { name, workSessionsArr };
  }
}
