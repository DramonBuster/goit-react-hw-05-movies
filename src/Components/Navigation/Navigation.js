import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationWrapper = styled.div`
  padding: 20px 150px;
  background-color: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid #fff;
`;

const NavigationList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavigationItem = styled.li``;

const NavigationNavLink = styled(NavLink)`
  padding: 10px 2px;
  font-size: 34px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  text-transform: uppercase;

  &.active {
    position: relative;
    color: blue;

    ::after {
      content: '';
      position: absolute;
      bottom: 7px;
      left: 0;
      width: 100%;
      height: 3px;
      border-radius: 2px;
      background-color: blue;
    }

    :hover:after {
      background-color: lightblue;
    }
  }

  :hover {
    color: lightblue;
  }
`;

export default function Navigation() {
  return (
    <NavigationWrapper>
      <NavigationList>
        <NavigationItem>
          <NavigationNavLink exact to="/">
            Home
          </NavigationNavLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationNavLink to="/movies">Movies</NavigationNavLink>
        </NavigationItem>
      </NavigationList>
    </NavigationWrapper>
  );
}
