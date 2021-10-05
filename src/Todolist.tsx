import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type ListPropsType = {
    id: string
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeToDoList: (todolistId:string) => void
}

export const ToDolist = (props: ListPropsType) => {

    const [newTaskTitle, setNewTitle] = useState("");

    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTitle(e.currentTarget.value)};

    const onKeyPressHandler =(e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(newTaskTitle, props.id);
            setNewTitle("");
        }
    }

    const addTaskHandler = () => {
        if(newTaskTitle.trim() !== ""){
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTitle("");
        } else { setError("Fiel is required") }
    };

    const taskMaker =  (t: TaskPropsType) => {
        const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
        return (
            <li className={t.isDone ? "isDone" : ""}><input type="checkbox"  onChange={onCheckBoxHandler} checked={t.isDone}/>
            <button onClick={() => {props.removeTask(t.id, props.id)}}>X</button>
            <span>{t.title}</span>
            </li>
        );
    };

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeToDoList = () => {
        props.removeToDoList(props.id);
    }
    return (
        <div className="TooDoList">
            <h3>{props.title}<button onClick={removeToDoList}>x</button></h3>
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
                {props.tasks.map(taskMaker)}
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

