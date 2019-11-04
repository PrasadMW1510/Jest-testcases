import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import * as Utils from 'utils/utilities';
import StudentForm from 'components/StudentForm';
import { META_DATA_PASSWORD_CONFIG } from 'containers/AddEditStudent/constants';
import * as Constants from '../constants';

describe('<StudentForm />', () => {
  let mockProps;
  let spy;
  beforeEach(() => {
    mockProps = {
      change: jest.fn(),
      handleCancel: jest.fn(),
      handleSave: jest.fn(),
      handleSubmit: jest.fn(),
      isOpen: true,
      title: 'Foo Title',
      metaData: {
        [META_DATA_PASSWORD_CONFIG]: { configs: [] },
      },
    };
    spy = jest.spyOn(Utils, 'createPasswordToolTipText').mockReturnValue('foo');
  });

  afterEach(() => {
    spy.mockClear();
  });

  it('Expect tabs to render correctly when student profile tab clicked', () => {
    const wrapper = shallow(<StudentForm {...mockProps} />);
    wrapper
      .find('NavItem')
      .first()
      .simulate('click', {
        currentTarget: { id: Constants.TAB_PROFILE },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly when in edit mode', () => {
    const wrapper = shallow(<StudentForm {...mockProps} data={{ edit: true }} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly when no classes are selected', () => {
    const wrapper = shallow(
      <StudentForm {...mockProps} submitFailed validationErrors={{ classes: 'foo error' }} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly when server errors that have meta-data', () => {
    const wrapper = shallow(
      <StudentForm
        {...mockProps}
        submitFailed
        serverErrors={fromJS({
          user_name: 'user_name error',
          errorMeta: { alternate_username: ['student01'] },
        })}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handleSave instance method to call the handleSave prop', () => {
    const wrapper = shallow(<StudentForm {...mockProps} />);
    wrapper.instance().handleSave();
    expect(mockProps.handleSave).toHaveBeenCalled();
  });
  it('Expect to transform grade data', () => {
    const wrapper = shallow(<StudentForm {...mockProps} />);
    const data = wrapper.instance().transformGrade({ name: ['Foo'] });
    expect(data).toEqual({ id: 'Foo', label: 'Foo' });
  });
  it('Expect password fields to be enabled when grade selected', () => {
    const wrapper = shallow(<StudentForm {...mockProps} formData={fromJS({ grade: 'PK' })} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect not to restrict good date data', () => {
    const wrapper = shallow(<StudentForm {...mockProps} />);
    const val = wrapper.instance().restrictDateChars('12/12/1999');
    expect(val).toEqual('12/12/1999');
  });
  it('Expect to restrict bad date data', () => {
    const wrapper = shallow(<StudentForm {...mockProps} />);
    const val = wrapper.instance().restrictDateChars('12/abc/1999');
    expect(val).toEqual('12//1999');
  });
  describe('Tool Tip', () => {
    it('Expect the default to be used when no grade', () => {
      const wrapper = shallow(<StudentForm {...mockProps} />);
      const text = wrapper.instance().getTooltipText();
      expect(text).toEqual('Please select a grade.');
    });
    it('Expect the tooltip to be based on grade map', () => {
      const pwConfig = {
        grade_mappings: [
          {
            grade_mapping: [
              {
                $: { grade: 'PK', config_id: 'Simple' },
              },
            ],
          },
        ],
      };

      const metaData = {
        [META_DATA_PASSWORD_CONFIG]: pwConfig,
      };
      const wrapper = shallow(
        <StudentForm {...mockProps} metaData={metaData} formData={fromJS({ grade: 'PK' })} />
      );
      wrapper.instance().getTooltipText();
      expect(spy.mock.calls[0][1]).toEqual('Simple');
    });
  });
});
