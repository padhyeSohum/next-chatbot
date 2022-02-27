import React, { useState } from 'react';
import HistoryItem from './history-item';
import styles from './chat-component.module.css';
import { Paper } from '@mui/material';

const HistoryList = ({history, ...props}) => {

    return (
        <div className={styles.historyList}>
            <Paper sx={{margin: 1, minHeight: 500}}>
                {
                    history.map(historyItem => {
                        return <HistoryItem historyItem={historyItem} key={historyItem.time}/>;
                    })
                }
            </Paper>
        </div>
    );
}

export default HistoryList;