
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';

const TaskForm:React.FC= () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
   if(!task){
    return
   }
   dispatch(addTask(task))
   setTask('')
  };

  return (
    <div className='container'>
    <form >
      <input
        type="text" name="task"
        placeholder="Enter task"
        value={task}
        onChange={(e)=>setTask(e.target.value)}
      />
      <button className='btn btn-primary mx-2' type="submit" onClick={handleSubmit}>Add Task</button>
    </form>
    </div>
  );

};
export default TaskForm;
