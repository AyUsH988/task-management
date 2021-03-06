import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor() { }
  maxLetterReched = false
  newtask = '';
  taskList: any = [];
  selectedTaskIndex = -1;

  ngOnInit() {
  }

  valuechange(event) {
    if (event.target.value.length >= 28) {
      this.maxLetterReched = true
    } else this.maxLetterReched = false
  }

  addTask() {
    // on edit
    if (this.newtask != '' && !this.maxLetterReched && this.selectedTaskIndex > -1 && this.checkIfNotExist()) {
      this.taskList[this.selectedTaskIndex].name = this.newtask;
      this.selectedTaskIndex = -1;
      this.newtask = '';
    }
    // on add
    else if (this.newtask != '' && !this.maxLetterReched && this.selectedTaskIndex == -1 && this.checkIfNotExist()) {
      let item = {};
      item['complete'] = false;
      item['name'] = this.newtask
      this.taskList.push(item);
      this.newtask = '';
    }
  }

  taskClicked(i) {
    this.taskList[i]['complete'] = true;
  }

  removeTask(i) {
    this.taskList.splice(i, 1);
  }

  editTask(i) {
    // edit if the task is not completed
    if (!this.taskList[i].complete)
      this.selectedTaskIndex = i;
    this.newtask = this.taskList[i].name;
  }

  checkIfNotExist() {
    // check if task already exist
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].name == this.newtask) {
        return false;
      }
    }
    return true;
  }
}
