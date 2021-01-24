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
## start the graphql server (`server.js`)
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
``` graphql
{ todos { id, title } }
```
see also the **Documentation Explorer** panel

- check out [the graphiql sources repo](https://github.com/graphql/graphiql) for a deep dive into **graphiql**

# references
to put together the ideas and knowledge to be able to carry out this lab, 
the following publications available on the internet at the time I carried out my research were useful:
- https://graphql.org/graphql-js/running-an-express-graphql-server/
- https://www.compose.com/articles/using-graphql-with-mongodb/