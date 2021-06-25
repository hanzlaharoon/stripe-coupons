import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
// import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: '20ch',
  },
}));

const AddCoupon = ({ fectchCoupons }) => {
  const classes = useStyles();
  const [name, setName] = React.useState();
  const [percentOff, setPercentOff] = useState();
  const [duration, setDuration] = useState('once');
  const [open, setOpen] = React.useState(false);
  //   const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePercentOff = (event) => {
    setPercentOff(event.target.value);
  };
  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = () => {
    if (name && percentOff && duration) {
      const couponObj = {
        name: name.trim(),
        percent_off: percentOff,
        duration,
      };
      axios
        .post(baseUrl + 'coupons/', couponObj)
        .then((res) => {
          console.log('/coupons/add', res);
          if (res.data) {
            console.log('Coupon Added');
            resetForm();
            handleClose();
            fectchCoupons();
            // history.push('/coupons');
          } else {
            console.log('Failed');
          }
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  };

  const resetForm = () => {
    setName('');
    setPercentOff('');
    setDuration('');
  };

  return (
    <>
      <Button
        variant='contained'
        // color='primary'
        onClick={handleClickOpen}
      >
        Add New Coupon
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xs'
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add New Coupon</DialogTitle>
        <DialogContent>
          {/* <form> */}
          <Grid container spacing={1} justify='center'>
            <Grid item sm={12}>
              <TextField
                label='Name'
                fullWidth
                value={name}
                margin='dense'
                variant='outlined'
                onChange={handleChangeName}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label='Percent Off'
                value={percentOff}
                // fullWidth
                type
                margin='dense'
                variant='outlined'
                onChange={handleChangePercentOff}
              />
            </Grid>
            <Grid item sm={12}>
              <Grid container spacing={1} alignItems='center'>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel id='duration-simple-select-label'>
                      Duration
                    </InputLabel>
                    <Select
                      labelId='duration-simple-select-label'
                      id='duration-simple-select'
                      value={duration}
                      onChange={handleChangeDuration}
                    >
                      <MenuItem value={'once'}>Once</MenuItem>
                      <MenuItem value={'forever'}>Forever</MenuItem>
                      <MenuItem value={'repeating'}>Multiple Months</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {duration === 'repeating' && (
                  <Grid item sm={6}>
                    <TextField
                      //   label='No. of Months'
                      //   value={1}
                      className={classes.textField}
                      variant='outlined'
                      margin='dense'
                      onChange={handleChangeDuration}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>Months</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* </form> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Container maxWidth={'sm'}>
        <form>
          <TextField
            label='Name'
            fullWidth
            value={name}
            margin='dense'
            onChange={handleChangeName}
          />
          <TextField
            label='percentOff'
            value={percentOff}
            fullWidth
            margin='dense'
            onChange={handleChangePercentOff}
          />
          <TextField
            label='Duration'
            value={duration}
            // multiline
            // rowsMax={4}
            fullWidth
            margin='dense'
            onChange={handleChangeDuration}
          />

          <Box margin={1} padding={1}>
            <Grid container justify='flex-end'>
              <Grid item>
                <Button variant='outlined' onSubmit={() => handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container> */}
    </>
  );
};

export default AddCoupon;
