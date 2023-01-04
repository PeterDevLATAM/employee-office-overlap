// export const sum = (a:number, b:number): number => {
//   return a + b;
// }

import DataLoader from "./DataFetching/DataLoader"; 
import TextFileLoader from "./DataFetching/TextFileLoader";

const employeeFilePath = process.argv[2];
const dataLoader = new DataLoader(employeeFilePath);
const employees = dataLoader.fetchEmployees(TextFileLoader);
