import TextFileLoader from "../../DataFetching/TextFileLoader";
import DataLoader from "../../DataFetching/DataLoader";
const SAMPLE_DATA = [
  {
    name: "RENE",
    schedule: [
      { day: "MO", startTime: "10:00", endTime: "12:00" },
      { day: "TU", startTime: "10:00", endTime: "12:00" },
      { day: "TH", startTime: "01:00", endTime: "03:00" },
      { day: "SA", startTime: "14:00", endTime: "18:00" },
      { day: "SU", startTime: "20:00", endTime: "21:00" },
    ],
  },
  {
    name: "ASTRID",
    schedule: [
      { day: "MO", startTime: "10:00", endTime: "12:00" },
      { day: "TH", startTime: "12:00", endTime: "14:00" },
      { day: "SU", startTime: "20:00", endTime: "21:00" },
    ],
  },
  {
    name: "ANDRES",
    schedule: [
      { day: "MO", startTime: "10:00", endTime: "12:00" },
      { day: "TH", startTime: "12:00", endTime: "14:00" },
      { day: "SU", startTime: "20:00", endTime: "21:00" },
    ],
  },
];

const SAMPLE_DATA_2 = [
  {
    name: "RENE",
    schedule: [
      { day: "MO", startTime: "10:15", endTime: "12:00" },
      { day: "TU", startTime: "10:00", endTime: "12:00" },
      { day: "TH", startTime: "13:00", endTime: "13:15" },
      { day: "SA", startTime: "14:00", endTime: "18:00" },
      { day: "SU", startTime: "20:00", endTime: "21:00" },
    ],
  },
  {
    name: "ASTRID",
    schedule: [
      { day: "MO", startTime: "10:00", endTime: "12:00" },
      { day: "TH", startTime: "12:00", endTime: "14:00" },
      { day: "SU", startTime: "20:00", endTime: "21:00" },
    ],
  },
];

describe("Test Txt File data loading", () => {
  test("Return Empty Array if bad path", () => {
    const dataLoader = new DataLoader("");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual([]);
  });

  test("Return Empty Array if file Empty", () => {
    const dataLoader = new DataLoader("src/__tests__/data/data-empty.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual([]);
  });

  test("Return Empty Array if file in wrong format", () => {
    const dataLoader = new DataLoader("src/__tests__/data/data-wrong.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual([]);
  });
  test("Return Employee Array when ok", () => {
    const dataLoader = new DataLoader("src/__tests__/data/data.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual(SAMPLE_DATA);
  });
  test("Return Employee Array when ok, dataset 2", () => {
    const dataLoader = new DataLoader("src/__tests__/data/data2.txt");
    const employees = dataLoader.fetchEmployees(TextFileLoader);
    expect(employees).toEqual(SAMPLE_DATA_2);
  });
});
