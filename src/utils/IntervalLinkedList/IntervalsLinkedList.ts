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
  
  getEmployeeCoincidencePerDay(employees: Set<IEmployee>){
    let coincidence:{[name: string]: Set<IEmployee>} = {}
    employees.forEach(employee => {
      if(!coincidence[employee.name]) coincidence[employee.name]= new Set()
      let currentNode: IntervalPoint | null = this.head.nextInterval;
      while(currentNode){
        if(currentNode.employees.has(employee)){
          coincidence[employee.name] = new Set([...currentNode.employees])
        }
        currentNode = currentNode.nextInterval
      }
      coincidence[employee.name].delete(employee)
    })
    return coincidence
  }

  constructList(dayGeneralDataPoint: TimePointsLinkedList) {
    // dayGeneralDataPoint.printList()
    let dataCurrentNode = dayGeneralDataPoint.head.nextDataPoint;
    dataCurrentNode = this.iterateOverList(dataCurrentNode);
  }

  private iterateOverList(dataCurrentNode: TimePoint | null) {
    while (dataCurrentNode) {
      let newNode = new IntervalPoint(dataCurrentNode.timePoint, new Set());
      if (this.isEndOfList(dataCurrentNode)) {
        this.setTail(newNode);
        break;
      }
      dataCurrentNode = this.constructNode(newNode, dataCurrentNode);
      dataCurrentNode = this.changeToNextNode(newNode, dataCurrentNode);
    }
    return dataCurrentNode;
  }

  private setTail(newNode: IntervalPoint) {
    this.tail.nextInterval = newNode;
    this.tail = newNode;
  }

  private changeToNextNode(newNode: IntervalPoint, dataCurrentNode: TimePoint | null) {
    this.changeNodePointers(newNode);
    dataCurrentNode = dataCurrentNode!.nextDataPoint;
    return dataCurrentNode;
  }

  private constructNode(newNode: IntervalPoint, dataCurrentNode: TimePoint | null) {
    newNode.employees = new Set(this.tail.employees);
    this.addOrDeleteEmployee(dataCurrentNode!, newNode);
    dataCurrentNode = this.checkNextNode(newNode, dataCurrentNode);
    return dataCurrentNode;
  }

  private isEndOfList(dataCurrentNode: TimePoint) {
    return !dataCurrentNode.employee || !dataCurrentNode.timePoint;
  }

  private checkNextNode(newNode: IntervalPoint, dataCurrentNode: TimePoint | null) {
    while (this.isNextNodeSameTime(newNode, dataCurrentNode)) {
      dataCurrentNode = dataCurrentNode!.nextDataPoint;
      this.addOrDeleteEmployee(dataCurrentNode!, newNode);
    }
    return dataCurrentNode;
  }

  private changeNodePointers(newNode: IntervalPoint) {
    this.tail.nextInterval = newNode;
    this.tail = newNode;
    this.length++;
  }

  private isNextNodeSameTime(newNode: IntervalPoint, dataCurrentNode: TimePoint | null) {
    return newNode.time === dataCurrentNode!.nextDataPoint!.timePoint;
  }

  private addOrDeleteEmployee(dataCurrentNode: TimePoint, newNode: IntervalPoint) {
    if (dataCurrentNode.type === "IN") {
      newNode.employees.add(dataCurrentNode.employee!);
    } else if (dataCurrentNode.type === "OUT") {
      newNode.employees.delete(dataCurrentNode.employee!);
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
