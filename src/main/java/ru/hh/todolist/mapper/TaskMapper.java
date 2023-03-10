package ru.hh.todolist.mapper;

import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.entity.Task;

import java.util.List;

public class TaskMapper {
  public static TaskDto taskToDto(Task task) {
    return new TaskDto(
        task.getId(),
        task.getTaskTime(),
        task.getTaskName(),
        task.getTaskStatus()
    );
  }

  public static List<TaskDto> taskListToDtoList(List<Task> tasks) {
    return tasks.stream().map(TaskMapper::taskToDto).toList();
  }
}
