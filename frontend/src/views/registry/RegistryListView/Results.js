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
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Entered at</TableCell>
                <TableCell>Exited at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registries
                .slice(page * limit, (page + 1) * limit)
                .map(registry => {
                  return (
                    <TableRow hover key={registry.id}>
                      <TableCell>{registry.customerName}</TableCell>
                      <TableCell>{registry.locationName}</TableCell>
                      <TableCell>
                        {registry.entranceTime.format('MMMM D, YYYY HH:mm')}
                      </TableCell>
                      <TableCell>
                        {registry.exitTime.isValid() &&
                          registry.exitTime.format('HH:mm')}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
