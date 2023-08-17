import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '@testing-library/jest-dom/extend-expect';
library.add(faSignOutAlt);

describe('Navbar', () => {
  it('deve renderizar o nome do usuário e o botão de logout', () => {
    const user = { displayName: 'John Doe' };
    const handleSignOut = jest.fn();

    render(<Navbar user={user} handleSignOut={handleSignOut} />);

    expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve chamar handleSignOut quando o botão de logout for clicado', () => {
    const user = { displayName: 'John Doe' };
    const handleSignOut = jest.fn();

    render(<Navbar user={user} handleSignOut={handleSignOut} />);
    fireEvent.click(screen.getByRole('button'));

    expect(handleSignOut).toHaveBeenCalled();
  });
});
