import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('To-Do App', () => {
  test('renders the app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/React To-Do List/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);
  
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);
  
    const taskElement = screen.getByTestId('task-text-1');
    expect(taskElement).toBeInTheDocument();
  });

  test('prevents adding duplicate tasks', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Duplicate Task' } });
    fireEvent.click(addButton);
    fireEvent.change(inputElement, { target: { value: 'Duplicate Task' } });
    fireEvent.click(addButton);

    const errorMessage = screen.getByText(/Task description already exists!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('marks a task as complete', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);
  
    fireEvent.change(inputElement, { target: { value: 'Complete Me' } });
    fireEvent.click(addButton);
  
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
  
    const taskElement = screen.getByTestId('task-text-1'); // Replace 1 with the correct ID
    expect(taskElement).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a task with confirmation', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);
  
    fireEvent.change(inputElement, { target: { value: 'Delete Me' } });
    fireEvent.click(addButton);
  
    const deleteButton = screen.getByTestId('delete-task-1'); // Replace 1 with the correct ID
    fireEvent.click(deleteButton);
  
    const confirmDelete = screen.getByTestId('confirm-delete');
    fireEvent.click(confirmDelete);
  
    const deletedTask = screen.queryByTestId('task-text-1'); // Replace 1 with the correct ID
    expect(deletedTask).not.toBeInTheDocument();
  });

  test('displays an error if trying to add an empty task', () => {
    render(<App />);
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);

    const errorMessage = screen.getByText(/Task description cannot be empty!/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
