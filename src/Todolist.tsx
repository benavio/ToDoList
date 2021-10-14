import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox} from '@material-ui/core';
import {Delete} from '@mui/icons-material';

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
            <div className={t.isDone ? "isDone" : ""}><Checkbox defaultChecked color="default"
                                                               onChange={onCheckBoxHandler}
                                                               checked={t.isDone}/>
                <Button onClick={() => {
                    props.removeTask(t.id, props.id)
                }}
                        variant="text"
                        startIcon={<Delete/>}/>
                <EditableSpan title={t.title} onChange={onChangeTitle}/>
            </div>
        );
    };

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeToDoList = () => {
        props.removeToDoList(props.id);
    };
    const addTask = (title: string) => {
        props.addItem(title, props.id);
    };
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }
    return (
        <div className="TooDoList">
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <Button onClick={removeToDoList} variant="text" size="small" startIcon={<Delete/>}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map(taskMaker)}
            </div>

            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
};

