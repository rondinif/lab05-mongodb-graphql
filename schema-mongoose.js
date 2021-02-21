var graphql = require('graphql');
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
  }, { collection: 'Todo' });

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

var TodoQueryType = new graphql.GraphQLInputObjectType({
  name: 'TodoQuery',
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

/* Support for regexp query */
var ExpressableStringInput = new graphql.GraphQLInputObjectType({
  name: 'ExpressableString',
  fields: {
    value: {
      type: graphql.GraphQLString
    },
    isExpression:{
      type: graphql.GraphQLBoolean,
      defaultValue: false,
    }
  }
})

var TodoExpressableQueryType = new graphql.GraphQLInputObjectType({
  name: 'TodoExpressableQuery',
  fields: function () {
    return {
      _id: {
        type: graphql.GraphQLID
      },
      title: {
        type: ExpressableStringInput
      },
      completed: {
        type: graphql.GraphQLBoolean
      }
    }
  }
});


/* Asynchronous resolver */
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      todo: {
        type: TodoType,
        args: {
          _id: { type: graphql.GraphQLString },
        },
        resolve: (source, { _id }) => {
          return new Promise((resolve, reject) => {
            TODO.findOne({ _id: { $eq: _id } }, (err, todo) => {
              if (err) reject(err)
              else resolve(todo)
            })
          })
        },
      },

      todos: {
        type: new graphql.GraphQLList(TodoType),
        resolve: () => {
          return new Promise((resolve, reject) => {
            TODO.find((err, todos) => {
              if (err) reject(err)
              else resolve(todos)
            })
          })
        }
      },

      todosByTitle: {
        type: new graphql.GraphQLList(TodoType),
        args: {
          title: { type: graphql.GraphQLString },
        },
        resolve: (source, { title }) => {
          return new Promise((resolve, reject) => {
            TODO.find({title: {$regex: '.*' + title + '.*', $options: 'i'}}, (err, todos) => {
              if (err) reject(err)
              else resolve(todos)
            })
          })
        }
      },

      todosByAnyField: {
        type: new graphql.GraphQLList(TodoType),
        args: {
          field: { type: graphql.GraphQLString },
          like: { type: graphql.GraphQLString },
        },
        resolve: (source, { field, like }) => {
          return new Promise((resolve, reject) => {
            query = {};
            switch (field)
            {
              case "title":
              // case "any-other-sring-field":
                query[field]={$regex: '.*' + like + '.*', $options: 'i'};
                break;
              case "completed":
                query["completed"]={ $eq: like };
                break;
              case "_id":
                query["_id"]={ $eq: like };
                break
              default: 
                reject("hai specificato un campo che non esiste");
                return;
            }
            TODO.find(query, (err, todos) => {
              if (err) reject(err)
              else resolve(todos)
            })
          })
        }
      },

      todosQuerable: {
        type: new graphql.GraphQLList(TodoType),
        args: {
          query: { type: TodoQueryType },
        },
        resolve: (source, { query }) => {
          return new Promise((resolve, reject) => {
            TODO.find(query, (err, todos) => {
              if (err) reject(err)
              else resolve(todos)
            })
          })
        }
      },

      todosExpressable: {
        type: new graphql.GraphQLList(TodoType),
        args: {
          query: { type: TodoExpressableQueryType },
        },
        resolve: async (source, { query }) => {
          const dbQuery = {};

          if (query.title.isExpression) {
            dbQuery.title = new RegExp(query.title.value);
          } else {
            dbQuery.title = query.title.value;
          }

          return new Promise((resolve, reject) => {
            TODO.find(dbQuery, (err, todos) => {
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