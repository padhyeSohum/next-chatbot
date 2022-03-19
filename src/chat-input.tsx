import React, { useContext } from 'react';
import { Paper, TextField, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { withStyles } from '@mui/styles';
import AppContext from './appcontext';

const styles = {
    paper: {
        display: 'flex',
        padding: 10
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

    const context = React.useContext(AppContext);

    if (context === null) {
        return;
    }

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
                    value={ context.state.chatQuery }
                    onChange={ (e) => context.setChatQuery(e.target.value) }
                    onKeyPress={ (e) => {
                        if (e.key === "Enter") {
                            onSubmit(context.state.chatQuery)
                        }
                    } }
                />

                <IconButton onClick={ (e) => onSubmit(context.state.chatQuery) } className={props.classes.sendButton}>
                    <SendIcon />
                </IconButton>

            </Paper>
        </div>
    );
}

export default withStyles(styles)(ChatInput);