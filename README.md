# hh.ru домашняя по Spring

## ToDo List

Простой планировщик заданий на Spring + Jersey + Hibernate + Postgres + Docker

## Как запустить

- Зайти в папку с проектом и выполнить:

`
mvn clean install -DskipTests

docker-compose build

docker-compose up
`
#### port:

8080

#### Endpoints:

**GET http://localhost:8080/api/v1/index.html** - страница для демонстрации работы.

**POST http://localhost:8080/api/v1/add** - добавляет новую задачу в базу

- передаваемые параметры:
    - task
- имя задачи
- вернет:
  json с данными созданной задачи.

`{
"id": 15,
"taskTime": "2023-02-09 23:34:46",
"taskName": "name of task",
"taskStatus": "ACTIVE"
}`

**GET http://localhost:8080/api/v1/get/{id}** - получить информацию о задаче по ID
- вернет:
json с данными созданной задачи.

`{
"id": 15,
"taskTime": "2023-02-09 23:34:46",
"taskName": "name of task",
"taskStatus": "ACTIVE"
}`

**GET http://localhost:8080/api/v1/getAll** - получить информацию о всех задачах
- вернет:
 список задач

**GET http://localhost:8080/api/v1/getAll** - получить информацию о всех задачах
- вернет:
  список задач

**GET http://localhost:8080/api/v1/getAll?status={status}** - получить информацию о всех задачах с заданным статусом
- передаваемые параметры:
  - status - состояние задачи, возможные значения: [_ACTIVE, COMPLETED, WORK_]

**DELETE http://localhost:8080/api/v1/delete/{id}** - удалить из базы задачу по ID

**UPDATE http://localhost:8080/api/v1/update/2** - изменить задачу по ID
- передаваемые параметры:
  - task - имя задачи
  - status - состояние задачи, возможные значения: [_ACTIVE, COMPLETED, WORK_]

- вернет:
json с данными созданной задачи.

`{
"id": 15,
"taskTime": "2023-02-09 23:34:46",
"taskName": "name of task",
"taskStatus": "ACTIVE"
}`


### _Схема Базы данных проекта_

![Class Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/bannovdaniil/hh_todolist/develop/uml/scheme.puml?new)
