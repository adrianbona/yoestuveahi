import React from 'react';
import { Box, Card, CardContent } from '@material-ui/core';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import SimpleModal from '../SimpleModal';

const QRCodeDisplayModal = ({ onClose, open, value }) => {
  let qrCodeMessage = '';

  if (value) {
    qrCodeMessage = parseInt(value.externalId, 10) === 0
      ? { location_id: value.id, server_id: value.siteSource }
      : { location_id: value.externalId, server_id: value.siteSource };
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <SimpleModal title="Print QR Code" open={open} onClose={handleClose}>
      <Card>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <QRCode value={JSON.stringify(qrCodeMessage)} size={150} renderAs="svg" />
          </Box>
        </CardContent>
      </Card>
    </SimpleModal>
  );
};

QRCodeDisplayModal.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.string,
    siteSource: PropTypes.string,
    externalId: PropTypes.string
  })
};

export default QRCodeDisplayModal;
