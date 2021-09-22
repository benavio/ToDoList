import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskPropsType, ToDolist} from './Todolist';


export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let initTasks: Array<TaskPropsType> = [
        {id: v1(), title: "Отдых", isDone: false}
    ]
    let [task, setTasks] = useState(initTasks)
    let [filter, setFilter] = useState<FilterValuesType>("all")
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }
    let taskForToDoList = task;
    if (filter === "active") {
        taskForToDoList = task.filter(t => t.isDone !== true)
    }
    if (filter === "completed") {
        taskForToDoList = task.filter(t => t.isDone !== false)
    }
    function removeTask(id: string) {
        let filteredTask = task.filter(t => t.id !== id)
        setTasks(filteredTask)
    }
    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...task]
        setTasks(newTasks)
    }
    function changeStatus (taskId: string, isDone: boolean) {
       let trueTask = task.find( t => t.id === taskId );

       if(trueTask){
           trueTask.isDone = isDone
        }
       let copyArr = [...task]
       setTasks(copyArr)
    }

    return (
        <div className="App">
            <ToDolist title="What to do"
                      task={taskForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}


export default App;
