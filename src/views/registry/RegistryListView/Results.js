import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, registries, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Registry Id</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Entrance Time</TableCell>
                <TableCell>Exit Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registries
                .slice(page * limit, (page + 1) * limit)
                .map(registry => (
                  <TableRow hover key={registry.id}>
                    <TableCell>{registry.id}</TableCell>
                    <TableCell>{registry.userId}</TableCell>
                    <TableCell>
                      {registry.entranceTime.format('HH:mm')}
                    </TableCell>
                    <TableCell>{registry.exitTime.format('HH:mm')}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={registries.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  registries: PropTypes.array.isRequired
};

export default Results;
