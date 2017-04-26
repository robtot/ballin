// Test Suite for Message React component
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Message from '../app/components/message';

describe('<Message />', () => {
	it('renders button and p', () => {
		const wrapper = shallow(<Message />);
		expect(wrapper.find('div')).to.have.length(1);
		expect(wrapper.find('p')).to.have.length(1);
		expect(wrapper.find('button')).to.have.length(1);
	});

	it('adds ping to <p></p> each time button is clicked', () => {
		const wrapper = shallow(<Message />);
		expect(wrapper.find('p')).to.have.length(1);
		expect(wrapper.find('p').text()).to.equal('');
		wrapper.find('button').simulate('click');
		expect(wrapper.find('p').text()).to.equal('ping ');
		wrapper.find('button').simulate('click');
		wrapper.find('button').simulate('click');
		expect(wrapper.find('p').text()).to.equal('ping ping ping ');
	});

	describe('time travelling tests', () => {
		//sinon mock clock will be assigned to this variable
		var clock;

		beforeEach(() => {
			//initialize sinon mock clock that will shadow global time
			clock = sinon.useFakeTimers();
		});

		afterEach(() => {
			//restore time back to global time
			clock.restore();
		});

		it('removes messages after 5 seconds of inactivity', () => {
			const wrapper = shallow(<Message />);
			expect(wrapper.find('p').text()).to.equal('');
			wrapper.find('button').simulate('click');
			wrapper.find('button').simulate('click');
			expect(wrapper.find('p').text()).to.equal('ping ping ');
			clock.tick(6000);
			expect(wrapper.find('p').text()).to.equal('');
		});

		it('does not remove messages after 5 seconds if activity happens', () => {
			const wrapper = shallow(<Message />);
			expect(wrapper.find('p').text()).to.equal('');
			wrapper.find('button').simulate('click');
			wrapper.find('button').simulate('click');
			expect(wrapper.find('p').text()).to.equal('ping ping ');
			clock.tick(4000);
			wrapper.find('button').simulate('click');
			clock.tick(2000);
			expect(wrapper.find('p').text()).to.equal('ping ping ping ');
			clock.tick(4000);
			expect(wrapper.find('p').text()).to.equal('');
		});
	});
});