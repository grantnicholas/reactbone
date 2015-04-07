  // $(function() {
    var ToDoList = React.createClass({displayName: "ToDoList",
      getInitialState: function(){
  		return {
  			todos : []
  		}
  	  },

  	load_data: function(){
        $.ajax({
          url: this.props.url,
          success: function(data){
            this.setState({todos: JSON.parse(data)});
            console.log(this.state.todos);
          }.bind(this),
          error: function(xhr, status, err){
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    componentWillUpdate: function(nextProps, nextState){
    	console.log('we need to update the database here');

    	$.ajax({
          url: this.props.url,
          type: 'POST',
          dataType: 'json',
          // data: JSON.stringify({"todos": nextState.todos}),
          data: {"todos" : JSON.stringify(nextState.todos)},
          success: function(data){
            console.log('db updated');
          }.bind(this),
          error: function(xhr, status, err){
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });


    	console.log(nextProps);
    	console.log(nextState);
    },

	componentDidMount: function() {
		this.load_data();
		// setInterval(this.load_data, this.props.poll);
	},

    add_todo: function(user, text){
      	var new_todo = {"user" : user, "text" : text};

      	this.setState(
      		{todos : this.state.todos.concat([new_todo])}
      	);
      },

    update_todo: function(newtodo){
    	console.log('update_todos');
    	console.log(newtodo);
    	newtodos = this.state.todos.map(function(todo){
    		if(todo._id != newtodo._id){
    			return todo;
    		}
    		else{
    			return newtodo;
    		}
    	});
    	this.setState({
    		todos : newtodos
    	});

    },

    delete_todo: function(thetodo){
    	console.log('delete todos');
    	newtodos = this.state.todos.filter(function(todo){
    		return todo._id !== thetodo._id;
    	});
    },

      render: function(){
        return(
          React.createElement("div", {id: "todolist"}, 
            React.createElement(InputBox, {add_todo: this.add_todo}), 
            React.createElement(DoList, {todos: this.state.todos, update_todo: this.update_todo, delete_todo: this.delete_todo})
          )
        );
      }

    });
  
  	var InputBox = React.createClass({displayName: "InputBox",
  		componentDidMount: function(){
  			$('#inputbox').on('keydown', this.handleKeyPress);
  		},

  		handleKeyPress: function(e) {
	        if(e.keyCode=='13'){
	        	console.log('clicked');
	        	var user = 'grant';
	        	this.props.add_todo(user, this.refs.todo_input.getDOMNode().value);
	        	this.refs.todo_input.getDOMNode().value = '';
	        }
      	},

  		render: function(){
  			return(
  				React.createElement("input", {type: "text", 
  				id: "inputbox", 
  				ref: "todo_input", 
  				placeholder: "Do your to-do"})
  			);

  		}
  	});

  	var DoList = React.createClass({displayName: "DoList",
  		render: function(){
  			var that = this;
  			var tlist =  this.props.todos.map(function(todo){
  				return(
  					React.createElement("li", null, 
  						React.createElement(ToDo, {key: todo._id, todo: todo, update_todo: that.props.update_todo, delete_todo: that.props.delete_todo})
  					)
  				);
  			});
  			return (
  				React.createElement("ul", null, 
  					tlist
  				)

  			);
  		}

  	});


  	var ToDo = React.createClass({displayName: "ToDo",

  		getInitialState: function(){
  			return {
  				iseditable: false
  			};
  		},

  		handleClickEdit: function(){
  			console.log('clicked');
  			this.setState(
  				{iseditable : !this.state.iseditable}
  			);
  		},

  		handleClickSave: function(){
  			console.log('clicked');
  			newtodo = this.props.todo;
  			newtodo.text = this.refs.todo_textarea.getDOMNode().value;
  			this.setState(
  				{iseditable : !this.state.iseditable}
  			);
  			this.props.update_todo(newtodo);
  		},

  		handleClickDelete: function(){
  			console.log('clicked');
  			this.props.delete_todo(this.props.todo)
  		},

  		render: function(){
  			var textval = this.props.todo.text;
  			if(this.state.iseditable){
  				return(
  					React.createElement("div", {className: "todo-wrapper center-60"}, 
  						React.createElement("textarea", {ref: "todo_textarea", className: "text", defaultValue: textval}), 
  						React.createElement("button", {className: "btn-new", onClick: this.handleClickSave}, "Save"), 
  						React.createElement("button", {className: "btn-new", onClick: this.handleClickDelete}, "Delete")
  					)
  				);
  			}
  			else{
  				return(
  					React.createElement("div", {className: "todo-wrapper center-60"}, 
  						React.createElement("div", {className: "text"}, textval), 
  						React.createElement("button", {className: "btn-new", onClick: this.handleClickEdit}, "Edit"), 
  						React.createElement("button", {className: "btn-new", onClick: this.handleClickDelete}, "Delete")
  					)
  				);
  			}
  		}

  	});
    

    React.render(
      React.createElement(ToDoList, {url: "/todo", poll: 100000}),
      document.getElementById('todolist-container')
    );



  // });