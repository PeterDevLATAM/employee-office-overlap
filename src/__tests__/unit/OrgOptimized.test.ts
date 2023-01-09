import Organization from "../../Models/OrganizationOptimized/OrganizationOptimized";
import {
  SAMPLE_DATA,
  SAMPLE_DATA_2,
  SAMPLE_DATA_3,
  SAMPLE_DATA_4,
} from "../../__mocks__/mock-data";
import JSON_DATA_2 from "../../__mocks__/data/OrgOpt/time-data-point-2.json";
import JSON_DATA_3 from "../../__mocks__/data/OrgOpt/time-data-point-3.json";
import JSON_DATA_4 from "../../__mocks__/data/OrgOpt/time-data-point-4.json";
import JSON_DATA_OCUPANCY_2 from "../../__mocks__/data/OrgOpt/ocupancyNodeList-2.json";
import JSON_DATA_OCUPANCY_3 from "../../__mocks__/data/OrgOpt/ocupancyNodeList-3.json";

describe("Test making datapoints map", () => {
  test("Dataset 2", () => {
    const org = new Organization("ACME", "");
    org.addEmployees(SAMPLE_DATA_2);
    const result: any = org.getGeneralTimeDataPoint();
    Object.keys(result).forEach((key) => {
      result[key].employees = Array.from(result[key].employees);
    });
    expect(result).toEqual(JSON_DATA_2);
  });

  test("Dataset 3", () => {
    const org = new Organization("ACME", "");
    org.addEmployees(SAMPLE_DATA_3);
    const result: any = org.getGeneralTimeDataPoint();
    Object.keys(result).forEach((key) => {
      result[key].employees = Array.from(result[key].employees);
    });
    expect(result).toEqual(JSON_DATA_3);
  });

  test("Dataset 4", () => {
    const org = new Organization("ACME", "");
    org.addEmployees(SAMPLE_DATA_4);
    const result: any = org.getGeneralTimeDataPoint();
    Object.keys(result).forEach((key) => {
      result[key].employees = Array.from(result[key].employees);
    });
    expect(result).toEqual(JSON_DATA_4);
  });
});

describe("Unified Concurrency map", () => {
  test("Dataset 2", () => {
    const org = new Organization("ACME", "");
    org.addEmployees(SAMPLE_DATA_2);
    const generalSchedule = org.getGeneralTimeDataPoint();
    const result = JSON.stringify(org.getOcupancyIntervalsNodeList(generalSchedule));
    expect(result).toEqual(JSON.stringify(JSON_DATA_OCUPANCY_2));
  });

  test("Dataset 3", () => {
    const org = new Organization("ACME", "");
    org.addEmployees(SAMPLE_DATA_3);
    const generalSchedule = org.getGeneralTimeDataPoint();
    const result = JSON.stringify(org.getOcupancyIntervalsNodeList(generalSchedule));
    expect(result).toEqual(JSON.stringify(JSON_DATA_OCUPANCY_3));
  });
});
