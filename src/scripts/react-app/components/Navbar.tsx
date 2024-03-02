import { type FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '@app/icons/Logo.svg';

const Nav = styled.nav`
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px 0 24px;
    color: var(--color-white);
`;
const Right = styled.div`
    & > *:not(:last-child) {
        padding-right: 24px;
    }
`;
const StyledLink = styled(Link)`
    color: var(--color-white);
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
export const Navbar: FC = () => {
    return (
        <Nav>
            <div><Logo/></div>
            <Right>
                <StyledLink to="/login">Login</StyledLink>
                <StyledLink to="/servers">Servers</StyledLink>
            </Right>
        </Nav>
    )
}