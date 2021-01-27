 
 
 cd docker
 ## clean
 docker rm docker_mongo-seed_1
 docker rm docker_mongodb_1
 docker rmi docker_mongo-seed 
 ## build, seed and run


 ## query 
``` 
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
	"insertedId" : ObjectId("600d95d2e506988bc4430bb7")
}
```

## references
- https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/