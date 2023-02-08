package ru.hh.todolist.service;

import ru.hh.todolist.dto.TaskDto;

import java.util.List;

public interface TodoListService {
  TaskDto add(String taskName);

  TaskDto update(Long taskId, String taskName, String status);

  TaskDto getTask(Long taskId);

  void deleteTask(Long taskId);

  List<TaskDto> getAllTask(String status);
}
