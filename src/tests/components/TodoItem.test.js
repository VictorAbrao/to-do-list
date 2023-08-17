import React from 'react';
import { render } from '@testing-library/react';
import TodoItem from '../../components/TodoItem';
import '@testing-library/jest-dom/extend-expect';

test('renders TodoItem correctly', () => {
  const todo = {
    text: 'Test todo',
    date: '2023-08-13',
    responsibleName: 'Alice',
    lastChangedByName: 'Bob',
    locked: false,
    state: 'in progress',
    google_id: '1234'
  };

  const loggedInGoogleId = '1234';

  const TestTable = ({ children }) => (
    <table>
      <tbody>{children}</tbody>
    </table>
  );

  const { getByText } = render(
    <TestTable>
      <TodoItem
        todo={todo}
        loggedInGoogleId={loggedInGoogleId}
        onLock={() => {}}
        onUnlock={() => {}}
        onDelete={() => {}}
        onUpdateState={() => {}}
        onRevertState={() => {}}
        onEdit={() => {}}
      />
    </TestTable>
  );

  expect(getByText(todo.text)).toBeInTheDocument();
  expect(getByText(todo.date)).toBeInTheDocument();
  expect(getByText(todo.responsibleName)).toBeInTheDocument();
  expect(getByText(todo.lastChangedByName)).toBeInTheDocument();
  expect(getByText('No')).toBeInTheDocument();
  expect(getByText(todo.state)).toBeInTheDocument();
});
