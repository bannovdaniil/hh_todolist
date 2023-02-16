package ru.hh.todolist.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import org.slf4j.Logger;
import ru.hh.todolist.dto.TaskDto;
import ru.hh.todolist.entity.TaskStatus;
import ru.hh.todolist.service.TodoListService;

import java.util.List;
import java.util.Optional;

import static org.slf4j.LoggerFactory.getLogger;

@Path("/api/v1")
public class TodoListResource {
  public static final Logger LOGGER = getLogger(TodoListService.class);
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

  private static void checkId(Long taskId) {
    if (taskId == null || taskId < 0) {
      LOGGER.error("TaskId parameter is negative or Null: {}", taskId);
      throw new BadRequestException("TaskId bad.");
    }
  }

  @GET
  @Path("/getAll")
  @Produces("application/json")
  public List<TaskDto> getAllTask(@QueryParam(value = "status") TaskStatus taskStatus) {
    LOGGER.info("GET getAllTask: {}", taskStatus);
    return todoListService.getAllTask(Optional.ofNullable(taskStatus));
  }

  @GET
  @Path("/get/{id}")
  @Produces("application/json")
  public TaskDto getTask(@PathParam(value = "id") Long taskId) {
    LOGGER.info("GET getTask: {}", taskId);
    checkId(taskId);
    return todoListService.getTask(taskId);
  }

  @DELETE
  @Path("/delete/{id}")
  public void deleteTask(@PathParam(value = "id") Long taskId) {
    LOGGER.info("DELETE deleteTask: {}", taskId);
    checkId(taskId);
    todoListService.deleteTask(taskId);
  }

  @PUT
  @Path("/update/{id}")
  @Produces("application/json")
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  public TaskDto updateTask(@PathParam(value = "id") Long taskId,
                            @FormParam(value = "task") String taskName,
                            @FormParam(value = "status") TaskStatus taskStatus) {
    LOGGER.info("PATCH updateTask: id:{}, status:{}, taskName:{}", taskId, taskStatus, taskName);
    checkId(taskId);
    return todoListService.update(taskId, taskName, Optional.ofNullable(taskStatus));
  }
}
