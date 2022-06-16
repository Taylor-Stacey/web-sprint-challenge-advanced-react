import React from 'react'
import AppFunctional from './AppFunctional'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('app renders without errors', () => {
  render(<AppFunctional />)
});

test('renders headers', () => {
  render(<AppFunctional />)

  const header = screen.getByText(/coordinates/i);

  expect(header).toBeInTheDocument();
})

test('renders an error message when out of bounds', async () => {
  render(<AppFunctional />)

  const moveLeft = screen.getByText('LEFT');
  userEvent.click(moveLeft)
  userEvent.click(moveLeft)

  const errorMessage = await screen.findByText(/You can't go left/i);
  expect(errorMessage)
})

test("invalid email throws error message", async () => {
  render(<AppFunctional />);

  const emailInput = screen.getByPlaceholderText("type email");
  userEvent.type(emailInput, "thisIsNotAnEmail");

  const submitButton = screen.getByTestId("submit");
  userEvent.click(submitButton);

  const errorMessage = await screen.findByText(/Ouch: email must be a valid email/i);
  expect(errorMessage).toBeVisible();

})