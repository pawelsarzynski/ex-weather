import React, { ChangeEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const roots = ['/', '/forecast'];

function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState(roots.indexOf(location.pathname));

  const handleChange = (_: ChangeEvent<{}>, val: number) => {
    setValue(val);
    history.push(roots[val]);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Weather" {...a11yProps(0)} />
          <Tab label="Forecast" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    </div>
  );
}

export { Navbar };
