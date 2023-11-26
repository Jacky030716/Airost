import React from "react";
import { Box, Grid, Button, Typography, Stack, Divider, Tabs, Tab } from "@mui/material";
import { userNavLinks } from "../constants/constant";
import UserProfileBody from "./UserProfileBody"
import { activities } from "../constants/hardcode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UserActivities from "./UserActivities";

const UserCard = () => {
    const icons = {
        AccountCircleIcon: <AccountCircleIcon sx={{ color: "blue" }} />,
        CalendarMonthIcon: <CalendarMonthIcon sx={{ color: "blue" }} />,
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(235, 235, 235, 0.8)",
          width: "70%",
          height: "100%",
          borderRadius: "5px",
          mt: 8,
        }}
      >
        {/* User Card Nav */}
              <Box sx={{ py: 2, boxShadow: '0 3px 3px -2px rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 1px 8px 0 rgba(0, 0, 0, 0.06)' }} display="flex" justifyContent="center">
                <Tabs value={value} onChange={handleChange} sx={{ '& .MuiTabs-indicator': { marginLeft: '4px' } }}>
                {userNavLinks.map((link) => (
                    <Tab
                    key={link.key}
                    label={
                        <Box display="flex" alignItems="center" justifyContent="center">
                        {icons[link.icon]}
                        <Typography ml={1} mt="2px">
                            {link.name}
                        </Typography>
                        </Box>
                    }
                    />
                ))}
                </Tabs>
            </Box>

        {/* User Card Body */}
        <Grid container  sx={{height: '80%', overflowY: 'auto', px: 4}}>
          {value === 0 ?  <UserProfileBody /> : activities.map((activity) => (
              <Grid key={activity.key} item xs={12} display="flex" flexDirection="row" justifyContent="center">
                <UserActivities activity={activity} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default UserCard;
