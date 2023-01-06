import IEmployee from "src/Models/Employee/IEmployee";
import { TimePoint } from "./TimePoint";

export default class TimePointsLinkedList {
  head: TimePoint;
  tail: TimePoint;
  length: number;

  constructor() {
    this.head = new TimePoint("00:00", undefined);
    this.head.nextDataPoint = new TimePoint("24:00", undefined);
    this.tail = this.head.nextDataPoint;
    this.length = 0;
  }

  insertNode(
    time: string,
    type: "IN" | "OUT" | undefined,
    employee: IEmployee
  ) {
    let newNode = new TimePoint(time, type, employee);
    if (!this.length) {
      this.insertFirstNode(newNode);
      return
    }
    this.locateAndInsert(newNode);
  }

  private locateAndInsert(newNode: TimePoint) {
    let currentNode = this.traverseToWrightNode(newNode);
    newNode.nextDataPoint = currentNode.nextDataPoint;
    currentNode.nextDataPoint = newNode;
    this.length++
  }

  private traverseToWrightNode(newNode: TimePoint) {
    let currentNode = this.head;
    while (newNode.timePoint > currentNode.nextDataPoint!.timePoint) {
      currentNode = currentNode.nextDataPoint!;
    }
    return currentNode;
  }

  private insertFirstNode(newNode: TimePoint) {
    this.head.nextDataPoint = newNode;
    newNode.nextDataPoint = this.tail;
    this.length++;
  }

  printList() {
    const list: any[] = [];
    let currentNode: TimePoint | null = this.head;
    let counter =  0 
    while (currentNode) {
      const{timePoint, employee, type} = currentNode;
      list.push(counter++, [timePoint, employee?.name, type]);
      currentNode = currentNode.nextDataPoint;
    }
    console.log(list) ;
  }
}
