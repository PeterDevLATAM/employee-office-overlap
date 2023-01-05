import Organization from "../../Organization/Organization";
import {
  SAMPLE_DATA,
  SAMPLE_DATA_2,
  SAMPLE_DATA_3,
  SAMPLE_DATA_4,
} from "../../__mocks__/mock-data";

describe("Test getEmployeeOfficeOverlap", () => {
  // I'm assuming, according to instructions that there're at least 5 employees, so no testing for when is 1 or none

  test("Dataset 1", () => {
    const org = new Organization("ACME", SAMPLE_DATA);
    const result: string[] = org.getEmployeeOfficeOverlap().sort();
    const expected = [
      "RENE-ASTRID: 2",
      "ASTRID-ANDRES: 3",
      "RENE-ANDRES: 2",
    ].sort();
    expect(result).toStrictEqual(expected);
  });
  test("Dataset 2", () => {
    const org = new Organization("ACME", SAMPLE_DATA_2);
    const result: string[] = org.getEmployeeOfficeOverlap().sort();
    const expected = ["RENE-ASTRID: 3"];
    expect(result).toStrictEqual(expected);
  });
  test("Dataset 3", () => {
    const org = new Organization("ACME", SAMPLE_DATA_3);
    const result: string[] = org.getEmployeeOfficeOverlap().sort();
    const expected = [
      "ASTRID-ANDRES: 3",
      "ASTRID-JUAN: 0",
      "ASTRID-PEDRO: 0",
      "JUAN-ANDRES: 0",
      "PEDRO-ANDRES: 0",
      "PEDRO-JUAN: 2",
      "RENE-ANDRES: 2",
      "RENE-ASTRID: 2",
      "RENE-JUAN: 1",
      "RENE-PEDRO: 2",
    ];
    expect(result).toStrictEqual(expected);
  });
  test("Dataset 4", () => {
    const org = new Organization("ACME", SAMPLE_DATA_4);
    const result: string[] = org.getEmployeeOfficeOverlap().sort();
    const expected = [
      "ANTONIO-EIMY: 1",
      "ANTONIO-JULIO: 1",
      "JUAN-ANTONIO: 1",
      "JUAN-EIMY: 2",
      "JUAN-JULIO: 1",
      "JULIO-EIMY: 1",
      "PEDRO-ANTONIO: 2",
      "PEDRO-EIMY: 3",
      "PEDRO-JUAN: 2",
      "PEDRO-JULIO: 1",
    ];
    expect(result).toStrictEqual(expected);
  });
});
