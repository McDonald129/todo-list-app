import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './TodoApp.css';
import { v4 as uuidv4 } from 'uuid';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: uuidv4(), text: newTask.trim() }]);
    setNewTask('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditClick = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = (id) => {
    if (editText.trim() === '') return;
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editText.trim() } : task)));
    setEditId(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="todo-app">
      <h1 className="todo-title">Todo List</h1>
      <form className="todo-form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="todo-add-button">Add</button>
      </form>
      <ul className="todo-list">
        {tasks.map(({ id, text }) => (
          <li key={id} className="todo-item">
            {editId === id ? (
              <>
                <input
                  type="text"
                  className="todo-edit-input"
                  value={editText}
                  onChange={handleEditChange}
                />
                <button
                  className="todo-save-button"
                  onClick={() => handleEditSave(id)}
                  title="Save"
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button
                  className="todo-cancel-button"
                  onClick={handleEditCancel}
                  title="Cancel"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <span className="todo-text">{text}</span>
                <button
                  className="todo-edit-button"
                  onClick={() => handleEditClick(id, text)}
                  title="Edit"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="todo-delete-button"
                  onClick={() => handleDeleteTask(id)}
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
