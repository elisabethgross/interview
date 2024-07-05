# Debugging AWS

## Observe the error
**Approaches**
1. **X-ray** - used to show the lifecycle of a request through various AWS services to find which component is causing the error
  - **trace map**
2. save logs to s3 bucket
   - set up glue crawler
   - query logs using athena to help find the events (or events) that caused the error
   - locally test event using testing mocks
   - test the lambda with events in a staging environment
3. **event bus** to replay a group of events
4. **lambda insights** to capture memory, network and CPU usage (queryable)
5. **cloudwatch insights** - search logs using a query **syntax**
6. check **dead letter queues**

- look for errors such as:
  - lack of permissions
  - lack of capacity (throttling) -> increase capacity of lambda or set up queue to limit requests going to a lambda
  - timeout is too low
  - downstream outage that is bubbling up (can usually be detected when you increase capacity and this causes more errors (because more requests are now getting through))
  - read capacity of DB is too low
  - business logic error
  - check number of cold starts (if this is high, make efforts to improve cold start latency)
  - check that the services are all running the latest versions
  - check infinite loops (e.g. an SQS queue publishes messages to a lambda that then sends messages to the same SQS queue)

## Monitoring
- **Cloudwatch**
  - use to check general metrics per service
  - set up alarms based on metrics
    - metrics
      - invocations
      - duration
      - error count / success rate
- **Grafana** - create centralized place for observability using grafana

## Simulating Errors
- **payload errors**
  - find problematic payload
  - test locally with mocks
  - test in a staging environment using events
  - use **event bus** to replay a group of requests
- **load tests**
  - **Artillery**

## Queues
- implement batching to speed up process, decrease size of queue
- backpressue in queues occurs when there is queue buildup and the lambda cannot process fast enough
- **Dead Letter Queues** to hold on to the messages in a queue that errored out


## Lucra Interview
- Problem with throttling, one system sending multiple requests to another, sending even more requests to another producing too many requests
- My solution, add a queue to delay the requests to the provider, once you get a response, send to an SNS topic which the lambdas subscribe to in order to process responses, allowing you to leave all the business logic in the original lambdas
- What about different environments hitting the same provider causing throttling issues?
- My solution, cache the data in all environments except prod to limit how many times those environments are hitting the provider

- Theirs - set up an API Gateway as a proxy to rate limit / cache
- set up queueing between the lambdas and the DB's to avoid Hasura sending an alert every time a record is inserted (if the first lambda slows down its insertions, the rest will be slower)
- request an additional API key to get an extra request allowance 
