import React, { useContext } from 'react';
import { Paper, TextField, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { withStyles } from '@mui/styles';
import AppContext from './appcontext';

const styles = {
    paper: {
        display: 'flex',
        padding: 10,
    },
    userInput: {
        width: 450,
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

    const isValidQuery: boolean = context.state.chatQuery != null && context.state.chatQuery.trim().length > 0;

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
                            if (isValidQuery) {
                                context.setUserMessage(null);
                                onSubmit(context.state.chatQuery)
                            }
                            else {
                                context.setUserMessage('Please enter a valid question.')
                            }
                        }
                    } }
                    disabled={context.state.serverQueryInProgress}
                    autoFocus={true}
                />

                <IconButton onClick=
                { (e) => {
                    if (isValidQuery) {
                        context.setUserMessage(null);
                        onSubmit(context.state.chatQuery)
                    }
                    else {
                        context.setUserMessage('Please enter a valid question.')
                    }
                }}

                className={props.classes.sendButton}>
                    <SendIcon />
                </IconButton>

            </Paper>
        </div>
    );
}

export default withStyles(styles)(ChatInput);