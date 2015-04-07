require(["models", "react", "todos"], function(Models, React, Data){

    var ToDoList = React.createClass({displayName: "ToDoList",
      render: function(){
        return(
          React.createElement("div", {id: "todolist"}, 
            React.createElement(InputBox, {todos: this.props.data}), 
            React.createElement(DoList, {todos: this.props.data})
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
	        	this.props.todos.add({'user' : 'grant', 'text' : this.refs.todo_input.getDOMNode().value});
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
  						React.createElement(ToDo, {key: todo.get('_id'), todo: todo})
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
  			this.props.todo.update_todo(newtodo);
  		},

  		handleClickDelete: function(){
  			console.log('clicked');
  			this.props.todo.delete_todo()
  		},

  		render: function(){
  			var textval = this.props.todo.get('text');
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
      React.createElement(ToDoList, {todos: Data.ToDoCollection}),
      document.getElementById('todolist-container')
    );



});