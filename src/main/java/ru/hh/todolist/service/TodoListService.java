package ru.hh.todolist.service;

import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import ru.hh.todolist.dao.TaskDao;
import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.entity.Task;
import ru.hh.todolist.entity.TaskStatus;
import ru.hh.todolist.mapper.TaskMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.slf4j.LoggerFactory.getLogger;

@Component
public class TodoListService {
  private final TaskDao taskDao;

  public static final Logger LOGGER = getLogger(TodoListService.class);

  @Inject
  public TodoListService(TaskDao taskDao) {
    this.taskDao = taskDao;
  }

  public TaskDto add(String taskName) {
    if (StringUtils.isBlank(taskName)) {
      LOGGER.error("Task parameter is Blank or Null");
      throw new BadRequestException("Task is empty.");
    }

    Task task = new Task(
        LocalDateTime.now().withNano(0),
        taskName.trim(),
        TaskStatus.ACTIVE
    );
    taskDao.save(task);

    return TaskMapper.taskToDto(task);
  }

  public TaskDto getTask(Long taskId) {
    Task task = taskDao.get(taskId);
    return TaskMapper.taskToDto(task);
  }

  public void deleteTask(Long taskId) {
    taskDao.delete(taskId);
  }

  public List<TaskDto> getAllTask(Optional<TaskStatus> taskStatus) {
    return TaskMapper.taskListToDtoList(
        taskStatus
            .map(taskDao::getAll)
            .orElseGet(taskDao::getAll)
    );
  }

  public TaskDto update(Long taskId, String taskName, Optional<TaskStatus> taskStatus) {
    Task task = taskDao.get(taskId);
    taskStatus.ifPresent(task::setTaskStatus);
    if (StringUtils.isNotBlank(taskName)) {
      task.setTaskName(taskName);
    }
    taskDao.save(task);

    return TaskMapper.taskToDto(task);
  }

}
