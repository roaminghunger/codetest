import { format } from 'date-fns'
import { FaTrashAlt } from "react-icons/fa";

export default function Home() {
  const today = () => format(new Date(), 'MM/dd/YYY').toString()
  const toDos = [
    {
      name: 'Walk dog', completed: false, date_completed: null
    },
    {
      name: 'Do Laundry', completed: false, date_completed: null
    },
    {
      name: 'Pack Suitcase', completed: true, date_completed: new Date(2023, 12, 4)
    }
  ]

  const updateTodo = () => console.log('CLICKED')
  const destroyTodo = () => console.log('CLICKED')


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
            {toDos.map(todoItem => (
              <li className="flex">
                <input type="checkbox" className="form-checkbox h-4 w-4 accent-pink-600" onClick={updateTodo()} checked={todoItem.completed}/>
                <span className="flex ml-2 text-gray-800">
                  <p>{todoItem.name}</p>
                </span>
                <span className="flex space-x-4 ml-auto">
                  {todoItem.completed &&
                    <p>Completed: {format(todoItem.date_completed, 'MM/dd/YYY')}</p>
                  }
                  <FaTrashAlt onClick={destroyTodo()} />
                </span>
            </li>
            ))}
        </ul>

          </div>
        </div>
      </div>
    </main>
  )
}
