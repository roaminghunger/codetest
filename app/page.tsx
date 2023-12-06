"use client"
import { useState } from 'react';
import { format } from 'date-fns'
import { FaTrashAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

export default function Home() {
  const [creatingNew, setCreatingNew] = useState(false)
  const [editingToDo, setEditingToDo] = useState(false)
  const [editableIndex, setEditableIndex] = useState(null)
  const [editedDescription, setEditedDescription] = useState('')
  const [newToDo, setNewToDo] = useState('')

  const today = () => format(new Date(), 'MM/dd/YYY').toString()
  const toDos = [
    {
      id: 1, description: 'Walk dog', completed: false, date_completed: null
    },
    {
      id: 2, description: 'Do Laundry', completed: false, date_completed: null
    },
    {
      id: 3, description: 'Pack Suitcase', completed: true, date_completed: new Date(2023, 12, 4)
    }
  ]

  const updateTodo = (index) => console.log(index)
  
  const editTodoDescription = (index) => {
    setEditableIndex(index);
    setEditedDescription(toDos[index].description);
  }

  const saveTodo = (index) => {
    // call to api
    // saveEditTodo(index, { description: editedDescription });
    setEditableIndex(null);
  }

  const destroyTodo = () => console.log('CLICKED')
  
  const handleSubmitToDo = (event) => {
    event.preventDefault()
    console.log(event)
    setCreatingNew(!creatingNew)
    setNewToDo('')
  }


  return (
    <main className="flex bg-orange-100 min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div className="bg-gradient-to-t from-pink-200 shadow-md rounded-md p-6 w-[80%]">
          <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold text-gray-800">My ToDo List</h1>
              <span className="text-sm text-gray-500">{today()}</span>
          </div>
          {/* to-do list */}
          <div>
          <ul className="space-y-2">
            {toDos.map((toDoItem, index) => (
              <li key={toDoItem.id} className="flex">
                <input type="checkbox" className="form-checkbox h-4 w-4 accent-pink-600" onChange={() => updateTodo(index)} checked={toDoItem.completed}/>
                <span className="flex ml-2 text-gray-800">
                    {editableIndex === index ? (
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      onBlur={() => saveTodo(index)}
                      autoFocus
                    />
                  ) : (
                    <>
                      <p>{toDoItem.description}</p>
                      <FaPencilAlt
                        className="ml-2 hover:cursor-pointer"
                        onClick={() => editTodoDescription(index)}
                      />
                    </>
                  )}
                </span>
                <span className="flex space-x-4 ml-auto">
                  {toDoItem.completed &&
                    <p>Completed: {format(toDoItem.date_completed, 'MM/dd/YYY')}</p>
                  }
                  <FaTrashAlt className="hover:cursor-pointer" onClick={() => destroyTodo()} />
                </span>
            </li>
            ))}
          </ul>
          {!creatingNew ? 
            <div>    
              <div className="flex mt-8 items-center justify-center">
                <p>Add New</p>
              </div>
              <span className="flex items-center justify-center">
                <FaPlusCircle className="hover:cursor-pointer" onClick={() => setCreatingNew(!creatingNew)}/>
              </span>
            </div>
            :
            <div>    
              <div className="flex mt-8 items-center justify-center">
                <p>Add New To Do</p>
              </div>
              <form onSubmit={(event) => handleSubmitToDo(event)}>
                <input 
                  type="text"
                  name="description"
                  id="description"
                  className="my-3 text-gray-900 sm:text-sm rounded-lg block w-full p-1"
                  value={newToDo}
                  onChange={(e) => setNewToDo(e.target.value)}
                /> 
                <button 
                  className="border-2 border-pink-800 p-1.5 w-full rounded-lg border-gray-200 bg-pink-600 hover:bg-purple-400" 
                  type="submit">
                  Save
                </button>
              </form>   
            </div>

          }
          </div>
        </div>
      </div>
    </main>
  )
}
