import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Add this line
import UserList from '../../components/UserList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCircle);

describe('UserList Component', () => {
  it('should render online and offline users correctly', () => {
    const onlineUsers = [
      { google_id: '1', first_name: 'Alice', last_name: 'Johnson' },
      { google_id: '2', first_name: 'Bob', last_name: 'Smith' },
    ];
    
    const offlineUsers = [
      { google_id: '3', first_name: 'Charlie', last_name: 'Brown' },
    ];

    const { getByText } = render(<UserList onlineUsers={onlineUsers} offlineUsers={offlineUsers} />);

    onlineUsers.forEach(user => {
      const name = `${user.first_name} ${user.last_name}`;
      expect(getByText(name)).toBeInTheDocument();
    });

    offlineUsers.forEach(user => {
      const name = `${user.first_name} ${user.last_name}`;
      expect(getByText(name)).toBeInTheDocument();
    });
  });
});
