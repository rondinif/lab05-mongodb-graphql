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
        id: {
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

module.exports = new graphql.GraphQLSchema({  
    query: queryType
  });