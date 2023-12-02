import React from 'react';
import ActivityCard from './ActivityCard'; 

const Activity = () => {
  return (
    <div>
        <h1>Activities</h1>
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '15px' }}>
                <ActivityCard name="UTM Games 2023" pic="/UTMgames.jpg" descrip="An annual sport event held at UTM. "/>
            </div>
            <div>
                <ActivityCard name="UTM Sega 2022" pic="/sega.png" descrip="An annual sport event held at KTDI. "/>
            </div>
        </div>
    </div>
  );
};

export default Activity;