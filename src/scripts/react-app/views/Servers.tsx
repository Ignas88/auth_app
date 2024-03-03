import { type FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@app/components/ViewContainer';
import { ServersTable } from '@app/components/ServersTable';
import { useGetServersQuery } from '@app/services/serversApi';


export const Servers: FC = () => {
  const { isLoading, isSuccess } = useGetServersQuery()
  return (
    <Container>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {isSuccess && <ServersTable/>}
    </Container>
  );
}