import { render } from '@testing-library/react';
import { ErrorMsgPropsType } from '../types';
import { ErrorMessage } from '../components/errorMessage/ErrorMessage';
import { expect, test } from 'vitest';

const mockProps: ErrorMsgPropsType = {
  errorMsg: 'An error occurred while loading data.',
};

test('Renders error message component with error message properly', () => {
  const { getByTestId, getByText } = render(
    <ErrorMessage errorMsg={mockProps.errorMsg} />
  );

  const errorMessageElement = getByTestId('errorMessage');
  expect(errorMessageElement).toBeInTheDocument();

  const errorTitleElement = getByText('Error message');
  expect(errorTitleElement).toBeInTheDocument();

  const errorMessageContentElement = getByText(mockProps.errorMsg);
  expect(errorMessageContentElement).toBeInTheDocument();
});
