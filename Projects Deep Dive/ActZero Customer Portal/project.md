# ActZero Customer Portal

## Technologies Used

### AWS Amplify

- **AppSync**

  - create unified GraphQL api to access disparate data sources
  - instantly creates API's based on the database schema (export schema as CSV's, configure through AppSync)
  - create pub/sub API's so other sources can publish ephemeral data to GraphQL through web sockets (i.e. scan running)

- create IAM roles for amplify -> data stores access
- connect amplify to VPC where the data stores live
- `amplify add api` to create a GraphQL api
- GraphQL
- React
- Use AppSync to link lambdas to GraphQL queries and mutations. Example:

  - Collect data about a scan that is kept in disparate data sources (DynamoDB, S3, Kinesis stream)
  - Add data to multiple data sources

- **AWS Cognito**
  - Used to ensure users that belong to an organization can only access their data
  - Seamless with user sign-up

### Trade-off's we made

### Pitfalls

- **Problem:** Amplify's one click deployment often failed. We'd serve old versions of the app accidentally and have to quickly manually deploy the correct version
- **Solution:** Switched to manual deploys by configuring an S3 bucket with our static files

- **Problem:** Side effects from mutations across multiple data stores became hard to track down and isolate
- **Solution:** Create one lambda per one data store per mutation and then create a bulk mutation proxy system to handle batching the mutations. This system could then be queried for the results of the bulk mutation
