package ru.hh.todolist.model;

import java.time.LocalDateTime;

public class Task {
  private Long id;
  private LocalDateTime taskTime;
  private String taskName;
  private TaskStatus taskStatus;

  public Task() {
  }

  public Task(LocalDateTime taskTime, String taskName, TaskStatus taskStatus) {
    this.taskTime = taskTime;
    this.taskName = taskName;
    this.taskStatus = taskStatus;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public LocalDateTime getTaskTime() {
    return taskTime;
  }

  public void setTaskTime(LocalDateTime taskTime) {
    this.taskTime = taskTime;
  }

  public String getTaskName() {
    return taskName;
  }

  public void setTaskName(String taskName) {
    this.taskName = taskName;
  }

  public TaskStatus getTaskStatus() {
    return taskStatus;
  }

  public void setTaskStatus(TaskStatus taskStatus) {
    this.taskStatus = taskStatus;
  }
}
