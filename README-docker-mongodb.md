 
 
 cd docker
 ## clean
 docker rm docker_mongo-seed_1
 docker rm docker_mongodb_1
 docker rmi docker_mongo-seed 
 ## build, seed and run


 ## query 
 > show dbs
 > use test
 > db.getCollectionNames()
 > use Tododb
 > db.getCollectionNames()
> db.tasks.find()
{ "_id" : ObjectId("600c253884dbd358b1475fb1"), "name" : "my second task", "Created_date" : "1611408006998", "status" : 