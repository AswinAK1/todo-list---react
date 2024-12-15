import React from 'react';
import './App.css';
import { useState,useEffect } from 'react';

function App() {

  const [toDos,setToDos] = useState([])
  const [toDo,setToDo] = useState('')
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
  }, []);


  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i           onClick={() => {
            if (toDo.trim()) {
              setToDos([...toDos,{id:Date.now() ,text:toDo ,status:false } ]);
              setToDo('');
            }
          }}  className="fas fa-plus" ></i>
      </div>
      <div className="todos">
        {
          toDos.map((values)=>{
            return(
              <div className="todo">
              <div className="left">
                <input onChange={(e)=>{
                  console.log(e.target.checked);
                  console.log(values);
                  setToDos(toDos.filter(newValues=>{
                    if(newValues.id === values.id){
                      newValues.status = e.target.checked
                    }
                    return newValues
                  }))
                  
                }} value={values.status}  type="checkbox" name="" id="" />
                <p>{values.text}</p>
              </div>
              <div className="right">
                <i onClick={()=>{
                  setToDos(toDos.filter((newValues)=> newValues.id !== values.id))
                }} className="fas fa-times"></i>
              </div>
            </div>
            )
          })
        }
        <div className='taskDone'><br /><br /><br /><br />
        <h3 style={{color:'white'}}>Completed task</h3>
        {
          toDos.map((values)=>{
            if(values.status){
              return(
                <div className="todo">
                <div className="left">
                  <p>{values.text}</p>
                </div>
              </div>
              )
            }

          })
        }
        </div>

      </div>
    </div>
  );
}

export default App;