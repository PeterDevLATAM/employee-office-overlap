import Organization from "./Models/OrganizationOptimized/OrganizationOptimized";

const employeeFilePath = process.argv[2];
const organization = new Organization("ACME", employeeFilePath)
console.log(organization.getEmployeeOfficeOverlap()) 