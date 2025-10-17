import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, deleteTask }) => {
  if (!Array.isArray(tasks)) {
    return <p className="text-red-500 text-center">Error al cargar tareas</p>;
  }

  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No hay tareas, añadir tareas</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
