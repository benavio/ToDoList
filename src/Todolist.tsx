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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const ToDolist = (props: ListPropsType) => {

    const [newTaskTitle, setNewTitle] = useState("");

    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTitle(e.currentTarget.value)};

    const onKeyPressHandler =(e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTitle("");
        }
    }

    const addTaskHandler = () => {
        if(newTaskTitle.trim() !== ""){
            props.addTask(newTaskTitle);
            setNewTitle("");
        } else { setError("Fiel is required") }
    };

    const taskMaker =  (t: TaskPropsType) => {
        const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked)}
        return (
            <li className={t.isDone ? "isDone" : ""}><input type="checkbox"  onChange={onCheckBoxHandler} checked={t.isDone}/>
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
                       className={error ? "error": ""}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="errorMessage">Field is required</div>}
            </div>

            <ul>
                {props.task.map(taskMaker)}
            </ul>

            <div>
                <button className={props.filter === "all" ? "activeFilter" : "" }
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "activeFilter" : "" }
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "activeFilter" : "" }
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

