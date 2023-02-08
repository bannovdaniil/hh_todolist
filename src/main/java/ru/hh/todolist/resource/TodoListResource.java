package ru.hh.todolist.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import org.slf4j.Logger;
import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.service.TodoListService;
import ru.hh.todolist.service.impl.TodoListServiceImpl;

import static org.slf4j.LoggerFactory.getLogger;

@Path("/api/v1")
public class TodoListResource {
  public static final Logger LOGGER = getLogger(TodoListServiceImpl.class);
  private final TodoListService todoListService;

  @Inject
  public TodoListResource(TodoListService todoListService) {
    this.todoListService = todoListService;
  }

  @POST
  @Path("/add")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  public TaskDto addTask(@FormParam("task") String taskName) {
    LOGGER.info("POST addTask: {}", taskName);
    return todoListService.add(taskName);
  }


  @GET
  @Path("/get/{id}")
  @Produces("application/json")
  public TaskDto getTask(@PathParam(value = "id") Long taskId) {
    LOGGER.info("GET getTask: {}", taskId);
    return todoListService.getTask(taskId);
  }

  @PATCH
  @Path("/add")
  @Produces("application/json")
  public TaskDto updateTask(@QueryParam(value = "id") Long taskId) {
    LOGGER.info("PATCH updateTask: id:{}", taskId);
    return todoListService.update(taskId);
  }

}
