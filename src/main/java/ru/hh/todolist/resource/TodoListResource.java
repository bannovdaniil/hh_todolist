package ru.hh.todolist.resource;

import jakarta.inject.Inject;
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
import ru.hh.todolist.service.TodoListService;
import ru.hh.todolist.service.impl.TodoListServiceImpl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Scanner;

import static org.slf4j.LoggerFactory.getLogger;

@Path("/api/v1")
public class TodoListResource {
  public static final Logger LOGGER = getLogger(TodoListServiceImpl.class);
  private final TodoListService todoListService;

  @Inject
  public TodoListResource(TodoListService todoListService) {
    this.todoListService = todoListService;
  }

  @GET
  @Path("/index.html")
  public String getIndexPage() throws IOException {
    ClassLoader classloader = Thread.currentThread().getContextClassLoader();
    InputStream is = classloader.getResourceAsStream("index.html");
    Scanner sc = new Scanner(is);
    StringBuilder sb = new StringBuilder();
    while (sc.hasNext()) {
      sb.append(sc.nextLine()).append("\n");
    }
    sc.close();
    is.close();
    return sb.toString();
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

  @GET
  @Path("/getAll")
  @Produces("application/json")
  public List<TaskDto> getAllTask(@QueryParam(value = "status") String status) {
    LOGGER.info("GET getAllTask: {}", status);
    return todoListService.getAllTask(status);
  }

  @DELETE
  @Path("/delete/{id}")
  public void deleteTask(@PathParam(value = "id") Long taskId) {
    LOGGER.info("DELETE deleteTask: {}", taskId);
    todoListService.deleteTask(taskId);
  }

  @PUT
  @Path("/update/{id}")
  @Produces("application/json")
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  public TaskDto updateTask(@PathParam(value = "id") Long taskId,
                            @FormParam(value = "task") String taskName,
                            @FormParam(value = "status") String status) {
    LOGGER.info("PATCH updateTask: id:{}, status:{}, taskName:{}", taskId, status, taskName);
    return todoListService.update(taskId, taskName, status);
  }

}
