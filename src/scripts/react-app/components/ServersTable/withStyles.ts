import styled from 'styled-components';
import Paper from '@mui/material/Paper';

export const TablePaper = styled(Paper)`
    overflow: hidden;
    max-height: 70%;
    width: 570px;
    border-radius: 8px;
    
    @media (max-width: 575px) {
        & {
            width: 100%;
        }
    }
`;
