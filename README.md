#
### `schema.js`
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


### `server.js`
 - server.js 
 - package.js
```
$ npm install
```
### eseguire il server 
``` zsh 
$ npm start 
```

### provare 
``` zsh
curl -XPOST -H "Content-Type:application/graphql"  \
-d 'query { todos { title } }' \
http://localhost:8080
```

# riferimento usato per questo lav
https://www.compose.com/articles/using-graphql-with-mongodb/