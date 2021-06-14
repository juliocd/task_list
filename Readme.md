# Task List Api

## Run app by Docker (localhost)
### 1. Create Docker image
`$ docker build -t tasklistapi -f Dockerfile .`
### 2. Run Docker image from container
`$ docker run -i -p 4000:4000 -t tasklistapi`
### 3. Access by
[http://localhost:4000/api/v1](http://localhost:4000/api/v1)

## Run app in local environment
### 1. Run
`$ npm start`
### 2. Access by
[http://localhost:4000/api/v1](http://localhost:4000/api/v1)
## Run app in local environment (Dev)
`$ npm run dev`
## Run app unitary test
`$ npm test`

## Env Variables
REACT_APP_TASK_LIST_API_HOST: Task list api host

## Endpoints

### [GET] Get tasks
[http://localhost:4000/api/v1/tasks](http://localhost:4000/api/v1/tasks)

This method returns the number of tasks, by default it returns 3 task. The parameter `tasks_number` is optional. This parameter should be a `number` and be between `1` and `500`. It was restricted because the Hipsum API could restrict its consumption if the volume of requests is too high.

### [PUT] Mark task as completed
[http://localhost:4000/api/v1/task](http://localhost:4000/api/v1/task)

This method marks a task as completed. It receives parameter called `task_id` (required) which should be an `string`.