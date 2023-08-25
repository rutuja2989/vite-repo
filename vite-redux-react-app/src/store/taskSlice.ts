// store/taskSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface TaskState {
  tasks: string[];
  isloading:boolean
}

const initialState: TaskState={
  tasks:[],
  isloading:false,
  
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
    state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
