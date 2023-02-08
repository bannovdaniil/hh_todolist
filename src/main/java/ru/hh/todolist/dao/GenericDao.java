package ru.hh.todolist.dao;

import jakarta.inject.Inject;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import ru.hh.todolist.utils.TransactionHelper;

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
}
