package ru.hh.todolist.service;

import ru.hh.todolist.dto.TaskDto;

import java.util.List;

public interface TodoListService {
  TaskDto add(String taskName);

  List<TaskDto> getAll();

  TaskDto update(Long taskId);

  TaskDto getTask(Long taskId);
}
