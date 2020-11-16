import React, { useState } from 'react';
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
  Typography
} from '@material-ui/core';

const Results = ({ tests }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date Taken</TableCell>
                <TableCell>Taken By</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.slice(page * limit, (page + 1) * limit).map(test => (
                <TableRow hover key={test.id}>
                  <TableCell>
                    {test.dateTaken && test.dateTaken.format('MMMM D, YYYY')}
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {test.takenBy}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {test.isPositive ? 'Positve' : 'Negative'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={tests.length}
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
  tests: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired
};

export default Results;
