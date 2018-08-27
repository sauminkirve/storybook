import React, { Component, Children } from 'react';
import styled from '@emotion/styled';

import { TabButton } from '@storybook/components';
import { Container } from './container';
import { Route } from '../../router';

const Pane = styled.div(
  {
    transition: 'transform .2s ease',
    position: 'absolute',
    top: 0,
    height: '100%',
  },
  ({ index }) => {
    switch (index) {
      case 0: {
        return {
          width: '80vw',
          transform: 'translateX(-80vw)',
          left: 0,
        };
      }
      case 1: {
        return {
          width: '100%',
          transform: 'translateX(0) scale(1)',
          left: 0,
        };
      }
      case 2: {
        return {
          width: '80vw',
          transform: 'translateX(80vw)',
          right: 0,
        };
      }
      default: {
        return {};
      }
    }
  },
  ({ active, index }) => {
    switch (true) {
      case index === 0 && active === 0: {
        return {
          transform: 'translateX(-0px)',
        };
      }
      case index === 1 && active === 0: {
        return {
          transform: 'translateX(40vw) translateY(-43.5vh) translateY(40px) scale(0.2)',
        };
      }
      case index === 1 && active === 2: {
        return {
          transform: 'translateX(-40vw) translateY(-43.5vh) translateY(40px) scale(0.2)',
        };
      }
      case index === 2 && active === 2: {
        return {
          transform: 'translateX(0px)',
        };
      }
      default: {
        return {};
      }
    }
  }
);

const Panels = ({ children, active }) => (
  <Panels.Container>
    {Children.toArray(children).map((item, index) => (
      <Pane key={index} index={index} active={active}>
        {item}
      </Pane>
    ))}
  </Panels.Container>
);

Panels.Container = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: 'calc(100% - 40px)',
});

const Bar = styled.nav({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100vw',
  height: 40,
  display: 'flex',

  '& > *': {
    flex: 1,
  },
});

class Mobile extends Component {
  constructor(props) {
    super();

    const { options } = props;
    this.state = {
      active: options.initialActive,
    };
  }

  render() {
    const { Nav, Preview, Panel } = this.props;
    const { active } = this.state;

    return (
      <Container>
        <Route path="/components">
          <Panels active={active}>
            <Nav />
            <Preview />
            <Panel />
          </Panels>
          <Bar active={active}>
            <TabButton onClick={() => this.setState({ active: 0 })}>Nav</TabButton>
            <TabButton onClick={() => this.setState({ active: 1 })}>Preview</TabButton>
            <TabButton onClick={() => this.setState({ active: 2 })}>Panel</TabButton>
          </Bar>
        </Route>
      </Container>
    );
  }
}
export { Mobile };