import React from 'react';
import { useState, useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState();

  useEffect(() => {
    const fetchAndSetTodos = async () => {
      const fetchedTodosArray = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      ).then((res) => res.json());

      const todosArrayWithDescription = fetchedTodosArray.map((todo) => {
        const randomTitle =
          fetchedTodosArray[returnRandomNumber(fetchedTodosArray.length - 1)]
            .title;

        return returnRandomNumber(4) === 4
          ? { ...todo, desccription: randomTitle }
          : todo;
      });

      setTodos(todosArrayWithDescription);
    };

    fetchAndSetTodos();
  }, []);

  const returnRandomNumber = (value) => {
    return Math.floor(Math.random() * value) + 1;
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const todoTitleHandleMouseEnter = (e, isCompleted) => {
    e.target.style.color = isCompleted ? 'white' : '#FF8469';

    if (!isCompleted) {
      e.target.parentElement.parentElement.firstChild.children[1].style.background =
        '#ff846933';
    }
  };

  const todoTitleHandleMouseLeave = (e, isCompleted) => {
    e.target.style.color = isCompleted ? '#4F5565' : 'white';

    if (!isCompleted) {
      e.target.parentElement.parentElement.firstChild.children[1].style.background =
        '#4f5565';
    }
  };

  return (
    <div className="container">
      <div className="card-container">
        <div className="header-container">
          <p className="header-container-text">Todo list</p>
          <button disabled>ADD</button>
        </div>
        <div className="todos-container">
          {todos &&
            todos.map((todo) => (
              <div key={todo.id} className="todo-container">
                <label className="custom-checkbox">
                  <input
                    onChange={() => toggleCompleted(todo.id)}
                    checked={todo.completed}
                    type="checkbox"
                  />
                  <span
                    style={{
                      background: todo.completed ? '#ff8469' : '#4f5565',
                    }}
                    className="checkmark"
                  ></span>
                </label>
                <div className="todo-text-container">
                  <div
                    onMouseEnter={(e) =>
                      todoTitleHandleMouseEnter(e, todo.completed)
                    }
                    onMouseLeave={(e) =>
                      todoTitleHandleMouseLeave(e, todo.completed)
                    }
                    style={{
                      textDecorationLine: todo.completed
                        ? 'line-through'
                        : 'none',
                      color: todo.completed ? '#4F5565' : 'white',
                    }}
                    className="todo-title"
                  >
                    {todo.title}
                  </div>
                  <div
                    style={{
                      textDecorationLine: todo.completed
                        ? 'line-through'
                        : 'none',
                    }}
                    className="todo-description"
                  >
                    <div className="faderflow">{todo.desccription}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rectangle-1"></div>
      <div className="rectangle-2"></div>
      <div className="author-name">© 2021. Author Name</div>
    </div>
  );
};

export default App;
