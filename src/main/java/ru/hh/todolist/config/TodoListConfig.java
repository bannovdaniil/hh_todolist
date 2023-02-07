package ru.hh.todolist.config;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.hh.todolist.resource.TodoListResource;

@Configuration
public class TodoListConfig {
  @Bean
  public ResourceConfig jerseyConfig() {
    ResourceConfig resourceConfig = new ResourceConfig();
    resourceConfig.register(TodoListResource.class);
    return resourceConfig;
  }
}
