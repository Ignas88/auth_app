import {type FC, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Logo from '@app/icons/Logo.svg';
import MenuIcon from '@app/icons/ico.svg';


const Nav = styled.nav`
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-white);
`;
const Right = styled.div`
    @media (max-width: 575px) {
        & {
            display: none;
        }
    }
`;
const RightMobile = styled.div`
    @media (min-width: 576px) {
        & {
            display: none;
        }
    }
`;
const ButtonWhite = styled(Button)`
    color: var(--color-white);
`;
const DialogTitleFlex = styled(DialogTitle)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const DialogContentFlex = styled(DialogContent)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
export const Navbar: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuth = false;
    return (
        <>
            <Nav>
                <Logo/>
                <Right>
                    <NavButtons isAuth={isAuth}/>
                </Right>
                <RightMobile>
                    <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuIcon/>
                    </IconButton>
                </RightMobile>
            </Nav>
            <Dialog fullScreen open={isMenuOpen}>
                <DialogTitleFlex>
                    <Logo/>
                    <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuIcon/>
                    </IconButton>
                </DialogTitleFlex>
                <DialogContentFlex>
                    <NavButtons isAuth={isAuth} isLarge={true} onClick={() => setIsMenuOpen(false)}/>
                </DialogContentFlex>
            </Dialog>
        </>
    )
}

const NavButtons: FC<{ isAuth: boolean; isLarge?: boolean; onClick?: () => void; }> = ({
    isAuth,
    isLarge = false,
    onClick
}) => {
    const navigate = useNavigate();
    const buttonSize = isLarge ? 'large' : 'medium';
    const handleClick = (navigateTo: string) => {
        navigate(navigateTo);
        onClick?.();
    }

    return (
        <>
            <ButtonWhite onClick={() => handleClick('/')} size={buttonSize} variant="text">
                Main
            </ButtonWhite>
            {!isAuth && (
                <ButtonWhite onClick={() => handleClick('/login')} size={buttonSize} variant="text">
                    Login
                </ButtonWhite>
            )}
            {isAuth && (
                <ButtonWhite onClick={() => handleClick('/servers')} size={buttonSize} variant="text">
                    Servers
                </ButtonWhite>
            )}
            {isAuth && (
                <ButtonWhite size={buttonSize} variant="text">
                    Logout
                </ButtonWhite>
            )}
        </>
    )
}