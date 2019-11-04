import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { PrintCustomQuizList } from '../PrintCustomQuizList';

describe('<PrintCustomQuizList />', () => {
  let wrapper = null;
  let props = null;
  beforeEach(() => {
    props = {
      hideModal: jest.fn(),
      printCustomQuizRequest: jest.fn(),
      data: [],
    };
    wrapper = shallow(<PrintCustomQuizList {...props} />);
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call handleTitleClick ', () => {
    const opts = {};
    const bookId = {};
    wrapper.instance().handlePreview(opts, bookId);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
