import * as Actions from '../actions';

it('should return the correct r180ng Topics', () => {
  expect(Actions.R180NGTopicsRequest()).toMatchSnapshot();
});

it('should return the correct r180ng Topics success', () => {
  expect(Actions.R180NGTopicsRequestSuccess('r180ung')).toMatchSnapshot();
});

it('should return the correct correct r180ng Topics failure', () => {
  expect(Actions.R180NGTopicsRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct r180ng topics installed stages', () => {
  expect(Actions.R180NGTopicsInstalledStagesRequest()).toMatchSnapshot();
});

it('should return the correct r180ng topics installed stages success', () => {
  expect(Actions.R180NGTopicsInstalledStagesRequestSuccess('r180ung')).toMatchSnapshot();
});

it('should return the correct correct r180ng topics installed stages failure', () => {
  expect(Actions.R180NGTopicsInstalledStagesRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct r180ng save Topics', () => {
  expect(Actions.R180NGTopicsSaveRequest('r180ng')).toMatchSnapshot();
});

it('should return the correct r180ng save Topics success', () => {
  expect(Actions.R180NGTopicsSaveRequestSuccess('r180ung')).toMatchSnapshot();
});

it('should return the correct correct r180ng Topics failure', () => {
  expect(Actions.R180NGTopicsSaveRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct r180ng update Topics success', () => {
  expect(Actions.updateR180NGTopicsRequestSuccess('r180ung')).toMatchSnapshot();
});
it('should return the correct r180ng update selected stage success', () => {
  expect(Actions.updateR180NGTopicsSelectedStageRequestSuccess('r180ng_A')).toMatchSnapshot();
});
