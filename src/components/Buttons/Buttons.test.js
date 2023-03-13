import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import {
  FullWidthButton,
  SignInButton,
  SignUpButton,
  SignWithGoogleButton,
  ResetPasswordButton,
  ListingFormButton
} from "./FullWidthButton";

describe('test FullWidthButton', () => {
  test('FullWidthButton renders correctly', () => {
    render(
      <FullWidthButton>
        Full width button
      </FullWidthButton>
    );
    const textElement = screen.getByText('Full width button');
    expect(textElement).toBeInTheDocument();
  });

  test('should be clickable', () => {
    // Arrange
    const { getByRole } = render(
      <FullWidthButton>
        FullWidthButton
      </FullWidthButton>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(button).toBeEnabled();
  });

  test('FullWidthButton can receive a function and it retunrs correctly', () => {
    const onClickFunc = jest.fn().mockReturnValue(4);

    const { getByRole } = render(
      <FullWidthButton
        onClick={onClickFunc}
      >
        FullWidthButton
      </FullWidthButton>
    );
    const button = getByRole('button');
    fireEvent.click(button)
    expect(onClickFunc).toHaveBeenCalled();
    expect(onClickFunc).toHaveBeenCalledWith(expect.any(Object));
    expect(button).toBeEnabled();
  })
});

describe('test SignInButton', () => {
  test('SignInButton renders correctly', () => {
    render(<SignInButton isLoading={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('bg-blue-600');
  })

  test('SignInButton renders correctly while loading', () => {
    render(<SignInButton isLoading={true} />);
    const button = screen.getByRole('button');
    const spinner = screen.getByTestId('spinner');
    expect(button).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('bg-blue-600');
  })


})






