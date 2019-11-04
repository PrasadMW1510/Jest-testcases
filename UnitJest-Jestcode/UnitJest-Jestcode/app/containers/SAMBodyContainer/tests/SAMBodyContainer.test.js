import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import SAMBody from 'components/SAMBody';
import SAMBodyContainer from '../index';

describe('<SAMBodyContainer />', () => {
  it('Expect to render correctly for the home page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );

    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('cream');
  });

  it('Expect to render bg color correctly for the Program Settings page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/roster/programSettings']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );

    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('orange');
  });

  it('Expect to render bg color correctly for the Program Grading page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/roster/programGrading']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );

    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('orange');
  });

  it('Expect to render bg color correctly for the Program Certificate page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/roster/programCertificate']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );

    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('orange');
  });

  it('Expect to render bg color correctly for the roster page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/roster']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );

    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('orange');
  });

  it('Expect to render bg color correctly for the reports page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/reports']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );

    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('blue');
  });

  it('Expect to render bg color correctly for the resources page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/resources']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );
    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('green');
  });

  it('Expect to render bg color correctly for the books page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/books']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );
    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('red');
  });

  it('Expect to render bg color correctly for the portfolio page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/portfolio']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );
    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('purple');
  });

  it('Expect to render bg color correctly for an undefined page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/helloworld']}>
        <SAMBodyContainer />
      </MemoryRouter>
    );
    expect(wrapper.find(SAMBody).prop('bgColor')).toEqual('cream');
  });
});
