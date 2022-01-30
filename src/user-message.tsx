import React from 'react';
import { Paper, Avatar } from '@mui/material';
import { ModeCommentTwoTone } from '@mui/icons-material';
import moment from 'moment';

interface historyItemProps{ time: Date, content: string, party: string }

const UserMessageComponent = ({...props}: historyItemProps) => {
    return (
        <div className="divHistoryItem" key={historyItem.time}>
            <Paper className = {props.classes.messageBothSides}>{historyItem.content}<small>{moment(historyItem.time).format('hh:mm:ss a')}</small></Paper>
        </div>
    )
}