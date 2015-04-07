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

	componentDidMount: function() {
		this.load_data();
		setInterval(this.load_data, this.props.poll);
	  },

      add_todo: function(text){
      	this.setState(
      		{todos : this.state.todos.concat([text])}
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
	        	console.log(this.refs);
	        	console.log(this.refs.todo_input);
	        	this.props.add_todo(this.refs.todo_input.getDOMNODE().value);
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
  				return(
  					React.createElement("li", null, todo.text)
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