import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    
    const header = screen.getByRole(/heading/);
    
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, 'a');

    const firstNameError = await screen.findByText(/Error: firstName must have at least 5 characters/i)
    expect(firstNameError).toBeInTheDocument()

    const errorMessages = await screen.findAllByTestId(/error/i)
    expect(errorMessages).toHaveLength(1)  
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const button = screen.getByRole(/button/, { name: /Submit/i })
    userEvent.click(button)

    const errorMessages = await screen.findAllByTestId(/error/i)
    expect(errorMessages).toHaveLength(3)

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name*/i)
    const lastNameInput = screen.getByLabelText(/last name*/i)
    const button = screen.getByRole(/button/, { name: /Submit/i })
    
    userEvent.type(firstNameInput, 'Blade')
    userEvent.type(lastNameInput, 'Thomas')
    userEvent.click(button)

    const errorMessages = await screen.findAllByTestId(/error/i)
    expect(errorMessages).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email*/i)

    userEvent.type(emailInput, 'user@user')

    const errorMessage = await screen.findByText(/email must be a valid email address/i)

    expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

});
