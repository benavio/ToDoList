import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskPropsType, ToDolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import {Container, Grid} from "@material-ui/core";
import Paper from '@mui/material/Paper/Paper';

export type FilterValuesType = "all" | "completed" | "active";

type TaasksStateType = {
    [key: string]: Array<TaskPropsType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let task = tasks[todolistId];
        let filteredTask = task.filter(t => t.id !== id)
        tasks[todolistId] = filteredTask
        setTasks({...tasks})
    }

    function addItem(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let hereTasks = tasks[todolistId];
        let newTasks = [task, ...hereTasks];
        tasks[todolistId] = newTasks
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let hereTasks = tasks[todolistId];
        let trueTask = hereTasks.find(t => t.id === taskId);

        if (trueTask) {
            trueTask.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let hereTasks = tasks[todolistId];
        let trueTask = hereTasks.find(t => t.id === id);

        if (trueTask) {
            trueTask.title = newTitle
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])
        }
    }

    let todolistId1 = v1()

    let [todolists, setTodolist] = useState<Array<todolistsType>>(
        [
            {id: todolistId1, title: "Интернет", filter: "all"}
        ]
    )

    let removeToDoList = (todolistId: string) => {
        let filteredtodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolist(filteredtodolist);
        delete tasks[todolistId];
        setTasks({...tasks})
    }

    let [tasks, setTasks] = useState<TaasksStateType>({
            [todolistId1]: [
                {id: v1(), title: "Хостинг", isDone: false},
                {id: v1(), title: "Домен", isDone: true},
                {id: v1(), title: "DNS", isDone: true},
                {id: v1(), title: "Принцип работы браузера", isDone: false},
                {id: v1(), title: "HTTP", isDone: false},
            ]
        }
    )
    type todolistsType = {
        filter: FilterValuesType
        id: string
        title: string
    }

    function addToDOList(title: string) {
        let todolist: todolistsType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolist([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolist([...todolists])
        }
    }

    return (

        <div >
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Menu
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={ { padding: "10px" } }>
                    <Paper elevation={2}>
                    <AddItemForm addItem={addToDOList}/>
                    </Paper>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let taskForToDoList = tasks[tl.id];
                        if (tl.filter === "active") {
                            taskForToDoList = taskForToDoList.filter(t => t.isDone !== true)
                        }
                        ;
                        if (tl.filter === "completed") {
                            taskForToDoList = taskForToDoList.filter(t => t.isDone !== false)
                        }
                        ;
                        return <Grid item>
                            <Paper elevation={2} style={ { padding: "10px", backdropFilter: "blur(5px)" }} >
                                <ToDolist title={tl.title}
                                          key={tl.id}
                                          id={tl.id}
                                          tasks={taskForToDoList}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addItem={addItem}
                                          changeTaskStatus={changeStatus}
                                          changeTaskTitle={changeTaskTitle}
                                          filter={tl.filter}
                                          removeToDoList={removeToDoList}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>

    )
        ;
};


export default App;
