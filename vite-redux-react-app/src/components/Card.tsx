
import { useDispatch } from 'react-redux';
import {deleteTask} from '../store/taskSlice'

interface taskTypes{
    task:string;
    index:number;
}
const Card=({task,index}:taskTypes):JSX.Element=>{
    const dispatch=useDispatch()
  return (
    <div>
      <ul>
        <li>
            <span className="mx-4">{task}</span>
           <span><button className='btn btn-primary my-2' type="submit" onClick={()=>dispatch(deleteTask(index))}>Delete</button></span>
        </li>
      </ul>
    </div>
  );
}

export default Card;