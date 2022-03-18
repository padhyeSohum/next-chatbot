import React, { useState } from 'react';
import { Paper, Avatar } from '@mui/material';
import moment from 'moment';
import styles from './chat-component.module.css';

const HistoryItem = ({historyItem, ...props}) => {

    if (historyItem.party === 'user') {
        return (
            <div className = {styles.userChat} key={historyItem.time}>
                <Paper sx={{margin: 1, padding: 0.75, width: 'fit-content', bgcolor: 'lightgray'}}>{historyItem.content}</Paper>
                <Avatar>YOU</Avatar>
            </div>
        );
    }
    
    else {
        return (
            <div className = {styles.botChat} key={historyItem.time}>
                <Avatar>BOT</Avatar>
                <Paper sx={{margin: 1, padding: 0.75, width: 'fit-content', bgcolor: 'lightgray'}}>{historyItem.content}</Paper>
            </div>
        );
    }
}

export default HistoryItem;