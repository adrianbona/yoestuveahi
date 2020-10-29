import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: theme.palette.primary.light
  },
  title: {
    lineHeight: '1.33',
    fontSize: '24px',
    letterSpacing: '0.95px'
  },
  container: {
    width: '500px',
    maxWidth: '85%',
    position: 'absolute',
    outline: 0,
    backgroundColor: 'white'
  }
}));

const SimpleModal = props => {
  const { children, onClose, open, title } = props;
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.container}>
        <>
          {title && (
            <div className={classes.action}>
              <Typography
                className={classes.title}
                color="textPrimary"
                variant="h3"
              >
                {title}
              </Typography>
              <IconButton color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          )}
          {children}
        </>
      </div>
    </Modal>
  );
};

export default SimpleModal;
