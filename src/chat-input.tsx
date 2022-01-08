import React, { useState } from 'react';
import { Paper, TextField, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { withStyles } from '@mui/styles';

const styles = {
    paper: {
        display: 'flex',
        margin: 10
    },
    userInput: {
        width: 450
    },
    sendButton: {
        '&:hover': {
            color: "#12c210"
        },
        '&:active': {
            color: "#12c210"
        }
    }
}

interface ChatInputProps{onSubmit?: (chatQuery) => void;}

const ChatInput = ({onSubmit, ...props}: ChatInputProps) => {

    const [chatQuery, setChatQuery] = useState('')

    return (
        <div>
            <Paper className={props.classes.paper}>

                <TextField
                    required
                    id="msg"
                    label="Question"
                    // defaultValue=""
                    variant="outlined"
                    className={props.classes.userInput}
                    value={ chatQuery }
                    onChange={ (e) => setChatQuery(e.target.value) }
                />

                <IconButton onClick={ (e) => onSubmit(chatQuery) } className={props.classes.sendButton}>
                    <SendIcon />
                </IconButton>

            </Paper>
        </div>
    );
}

export default withStyles(styles)(ChatInput);