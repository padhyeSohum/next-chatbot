import React, { useState } from 'react';
import HistoryItem from './history-item';
import styles from './chat-component.module.css';
import { Paper } from '@mui/material';

const HistoryList = ({history, ...props}) => {

    return (
        
        <Paper sx={{margin: 1, padding: 1, height: 400, overflow: "auto"}}>
            <div className={styles.historyList}>
                {
                    history.map(historyItem => {
                        return <HistoryItem historyItem={historyItem} key={historyItem.itemID}/>;
                    })
                }
            </div>
        </Paper>
        
    );
}

export default HistoryList;