FROM amazoncorretto:17-alpine-jdk
COPY target/todolist-*.jar todolist.jar
ENTRYPOINT ["java","-jar","/todolist.jar"] 
