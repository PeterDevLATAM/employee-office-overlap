import IEmployee from "../Employee/IEmployee";

export default interface IDataFetcher {
  fetchEmployees(path: string): IEmployee[];
}
