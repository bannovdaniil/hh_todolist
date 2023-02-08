package ru.hh.todolist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks", schema = "public")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "task_id")
  private Long id;

  @Column(name = "creation_time", columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
  private LocalDateTime taskTime;
  @Column(name = "task_name", length = 250)
  private String taskName;
  @Enumerated(value = EnumType.STRING)
  @Column(name = "task_status", length = 9)
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

  public LocalDateTime getTaskTime() {
    return taskTime;
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

