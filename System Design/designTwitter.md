# Design Twitter

**Read** Heavy -> eventual consistency is probably good enough

### Database Design
- **tweets**
  - **Attributes**
    - user
    - tweetText
    - tweetImage
    - tweetVideo
  - **Actions**
    - like
    - retweet
    - follow / unfollow user

### Functionality
- follow other users
- create tweets
- viewing a newsfeed (of users you follow)

### System Capacity (approx)
- ~500M users
- ~200M active users (aka how many people will be viewing their newsfeed)
- active users will read ~100 tweets per day = 20 billion tweet reads per day
- size of each tweet = 140 chars + metadata + images / videos etc -> 1MB per tweet
- overall we could read ~ 20PB of data / day (1MB sized tweets * 20B tweets read)
- active users might write 50M tweets / day (if 5M active users write 10 tweets / day)
- the most followers a user will likely have is approx 100M
  - this means that wherever we store this user's tweets, we will have to allow at most ~100M people to access those tweets

### Database
- **considerations**
  - read heavy -> reason to use No-SQL db
  - defined data relations -> reason to use SQL db
    - if we choose SQL DB, we should make **read only replicas**
    - we still have a large amount of writes to take into consideration so we should **shard**
      - how will we shard?
        - shard the `Follow` table on `userId` because a user only really cares about a subset of users
        - shard the `Tweets` table on `userId` because all the tweets of a user should be on the same shard
- massive reads -> dead giveaway we will need a **caching layer**
  - use an **LRU** (least recently used) algorithm to bump old tweets off the cache
- to store media we will need separate storage for that, likely **object storage** like S3
  - a user can fetch a tweet and then make a new request with the tweet ID to get its media
  - because the media is static, we can use a **CDN** and then the user can just interact with the CDN for media

## Schema
- **Tweets**
- **Follow**
  - follower FK to UserId (index on the follower to make it easy to get all a user's followees, you can just use a range query to get all a users followees)
  - followee FK to UserId
- **Tweets**
  - tweetId UID
  - timestamp
  - userId FK
  - mediaId

### App Servers
- createTweet(text, media, userID)
- getFeed(userId) (only that user should be able to fetch their feed)
- follow(userId to follow, userId for who is following)

## Latency
- because we may have to query multiple shards for a user's newsfeed, this will create a latency bottleneck
- to solve this, we can load a user's newsfeed asynchronously and add to a feed cache
  - as soon as a user logs in we can send a message to a pub / sub queue which sets off the asynchronous news feed read and load that to the feed cache
    - this favors availability over consistency meaning videos should always be available to a user, while the exact videos that are available are less important
  - if a user follows someone new, we can also send this message to the pub / sub queue which can both update the feed cache to include the new followee's tweets and add the data to the DB
- cache for most watched videos
