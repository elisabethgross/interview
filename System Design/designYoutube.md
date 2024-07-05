# Design Youtube

- read heavy

## Database Design
- structured data -> relational DB
- leader follower replication so reads can be distributed to followers
- leader can be sharded
  - shard on channelId

### Schema
- **Users**
  - userId
- **Channels**
  - channelId
  - channelDescription
  - userId FK
- **Videos**
  - videoId
  - media (thumbnail, video)
- **Subscriptions**
  - subscriptionId
  - userId FK
  - channelId FK
- **Comments**
  - commentId
  - videoId FK
  - userId FK

## API
- createVideo(media, title, channelId, userId)
- createUser(username)
- getChannel(channelId)
- getVideo(videoId)

## Overall Design

# Watching a video
- client
- load balancer
- app servers
- database
- object storage
- cache channels a user subscribes to
- pub / sub for posting videos, can then async store videos
- pub / sub for subscribing to a channel
- CDN for videos
- rather than streaming videos, we can load the videos in chunks - make a request for the relevant portion of the video and only load the next portion right before the user finishes the current portion or if the user clicks to a new portion

# Uploading a video
- client
- load balancer
- app servers
- database
- object storage (raw)
- object storage (encoded)
- queue for asynchronous uploading for many users uploading to avoid bottlenecks
- queue for encoding of videos
- a lot of encoder workers for all videos uploaded per second
