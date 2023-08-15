import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoTable from './TodoTable';
import TodoItem from '../components/TodoItem';

// Mocking the hook useFirestoreTodos
import * as customHooks from '../hooks/useFirestoreTodos';
jest.mock('../hooks/useFirestoreTodos');

describe('TodoTable', () => {
  beforeEach(() => {
    const useFirestoreTodosMock = {
      todos: [
        {
          id: '1',
          text: 'Test task',
          date: '2023-08-15',
          state: 'active',
          google_id: 'google-id',
        },
      ],
      deleteTodo: jest.fn(),
      updateState: jest.fn(),
      revertState: jest.fn(),
      unlockTodo: jest.fn(),
      lockTodo: jest.fn(),
    };
    jest.spyOn(customHooks, 'useFirestoreTodos').mockImplementation(() => useFirestoreTodosMock);
  });

  it('should render todo items correctly', () => {
    render(<TodoTable user={{ uid: 'user-id' }} onEdit={jest.fn()} filters={{}} />);

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  // Você pode adicionar mais testes aqui para cobrir outras funcionalidades
});
