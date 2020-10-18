import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, locations, ...rest }) => {
  const classes = useStyles();
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedLocationIds;

    if (event.target.checked) {
      newSelectedLocationIds = locations.map(location => location.id);
    } else {
      newSelectedLocationIds = [];
    }

    setSelectedLocationIds(newSelectedLocationIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedLocationIds.indexOf(id);
    let newSelectedLocationIds = [];

    if (selectedIndex === -1) {
      newSelectedLocationIds = newSelectedLocationIds.concat(
        selectedLocationIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedLocationIds = newSelectedLocationIds.concat(
        selectedLocationIds.slice(1)
      );
    } else if (selectedIndex === selectedLocationIds.length - 1) {
      newSelectedLocationIds = newSelectedLocationIds.concat(
        selectedLocationIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedLocationIds = newSelectedLocationIds.concat(
        selectedLocationIds.slice(0, selectedIndex),
        selectedLocationIds.slice(selectedIndex + 1)
      );
    }

    setSelectedLocationIds(newSelectedLocationIds);
  };

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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedLocationIds.length === locations.length}
                    color="primary"
                    indeterminate={
                      selectedLocationIds.length > 0 &&
                      selectedLocationIds.length < locations.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.slice(0, limit).map(location => (
                <TableRow
                  hover
                  key={location.id}
                  selected={selectedLocationIds.indexOf(location.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedLocationIds.indexOf(location.id) !== -1}
                      onChange={event => handleSelectOne(event, location.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        src={location.avatarUrl}
                      >
                        {getInitials(location.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {location.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{location.email}</TableCell>
                  <TableCell>
                    {`${location.address.city}, ${location.address.state}, ${location.address.country}`}
                  </TableCell>
                  <TableCell>{location.phone}</TableCell>
                  <TableCell>
                    {moment(location.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={locations.length}
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
  locations: PropTypes.array.isRequired
};

export default Results;
