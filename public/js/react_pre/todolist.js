require(["models", "react", "todos", "backbone", "underscore"], function(Models, React, Data, Backbone, _){

	React.Backbone = {
		componentDidMount: function(){
			var that = this;
			_.each(this.props, function(prop){
				prop.on('all', function(){
					if(that.isMounted()){
						that.forceUpdate();
					}
				});
			});
		},

		componentWillUnmount: function(){
			var that = this;
			_.each(this.props, function(prop){
				prop.off('all', function(){
					if(that.isMounted()){
						that.forceUpdate();
					}
				});
			});
		},

	};


    var ToDoList = React.createClass({
    mixins: [React.Backbone],

    render: function(){
        return(
          <div id="todolist">
            <InputBox todos={this.props.todos} />
            <DoList todos={this.props.todos} />
          </div>
        );
      }

    });
  
  	var InputBox = React.createClass({
  		componentDidMount: function(){
  			$('#inputbox').on('keydown', this.handleKeyPress);
  		},

  		handleKeyPress: function(e) {
	        if(e.keyCode=='13'){
	        	console.log('clicked');
	        	var auser = 'username'
	        	this.props.todos.add(
	        		{'user' : auser,
	        		 'text' : this.refs.todo_input.getDOMNode().value
	        		}
	        	);
	        	this.refs.todo_input.getDOMNode().value = '';
	        }
      	},

  		render: function(){
  			return(
  				<input type="text"
  				id="inputbox"
  				ref="todo_input"
  				placeholder="Do your to-do"/>
  			);

  		}
  	});

  	var DoList = React.createClass({
  		mixins: [React.Backbone],

  		render: function(){
  			var that = this;
  			var tlist =  this.props.todos.map(function(todo){
  				return(
  					<li>
  						<ToDo key={todo.get('_id')} todo={todo}/>
  					</li>
  				);
  			});
  			return (
  				<ul>
  					{tlist}
  				</ul>

  			);
  		}

  	});


  	var ToDo = React.createClass({
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
  					<div className="todo-wrapper center-60">
  						<textarea ref="todo_textarea" className="text" defaultValue={textval}></textarea>
  						<button className="btn-new" onClick={this.handleClickSave}>Save</button>
  						<button className="btn-new" onClick={this.handleClickDelete}>Delete</button>
  					</div>
  				);
  			}
  			else{
  				return(
  					<div className="todo-wrapper center-60">
  						<div className="text">{textval}</div>
  						<button className="btn-new" onClick={this.handleClickEdit}>Edit</button>
  						<button className="btn-new" onClick={this.handleClickDelete}>Delete</button>
  					</div>
  				);
  			}
  		}

  	});
    

    React.render(
      <ToDoList todos={Data.ToDoCollection}/>,
      document.getElementById('todolist-container')
    );



});