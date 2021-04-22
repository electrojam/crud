import React, { useState } from 'react'
import { isEmpty, size} from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([]) //arreglo de tareas
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const validForm = () => {  //método para validar el formulario si está vacío
    let isValid = true
    setError(null)  //de entrada asumimos que no hay errores

    if (isEmpty(task)){ //si la variable task está vacía...
      setError("Debes ingresar una tarea.")   //vamos a comprobar que sí está tomando bien datos del estado
      isValid = false
    }

    return isValid
  }

  const addTask = (e) => {
    e.preventDefault() //evita recargar página botón submit
    
    if (!validForm()) {  //hace consulta si el formulario no es válido se sale con el return. si el formulario es válido pasa a generar un id único para tare
      return
    }

    const newTask = {   //objeto para generar un id único para cada tarea
      id: shortid.generate(),
      name: task
    }
    
    setTasks([ ...tasks, newTask ])  //método para agregar una tarea a la collección de task spread operator
    setTask("")  //borra cajón texto para que quede lista para agregar otra tarea
  }

const saveTask = (e) => {
  e.preventDefault()

  if (!validForm()) {  //hace consulta si el formulario no es válido se sale con el return. si el formulario es válido pasa a guardar tarea
    return
  }

  const editedTasks = tasks.map(item =>item.id == id ? {id, name: task} : item)  //si el id de la tarea o item que estoy editando es igual al que tengo, devuelva el mismo id y reemplaze el nombre, en caso contrario devuelva el mismo o item
  setTasks(editedTasks)
  setEditMode(false)
  setTask("")
  setId("")
}

  const deleteTask = (id) => {  //función para borrar tarea
    const filteredTasks = tasks.filter(task => task.id != id)//método para filtrar las tareas, menos la tarea borrada
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => {  //función para editar tarea
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {
            size(tasks) == 0 ?  ( //verificará si hay tareas o no 
              <li className="list-group-item">Aún no hay tareas programadas.</li>
            ) : (
              <ul className="list-group">
                {
                  tasks.map((task) =>  ( // en mi colección hay un método map, por cada tarea voy a iterar un objeto
                  <li className="list-group-item" key={task.id}>
                    <span className="lead">{task.name}</span>
                    <button 
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => deleteTask(task.id)}//método onClick para eliminar la tarea
                    >
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-warning btn-sm float-right mx-2"
                      onClick={() => editTask(task)}
                    >
                      Editar
                    </button>
                  </li>
                  ))
                }
              </ul>
            )

          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
            { editMode ? "Modificar Tarea" : "Agregar Tarea" }
          </h4>
          <form onSubmit={ editMode ? saveTask : addTask }>
            {
              error && <span className="text-danger">{error}</span> //Si hay error pinte texto tipo danger y muestre el contenido de la variable error
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea..."
              onChange={(text) => setTask(text.target.value)} //método ingresar tarea
              value={task} //para que se pueda borrar cajón texto para que quede lista para agregar otra tarea
            />
            <button 
              className={ editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block" }
              type="submit"
            >
              { editMode ? "Guardar" : "Agregar" }
              </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
