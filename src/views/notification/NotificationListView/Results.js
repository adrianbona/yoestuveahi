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
  TableRow
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';

const Results = ({ className, notifications, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={className} {...rest}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Content</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications
                .slice(page * limit, (page + 1) * limit)
                .map(notification => (
                  <TableRow hover key={notification.id}>
                    <TableCell>
                      {notification.createdAt.format('MMMM D, YYYY HH:mm')}
                    </TableCell>
                    <TableCell>{notification.locationName}</TableCell>
                    <TableCell>{notification.content}</TableCell>
                    <TableCell>
                      {notification.shown ? <DraftsIcon /> : <MailIcon />}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={notifications.length}
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
  notifications: PropTypes.array.isRequired
};

export default Results;
