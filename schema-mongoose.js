var graphql = require ('graphql');  
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Tododb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

var schemaObj = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        title: String,
        completed: Boolean                
    }, { collection: 'Todo'});

var TODO = mongoose.model('todo', schemaObj);

var TodoType = new graphql.GraphQLObjectType({  
    name: 'todo',
    fields: function () {
      return {
        _id: {
          type: graphql.GraphQLID
        },
        title: {
          type: graphql.GraphQLString
        },
        completed: {
          type: graphql.GraphQLBoolean
        }
      }
    }
  });

/* Synchronouse resolver
  var queryType = new graphql.GraphQLObjectType({  
    name: 'Query',
    fields: function () {
      return {
        todos: {
          type: new graphql.GraphQLList(TodoType),
          resolve: function () {
            return TODOs;
          }
        }
      }
    }
  });
*/

/* Asynchronous resolver */
var queryType = new graphql.GraphQLObjectType({  
  name: 'Query',
  fields: function () {
    return {
      todo: {
        type: TodoType,
        args: {
          title: { type: graphql.GraphQLString },
        },
        resolve: (source, { title }) => {
          return new Promise((resolve, reject) => {
            TODO.findOne({title: {$eq: title} } , (err, todo) => {
              if (err) reject(err)
              else resolve(todo)
            })
          })         },
      },
      todos: {
        type: new graphql.GraphQLList(TodoType),
        resolve:() => {
            return new Promise((resolve, reject) => {
              TODO.find((err, todos) => {
                if (err) reject(err)
                else resolve(todos)
              })
            }) 
        }
      }
    }
  }
});

/*
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (source, { id }) => {
        return posts[id]
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts
      },
    },
  },
})
*/



module.exports = new graphql.GraphQLSchema({  
    query: queryType
  });