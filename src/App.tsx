import React, {useState} from 'react';
import './App.css';
import {TaskPropsType,ToDolist} from './Todolist';


export type FilterValuesType = "all" | "completed" | "active";

function App() {

let initTasks: Array<TaskPropsType> = [
  {id:1,title: "HTML/CSS", isDone:false},
  {id:2,title: "Css", isDone:true},
  {id:3,title: "React", isDone:false},
  {id:4,title: "Redux", isDone:false}
]


let [task, setTasks] = useState(initTasks)
let [filter,setFilter] = useState<FilterValuesType>("all")
function changeFilter(value: FilterValuesType ) {
  setFilter(value)
}
let taskForToDoList = task;
if (filter === "active") {
  taskForToDoList = task.filter(t => t.isDone !== true)
}
if (filter === "completed") {
  taskForToDoList = task.filter(t => t.isDone !== false)
}



function removeTask(id: number) {
  task = task.filter( t =>  t.id !== id )
  setTasks(task)
}
  return (
    <div className="App">
      <ToDolist title="What to learn"
                task={taskForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
      />
    </div>
  );
}



export default App;
