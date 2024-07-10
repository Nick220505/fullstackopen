import { render, screen } from '@testing-library/react';
import Todo from './Todo';

describe('<Todo />', () => {
  test('renders information correctly', () => {
    const todo = {
      done: true,
      text: 'Go to the GYM',
    };

    render(<Todo todo={todo} completeTodo={() => {}} deleteTodo={() => {}} />);

    expect(screen.getByText('Go to the GYM')).toBeInTheDocument();
    expect(screen.getByText('This todo is done')).toBeInTheDocument();
  });
});
