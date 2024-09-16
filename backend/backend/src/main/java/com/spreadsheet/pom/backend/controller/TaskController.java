package com.spreadsheet.pom.backend.controller;

import com.spreadsheet.pom.backend.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.spreadsheet.pom.backend.model.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Fetch all tasks, add a sample if database is empty
    @GetMapping("/")
    public List<Task> getAllTasks() {
        // Check if the database is empty
        if (taskRepository.count() == 0) {
            // Add a sample task if no tasks are present
            Task sampleTask = new Task("Sample Task", "This is a sample task", "12:00 PM", false);
            taskRepository.save(sampleTask);
        }
        return taskRepository.findAll();
    }

    // Add a new task
    @PostMapping("/")
    public Task addTask(@RequestBody Task newTask) {
        return taskRepository.save(newTask);
    }

    // Edit an existing task
    @PutMapping("/{id}")
    public Task editTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setTime(updatedTask.getTime());
                    task.setCompleted(updatedTask.isCompleted());
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // TaskController.java
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.ok("Task deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Task not found");
        }
    }




    // Toggle task completion status
    @PutMapping("/toggle/{id}")
    public ResponseEntity<String> toggleTaskStatus(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setCompleted(!task.isCompleted());
                    taskRepository.save(task);
                    return ResponseEntity.ok("Task status toggled successfully!");
                })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }
}
