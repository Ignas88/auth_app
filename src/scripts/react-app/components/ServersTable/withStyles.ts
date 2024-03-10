import styled from 'styled-components';
import Paper from '@mui/material/Paper';

export const TablePaper = styled(Paper)`
    overflow: hidden;
    max-height: 70%;
    width: 570px;
    border-radius: 8px;

    ${({theme}) => theme.breakpoints.down('sm')} {
        & {
            width: 100%;
        }
    }
`;
