"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataLoader_1 = __importDefault(require("./DataFetching/DataLoader"));
const TextFileLoader_1 = __importDefault(require("./DataFetching/TextFileLoader"));
const dataLoader = new DataLoader_1.default("../data/data.txt");
const employees = dataLoader.fetchEmployees(TextFileLoader_1.default);
console.log(employees);
