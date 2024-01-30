import './list.css';
import React, { useState } from 'react';

export default function List() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState(1);

  const tabs = [
    { id: 1, label: 'All' },
    { id: 2, label: 'Active' },
    { id: 3, label: 'Completed' },
  ];

  const onAddTodo = () => {
    let newTodo = {
      completed: false,
      label: searchTerm,
    };
    setTodos([...todos, newTodo]);
    setSearchTerm('');
  };

  const onCheck = (idx) => {
    setTodos(
      todos.map((el, i) =>
        i === idx ? { ...el, completed: !el.completed } : el
      )
    );
  };

  const onDelete = (deleteLabel) =>
    setTodos(todos.filter((el) => el.label !== deleteLabel));

  const filterList =
    filterTab === 3
      ? todos.filter((todo) => todo.completed === true)
      : filterTab === 2
      ? todos.filter((todo) => todo.completed === false)
      : todos;

  return (
    <div className="listWrapper">
      <h2>Things To Do</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddTodo();
        }}
      >
        <input
          type="text"
          value={searchTerm}
          placeholder="Add New"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <button className="addBtn" onClick={() => onAddTodo()}>
        &#43;
      </button>
      <div className="todos">
        <ul>
          {filterList.map((todo, idx) => {
            return (
              <li key={todo.label}>
                <input
                  type="checkbox"
                  onChange={() => onCheck(idx)}
                  checked={todo.completed}
                />
                {todo.label}
                <button className="delete" onClick={() => onDelete(todo.label)}>
                  Del
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <footer>
        <div className="symbols">
          <div>{`${filterList.length}`} Items Left</div>
        </div>
        <div className="filterStatus">
          {tabs.map((tab) => {
            return (
              <button
                onClick={() => setFilterTab(tab.id)}
                className={`btn ${filterTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
