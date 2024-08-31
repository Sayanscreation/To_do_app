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


  http=inject(HttpClient);

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

onEdit(item: Task) {
  this.taskObj = item;
  setTimeout(() => {
    const dat = new Date(this.taskObj.dueDate);
    const day = ("0" + dat.getDate()).slice(-2);
    const month = ("0" + (dat.getMonth() + 1)).slice(-2);
    const today = dat.getFullYear() + '-' + month + '-' + day;
    
    // Instead of directly setting the value, bind it to the model
   /*  this.taskObj.dueDate = today; */

    // If you still need to set the input value directly (not recommended)
/*     const dateField = document.getElementById('textDate') as HTMLInputElement;
    if (dateField) {
      dateField.value = today;
    } */

  }, 1000);
}

updateTask(){
  this.masterService.updateTask(this.taskObj).subscribe((res:ApiResponseModel)=>{
    if(res.result) {
      alert('Task Updated Success');
      this.loadAllTask();
      this.taskObj = new Task();
    }
      },error=>{
        alert('API Call Error')
      })

}

onDelete(id: number){
  const isConfirm = confirm("Are you sure you want to delete?");
  if(isConfirm) {
    this.masterService.deleteTask(id).subscribe((res:ApiResponseModel)=>{
      if(res.result){
        alert("Task Delete Success");
        this.loadAllTask();
      }
    },error=>{
      alert('Api Call Error')
    })
  }


}

}
