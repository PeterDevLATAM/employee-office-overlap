import TextFileLoader from "../../Models/DataFetching/TextFileLoader"
import DataLoader from "../../Models/DataFetching/DataLoader";
import { SAMPLE_DATA, SAMPLE_DATA_2, SAMPLE_DATA_3 } from "../../__mocks__/mock-data";


describe("Test Txt File data loading", () => {
  test("Return Empty Array if bad path", () => {
    const dataLoader = new DataLoader("");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual([]);
  });

  test("Return Empty Array if file Empty", () => {
    const dataLoader = new DataLoader("src/__mocks__/data/data-empty.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual([]);
  });

  test("Return Empty Array if file in wrong format", () => {
    const dataLoader = new DataLoader("src/__mocks__/data/data-wrong.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual([]);
  });
  test("Return Employee Array when ok", () => {
    const dataLoader = new DataLoader("src/__mocks__/data/data.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual(SAMPLE_DATA);
  });
  test("Return Employee Array when ok, dataset 2", () => {
    const dataLoader = new DataLoader("src/__mocks__/data/data2.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual(SAMPLE_DATA_2);
  });
  test("Return Employee Array when ok, dataset 3", () => {
    const dataLoader = new DataLoader("src/__mocks__/data/test-data-3.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    // console.log(JSON.stringify(employees))
    expect(employees).toEqual(SAMPLE_DATA_3);
  });
});
