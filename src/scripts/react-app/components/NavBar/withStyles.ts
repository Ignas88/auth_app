import styled from 'styled-components';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';

export const Nav = styled.nav`
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const Right = styled.div`
    @media (max-width: 575px) {
        & {
            display: none;
        }
    }
`;
export const RightMobile = styled.div`
    @media (min-width: 576px) {
        & {
            display: none;
        }
    }
`;
export const ButtonWhite = styled(Button)`
    color: var(--color-white);
`;
export const DialogTitleFlex = styled(DialogTitle)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const DialogContentFlex = styled(DialogContent)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
export const PaperDark = styled(Paper)`
    background-color: #212121;
`;