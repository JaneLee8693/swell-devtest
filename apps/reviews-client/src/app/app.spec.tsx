import { render } from '@testing-library/react';
import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render Header component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Swell Reviews')).toBeInTheDocument();
  });

  it('should render ReviewsList component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Reviews:')).toBeInTheDocument();
  });
});
