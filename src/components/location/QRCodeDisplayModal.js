import React from 'react';
import { Box, Card, CardContent } from '@material-ui/core';
import QRCode from 'qrcode.react';
import SimpleModal from '../SimpleModal';

const QRCodeDisplayModal = props => {
  const { onClose, open, value } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <SimpleModal title="Print QR Code" open={open} onClose={handleClose}>
      <Card>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <QRCode value={value} size="150" renderAs="svg" />
          </Box>
        </CardContent>
      </Card>
    </SimpleModal>
  );
};

export default QRCodeDisplayModal;
