import IEmployee from "src/Models/Employee/IEmployee";
import { TimePoint } from "../TimePointsLinkedList/TimePoint";
import TimePointsLinkedList from "../TimePointsLinkedList/TimePointsLinkedList";
import { IntervalPoint } from "./IntervalPoint";

export default class IntervalsLinkedList {
  private head: IntervalPoint;
  private tail: IntervalPoint;
  private length: number;

  constructor(dayGeneralDataPoint: TimePointsLinkedList) {
    this.head = new IntervalPoint("00:00", new Set());
    this.tail = this.head;
    this.length = 0;
    this.constructList(dayGeneralDataPoint)
  }

  constructList(dayGeneralDataPoint: TimePointsLinkedList) {
    // dayGeneralDataPoint.printList()
    let dataCurrentNode = dayGeneralDataPoint.head.nextDataPoint;

    while (dataCurrentNode) {
      let newNode = new IntervalPoint(dataCurrentNode.timePoint, new Set());

      if (!dataCurrentNode.employee || !dataCurrentNode.timePoint) {
        this.tail.nextInterval = newNode;
        this.tail = newNode;
        break;
      }

      newNode.employees = new Set(this.tail.employees);

      if (dataCurrentNode.type === "IN") {
        newNode.employees.add(dataCurrentNode.employee);
      } else if (dataCurrentNode.type === "OUT") {
        newNode.employees.delete(dataCurrentNode.employee);
      }

      while (newNode.time === dataCurrentNode!.nextDataPoint!.timePoint) {
        dataCurrentNode = dataCurrentNode!.nextDataPoint;
        if (dataCurrentNode!.type === "IN") {
          newNode.employees.add(dataCurrentNode!.employee!);
        } else if (dataCurrentNode!.type === "OUT") {
          newNode.employees.delete(dataCurrentNode!.employee!);
        }
      }

      this.tail.nextInterval = newNode;
      this.tail = newNode;
      // console.log("NODE", this.tail.time, this.tail.employees)
      this.length++;
      dataCurrentNode = dataCurrentNode!.nextDataPoint;
    }
  }

  printNodeList() {
    const list: any[] = [];
    let currentNode: IntervalPoint | null = this.head;
    let counter = 0 
    while (currentNode) {
      const { time, employees } = currentNode;
      let employeeNames = []
      const iterator = employees.values()
      for (const entry of iterator){
        employeeNames.push(entry.name)
      }
      
      list.push(counter++, [time, employeeNames]);
      currentNode = currentNode.nextInterval;
    }
    console.log("List: ", list);
  }
}
