package ru.hh.todolist.config;

import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.hh.todolist.entity.Task;

import java.util.List;

@Configuration
public class DbFactory {

  private static final List<Class<?>> ENTITY_CLASSES_REGISTRY = List.of(
      Task.class
  );

  @Bean
  public static SessionFactory createSessionFactory() {
    StandardServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
        .loadProperties("hibernate.properties")
        .build();

    MetadataSources metadataSources = new MetadataSources(serviceRegistry);
    ENTITY_CLASSES_REGISTRY.forEach(metadataSources::addAnnotatedClass);

    return metadataSources.buildMetadata().buildSessionFactory();
  }

}
