import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useAppContext } from '../context/appContext';

export default function CheckboxListSecondary() {
  

    const {user} = useAppContext()
    const orgList = user?.user.organizations


  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'info' }}>
      {orgList!.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${value.organization_id}`;
        return (
          <ListItem
            key={value.organization_id}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${index + 1}`}
                  src={`/static/images/avatar/${index + 1}.jpg`} // Tähän srk pic id link
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={` ${index + 1} ${value.organization_name} `} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}