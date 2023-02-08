package ru.hh.todolist.entity;

public enum TaskStatus {
  ACTIVE("ACTIVE"),
  COMPLETED("COMPLETED"),
  WORK("WORK");

  private String value;

  TaskStatus(String value) {
    this.value = value;
  }

  public String getValue() {
    return this.value;
  }

  public static TaskStatus fromString(String value) {
    for (var status : TaskStatus.values()) {
      if (status.value.equalsIgnoreCase(value)) {
        return status;
      }
    }
    return null;
  }
}
