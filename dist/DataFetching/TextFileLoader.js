"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        console.log(path);
        return SAMPLE_DATA;
    }
}
exports.default = TextFileLoader;
