import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { LoadingController } from '../LoadingController';

describe('<LoadingController />', () => {
  let wrapper = null;
  let mockLoadingController = null;

  describe('loadingOpen is true', () => {
    beforeEach(() => {
      mockLoadingController = fromJS({ loadingOpen: true });
      wrapper = shallow(<LoadingController loadingController={mockLoadingController} />);
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('loadingOpen is false', () => {
    beforeEach(() => {
      mockLoadingController = fromJS({ loadingOpen: false });
      wrapper = shallow(<LoadingController loadingController={mockLoadingController} />);
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
