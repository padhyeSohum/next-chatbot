import React, { useState } from 'react';
import HistoryItem from './history-item';

const HistoryList = ({history, ...props}) => {

    return (
        <div>
            {
                history.map(historyItem => {
                    return <HistoryItem historyItem={historyItem} key={historyItem.time}/>;
                })
            }
        </div>
    );
}

export default HistoryList;