import React, { useState } from 'react';
import Header from './Header';
import Todo from './Todo';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [status, setState] = useState('all');

    const todoTitleHandler = (event) => {
        setTodoTitle(event.target.value);
    };

    const statusHandler = (event) => {
        setState(event.target.value);
    };

    const addTodo = (event) => {
        event.preventDefault();
        if (todoTitle.trim() !== '') {
            let newTodoObj = {
                id: todos.length + 1,
                title: todoTitle,
                completed: false,
            };

            setTodos((prevState) => [...prevState, newTodoObj]);
            setTodoTitle('');
        }
    };

    const removeTodo = (todoId) => {
        let newTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(newTodos);
    };

    const editTodo = (todoId) => {
        let newTodos = todos.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    // فیلتر کردن لیست براساس وضعیت
    const filteredTodos = todos.filter((todo) => {
        if (status === 'completed') return todo.completed;
        if (status === 'uncompleted') return !todo.completed;
        return true;
    });

    return (
        <>
            <Header />
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    className="todo-input"
                    maxLength="40"
                    value={todoTitle}
                    onChange={todoTitleHandler}
                />
                <button className="todo-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
                <div className="select">
                    <select name="todos" className="filter-todo" onChange={statusHandler}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>

            <div className="todo-container">
                <ul className="todo-list">
                    {filteredTodos.map((todo) => (
                        <Todo
                            key={todo.id}
                            {...todo}
                            onRemove={removeTodo}
                            onEdit={editTodo}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}
