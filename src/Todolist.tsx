import React from 'react';
import './App.css';
import {FilterValuesType} from "./App";


export type TaskPropsType = {
  id: number
  title: string
  isDone: boolean
}

type ListPropsType = {
    title: string
    task: Array<TaskPropsType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export const ToDolist = (props: ListPropsType) => {
  return (
    <div className="TooDoList">
      <h3>{props.title}</h3>
      <div>
        <input type="text" /><button>+</button>
      </div>

      <ul>
        {props.task.map( t => <li><input type="checkbox" checked={t.isDone} />
            <button onClick= { () => {props.removeTask(t.id)}}>X</button>
            <span>{t.title}</span>
          </li> )
        }
      </ul>
      
      <div>
        <button onClick={() => props.changeFilter("all")}>all</button>
        <button onClick={() => props.changeFilter("active")}>active</button>
        <button onClick={() => props.changeFilter("completed")}>completed</button>
      </div>
    </div>
  );
}

