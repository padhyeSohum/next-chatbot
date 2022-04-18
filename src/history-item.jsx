import React, { useState } from 'react';
import { Paper, Avatar } from '@mui/material';
import styles from './chat-component.module.css';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BusySpinner from './busyspinner';

const HistoryItem = ({historyItem, ...props}) => {
    return (
        <div>
            <div className = {styles.userChat} key={historyItem.itemID + '-user'}>
                <Paper sx={{margin: 1, padding: 0.75, width: 'fit-content', bgcolor: deepPurple[500], color: 'white'}} elevation={4}>{historyItem.userIntent}</Paper>
                <Avatar>YOU</Avatar>
            </div>
            <div className = {styles.botChat} key={historyItem.itemID}>
                <Avatar sx={{backgroundColor: "cornflowerblue"}}>BOT</Avatar>
                <Paper sx={{margin: 1, padding: 0.75, width: 'fit-content'}} elevation={4}>{historyItem.botReply === null ? <BusySpinner /> : historyItem.botReply}</Paper>
            </div>
        </div>
    );
}

export default HistoryItem;