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
  Typography,
  makeStyles,
  Avatar
} from '@material-ui/core';
import QRCodeDisplayModal from '../../../components/location/QRCodeDisplayModal';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, locations, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowQRCode = locationId => {
    setSelectedLocation(locationId);
  };

  return (
    <>
      <Card className={clsx(classes.root, className)} {...rest}>
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Logo</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Max Capacity</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations
                  .slice(page * limit, (page + 1) * limit)
                  .map(location => (
                    <TableRow
                      hover
                      key={location.id}
                      onClick={() => handleShowQRCode(location.id)}
                    >
                      <TableCell>
                        <Avatar
                          alt="Place"
                          src={location.logo}
                          variant="rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {location.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{location.description}</TableCell>
                      <TableCell>{location.maximumCapacity}</TableCell>
                      <TableCell>
                        {location.createdBy && location.createdBy}
                      </TableCell>
                      <TableCell>
                        {location.createdAt &&
                          location.createdAt.format('MMMM D, YYYY')}
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
      <QRCodeDisplayModal
        open={!!selectedLocation}
        value={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired
};

export default Results;
