import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([]) //arreglo de tareas

  const addTask = (e) => {
    e.preventDefault() //evita recargar página botón submit
    if (isEmpty(task)){ //si la variable task está vacía...
      console.log("Task empty") //vamos a comprobar que sí está tomando bien datos del estado
      return
    }

    const newTask = {   //objeto para generar un id único para cada tarea
      id: shortid.generate(),
      name: task
    }
    
    setTasks([ ...tasks, newTask ])  //,+etodo para agregar una tarea a la collección de task spread operator
    setTask("")  //borra cajón texto para que quede lista para agregar otra tarea
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {
              tasks.map((task) =>  ( // en mi colección hay un método map, por cada tarea voy a iterar un objeto
              <li className="list-group-item">
                <span className="lead">{task.name}</span>
                <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                <button className="btn btn-warning btn-sm float-right mx-2">Editar</button>
              </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea..."
              onChange={(text) => setTask(text.target.value)} //método ingresar tarea
              value={task} //para que se pueda borrar cajón texto para que quede lista para agregar otra tarea
            />
            <button 
              className="btn btn-dark btn-block" 
              type="submit"
            >
              Agregar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
