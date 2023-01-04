import IEmployee from "../Employee/IEmployee";
import IDataFetcherConstructor from "./IDataFetcherConstructor";
export default class DataLoader {
  data: IEmployee[] = [];
  path: string = "";

  constructor(path: string) {
    this.path = path;
  }

  fetchEmployees(srcType: IDataFetcherConstructor) {
    return new srcType().fetchEmployees(this.path);
  }
}
