package ru.hh.todolist.dao;

import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Repository;
import ru.hh.todolist.entity.Task;
import ru.hh.todolist.entity.TaskStatus;
import ru.hh.todolist.service.TodoListService;
import ru.hh.todolist.utils.TransactionHelper;

import java.util.List;

import static org.slf4j.LoggerFactory.getLogger;

@Repository
public class TaskDao {
  private final SessionFactory sessionFactory;
  private final TransactionHelper transactionHelper;
  public static final Logger LOGGER = getLogger(TodoListService.class);


  @Inject
  public TaskDao(SessionFactory sessionFactory, TransactionHelper transactionHelper) {
    this.sessionFactory = sessionFactory;
    this.transactionHelper = transactionHelper;
  }

  public void save(Task task) {
    if (task == null) {
      return;
    }
    transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().saveOrUpdate(task)
    );
  }

  public Task get(Long taskId) {
    checkId(taskId);
    return transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().get(Task.class, taskId)
    );
  }

  public void delete(final Long taskId) {
    checkId(taskId);
    transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().createQuery(
                "DELETE from Task as t WHERE t.id = :taskId")
            .setParameter("taskId", taskId)
            .executeUpdate()
    );
  }

  public List<Task> getAll(TaskStatus taskStatus) {
    return transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().createQuery(
                "SELECT t FROM Task AS t WHERE t.taskStatus = :taskStatus ORDER BY t.id", Task.class)
            .setParameter("taskStatus", taskStatus)
            .list()
    );
  }

  public List<Task> getAll() {
    return transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().createQuery(
                "SELECT t FROM Task as t ORDER BY t.id", Task.class)
            .list()
    );
  }

  private static void checkId(Long taskId) {
    if (taskId == null || taskId < 0) {
      LOGGER.error("TaskId parameter is negative or Null: {}", taskId);
      throw new BadRequestException("TaskId bad.");
    }
  }
}
