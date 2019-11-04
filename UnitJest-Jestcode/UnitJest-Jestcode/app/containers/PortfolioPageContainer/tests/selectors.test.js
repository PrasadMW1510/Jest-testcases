import { fromJS } from 'immutable';
import makeSelectPortfolioPageContainer, { schoolList } from '../selectors';

describe('portfolio page container selector', () => {
  it('should select the portfolio page', () => {
    const portfolioPageContainer = fromJS({
      portfolioPageContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      portfolioPageContainer,
    });

    expect(makeSelectPortfolioPageContainer()(mockedState)).toEqual(portfolioPageContainer.toJS());
  });
  it('should select the school list', () => {
    const portfolioPageContainer = fromJS({
      portfolioPageContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      portfolioPageContainer,
    });

    expect(schoolList()(mockedState)).toEqual(portfolioPageContainer.toJS());
  });
});
