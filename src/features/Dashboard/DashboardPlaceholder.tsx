import React from 'react';
import { Button } from 'components/lib/Button';
import { useDispatch } from 'react-redux';
import { logOut } from 'features/Auth/actions';

const DashboardPlaceholder = () => {
  const dispatch = useDispatch();
  const handleLogOutClick = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button type="button" onClick={handleLogOutClick}>
        Log Out
      </Button>
    </div>
  );
};

export default DashboardPlaceholder;
