package ru.hh.todolist.service.impl;

import org.springframework.stereotype.Component;
import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.mapper.TaskMapper;
import ru.hh.todolist.model.Task;
import ru.hh.todolist.model.TaskStatus;
import ru.hh.todolist.service.TodoListService;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class TodoListServiceImpl implements TodoListService {
  @Override
  public TaskDto add(String taskName) {
    Task task = new Task(
        LocalDateTime.now(),
        taskName,
        TaskStatus.ACTIVE
    );
    return TaskMapper.taskToDto(task);
  }

  @Override
  public List<TaskDto> getAll() {
    return null;
  }
}
