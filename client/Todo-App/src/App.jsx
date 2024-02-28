import './App.css'
import { useState, useEffect } from 'react'

const ADD_TASKS_STATE = 1
const SHOW_DONE_TASKS_STATE = 2
const SHOW_REMOVED_TASKS_STATE = 3

function Header({value, children}) {
  return (
    <div className='header'>
      <h1>{value}</h1>
      {children}
    </div>
  );
}

function TaskComponent({taskName, taskIndex, onDoneClick, onRemoveClick}) {
  return (
    <li className='task' key={taskIndex}>
      <span>{taskIndex+1}.  {taskName}</span>
      <div className='task-buttons'>
        <button className='done-button' onClick={() => {onDoneClick(taskIndex)}}>Done</button>
        <button className='remove-button' onClick={() => {onRemoveClick(taskIndex)}}>Remove</button>
      </div>
    </li>    
  );
}

function Tasks({children}) {

  return(
    <ol className="tasks">
      {children}
    </ol>
  );

}

export default function App(){

  const [tasks, setTasks] = useState(new Array())
  const [doneTasks, setDoneTasks] = useState(new Array())
  const [removedTasks, setRemovedTasks] = useState(new Array())
  const [currentTsk, setCurrentTsk] = useState('')

  const [currentState, setCurrentState] = useState(ADD_TASKS_STATE)

  useEffect(() => {
    console.log(tasks)
  })

  function handleAddTask(task) {
    if(currentTsk != '') {
      const temp = tasks.slice()
      temp.push(task)
      setTasks(temp)
  
      setCurrentTsk('')
    }
  }

  function handleRemoveTask(taskIndex) {
    // Update the removed tasks array
    let temp = removedTasks.slice()
    temp.push(tasks[taskIndex])
    setRemovedTasks(temp)

    // Update the tasks array
    temp = tasks.slice()
    temp.splice(taskIndex, 1)
    setTasks(temp)
  }
  function handleDoneTask(taskIndex) {
    // Update the done tasks array
    let temp = doneTasks.slice()
    temp.push(tasks[taskIndex])
    setDoneTasks(temp)

    // Update the tasks array
    temp = tasks.slice()
    temp.splice(taskIndex, 1)
    setTasks(temp)
  }

  function handleDoneClear(){
    setDoneTasks(new Array())
  }
  function handleRemovedClear(){
    setRemovedTasks(new Array())
  }
  
  if (currentState == ADD_TASKS_STATE){
    return (
      <div className='content'>
        <Header value='Todo List'>
          <input type='text' value={currentTsk} placeholder='Enter new task' onInput={(e) => {setCurrentTsk(e.target.value)}}/>
          <input type='button' value='Add Task' onClick={() => {handleAddTask(currentTsk)}}/>
        </Header>
        <Tasks>
          {tasks.map((task, index) => {
            return (
              <TaskComponent taskName={task} taskIndex={index} onDoneClick={handleDoneTask} onRemoveClick={handleRemoveTask}/>
            );
          })}
        </Tasks>
        <div className='content-footer'>
          <button className='all-removed-tasks-button' onClick={() => {setCurrentState(SHOW_REMOVED_TASKS_STATE)}}>Show Removed Tasks</button>
          <button className='all-done-tasks-button'  onClick={() => {setCurrentState(SHOW_DONE_TASKS_STATE)}}>Show Done Tasks</button>
        </div>
      </div>
    );  
  }else if(currentState == SHOW_DONE_TASKS_STATE){
    return (
    <div className='content'>
      <Header value='Done Tasks'>
      </Header>
      <Tasks>
        {doneTasks.map((task, index) => {
            return (
              <li className='task'>{index+1}.  {task}</li>
            );
        })}
      </Tasks>
      <div className='content-footer'>
        <button className='clear-button' onClick={handleDoneClear}>Clear All</button>
        <button className='blue-button' onClick={() => {setCurrentState(ADD_TASKS_STATE)}}>Back</button>
      </div>
    </div>
    );
  }else if(currentState == SHOW_REMOVED_TASKS_STATE){
    return (
      <div className='content'>
        <Header value='Removed Tasks'>
        </Header>
        <Tasks>
          {removedTasks.map((task, index) => {
              return (
                <li className='task'>{index+1}.  {task}</li>
              );
          })}
        </Tasks>
        <div className='content-footer'>
          <button className='clear-button' onClick={handleRemovedClear}>Clear All</button>
          <button className='blue-button' onClick={() => {setCurrentState(ADD_TASKS_STATE)}}>Back</button>
        </div>
      </div>
      );  
  }

}