
import React, { useState } from 'react';
import './App.css';

interface Student {
  id: number;
  rollno: string;
}

const data:Student[]=[
  {id:1,rollno:'i20-24'},{
    id:2, rollno:'120-15'
  }
];

const App: React.FC = () => {
  const [addModelOpen, setAddModelOpen] = useState(false);
  const [updateModelOpen, setUpdateModelOpen] = useState(false);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [newRollno, setNewRollno] = useState('');

const readall = (): void => {
    localStorage.setItem("object",JSON.stringify(data));
    const tabledata=document.querySelector(".data_table") as HTMLInputElement;
    const oject=localStorage.getItem("object");
    const objectdata=JSON.parse(oject || "[]") as Student[];
    let element="";
    objectdata.map(record=>{
        element+=`<tr>
        <td>${record.id}</td>
        <td>${record.rollno}</td>
        <td><button class="edit" onClick="{edit(${record.id})}">edit</button><button class="delete" onClick="{deleted(${record.id})}">delete</button></td>
        </tr>`;
    });
tabledata.innerHTML=element;
  };

const findmax=():number=>{
    let maxid=0
    data.forEach((rec)=> {
        if(rec.id > maxid){
            maxid=rec.id
        }
    } );
    return maxid;
   };


  const add = (): void => {
    setAddModelOpen(true);
    const rollno=document.getElementById('rollno')as HTMLInputElement;
    rollno.value="";
    document.getElementById('addmodel')!.style.display="block";
    document.getElementById('actualtable')!.style.opacity='0.3';
    document.getElementById('actualtable')!.style.zIndex='-3';
 const newid=findmax()+1;
    const newId=document.getElementById('id') as HTMLInputElement;
     if(newId){
        newId.value=newid.toString();
     }
  };

  const addelement = (): void => {
    
    const idinput =document.getElementById('id') as HTMLInputElement;
    const newid=parseInt(idinput.value);
    const rollnoInput=(document.getElementById('rollno'))as HTMLInputElement;
    const newelement=rollnoInput.value;
    const newobject:Student={id:newid, rollno:newelement};
     data.push(newobject );
    
    readall();
        document.getElementById('actualtable')!.style.opacity='1';
        document.getElementById('actualtable')!.style.zIndex='3';
        document.getElementById('addmodel')!.style.display="none";
     setNewRollno('');
  };

  const closeupdatemodel = (): void => {
    document.getElementById('updatemodel')!.style.display="none";
document.getElementById('actualtable')!.style.opacity='1';
document.getElementById('actualtable')!.style.zIndex='3';
    setUpdateModelOpen(false);
  };

const updateelement = (): void => {
    document.getElementById('actualtable')!.style.opacity='1';
    document.getElementById('actualtable')!.style.zIndex='3';

const id4=document.getElementById('id') as HTMLInputElement;
const id=parseInt(id4.value)
const editelements=document.getElementById('urollno') as HTMLInputElement;
const editelement=editelements.value;

const index=findElementIndexById(id);
if (index !== -1){
    data[index].rollno=editelement
}
document.getElementById('updatemodel')!.style.display="none";

readall();
    setUpdateModelOpen(false);
  };

const findElementById=(id:number):Student | undefined=>{
  for (let i=0; i<data.length; i++){
    if (data[i].id===id) {
        return data[i]
    }
}
return undefined
};

const findElementIndexById=(id:number):number=>{
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return i;
    }
  }
  return -1;
};

  const yesdelete = (): void => {
    const newid1=document.getElementById('id1') as HTMLInputElement;
    const id1=parseInt(newid1.value)
   const index=findElementIndexById(id1)
    if (index !== -1){
        data.splice(index,1)
    }
    document.getElementById('actualtable')!.style.opacity='1';
    document.getElementById('actualtable')!.style.zIndex='3';
    // console.log(data.filter(rec => rec.id !== id1))
    readall();
    document.getElementById('deletemodel')!.style.display="none";
    setDeleteModelOpen(false);
  };

  const closedeletemodel = (): void => {
    // setDeleteModelOpen(false);
    document.getElementById('actualtable')!.style.opacity='1';
    document.getElementById('actualtable')!.style.zIndex='3';
    document.getElementById('deletemodel')!.style.display="none";
  };

  const closemodel = (): void => {
    document.getElementById('actualtable')!.style.opacity='1';
    document.getElementById('actualtable')!.style.zIndex='3';
        document.getElementById('updatemodel')!.style.display="none";
    setAddModelOpen(false);
  };

  const handleUpdateClick = (id: number): void => {
    document.getElementById('updatemodel')!.style.display="block";
    document.getElementById('actualtable')!.style.opacity='0.3';
    document.getElementById('actualtable')!.style.zIndex='-3';
    const obj=findElementById(id)
    if(obj){
    const idinput=document.getElementById('id') as HTMLInputElement;
    idinput.value=obj.id.toString();
        const urollnoinput=document.getElementById('urollno') as HTMLInputElement;
        urollnoinput.value=obj.rollno;
    }
  };

  const handleDeleteClick = (id1: number): void => {
    document.getElementById('actualtable')!.style.opacity='0.3';
    document.getElementById('actualtable')!.style.zIndex='-3';
document.getElementById('deletemodel')!.style.display="block";
const objd=findElementById(id1)
const retrivalid=document.getElementById('id1');
if(objd && retrivalid)
(retrivalid as HTMLInputElement).value=objd.id.toString();
    setSelectedStudentId(id1);
    setDeleteModelOpen(true);
  };

  return (
    <>
      <body onLoad={readall}>
        <h1 className="heading">Displaying the student's info</h1>

        <div className="btn">
          <button type="submit" id="addbtn" onClick={add}>
            Add
          </button>
        </div>
        <div className="tables">
          <table id="actualtable">
            <thead>
              <tr className="headers">
                <th>sno</th>
                <th>rollno</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody className="data_table">
              {data.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.rollno}</td>
                  <td>
                    <button onClick={() => handleUpdateClick(student.id)}>Update</button>
                    <button onClick={() => handleDeleteClick(student.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Add Model */}
        {addModelOpen && (
          <div className="model" id="addmodel">
            <div className="modelinputs">
              <span className="close" id="closeadd" onClick={closemodel}>
                &times;
              </span>
              <div className="formclass">
                <form action="#" id="form1">
                  <label htmlFor="rollno">Enter your rollno</label>
                  <input
                    type="text"
                    id="rollno"
                    name="rollno"
                    value={newRollno}
                    onChange={(e) => setNewRollno(e.target.value)}
                  />
                  <button type="button" id="formbtn" onClick={addelement}>
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* Update Model */}
        {updateModelOpen && selectedStudentId !== null && (
          <div className="model" id="updatemodel">
            <div className="modelinputs">
              <span onClick={closeupdatemodel} className="close" id="closeaddupdate">
                &times;
              </span>
              <div className="formclass">
                <form action="#" id="form2">
                  <label htmlFor="updaterollno">Update Rollno</label>
                  <input
                    type="text"
                    id="urollno"
                    name="updaterollno"
                    value={newRollno}
                    onChange={(e) => setNewRollno(e.target.value)}
                  />
                  <button type="button" id="updatebtn" onClick={updateelement}>
                    update
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* Delete Model */}
        {deleteModelOpen && selectedStudentId !== null && (
          <div className="model" id="deletemodel">
            <div className="modelinputs">
              <span onClick={closedeletemodel} className="close" id="closedelete">
                &times;
              </span>
              <p>Are you sure to delete?</p>
              <button className="btn" id="yesbtn" onClick={yesdelete}>
                yes
              </button>
              <button className="btn" id="nobtn" onClick={closedeletemodel}>
                No
              </button>
            </div>
          </div>
        )}
      </body>
    </>
  );
};

export default App;
