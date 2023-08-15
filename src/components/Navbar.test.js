import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar'; // Ajuste o caminho se necessário
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Adiciona o ícone à biblioteca para que ele possa ser renderizado nos testes
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
