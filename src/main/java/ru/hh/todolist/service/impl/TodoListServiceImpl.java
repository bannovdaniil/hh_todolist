package ru.hh.todolist.service.impl;

import jakarta.ws.rs.BadRequestException;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.mapper.TaskMapper;
import ru.hh.todolist.model.Task;
import ru.hh.todolist.model.TaskStatus;
import ru.hh.todolist.service.TodoListService;

import java.time.LocalDateTime;
import java.util.List;

import static org.slf4j.LoggerFactory.getLogger;

@Component
public class TodoListServiceImpl implements TodoListService {
  public static final Logger LOGGER = getLogger(TodoListServiceImpl.class);

  @Override
  public TaskDto add(String taskName) {
    if (taskName == null || taskName.isBlank()) {
      LOGGER.error("Task parameter is Blank or Null");
      throw new BadRequestException("Task is empty.");
    }
    Task task = new Task(
        LocalDateTime.now(),
        taskName.trim(),
        TaskStatus.ACTIVE
    );
    return TaskMapper.taskToDto(task);
  }

  @Override
  public List<TaskDto> getAll() {
    return null;
  }
}
