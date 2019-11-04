import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MessageLogCell } from '../index';

describe('<MessageLogTable />', () => {
  let wrapper = null;
  const mockOnShowMeClick = jest.fn();

  beforeEach(() => {
    jest.spyOn(window, 'open').mockImplementation(() => {});
  });

  afterEach(() => {
    window.open.mockRestore();
  });

  it('Should render correctly', () => {
    const mockRowData = {
      payload: {
        0: {
          $: {
            type: 'text',
          },
        },
        _: 'Access is expiring',
      },
    };
    wrapper = shallow(
      <MessageLogCell rowData={mockRowData} link={false} onShowMeClick={mockOnShowMeClick} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should not call anything when the payload type is unknown', () => {
    const mockRowData = {
      payload: {
        0: {
          $: {
            type: 'error',
          },
          _: '',
        },
      },
    };

    wrapper = shallow(
      <MessageLogCell rowData={mockRowData} link onShowMeClick={mockOnShowMeClick} />
    );

    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    expect(window.open).not.toHaveBeenCalledWith();
    expect(mockOnShowMeClick).not.toHaveBeenCalled();
  });

  it('Should call onShowMeClick when the payload type is text', () => {
    const mockRowData = {
      payload: {
        0: {
          $: {
            type: 'text',
          },
          _: 'this is dummy text',
        },
      },
    };

    wrapper = shallow(
      <MessageLogCell rowData={mockRowData} link onShowMeClick={mockOnShowMeClick} />
    );

    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    expect(mockOnShowMeClick).toHaveBeenCalledWith({ payloadData: 'this is dummy text' });
  });

  it('Should call window.open when the payload type is an url', () => {
    const mockRowData = {
      payload: {
        0: {
          $: {
            type: 'url',
          },
          _: 'dummy/link',
        },
      },
    };

    wrapper = shallow(
      <MessageLogCell rowData={mockRowData} link onShowMeClick={mockOnShowMeClick} />
    );

    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    expect(window.open).toHaveBeenCalledWith('dummy/link');
  });
});
