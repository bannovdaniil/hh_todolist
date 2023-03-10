# Simple ToDo List

### hh.ru домашняя по Spring

Простой планировщик заданий на Spring + Jersey + Hibernate + Postgres + nginx + Docker

Фронтенд реализован: [Бекен Сарсенбаев](https://github.com/Beken-S)

<img src="https://raw.githubusercontent.com/bannovdaniil/hh_todolist/main/uml/snapshot.jpg" width="640" target="_blank"/>

## Как запустить

**Зайти в папку с проектом и выполнить:**

- mvn clean install
- docker-compose build
- docker-compose up

#### Nginx:
##### port:
- 80

**GET http://localhost/** - после запуска контейнера страница для демонстрации работы.

##### Файл конфигурации:
./nginx/conf.d/app.conf
##### Index page:
./nginx/www/html/

#### Endpoints:
##### port:
- 8080

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

![Class Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/bannovdaniil/hh_todolist/main/uml/scheme.puml?new)
