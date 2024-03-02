import {type FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import Logo from '@app/icons/Logo.svg';
import MenuIcon from '@app/icons/ico.svg';
import {
  Nav,
  ButtonWhite,
  Right,
  RightMobile,
  DialogTitleFlex,
  DialogContentFlex,
  PaperDark,
} from './withStyles';


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
          <IconButton onClick={() => setIsMenuOpen(true)}>
            <MenuIcon/>
          </IconButton>
        </RightMobile>
      </Nav>
      <Dialog PaperComponent={PaperDark} fullScreen open={isMenuOpen}>
        <DialogTitleFlex>
          <Logo/>
          <IconButton onClick={() => setIsMenuOpen(false)}>
            <MenuIcon/>
          </IconButton>
        </DialogTitleFlex>
        <DialogContentFlex>
          <NavButtons
            isAuth={isAuth}
            isLarge={true}
            onClick={() => setIsMenuOpen(false)}
          />
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