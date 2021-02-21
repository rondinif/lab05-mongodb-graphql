 
 
 cd docker
 ## clean up stopped container or old seed images
 ```
 docker rm docker_mongo-seed_1
 docker rm docker_mongodb_1
 docker rmi docker_mongo-seed 
 ```

 ## build, seed and run
 ```
 docker-compose up
 ```
 
 ## query 
```
mongo

> show dbs
Tododb  0.000GB
admin   0.000GB
config  0.000GB
local   0.000GB
> use Tododb
switched to db Tododb
> db.getCollectionNames()
[ "Todo" ]
> db.Todo.find()
{ "_id" : ObjectId("600c6f3c2de876420378ad33"), "id" : NumberLong("1446412740883"), "title" : "Buy orange", "completed" : true }
{ "_id" : ObjectId("600c6f3c2de876420378ad34"), "id" : NumberLong("1446412739542"), "title" : "Read emails", "completed" : false }
```
## insert 
```
> db.Todo.insertOne({"title" : "Andare a Novellara", "completed" : false } )
{
	"acknowledged" : true,
	"insertedId" : ObjectId("60329f98c996f4f67c79bf8d")
}
> db.Todo.insertOne({"title" : "Fare la spesa a  Novellara", "completed" : false } )
{
	"acknowledged" : true,
	"insertedId" : ObjectId("60329fe6f83d56054c7c7dea")
}
> db.Todo.insertOne({"title" : "Passare all'ufficio postatale di  Novellara", "completed" : false } )
{
	"acknowledged" : true,
	"insertedId" : ObjectId("60329ff9f83d56054c7c7deb")
}
> db.Todo.insertOne({"title" : "Portare a Novellara alcune cose", "completed" : false } )
{
	"acknowledged" : true,
	"insertedId" : ObjectId("6032a6fff83d56054c7c7dec")
}
```

## references
- https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/