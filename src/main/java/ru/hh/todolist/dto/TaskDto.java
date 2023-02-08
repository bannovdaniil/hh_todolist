package ru.hh.todolist.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ru.hh.todolist.config.Constants;
import ru.hh.todolist.entity.TaskStatus;

import java.time.LocalDateTime;

public class TaskDto {
  private Long id;
  @JsonFormat(pattern = Constants.DATE_TIME_STRING)
  private LocalDateTime taskTime;
  private String taskName;
  private TaskStatus taskStatus;

  public TaskDto() {
  }

  public TaskDto(Long id, LocalDateTime taskTime, String taskName, TaskStatus taskStatus) {
    this.id = id;
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
