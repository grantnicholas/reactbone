require(["models", "react", "todos", "backbone", "underscore"], function(Models, React, Data, Backbone, _){

	//REACT BACKBONE MIXIN
	//LISTEN FOR 
	// React.Backbone = {
	//   listenToProps: function(props) {
	//     _.each(this.updateOnProps, function(events, propName) {
	//       switch(events) {
	//       case 'collection': 
	//         events = 'add remove reset sort';
	//         break;
	//       case 'model':
	//         events = 'change';
	//       }
	//       this.listenTo(props[propName], events, function() { this.forceUpdate(); })
	//     }, this)
	//   },
	 
	//   componentDidMount: function() {
	//     this.listenToProps(this.props);
	//   },
	 
	//   componentWillReceiveProps: function(nextProps) {
	//     this.stopListening();
	//     this.listenToProps(nextProps);
	//   },
	 
	//   componentWillUnmount: function() {
	//     this.stopListening();
	//   }
	// };
	// _.extend(React.Backbone, Backbone.Events);

	React.Backbone = {
		componentDidMount: function(){
			var that = this;
			_.each(this.props, function(prop){
				prop.on('all', function(){
					that.forceUpdate();
				});
			});
		},

		componentWillUnmount: function(){
			var that = this;
			_.each(this.props, function(prop){
				prop.on('off', function(){
					that.forceUpdate();
				});
			});
		}

	};


    var ToDoList = React.createClass({displayName: "ToDoList",
    mixins: [React.Backbone],

    render: function(){
        return(
          React.createElement("div", {id: "todolist"}, 
            React.createElement(InputBox, {todos: this.props.todos}), 
            React.createElement(DoList, {todos: this.props.todos})
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
  		mixins: [React.Backbone],

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
  		mixins: [React.Backbone],

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