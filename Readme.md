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
