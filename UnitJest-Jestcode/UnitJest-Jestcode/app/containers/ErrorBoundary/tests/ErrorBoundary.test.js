import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ErrorBoundary } from '../index';

describe('<ErrorBoundary />', () => {
  let wrapper = null;
  let mockFailureAction = null;

  beforeEach(() => {
    mockFailureAction = jest.fn();
    wrapper = shallow(
      <ErrorBoundary generalFailure={mockFailureAction}>
        <div>some child component</div>
      </ErrorBoundary>
    );
  });

  describe('no error', () => {
    it('Expect to match snapshots', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('error', () => {
    let ErrorComponent = null;
    let FallBackComponent = null;

    beforeEach(() => {
      ErrorComponent = () => {
        throw new Error('Error thrown from problem child');
        return <div>Error</div>; // eslint-disable-line
      };

      FallBackComponent = <div>hello error</div>;

      // squash thrown error warnings from console
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      // eslint-disable-next-line no-console
      console.error.mockRestore();
    });

    it('Expect to match handle errors', () => {
      wrapper = mount(
        <ErrorBoundary fallbackComponent={FallBackComponent} generalFailure={mockFailureAction}>
          <ErrorComponent />
        </ErrorBoundary>
      );
      expect(mockFailureAction).toHaveBeenCalled();
    });
  });
});
