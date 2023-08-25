// src/App.tsx
import React from 'react';
import './App.css';
import TaskForm from './components/Taskform';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
