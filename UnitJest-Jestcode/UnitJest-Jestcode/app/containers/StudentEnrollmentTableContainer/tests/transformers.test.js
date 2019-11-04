import * as Transformers from '../transformers';

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
