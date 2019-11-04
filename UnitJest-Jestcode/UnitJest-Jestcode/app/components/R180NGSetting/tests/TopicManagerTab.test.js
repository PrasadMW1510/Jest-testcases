import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import TopicManagerTab from '../TopicManagerTab';

describe('<TopicManagerTab />', () => {
  let wrapper = null;
  let mockR180ngTopics = null;
  let mockR180ngTopicsInstalledStages = null;
  let mockHandleTabsReset = null;
  let mockHandleToggle = null;
  let mockShowR180NGTopicsStageModal = null;
  let mockActiveStage = null;
  let mockCohortType = null;
  let mockState = null;
  let mockR180ngSaveTopics = null;
  beforeEach(() => {
    mockR180ngTopicsInstalledStages = [{ name: ['A01'], stage_id: ['r180ng_a'] }];
    mockHandleTabsReset = jest.fn();
    mockHandleToggle = jest.fn();
    mockShowR180NGTopicsStageModal = jest.fn();
    mockActiveStage = '';
    mockCohortType = 'School';
    mockR180ngSaveTopics = jest.fn();
    mockState = {
      activeStage: '',
      r180ngTopicsObj: [
        {
          cd_name: ['A01'],
          enable: ['0'],
          globally_enabled: ['1'],
          supplimental: ['0'],
          topic_name: ['Can You Believe It?'],
        },
      ],
      saveOptions: true,
    };
    mockR180ngTopics = fromJS([
      {
        enable: ['0'],
        cd_name: ['A01'],
        supplimental: ['0'],
        topic_name: ['Can You Believe It?'],
        globally_enabled: ['1'],
      },
    ]);

    wrapper = shallow(
      <TopicManagerTab
        r180ngTopics={mockR180ngTopics}
        r180ngTopicsInstalledStages={mockR180ngTopicsInstalledStages}
        handleTabsReset={mockHandleTabsReset}
        handleToggle={mockHandleToggle}
        showR180NGTopicsStageModal={mockShowR180NGTopicsStageModal}
        activeStage={mockActiveStage}
        cohortType={mockCohortType}
        r180ngSaveTopics={mockR180ngSaveTopics}
      />
    );
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handle handleSetInitialValues ', () => {
    wrapper.instance().handleSetInitialValues();
    expect(wrapper.state('saveOptions')).toEqual(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handle showSaveOptions ', () => {
    wrapper.instance().showSaveOptions();
    expect(wrapper.state('saveOptions')).toEqual(false);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handle hudeSaveOptions ', () => {
    wrapper.instance().hideSaveOptions();
    expect(wrapper.state('saveOptions')).toEqual(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handleSaveAndReturn ', () => {
    wrapper.instance().handleSaveAndReturn();
    expect(mockR180ngSaveTopics).toBeCalledWith(mockState);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleSubmit', () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockR180ngSaveTopics).toHaveBeenCalledWith(mockState);
  });
  it('getTopicsStageModal', () => {
    const mockEvent = { preventDefault: jest.fn(), target: { value: 'r180ng_B' } };
    wrapper.setState({ activeStage: 'r180ng_B' });
    const mockPrevValue = 'r180ng_B';
    const mockObject = {
      currentValue: mockEvent.target.value,
      prevValue: mockPrevValue,
    };

    wrapper.instance().getTopicsStageModal(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockShowR180NGTopicsStageModal).toHaveBeenCalledWith(mockObject);
  });
  it('handleCheckBoxChange when checked value is true', () => {
    const mockEvent = { target: { id: 'A01', value: 'A01', checked: true } };
    wrapper.setState({
      r180ngTopicsObj: {
        topic_cd: [
          {
            cd_name: ['A01'],
            enable: true,
            globally_enabled: ['1'],
            supplimental: ['0'],
            topic_name: ['Can You Believe It?'],
          },
        ],
      },
    });
    wrapper.instance().handleCheckBoxChange(mockEvent);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleCheckBoxChange when checked value is false', () => {
    const mockEvent = { target: { id: 'A01', value: 'A01', checked: false } };
    wrapper.setState({
      r180ngTopicsObj: {
        topic_cd: [
          {
            cd_name: ['A01'],
            enable: false,
            globally_enabled: ['1'],
            supplimental: ['0'],
            topic_name: ['Can You Believe It?'],
          },
        ],
      },
    });
    wrapper.instance().handleCheckBoxChange(mockEvent);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('componentWillReceiveProps', () => {
    const mockNextProps = {
      r180ngTopics: fromJS([
        {
          cd_name: ['A01'],
          enable: false,
          globally_enabled: ['1'],
          supplimental: ['0'],
          topic_name: ['Can You Believe It?'],
        },
      ]),
      activeStage: 'r180ng_b',
    };
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
