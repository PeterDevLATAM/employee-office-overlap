"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataLoader {
    constructor(path) {
        this.data = [];
        this.path = "";
        this.path = path;
    }
    fetchEmployees(srcType) {
        return new srcType().fetchEmployees(this.path);
    }
}
exports.default = DataLoader;
