import { type FC } from 'react';
import { Container } from '@app/components/ViewContainer';
import { useGetServersQuery } from '@app/services/serversApi';


export const Servers: FC = () => {
  const { data, isLoading } = useGetServersQuery()
  console.log(data)
  console.log(isLoading)
  return (
    <Container>
      severs
    </Container>
  );
}