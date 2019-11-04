import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Route, Redirect } from 'react-router-dom';
import LoadingBar from 'components/LoadingBar';
import { PrivateRoute } from '../PrivateRoute';

describe('<PrivateRoute />', () => {
  let wrapper = null;
  const destComponent = () => <span>hello</span>;
  let mockGlobal = null;
  let mockLocation = null;

  beforeEach(() => {
    mockGlobal = fromJS({
      currentUser: true,
      loginInProgress: false,
    });
    mockLocation = {};

    wrapper = shallow(
      <PrivateRoute component={destComponent} global={mockGlobal} location={mockLocation} />
    );
  });

  it('Should render the component if the user is logged in', () => {
    const renderedComponent = wrapper.find(Route).prop('render')();
    expect(shallow(renderedComponent).equals(destComponent())).toBeTruthy();
  });

  it('Should render the component if the user is pending login', () => {
    mockGlobal = mockGlobal.set('loginInProgress', true).set('currentUser', false);

    wrapper = shallow(
      <PrivateRoute component={destComponent} global={mockGlobal} location={mockLocation} />
    );

    const renderedComponent = wrapper.find(Route).prop('render')();

    expect(renderedComponent).toEqual(<LoadingBar />);
  });

  it('Should redirect if the user is not logged in', () => {
    mockGlobal = mockGlobal.set('currentUser', false);

    wrapper = shallow(
      <PrivateRoute component={destComponent} global={mockGlobal} location={mockLocation} />
    );

    const renderedComponent = wrapper.find(Route).prop('render')();

    expect(renderedComponent).toEqual(
      <Redirect push={false} to={{ pathname: '/login', state: { from: {} } }} />
    );
  });
});
