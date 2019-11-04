import axios from 'axios';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
}));
jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('getAwardsData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Awards Data', () => {
    expect.assertions(3);
    return Request.getAwardsData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});

describe('getComskillData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Comskill Data', () => {
    expect.assertions(3);
    return Request.getComskillData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});

describe('getCultureData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Culture Data', () => {
    expect.assertions(3);
    return Request.getCultureData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
describe('getGenreData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Genre Data', () => {
    expect.assertions(3);
    return Request.getGenreData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
describe('getInterestLevelData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Interest Level Data', () => {
    expect.assertions(3);
    return Request.getInterestLevelData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});

describe('getProgramSeriesData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Program Series Data', () => {
    expect.assertions(3);
    return Request.getProgramSeriesData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
describe('getTopicsData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Topics Data', () => {
    expect.assertions(3);
    return Request.getTopicsData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});

describe('getThemesData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Themes Data', () => {
    expect.assertions(3);
    return Request.getThemesData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});

describe('getInstalledQuizCountData', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Installed Quiz Count Data', () => {
    expect.assertions(3);
    return Request.getInstalledQuizCountData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
