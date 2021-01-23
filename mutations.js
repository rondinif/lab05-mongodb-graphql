var MutationAdd = {  
    type: TodoType,
    description: 'Add a Todo',
    args: {
      title: {
        name: 'Todo title',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      var newTodo = new TODO({
        title: args.title,
        completed: false
      })
      newTodo.id = newTodo._id
      return new Promise((resolve, reject) => {
        newTodo.save(function (err) {
          if (err) reject(err)
          else resolve(newTodo)
        })
      })
    }
  }
  
  var MutationType = new GraphQLObjectType({  
    name: 'Mutation',
    fields: {
      add: MutationAdd
    }
  });
  export var Schema = new GraphQLSchema({  
    query: QueryType,
    mutation: MutationType
  });