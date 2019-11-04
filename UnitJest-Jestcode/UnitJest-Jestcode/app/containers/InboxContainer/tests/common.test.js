import moment from 'moment';

import {
  checkWeekData,
  getNewThisWeek,
  getUnreadData,
  getInboxDataByCommunityId,
  getInboxDataByCommunityName,
} from '../common';
describe('inboxcontainer common', () => {
  it('it should checkWeekData', () => {
    const item = {
      date: moment('06/06/2018', 'MM/DD/YYYY', true).format(),
    };
    const checkWeekDataComponent = checkWeekData(item);
    expect(checkWeekDataComponent).toBe(false);
  });
  it('it should exists getNewThisWeek ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [
      {
        kind: selectedKind,
        graded: 'false',
        checkWeekData: '',
        date: moment('06/06/2018', 'MM/DD/YYYY', true).format(),
      },
    ];
    expect(getNewThisWeek(gridData, selectedKind)).toEqual([]);
  });

  it('else: it should exists getNewThisWeek ', () => {
    const selectedKind = 'selectedKind';
    const kind1 = 'kind1';
    const gridData = [
      {
        kind: kind1,
        graded: 'true',
        date: moment('06/06/2018', 'MM/DD/YYYY', true).format(),
      },
    ];
    expect(getNewThisWeek(gridData, selectedKind)).toEqual([]);
  });
  it('it should exists getNewThisWeek ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [];
    expect(getNewThisWeek(gridData, selectedKind)).toEqual(gridData);
  });
  it('it should exists getUnreadData ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [
      {
        kind: selectedKind,
        graded: 'false',
        read: 'false',
      },
    ];
    expect(getUnreadData(gridData, selectedKind)).toMatchSnapshot();
  });
  it('it should exists getUnreadData else ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [];
    expect(getUnreadData(gridData, selectedKind)).toMatchSnapshot();
  });
  it('it should exists getUnreadData ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [
      {
        kind: selectedKind,
        graded: 'false1',
        read: 'false1',
      },
    ];
    expect(getUnreadData(gridData, selectedKind)).toMatchSnapshot();
  });
  it('it should exists getInboxDataByCommunityId ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [
      {
        kind: selectedKind,
        graded: 'false',
        community_id: 1,
      },
    ];
    const communityId = ['0', '1'];
    expect(getInboxDataByCommunityId(gridData, selectedKind, communityId)).toMatchSnapshot();
  });
  it('it should exists getInboxDataByCommunityId else ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [];
    const communityId = ['0'];
    expect(getInboxDataByCommunityId(gridData, selectedKind, communityId)).toMatchSnapshot();
  });
  it('it should exists getInboxDataByCommunityId ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [
      {
        kind: selectedKind,
        graded: 'false1',
        community_id: communityId,
      },
    ];
    const communityId = [
      {
        community_id: ['3'],
      },
    ];
    expect(getInboxDataByCommunityId(gridData, selectedKind, communityId)).toMatchSnapshot();
  });

  it('if: it should exists getInboxDataByCommunityId ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [
      {
        kind: selectedKind,
        graded: 'false',
        community_id: '1',
      },
    ];
    const communityId = ['1', '0', '2'];
    expect(getInboxDataByCommunityId(gridData, selectedKind, communityId)).toMatchSnapshot();
  });

  it('it should exists getInboxDataByCommunityName ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [
      {
        kind: selectedKind,
        graded: 'false',
        className: '1',
      },
    ];
    const communityName = ['0', '1'];
    expect(getInboxDataByCommunityName(gridData, selectedKind, communityName)).toMatchSnapshot();
  });
  it('it should exists getInboxDataByCommunityName else ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [];
    const communityName = ['0'];
    expect(getInboxDataByCommunityName(gridData, selectedKind, communityName)).toMatchSnapshot();
  });
  it('it should exists getInboxDataByCommunityName ', () => {
    const selectedKind = 'selectedKind';
    const gridData = [
      {
        kind: selectedKind,
        graded: 'false1',
        className: 3,
      },
    ];
    const communityName = ['1'];
    expect(getInboxDataByCommunityName(gridData, selectedKind, communityName)).toMatchSnapshot();
  });
});
