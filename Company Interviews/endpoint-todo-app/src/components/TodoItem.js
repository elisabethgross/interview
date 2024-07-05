import React, { useState } from 'react'
import moment from 'moment'

function TodoItem({ todoData, handleChange }) {
  const [todo, setTodo] = useState(todoData)

  let { description, dueDate, isOverdue, isComplete, id } = todo

  const classNames = ['todo-item']
  if (isOverdue && !isComplete) {
    classNames.push('is-overdue')
  }
  if (isComplete) {
    classNames.push('is-complete')
  }

  function handleChange(e) {
    const action = !!e.target.checked
    const url =
      'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/'

    fetch(`${url}${id}`, {
      method: 'PATCH',
      headers: {
        // "X-Api-Key": "KEY"
      },
      body: JSON.stringify({
        isComplete: action,
      }),
    }).then(() => {
      const updatedTodo = { isComplete: action }
      setTodo({
        ...todo,
        ...updatedTodo,
      })
    })
  }

  return (
    <div className={classNames.join(' ')}>
      <div className='first-half-todo'>
        <input
          className='checkbox'
          type='checkbox'
          checked={isComplete}
          onChange={handleChange}
        ></input>
        <p className='todo-description'>{description}</p>
      </div>
      <p className={`${dueDate ? 'todo-due-date' : ''}`}>
        {dueDate ? moment(dueDate).format('MM/DD/YYYY') : ''}
      </p>
    </div>
  )
}

export default TodoItem
