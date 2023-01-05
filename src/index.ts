import Organization from "./Models/Organization/Organization";

const employeeFilePath = process.argv[2];
const organization = new Organization("ACME", employeeFilePath)
console.log(organization.employees) 
console.log(organization.getEmployeeOfficeOverlap()) 