import React, { useState } from 'react';
import { Paper, Avatar } from '@mui/material';
import styles from './chat-component.module.css';

const HistoryItem = ({historyItem, ...props}) => {
    return (
        <div>
            <div className = {styles.userChat} key={historyItem.itemID + '-user'}>
                <Paper sx={{margin: 1, padding: 0.75, width: 'fit-content', bgcolor: 'lightgray'}}>{historyItem.userIntent}</Paper>
                <Avatar>YOU</Avatar>
            </div>
            <div className = {styles.botChat} key={historyItem.itemID}>
                <Avatar>BOT</Avatar>
                <Paper sx={{margin: 1, padding: 0.75, width: 'fit-content', bgcolor: 'lightgray'}}>{historyItem.botReply === null ? <div>waiting</div> : historyItem.botReply}</Paper>
            </div>
        </div>
    );
}

export default HistoryItem;