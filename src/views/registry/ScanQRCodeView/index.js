import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import QrReader from 'react-qr-scanner';
import locations from '../../location/LocationListView/data';
import LocationCard from '../../location/LocationListView/LocationCard';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  scanAgain: {
    marginRight: theme.spacing(1)
  }
}));

const ScanQRCodeView = () => {
  const classes = useStyles();
  const [delay] = useState(100);
  const [QRData, setQRData] = useState(null);

  const handleScan = data => {
    if (data) {
      const location = locations[Math.floor(Math.random() * locations.length)];
      setQRData(location);
    }
  };

  return (
    <Page className={classes.root} title="Registry">
      <Container>
        {QRData ? (
          <>
            <Box alignItems="center" display="flex" flexDirection="column">
              <LocationCard location={QRData} />
            </Box>
            <Box
              p={2}
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <Button
                className={classes.scanAgain}
                color="secondary"
                variant="contained"
                onClick={() => setQRData(null)}
              >
                Scan Again
              </Button>
              <Button color="primary" variant="contained">
                Check in
              </Button>
            </Box>
          </>
        ) : (
          <Card>
            <CardHeader title="Please scan a QR code to continue" />
            <Divider />
            <CardContent>
              <Box position="relative">
                <QrReader
                  delay={delay}
                  onScan={handleScan}
                  onError={() => {}}
                  style={{
                    width: '100%'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Page>
  );
};

export default ScanQRCodeView;
