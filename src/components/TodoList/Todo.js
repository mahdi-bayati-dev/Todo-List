import React from 'react'

 function Todo(props){
        return (
            <div className={`todo ${props.completed ? 'completed' : ''}`} style={{ display: 'flex' }}>
                <li className="todo-item">{props.title}</li>

                <button className="check-btn" onClick={() => props.onEdit(props.id)}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                </button>

                <button className="trash-btn" onClick={() => props.onRemove(props.id)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        )
    
}

export default Todo
