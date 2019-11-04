import getErrorMsg from '../slmsErrors';

describe('slmsErrors', () => {
  it('get DEFAULT msg', () => {
    expect(getErrorMsg('DEFAULT')).toEqual('There was an error with: ');
  });

  it('get error message with error code of int 424', () => {
    expect(getErrorMsg(424)).toEqual('Please select a date.');
  });

  it('get error message with error code of string 424', () => {
    expect(getErrorMsg('424')).toEqual('Please select a date.');
  });

  it('get error message with error code of -1', () => {
    expect(getErrorMsg('-1')).toEqual(
      'There was a server error. You can try again or, if the problem persists, contact your technical administrator.'
    );
  });

  it('get error message with error code of -33', () => {
    expect(getErrorMsg('-33', 'server message')).toEqual('server message');
  });

  it('get error message with error code of -95', () => {
    expect(getErrorMsg('-95', 'server message')).toEqual('server message');
  });

  it("error code doesn't exists", () => {
    expect(getErrorMsg('999')).toEqual('');
  });
});
