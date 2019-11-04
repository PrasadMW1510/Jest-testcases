import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ManageApplications from 'components/ClassForm/ManageApplications';

describe('<ManageApplications />', () => {
  it('Expect to render correctly', () => {
    const wrapper = shallow(
      <ManageApplications
        applications={[{ $: { name: 'app name 1', community_id: 'XYZ', version: '.0.0.1' } }]}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  describe('Functions', () => {
    it('should get an id', () => {
      const wrapper = shallow(<ManageApplications />);
      const id = wrapper
        .instance()
        .getId({ $: { name: 'app name 1', community_id: 'XYZ', version: '.0.0.1' } });
      expect(id).toBe('XYZ');
    });
    it('should get a label', () => {
      const wrapper = shallow(<ManageApplications />);
      const id = wrapper
        .instance()
        .getLabel({ $: { name: 'app name 1', community_id: 'XYZ', version: '.0.0.1' } });
      expect(id).toBe('app name 1');
    });
  });
});
