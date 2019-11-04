import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { PrintBookLabelContainer } from '../PrintBookLabelContainer';

describe('<PrintBookLabelContainer />', () => {
  let wrapper = null;
  let props = null;
  beforeEach(() => {
    props = {
      hideModal: jest.fn(),
      printBookLabelRequest: jest.fn(),
    };
    wrapper = shallow(<PrintBookLabelContainer {...props} />);
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call handlePreview ', () => {
    const opts = {};
    const bookId = {};
    wrapper.instance().handlePreview(opts, bookId);
    expect(wrapper.instance().props.printBookLabelRequest).toBeDefined();
  });
});
