import React, { useState, useEffect } from 'react'
import moment from 'moment'
import TodoItem from './TodoItem'

function Todo() {
  const [data, setData] = useState(null)
  const url = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get'

  // sort the data by date
  // if the due date is null, put it towards the end of the array
  const sort = (a, b) => {
    if (!a.dueDate || !b.dueDate) return 1
    else {
      return moment(a.dueDate) - moment(b.dueDate)
    }
  }

  // set property isOverdue if dueDate is the same day or before today
  // sort overdue, completed and remaining by date
  // order todos by overdue, remaining and completed
  const muxData = (todos) => {
    const today = moment.now()
    const mappedTodos = todos.map((todo) => {
      if (moment(todo.dueDate).isSameOrBefore(today) && !todo.isComplete) {
        todo.isOverdue = true
      }
      return todo
    })
    const overdueTodos = mappedTodos.filter((todo) => todo.isOverdue).sort(sort)
    const completedTodos = mappedTodos
      .filter((todo) => todo.isComplete)
      .sort(sort)
    const remainingTodos = mappedTodos
      .filter((todo) => {
        return !overdueTodos.includes(todo) && !completedTodos.includes(todo)
      })
      .sort(sort)

    return [...overdueTodos, ...remainingTodos, ...completedTodos]
  }

  // fetch the todos data
  function fetchData() {
    fetch(url, {
      method: 'GET',
      headers: {
        // "X-Api-Key": "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c"
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const todos = muxData(json)
        setData(todos)
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='todo-container'>
      {data
        ? data.map((todo) => (
            <TodoItem key={todo.id} todoData={todo}></TodoItem>
          ))
        : 'Loading...'}
    </div>
  )
}

export default Todo
