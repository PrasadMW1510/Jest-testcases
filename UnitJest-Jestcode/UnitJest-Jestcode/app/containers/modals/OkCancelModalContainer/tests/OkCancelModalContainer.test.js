import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';
import { OkCancelModalContainer } from '../index';

describe('<OkCancelModalContainer />', () => {
  let wrapper = null;
  let mockData = null;
  const mockHideModal = jest.fn();
  const mockOnCancelFunc = jest.fn();
  const mockOnCancelParam = { key: 'cancel' };
  const mockOnOkFunc = jest.fn();
  const mockOnOkParam = { key1: 'ok' };
  const onClickAction = { preventDefault: jest.fn() };

  describe('Modal with all overrides', () => {
    beforeEach(() => {
      mockData = {
        heading: 'This is a heading',
        onCancel: mockOnCancelFunc,
        onCancelParam: mockOnCancelParam,
        onOk: mockOnOkFunc,
        onOkParam: mockOnOkParam,
      };
      wrapper = shallow(
        <OkCancelModalContainer
          cancelLabel="No"
          data={mockData}
          headerClassName="header-class-name"
          hideModal={mockHideModal}
          modalClassName="modal-class-name"
          okLabel="Yes"
        />
      );
    });

    it('Expect to render label overrides correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect handleOk to execute correctly', () => {
      wrapper
        .find('SAMButton')
        .first()
        .prop('onClickHandler')(onClickAction);
      expect(mockOnOkFunc).toHaveBeenCalledWith(mockOnOkParam);
      expect(mockHideModal).toHaveBeenCalledWith(OK_CANCEL_MODAL, {
        buttonClicked: 'ok',
        ...mockData,
      });
    });

    it('Expect handleCancel to execute correctly', () => {
      wrapper
        .find('SAMButton')
        .last()
        .prop('onClickHandler')(onClickAction);
      expect(mockOnCancelFunc).toHaveBeenCalledWith(mockOnCancelParam);
      expect(mockHideModal).toHaveBeenCalledWith(OK_CANCEL_MODAL, {
        buttonClicked: 'cancel',
        ...mockData,
      });
    });
  });

  describe('Modal with all defaults', () => {
    beforeEach(() => {
      mockData = {};
      wrapper = shallow(<OkCancelModalContainer data={mockData} hideModal={mockHideModal} />);
    });

    it('Expect to render label overrides correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect handleOk to execute correctly', () => {
      wrapper
        .find('SAMButton')
        .first()
        .prop('onClickHandler')(onClickAction);
      expect(mockHideModal).toHaveBeenCalledWith(OK_CANCEL_MODAL, {
        buttonClicked: 'ok',
        ...mockData,
      });
    });

    it('Expect handleCancel to execute correctly', () => {
      wrapper
        .find('SAMButton')
        .last()
        .prop('onClickHandler')(onClickAction);
      expect(mockHideModal).toHaveBeenCalledWith(OK_CANCEL_MODAL, {
        buttonClicked: 'cancel',
        ...mockData,
      });
    });
  });
});
