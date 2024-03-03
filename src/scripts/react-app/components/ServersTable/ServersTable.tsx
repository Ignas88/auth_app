import {type FC, useState, type MouseEvent, useMemo} from 'react';
import {useGetServersQuery, type ServerJSON} from '@app/services/serversApi';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { stableSort, getComparator, type Order } from './utils';
import { TablePaper } from './withStyles';


interface HeadCell {
  id: keyof ServerJSON;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'distance',
    label: 'Distance',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof ServerJSON) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
const EnhancedTableHead:FC<EnhancedTableProps> = ({order, orderBy, rowCount, onRequestSort}) => {
  const createSortHandler =
    (property: keyof ServerJSON) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export const ServersTable:FC = () => {
  const { data = [], isSuccess } = useGetServersQuery()
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof ServerJSON,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)),
    [order, orderBy, isSuccess],
  );

  return (
    <TablePaper>
      <TableContainer sx={{ overflowY: 'scroll', height: '100%' }}>
        <Table size="medium">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {visibleRows.map(({name, distance}, index) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell align="center">{name}</TableCell>
                  <TableCell align="center">{distance}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </TablePaper>
  );
}