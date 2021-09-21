import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";


export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type ListPropsType = {
    title: string
    task: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const ToDolist = (props: ListPropsType) => {

    const [newTaskTitle, setNewTitle] = useState("");
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTitle(e.currentTarget.value)};
    const onKeyPressHandler =(e: KeyboardEvent<HTMLInputElement>) => {if (e.charCode === 13) {;
            props.addTask(newTaskTitle);
            setNewTitle("");
        }
    }
    const addTaskHandler = () => {
        props.addTask(newTaskTitle);
        setNewTitle("");
    };
    const taskMaker =  (t: TaskPropsType) => {
        return (
            <li><input type="checkbox" checked={t.isDone}/>
            <button onClick={() => {props.removeTask(t.id)}}>X</button>
            <span>{t.title}</span>
            </li>
        );
    };

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return (
        <div className="TooDoList">
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>

            <ul>
                {props.task.map(taskMaker)}
            </ul>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

