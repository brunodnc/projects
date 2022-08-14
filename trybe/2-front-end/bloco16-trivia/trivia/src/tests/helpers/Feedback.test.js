import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testes da tela Feedback', () => {
    it('Testa se tem imagem do Gravatar', () => {
        renderWithRouterAndRedux(<Feedback/>)
    })
}