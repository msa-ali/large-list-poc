import React from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SelectionDialog from './Dialog';
import OptimisedDialog from './OptimisedDialog';
import DialogWithGrid from './DialogWithGrid';
import {ListContainer} from "./CustomVirtualizedList";

function App() {
  const [open, setOpen] = React.useState(false);
  const [openGrid, setOpenGrid] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = React.useCallback((value) => {
    setOpen(false);
    setSelectedValue(value);
  }, []);

  const handleCloseGrid = React.useCallback((value) => {
    setOpenGrid(false);
    setSelectedValue(value);
  }, [])

  return (
    <div className="App">
      <Typography variant="h4" component="div">
        Long List Rendering Performance
      </Typography>
      <br></br>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SelectionDialog
        open={open}
        onClose={handleClose}
      />
      <br /> */}
      <ListContainer />
      <br />
      <Button variant="outlined" onClick={() => setOpenGrid(true)}>
        Open Optimized dialog
      </Button>
      <DialogWithGrid
        open={openGrid}
        onClose={handleCloseGrid}
      />
    </div>
  );
}

export default App;
