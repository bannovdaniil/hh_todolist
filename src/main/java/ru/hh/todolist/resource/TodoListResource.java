package ru.hh.todolist.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.RequestParam;
import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.service.TodoListService;

@Path("/api/v1")
@Import({
    TodoListService.class
})
public class TodoListResource {
  private final TodoListService todoListService;

  @Inject
  public TodoListResource(TodoListService todoListService) {
    this.todoListService = todoListService;
  }

  @GET
  @Path("/add")
  public TaskDto addTask(@RequestParam String taskName) {
    return todoListService.add(taskName);
  }

}