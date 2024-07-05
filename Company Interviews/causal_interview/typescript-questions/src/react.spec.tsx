import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { defaultList, List, SORT_CYCLE } from './react';

const sortText = (sort) => `Sort (${sort})`;

it.skip('BONUS, bounce bounce', () => {
  // TODO: if `bounce` is the active value of the input box, debounce clicks on
  // items to defer the deletion action by 300ms. Write this unit test to prove
  // that after clicking on multiple list items back-to-back,
  // only the last one is removed.
});

it('loads and displays default list', () => {
  const { getByTestId } = render(<List />);

  expect(getByTestId('list')).toHaveTextContent(defaultList.join(''));
});

it('add entered item to end of the list', async () => {
  const { getByTestId, getByText, getByRole } = render(<List />);
  const newItem = 'four';
  const newList = [...defaultList];
  newList.push(newItem);

  fireEvent.change(getByRole('input'), { target: { value: newItem } });
  fireEvent.click(getByText('Add'));

  expect(getByTestId('list')).toHaveTextContent(newList.join(''));
  expect(getByRole('input')).toHaveValue('');
});

it('delete item from middle of list', async () => {
  const { getByTestId, getByText } = render(<List />);
  const newList = [...defaultList];
  const deleted = newList.splice(1, 1);

  fireEvent.click(getByText(deleted[0]));

  expect(getByTestId('list')).toHaveTextContent(newList.join(''));
});

it('default sort', async () => {
  const { getByText } = render(<List />);

  expect(getByText('Sort (None)')).toBeTruthy();
});

it('cycle through sorts', async () => {
  const { getByText, getByTestId, getByRole } = render(<List />);

  const checks = [0, 1, 2, 0];
  const listValues = [
    'ëndonethreetwo',
    'twothreeoneënd',
    'onetwothreeënd',
    'ëndonethreetwo',
  ];

  fireEvent.change(getByRole('input'), { target: { value: 'ënd' } });
  fireEvent.click(getByText('Add'));

  checks.forEach((i) => {
    const thisCycle = SORT_CYCLE[i];
    const nextCycle = SORT_CYCLE[(i + 1) % SORT_CYCLE.length];

    fireEvent.click(getByText(sortText(thisCycle)));

    expect(getByText(sortText(nextCycle))).toBeTruthy();
    expect(getByTestId('list')).toHaveTextContent(listValues[i]);
  });
});

it('sorts newly added items', async () => {
  const { getByText, getByRole, getByTestId } = render(<List />);

  // change sort
  fireEvent.click(getByText(sortText(SORT_CYCLE[0])));

  // add item
  fireEvent.change(getByRole('input'), { target: { value: 'a_first' } });
  fireEvent.click(getByText('Add'));

  expect(getByTestId('list')).toHaveTextContent('a_firstonethreetwo');
});
