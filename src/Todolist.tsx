import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    addItem: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeToDoList: (todolistId: string) => void
}

export const ToDolist = (props: ListPropsType) => {


    const taskMaker = (t: TaskPropsType) => {
        const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id,
                e.currentTarget.checked,
                props.id)
        }
        const onChangeTitle = (newValue: string) => {
            props.changeTaskTitle(t.id,
                newValue,
                props.id)
        }
        return (
            <li className={t.isDone ? "isDone" : ""}><input type="checkbox" onChange={onCheckBoxHandler}
                                                            checked={t.isDone}/>
                <button onClick={() => {
                    props.removeTask(t.id, props.id)
                }}>X
                </button>
                <EditableSpan title={t.title} onChange={onChangeTitle}/>
            </li>
        );
    };

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeToDoList = () => {
        props.removeToDoList(props.id);
    }
    const addTask = (title: string) => {
        props.addItem(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }
    return (
        <div className="TooDoList">
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeToDoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(taskMaker)}
            </ul>

            <div>
                <button className={props.filter === "all" ? "activeFilter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "activeFilter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "activeFilter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

