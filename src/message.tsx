import React from 'react';
import { Paper, Avatar } from '@mui/material';
import { ModeCommentTwoTone } from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import moment from 'moment';

const styles = {}

interface historyItemProps{ time: Date, content: string, party: string }

const messageComponent = ({time, content, party, ...props}: historyItemProps) => {
    if (party === 'bot') {
        return (
            <div></div>
        )
    }
    else {
        return (
            <div className="divHistoryItem" key={time}>
                <Paper className = {props.classes.messageBothSides}>{content}<small>{moment(time).format('hh:mm:ss a')}</small></Paper>
                <Avatar />
            </div>
        )
    }
}

export default withStyles(styles)(messageComponent);