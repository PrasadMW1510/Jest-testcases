import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FolderButton from '../index';

describe('<FolderButton />', () => {
  let folderButton = null;
  let imageSource = null;
  let folderTitle = null;

  beforeEach(() => {
    imageSource = 'home.png';
    folderTitle = 'Home';
    folderButton = shallow(
      <FolderButton link="/home" imgSrc={imageSource} folderTitle={folderTitle} />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(folderButton)).toMatchSnapshot();
  });

  it('Should have the specified image', () => {
    expect(folderButton.find('img').prop('src')).toEqual(imageSource);
    expect(folderButton.find('img').prop('alt')).toEqual(folderTitle);
  });

  it('Should have the specified folder title', () => {
    expect(folderButton.contains(folderTitle)).toBeTruthy();
  });
});
