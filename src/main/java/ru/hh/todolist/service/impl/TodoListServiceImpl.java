package ru.hh.todolist.service.impl;

import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import ru.hh.todolist.dao.GenericDao;
import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.entity.Task;
import ru.hh.todolist.entity.TaskStatus;
import ru.hh.todolist.mapper.TaskMapper;
import ru.hh.todolist.service.TodoListService;

import java.time.LocalDateTime;
import java.util.List;

import static org.slf4j.LoggerFactory.getLogger;

@Component
public class TodoListServiceImpl implements TodoListService {
  private final GenericDao genericDao;

  public static final Logger LOGGER = getLogger(TodoListServiceImpl.class);

  @Inject
  public TodoListServiceImpl(GenericDao genericDao) {
    this.genericDao = genericDao;
  }

  @Override
  public TaskDto add(String taskName) {
    if (taskName == null || taskName.isBlank()) {
      LOGGER.error("Task parameter is Blank or Null");
      throw new BadRequestException("Task is empty.");
    }

    Task task = new Task(
        LocalDateTime.now().withNano(0),
        taskName.trim(),
        TaskStatus.ACTIVE
    );
    genericDao.save(task);

    return TaskMapper.taskToDto(task);
  }

  @Override
  public List<TaskDto> getAll() {
    return null;
  }

  @Override
  public TaskDto update(Long taskId) {
    return null;
  }

  @Override
  public TaskDto getTask(Long taskId) {
    checkId(taskId);

    Task task = (Task) genericDao.get(Task.class, taskId);
    return TaskMapper.taskToDto(task);
  }

  @Override
  public void deleteTask(Long taskId) {
    checkId(taskId);

    genericDao.delete(taskId);
  }

  private static void checkId(Long taskId) {
    if (taskId == null || taskId < 0) {
      LOGGER.error("TaskId parameter is negative or Null: {}", taskId);
      throw new BadRequestException("TaskId bad.");
    }
  }
}
