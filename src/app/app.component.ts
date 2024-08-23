import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DatePipe,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

taskObj: Task = new Task();
  taskList: ITask[] = [];

  masterService = inject(MasterService);

  ngOnInit(): void {

    this.loadAllTask();

  }

  loadAllTask() {
    this.masterService.getAllTaskList().subscribe((res: ApiResponseModel) => {
      this.taskList = res.data;

    })
  }
addTask() {
  this.masterService.addNewtask(this.taskObj).subscribe((res:ApiResponseModel)=>{
if(res.result) {
  alert('Task Created Success');
  this.loadAllTask();
  this.taskObj = new Task();
}
  },error=>{
    alert('API Call Error')
  })
}

}
