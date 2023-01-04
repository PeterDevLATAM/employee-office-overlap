"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const SAMPLE_DATA = [
    {
        name: "Pedro",
        schedule: [
            { day: "MO", startTime: "10:00", endTime: "12:00" },
            { day: "MO", startTime: "10:00", endTime: "12:00" },
        ],
    },
    {
        name: "Ana",
        schedule: [
            { day: "MO", startTime: "10:00", endTime: "12:00" },
            { day: "MO", startTime: "10:00", endTime: "12:00" },
        ],
    },
];
class TextFileLoader {
    fetchEmployees(path) {
        let fileContent = "";
        try {
            fileContent = fs.readFileSync(path, "utf-8");
        }
        catch (e) {
            if (typeof e === "string") {
                e.toUpperCase();
            }
            else if (e instanceof Error) {
                console.log(e.message);
            }
        }
        if (fileContent === "")
            return [];
        if (!this.isValidFormat(fileContent))
            return [];
        return this.extractEmployeeData(fileContent);
    }
    isValidFormat(fileContent) {
        let isValid = true;
        for (const line of fileContent.split("\n")) {
            if (this.isValidLine(line) === false)
                isValid = false;
        }
        if (!isValid)
            console.log("Wrong file format");
        return isValid;
    }
    isValidLine(line) {
        if (line === "")
            return true;
        const regex = /^[A-Z]+=[A-Z]{2}\d{2}:\d{2}-\d{2}:\d{2}(,([A-Z]{2}\d{2}:\d{2}-\d{2}:\d{2}))*$/;
        const isValid = regex.test(line);
        return isValid;
    }
    extractEmployeeData(fileContent) {
        const employees = [];
        for (const line of fileContent.split("\n")) {
            if (line === "")
                continue;
            const { name, workSessionsArr } = this.getNameAndWorkSessions(line);
            const schedule = this.getEmployeeSchedule(workSessionsArr);
            employees.push({ name, schedule });
        }
        return employees;
    }
    // I could also check if startTime < endTime, if the days are valid but I'm going to assume they are checked already....
    getEmployeeSchedule(workSessionsArr) {
        return workSessionsArr.map((workSessionStr) => {
            const { dayStr, startTimeStr, endTimeStr } = this.sliceData(workSessionStr);
            return {
                day: dayStr,
                startTime: startTimeStr,
                endTime: endTimeStr,
            };
        });
    }
    sliceData(workSessionStr) {
        const dayStr = workSessionStr.slice(0, 2);
        const startTimeStr = workSessionStr.slice(2, 7);
        const endTimeStr = workSessionStr.slice(8, 13);
        return { dayStr, startTimeStr, endTimeStr };
    }
    getNameAndWorkSessions(line) {
        const [name, workSessionsStr] = line.split("=");
        const workSessionsArr = workSessionsStr.split(",");
        return { name, workSessionsArr };
    }
}
exports.default = TextFileLoader;
