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
		setInterval(this.load_data, this.props.poll);
	},

    add_todo: function(user, text){
      	var new_todo = {"user" : user, "text" : text};

      	this.setState(
      		{todos : this.state.todos.concat([new_todo])}
      	);
      },

      render: function(){
        return(
          React.createElement("div", {id: "todolist"}, 
            React.createElement(InputBox, {add_todo: this.add_todo}), 
            React.createElement(DoList, {todos: this.state.todos})
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
  			var tlist =  this.props.todos.map(function(todo){
  				todo.iseditable =false;
  				return(
  					React.createElement("li", null, 
  						React.createElement("div", {className: "center-60"}, 
  							React.createElement("div", null, todo.text), 
  							React.createElement("div", {className: "btn-new"}, todo.iseditable == true ? "Save" : "Edit")
  						)
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
    

    React.render(
      React.createElement(ToDoList, {url: "/todo", poll: 10000}),
      document.getElementById('todolist-container')
    );



  // });