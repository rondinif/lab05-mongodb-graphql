# LAB05-MONGODB-GRAPHQL
this repo collects some laboratory experiments that I am doing to learn what possibilities you have to create a graphql server with express using mongodb as a backend.  

### `schema-mongoose.js`
The schema advertised by the server doesn't define how the data is stored. 
It only describes an API the client can make use of.

- GraphQL type schema
    - some sample data 
    - define a type for each attribute
        - the ID type is a content-agnostic type for carrying unique IDs
        - Strings and boolean are obvious types
    - show how to resolve a query by returning the data through a query type.
        - The resolver is defined in a resolve property and is a function that returns an array

- GraphQL handles adding or changing data as a side-effect of a query. Any operation that intends to have side-effects is called a mutation.


# `server.js`
```
$ npm install
```
## start the graphql server (`server.js`)
see also `README-docker-mongodb.md` to start and seed the mongodb lab instance
``` zsh 
$ npm start 
```

## testing the graphl server (`server.js`)
### by an http client from the command line (`curl`)
``` zsh
curl -XPOST -H "Content-Type:application/graphql"  \
-d 'query { todos { title } }' \
http://localhost:4000/grapthql
```

### by a web user interface (graphiql webUI) open 
`open http://localhost:4000/graphql`
into the editor panel try:
### graphql list all todos
``` graphql
{ todos { _id, title, completed } }
```
``` json
{
  "data": {
    "todos": [
      {
        "_id": "60329f46df8442ec44d15908",
        "title": "Buy orange",
        "completed": true
      },
      {
        "_id": "60329f46df8442ec44d15909",
        "title": "Read emails",
        "completed": false
      },
      {
        "_id": "60329f98c996f4f67c79bf8d",
        "title": "Andare a Novellara",
        "completed": false
      },
      {
        "_id": "60329fe6f83d56054c7c7dea",
        "title": "Fare la spesa a  Novellara",
        "completed": false
      },
      {
        "_id": "60329ff9f83d56054c7c7deb",
        "title": "Passare all'ufficio postatale di  Novellara",
        "completed": false
      },
      {
        "_id": "6032a6fff83d56054c7c7dec",
        "title": "Portare a Novellara alcune cose",
        "completed": false
      }
    ]
  }
}
```

### graphql search todo by id 
``` 
{
  todo(_id: "60329f98c996f4f67c79bf8d") {
    title
    completed
  }
}
```

``` json 
{
  "data": {
    "todo": {
      "title": "Andare a Novellara",
      "completed": false
    }
  }
}
```

### graphql search todos by title
```
{ todosByTitle(title:"Novellara") { _id, title, completed } }
```
``` json
{
  "data": {
    "todosByTitle": [
      {
        "_id": "60329f98c996f4f67c79bf8d",
        "title": "Andare a Novellara",
        "completed": false
      },
      {
        "_id": "60329fe6f83d56054c7c7dea",
        "title": "Fare la spesa a  Novellara",
        "completed": false
      },
      {
        "_id": "60329ff9f83d56054c7c7deb",
        "title": "Passare all'ufficio postatale di  Novellara",
        "completed": false
      },
      {
        "_id": "6032a6fff83d56054c7c7dec",
        "title": "Portare a Novellara alcune cose",
        "completed": false
      }
    ]
  }
}
```

### graphql querable 
by leveraging on `graphql.GraphQLInputObjectType` we can query on any field, 
with reference to the answer to [this question](https://stackoverflow.com/q/65925883/1657028)
 this is generally a GraphQL anti-pattern, as this is building an API based on your database choices, 
 rather than as a client-driven API.
```
{
  titleSearch: todosQuerable(query:{ title:"Andare a Novellara" }) {
    _id
    title
    completed
  }
  idSearch: todosQuerable(query:{ _id:"60329f46df8442ec44d15908" }) {
    _id
    title
    completed
  }
}
```

``` json
{
  "data": {
    "titleSearch": [
      {
        "_id": "60329f98c996f4f67c79bf8d",
        "title": "Andare a Novellara",
        "completed": false
      }
    ],
    "idSearch": [
      {
        "_id": "60329f46df8442ec44d15908",
        "title": "Buy orange",
        "completed": true
      }
    ]
  }
}
```

### graphql querable by regexp 
look for those `Todo` where  the last part of `title` is `Novellara`
```
{
  todosExpressable(query:{ title: { value: "Novellara$", isExpression: true }}) {
    _id
    title
    completed
  }
}
```
``` json
{
  "data": {
    "todosExpressable": [
      {
        "_id": "60329f98c996f4f67c79bf8d",
        "title": "Andare a Novellara",
        "completed": false
      },
      {
        "_id": "60329fe6f83d56054c7c7dea",
        "title": "Fare la spesa a  Novellara",
        "completed": false
      },
      {
        "_id": "60329ff9f83d56054c7c7deb",
        "title": "Passare all'ufficio postatale di  Novellara",
        "completed": false
      }
    ]
  }
}
```

look for those `Todo` where  the last `title` contains somewhere  `Novellara`
```
{
  todosExpressable(query:{ title: { value: "Novellara", isExpression: true }}) {
    _id
    title
    completed
  }
}
```
``` json
{
  "data": {
    "todosExpressable": [
      {
        "_id": "60329f98c996f4f67c79bf8d",
        "title": "Andare a Novellara",
        "completed": false
      },
      {
        "_id": "60329fe6f83d56054c7c7dea",
        "title": "Fare la spesa a  Novellara",
        "completed": false
      },
      {
        "_id": "60329ff9f83d56054c7c7deb",
        "title": "Passare all'ufficio postatale di  Novellara",
        "completed": false
      },
      {
        "_id": "6032a6fff83d56054c7c7dec",
        "title": "Portare a Novellara alcune cose",
        "completed": false
      }
    ]
  }
}
```


### graphql search by any field 
```
{ todosByAnyField(field:"title", like:"Novellara") 
  { 
	  _id, 
  	title, 
  	completed 
  } 
}
```
``` 
{ todosByAnyField(field:"_id", like:"601da2c4ba821ac73613b14d") 
  { 
	  _id, 
  	title, 
  	completed 
  } 
}
```
```
{ todosByAnyField(field:"completed", like:"false") 
  { 
	  _id, 
  	title, 
  	completed 
  } 
}
```

see also the **Documentation Explorer** panel

- check out [the graphiql sources repo](https://github.com/graphql/graphiql) for a deep dive into **graphiql**


<!--
# WIP
- https://flaviocopes.com/graphql-node-express/
-->
# references
to put together the ideas and knowledge to be able to carry out this lab, 
the following publications available on the internet at the time I carried out my research were useful:
- https://github.com/graphql/express-graphql/blob/master/README.md
- https://graphql.org/graphql-js/running-an-express-graphql-server/
- https://www.compose.com/articles/using-graphql-with-mongodb/
- https://stackoverflow.com/questions/61388479/how-to-set-db-name-and-collection-name-in-mongoose
- https://stackoverflow.com/questions/43729199/how-i-can-use-like-operator-on-mongoose
- https://graphql.org/graphql-js/passing-arguments/
    - https://stackoverflow.com/a/43730042/1657028