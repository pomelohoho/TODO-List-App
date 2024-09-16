import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = new Task();  // Set default values
  editingTask: number | null = null;
  editingTaskContent: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.dataService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  addTask() {
    if (this.newTask.title.trim()) {
      this.dataService.addTask(this.newTask).subscribe(() => {
        this.loadTasks();
        this.newTask = new Task();  // Reset the new task after adding
      });
    }
  }

  editTask(task: Task) {
    this.editingTask = task.id; // Use task.id directly instead of array index
    this.editingTaskContent = task.title;
  }
  
  saveEditTask() {
    if (this.editingTask !== null) {
      const taskToEdit = this.tasks.find(t => t.id === this.editingTask); // Find task by ID
      if (taskToEdit) {
        taskToEdit.title = this.editingTaskContent;
        this.dataService.editTask(this.editingTask, taskToEdit).subscribe(() => {
          this.loadTasks();
          this.editingTask = null;
          this.editingTaskContent = '';
        });
      }
    }
  }
  
  deleteTask(id: number) {
    this.dataService.deleteTask(id).subscribe(() => {
      this.loadTasks(); // Refresh tasks after deletion
    });
  }
  
  toggleTaskStatus(id: number) {
    this.dataService.toggleTaskStatus(id).subscribe(() => {
      this.loadTasks();  // Refresh the list of tasks after toggling status
    });
  }
  
  

}
