package ru.hh.todolist.dao;

import jakarta.inject.Inject;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import ru.hh.todolist.entity.Task;
import ru.hh.todolist.entity.TaskStatus;
import ru.hh.todolist.utils.TransactionHelper;

import java.util.List;

@Repository
public class TaskDao {
  private final SessionFactory sessionFactory;
  private final TransactionHelper transactionHelper;

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
    return transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().get(Task.class, taskId)
    );
  }

  public void delete(final Long taskId) {
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
}
