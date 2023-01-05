import DataLoader from "./DataFetching/DataLoader"; 
import TextFileLoader from "./DataFetching/TextFileLoader";
import Organization from "./Organization/Organization";

const employeeFilePath = process.argv[2];
const dataLoader = new DataLoader(employeeFilePath);
const employees = dataLoader.fetchEmployees(TextFileLoader);
const organization = new Organization("ACME", employees)

console.log(organization.getEmployeeOfficeOverlap()) 