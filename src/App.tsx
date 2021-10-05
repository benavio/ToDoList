import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskPropsType, ToDolist} from './Todolist';


export type FilterValuesType = "all" | "completed" | "active";

function App() {

    // let [task, setTasks] = useState(initTasks)
    // let [filter, setFilter] = useState<FilterValuesType>("all")


    function removeTask(id: string, todolistId: string) {
        let task = tasks[todolistId];
        let filteredTask = task.filter(t => t.id !== id)
        tasks[todolistId] = filteredTask
        setTasks(tasks)
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
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

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolist] = useState<Array<todolistsType>>(
        [
            {id: todolistId1, title: "What to laern", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
        ]
    )

    let removeToDoList = (todolistId:string) => {
        let filteredtodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolist(filteredtodolist);
        delete tasks[todolistId];
        setTasks({...tasks})
    }

    let [tasks, setTasks] = useState(
        {
            [todolistId1]: [
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "KS", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: "PS", isDone: false},
                {id: v1(), title: "LS", isDone: true}
            ]
        }

    )
    type todolistsType = {
        filter: FilterValuesType
        id: string
        title: string
    }
    return (
        <div className="App">
            {todolists.map((tl) => {
                    let taskForToDoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        taskForToDoList = taskForToDoList.filter(t => t.isDone !== false)
                    }
                    if (tl.filter === "completed") {
                        taskForToDoList = taskForToDoList.filter(t => t.isDone !== true)
                    }
                    return <ToDolist title={tl.title}
                                     key={tl.id}
                                     id={tl.id}
                                     tasks={taskForToDoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                                     removeToDoList={removeToDoList}
                    />
                }
            )
            }
        </div>

    );
}


export default App;
