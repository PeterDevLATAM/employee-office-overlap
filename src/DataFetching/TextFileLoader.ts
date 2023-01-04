import IEmployee from "../Employee/IEmployee";
import IDataFetcher from "./IDataFetcher";
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
    console.log(path);
    return SAMPLE_DATA;
  }
}
