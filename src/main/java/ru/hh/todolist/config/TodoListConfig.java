package ru.hh.todolist.config;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.hh.todolist.resource.TodoListResource;
import ru.hh.todolist.service.TodoListService;
import ru.hh.todolist.service.impl.TodoListServiceImpl;

@Configuration
@Import({
    TodoListServiceImpl.class,
    TodoListResource.class
})
public class TodoListConfig {
  @Bean
  public TodoListResource todoListResource(TodoListService todoListService) {
    return new TodoListResource(todoListService);
  }

  @Bean
  public ResourceConfig jerseyConfig() {
    ResourceConfig resourceConfig = new ResourceConfig();
    resourceConfig.register(TodoListResource.class);
    return resourceConfig;
  }
}
