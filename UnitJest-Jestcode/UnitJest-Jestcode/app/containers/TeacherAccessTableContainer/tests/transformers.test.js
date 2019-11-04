import * as Transformers from '../transformers';

const mockTeacher = {
  name: [
    {
      first_name: ['Foo'],
      last_name: ['Bar'],
      user_id: ['foo-abc'],
    },
  ],
};

const mockAppDataItem = {
  'applications-licensed': [
    {
      'application-licensed': null,
    },
    {
      'application-licensed': [
        {
          subproduct_id: ['sub-item-123'],
        },
      ],
    },
  ],
};

const mockApps = [
  {
    application_id: ['app-123'],
  },
  {
    application_id: ['sub-item-123'],
  },
];

it('should return a teacher name', () => {
  expect(Transformers.getTeacherName(mockTeacher)).toMatchSnapshot();
});

it('should return a teacher id', () => {
  expect(Transformers.getTeacherIDs(mockTeacher)).toMatchSnapshot();
});

it('should return application data', () => {
  expect(Transformers.getApplicationData(mockAppDataItem, mockApps)).toMatchSnapshot();
});

it('should return sort data', () => {
  expect(
    Transformers.sortApplicationData(
      // 1
      { name: ['foo'] },
      { name: ['bar'] }
    )
  ).toMatchSnapshot();
  expect(
    Transformers.sortApplicationData(
      // -1
      { name: ['bar'] },
      { name: ['foo'] }
    )
  ).toMatchSnapshot();
  expect(
    Transformers.sortApplicationData(
      // 0
      { name: ['foo'] },
      { name: ['foo'] }
    )
  ).toMatchSnapshot();
});

it('should transform json to xml', () => {
  const json = {
    foo: 'bar',
    foo2: 'bar2',
    foo3: [1, 2, 3],
    foo4: {
      bar1: 123,
    },
  };
  expect(Transformers.jsonToXML(json)).toMatchSnapshot();
});
