import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, deleteTask }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">
          No hay tareas, añadir tareas
        </p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <TodoItem
              key={index}
              task={task}
              onDelete={() => deleteTask(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
