import styled from 'styled-components';
import Button from '@mui/material/Button';

export const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 32px;
    width: 570px;
    background-color: #f5f5f5;
    border-radius: 8px;
    & > *:not(:last-child) {
        margin-bottom: 24px;
    }

    ${({theme}) => theme.breakpoints.down('sm')} {
        & {
            width: 100%;
        }
    }
`;
export const ButtonRounded = styled(Button)`
    border-radius: 24px;
`;
export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;