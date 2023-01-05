import IWorkSession from "./IWorkSession";

export default interface IEmployee {
  name: string;
  schedule: IWorkSession[];
}
