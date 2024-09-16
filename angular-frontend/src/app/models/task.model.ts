export class Task {
  id: number;
  title: string;
  description: string;
  time: string;
  completed: boolean;

  constructor(
    id: number = 0,  // Default to 0, assuming the backend will assign the id
    title: string = '',
    description: string = '',
    time: string = new Date().toLocaleString(),
    completed: boolean = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.time = time;
    this.completed = completed;
  }
}
