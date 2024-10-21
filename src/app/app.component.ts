
import { HttpClient} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DatePipe,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  http=inject(HttpClient);

  taskObj: Task = new Task();
  taskList: ITask[] = [];
  tagsList: string [] = ['Work','Health','Market','Meeting','Calls','Defect','Story','Interview'];
  filterType: string = '';
  masterService = inject(MasterService);

  ngOnInit(): void {

    this.loadAllTask();

  }

  loadAllTask() {
    this.masterService.getAllTaskList().subscribe((res: ApiResponseModel) => {
      this.taskList = res.data;
      const itemIds = this.taskList.map(task => task.itemId);
      const hasDuplicates = new Set(itemIds).size !== itemIds.length;
      if (hasDuplicates) {
        console.error("Duplicate itemIds found:", itemIds);
      }
      });


  }

  trackByItemId(index: number, item: ITask): number {
    return item.itemId; // or whatever unique identifier you have
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

onRemove(){
  
}

setFilter(type: string) {
  this.filterType = type;
  
}

getArrayFromCommaSeperatedString(value: string) : string[]{

  const arr = value.split(',')
  return arr

}

onDelete(id: number) {
  debugger;
  const isConfirm = confirm("Are you sure you want to delete?");
  if (isConfirm) {
    console.log(`Deleting task with id: ${id}`);
    this.masterService.deleteTask(id).subscribe(
      (res: ApiResponseModel) => {
        console.log('API Response:', res);
        if (res.result) {
          alert('Task Delete Success');
          this.taskList = this.taskList.filter(task => task.itemId !== id);
          console.log('Remaining tasks after deletion:', this.taskList);
          this.loadAllTask(); // Reload tasks if necessary
        } else {
          console.error('Delete API did not return a successful result.');
        }
      },
      error => {
        console.error('API Call Error:', error);
        alert('API Call Error');
      }
    );
    
    
    
    
    // Debugging log
/*     this.masterService.deleteTask(id).subscribe((res: ApiResponseModel) => {
      if (res.result) {
        alert("Task Delete Success");
        console.log(`Attempting to delete task with id: ${id}`);


        this.taskList = this.taskList.filter(task => task.itemId !== id);
        console.log(`Remaining tasks after deletion:`, this.taskList); // Debugging log
        this.loadAllTask();
      } else {
        console.error("Delete API did not return a successful result.");
      }
    }, error => {
      console.error('API Call Error:', error); // Improved error handling
      alert('API Call Error');
    });  */
  }
}



onComplete() {
  debugger;
  const newData = this.taskList;
}





}
