import React from "react";

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// inspired by: https://usehooks.com/useLocalStorage/
function useLocalStorage(key, initialValue) {
  const [storage, setStorage] = React.useState(() => {
    const item = window.localStorage.getItem(key);
    if (!item) {
      return initialValue;
    }
    return JSON.parse(item);
  });

  const setValue = (value) => {
    setStorage(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storage, setValue];
}

const Todo = ({ data, onComplete, onDelete, i }) => {
  return (
    <div className="task-row">
      <p
        onClick={() => {
          onComplete(i);
        }}
        className={data.completed ? "task completed" : "task fresh"}
      >
        {data.text}
      </p>
      <span
        className="trash"
        onClick={() => {
          onDelete(i);
        }}
      >
        🗑️
      </span>
    </div>
  );
};

export default function () {
  const [todos, setTodo] = useLocalStorage("todo", [
    { text: "Go with the flow", completed: true },
    { text: "Eat healthy", completed: false },
  ]);

  const valueRef = React.useRef(null);

  const completeItem = (nth) => {
    const todosNew = clone(todos);
    todosNew[nth].completed = !todosNew[nth].completed;
    setTodo(todosNew);
  };

  const deleteItem = (nth) => {
    const todosNew = clone(todos);
    todosNew.splice(nth, 1);
    setTodo(todosNew);
  };

  const submit = () => {
    const textInput = valueRef.current.value;
    if (textInput.length == 0) return;

    setTodo([...todos, { text: textInput, completed: false }]);
    valueRef.current.value = "";
  };

  return (
    <div className="app">
      <h1>Todo</h1>
      <input
        className="input"
        placeholder="Memo ..."
        autoFocus={true}
        onKeyPress={() => {}}
        ref={valueRef}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            submit();
          }
        }}
      />
      {todos &&
        todos.map((todo, i) => {
          return <Todo key={i} i={i} data={todo} onComplete={completeItem} onDelete={deleteItem} />;
        })}
    </div>
  );
}
