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
          dataType: 'json',
          success: function(data){
            this.setState({todos: JSON.parse(data)});
            console.log(this.state);
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
          	React.createElement("a", {href: "this.props.url"}, "URL"), 
            React.createElement(InputBox, {add_todo: this.add_todo}), 
            React.createElement(DoList, {todos: this.state.todos})
          )
        );
      }

    });
  
  	var InputBox = React.createClass({displayName: "InputBox",
  		componentDidMount: function(){
  			$('inputbox').on('keydown', this.handleKeyPress);
  		},

  		handleKeyPress: function(e) {
	        if(e.keyCode=='13'){
	        	that.props.add_todo(this.refs.todoinput.getDOMNODE().value);
	        }
      	},

  		render: function(){
  			return(
  				React.createElement("input", {type: "text", 
  				id: "inputbox", 
  				ref: "todo-input", 
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
      React.createElement(ToDoList, {url: "/todo", poll: 1000}),
      document.getElementById('todolist-container')
    );



  // });