import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editText;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border border-gray-300 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">TODO List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="p-1 border border-gray-300 rounded-md"
                />
              ) : (
                todo.text
              )}
            </span>
            {editIndex === index ? (
              <button
                onClick={() => saveTodo(index)}
                className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <>
                <button
                  onClick={() => toggleComplete(index)}
                  className={`ml-2 ${
                    todo.completed ? "bg-yellow-500" : "bg-gray-500"
                  } text-white px-2 py-1 rounded-md hover:bg-opacity-80`}
                >
                  {todo.completed ? "Mark as Pending" : "Mark as Done"}
                </button>
                <button
                  onClick={() => editTodo(index)}
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
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
