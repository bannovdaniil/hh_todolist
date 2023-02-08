package ru.hh.todolist.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ru.hh.todolist.config.Constants;
import ru.hh.todolist.model.TaskStatus;

import java.time.LocalDateTime;

public class TaskDto {
  @JsonFormat(pattern = Constants.DATE_TIME_STRING)
  private LocalDateTime taskTime;
  private String taskName;
  private TaskStatus taskStatus;

  public TaskDto(LocalDateTime taskTime, String taskName, TaskStatus taskStatus) {
    this.taskTime = taskTime;
    this.taskName = taskName;
    this.taskStatus = taskStatus;
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
