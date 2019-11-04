import * as Actions from '../actions';

it('should return the correct certificate id', () => {
  expect(Actions.certificatePrintRequest('q2jc42v9h5lr5k8ssq441g09_2efa7f0')).toMatchSnapshot();
});

it('should return the certificate id with a success', () => {
  expect(Actions.certificatePrintRequestSuccess()).toMatchSnapshot();
});

it('should return the certificate id with a failure', () => {
  expect(Actions.certificatePrintRequestFailure('error')).toMatchSnapshot();
});
