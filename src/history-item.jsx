import React, { useState } from 'react';
import { Paper } from '@mui/material';

const HistoryItem = ({historyItem, ...props}) => {
    return (
        <div key={historyItem.time}>
            {historyItem.content}
        </div>
    );
}

export default HistoryItem;