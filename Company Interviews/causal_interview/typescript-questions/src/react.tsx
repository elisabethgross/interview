import React, { useState, useEffect } from 'react';

export const defaultList = ['one', 'two', 'three'];

enum SORT {
  NONE = 'None',
  ASC = 'Asc',
  DESC = 'Desc',
}
export const SORT_CYCLE = [SORT.NONE, SORT.ASC, SORT.DESC];


export const List = () => {
  const [list, setList] = useState<string[]>(defaultList);
  const [value, setValue] = useState('');
  const [currentSort, setCurrentSort] = useState<SORT>(SORT_CYCLE[0]);
  const [sortedList, setSortedList] = useState<string[]>(defaultList);

  function handleChange(event) {
    setValue(event.target.value)
  }

  function captureOriginalList(newList) {
    console.log('newList', newList)
    setList(newList)
  }

  function handleAdd(event) {
    const newList = list.concat(value)
    captureOriginalList(newList)
    // reset input
    setValue('')
    resortList(currentSort, [...newList])
  }

  function deleteItem(event) {
    const item = event.target.innerHTML
    const idx = sortedList.indexOf(item)
    const newList = list.filter((_, i) => i !== idx)
    setSortedList(newList)
  }

  function handleSort(event) {
    const idx = SORT_CYCLE.indexOf(currentSort)
    const newSortIdx = (idx + 1) % SORT_CYCLE.length
    const newSort = SORT_CYCLE[newSortIdx]
    setCurrentSort(newSort)
    console.log('list', list)
    resortList(newSort, list)
  }

  function resortList(sortType, newList) {
    console.log('newList', newList)
    console.log(sortType)
    switch (sortType) {
      case SORT.ASC:
        newList = newList.sort()
        setSortedList(newList)
        break
      case SORT.DESC:
        newList = newList.sort().reverse()
        setSortedList(newList)
        break
      case SORT.NONE:
        console.log('newList', newList)
        setSortedList(newList)
        break
    }
  }

  // TODO: complete the functionality of this component to accomplish the following:
  // (also covered by the unit tests)

  // 1. Typing into the input field then clicking the `Add` creates a new item on
  // the end of the list with the value as provided by the input field

  // 2. After clicking `Add` the input box is reset to empty

  // 3. Clicking an `<li>` removes that item from the list

  // 4. The `Sort` button cycles through the options in `SORT_CYCLE`. Must handle
  // for international characters, and `NONE` keeps the original ordering.

  // 5. See the skipped test for a bonus problem related to debouncing

  return (
    <div className="App">
      <input type="text" value={value} role="input" onChange={handleChange} /> <button onClick={ handleAdd}>Add</button>
      <button onClick={handleSort}>Sort ({currentSort})</button>
      <hr />
      <ul data-testid="list">
        {sortedList.length > 0 &&
          sortedList.map((item) => {
            return <li key={item} onClick={deleteItem}>{item}</li>;
          })}
      </ul>
      <code>{list}</code>
    </div>
  );
};
