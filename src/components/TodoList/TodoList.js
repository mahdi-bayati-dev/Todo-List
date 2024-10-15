import React, { Component } from 'react'
import Header from './Header'
import Todo from './Todo'

export default class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todoTitle: '',
            status: 'all'
        }

        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.todoTitleHandler = this.todoTitleHandler.bind(this)
        this.statusHandler = this.statusHandler.bind(this)
    }

    todoTitleHandler(event) {
        this.setState({
            todoTitle: event.target.value
        })
    }

    statusHandler(event) {
        this.setState({
            status: event.target.value
        })
    }

    addTodo(event) {
        event.preventDefault()
        if (this.state.todoTitle.trim() !== '') {
            let newTodoObj = {
                id: this.state.todos.length + 1,
                title: this.state.todoTitle,
                completed: false
            }

            this.setState(prevState => ({
                todos: [...prevState.todos, newTodoObj],
                todoTitle: ''
            }))
        }
    }

    removeTodo(todoId) {
        let newTodos = this.state.todos.filter((todo) => todo.id !== todoId);
        this.setState({ todos: newTodos });
    }

    editTodo(todoId) {
        this.setState(prevState => ({
            todos: prevState.todos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        }));
    }

    render() {
        let filteredTodos = this.state.todos;
        if (this.state.status === 'completed') {
            filteredTodos = this.state.todos.filter(todo => todo.completed);
        } else if (this.state.status === 'uncompleted') {
            filteredTodos = this.state.todos.filter(todo => !todo.completed);
        }

        return (
            <>
                <Header />
                <form onSubmit={this.addTodo}>
                    <input 
                        type="text" 
                        className="todo-input" 
                        maxLength="40" 
                        value={this.state.todoTitle} 
                        onChange={this.todoTitleHandler}
                    />
                    <button className="todo-button" type="submit">
                        <i className="fas fa-plus-square"></i>
                    </button>
                    <div className="select">
                        <select name="todos" className="filter-todo" onChange={this.statusHandler}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </div>
                </form>

                <div className="todo-container">
                    <ul className="todo-list">
                        {filteredTodos.map(todo => (
                            <Todo 
                                key={todo.id} 
                                {...todo} 
                                onRemove={this.removeTodo} 
                                onEdit={this.editTodo}
                            />
                        ))}
                    </ul>
                </div>
            </>
        )
    }
}
