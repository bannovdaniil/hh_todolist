package ru.hh.todolist.dao;

import jakarta.inject.Inject;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.entity.TaskStatus;
import ru.hh.todolist.utils.TransactionHelper;

import java.util.List;

@Repository
public class GenericDao<T> {
  private final SessionFactory sessionFactory;
  private final TransactionHelper transactionHelper;

  @Inject
  public GenericDao(SessionFactory sessionFactory, TransactionHelper transactionHelper) {
    this.sessionFactory = sessionFactory;
    this.transactionHelper = transactionHelper;
  }

  public void save(T entity) {
    if (entity == null) {
      return;
    }
    transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().saveOrUpdate(entity)
    );
  }

  public <T> T get(Class<T> clazz, Long taskId) {
    return transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().get(clazz, taskId)
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

  public List<TaskDto> getAll(TaskStatus taskStatus) {
    return transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().createQuery(
                "Select t from Task as t WHERE t.taskStatus = :taskStatus")
            .setParameter("taskStatus", taskStatus)
            .list()
    );
  }

  public List<TaskDto> getAll() {
    return transactionHelper.inTransaction(() ->
        sessionFactory.getCurrentSession().createQuery(
                "Select t from Task as t")
            .list()
    );
  }

}
