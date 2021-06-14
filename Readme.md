1. Set up docker ENV variables (The Docker file has loaded the test data)
ENV NODE_ENV production
ENV PORT
ENV HIPSUM_HOST_API_HOST
ENV DATABASE_USER
ENV DATABASE_PASSWORD
ENV DATABASE_NAME
ENV DATABASE_NAME_TEST

2. Create Docker image
$ docker build -t tasklistapi -f Dockerfile .

3. Run
$ docker run -i -p 4000:4000 -t tasklistapi

3. Access to the api endpoint by [YourHost]/api/v1