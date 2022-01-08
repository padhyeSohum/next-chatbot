import React from 'react';
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { withStyles } from '@mui/styles';

const styles = {
    closeButton: {
        '&:hover': {
            color: "red"
        },
        '&:active': {
            color: "red"
        }
    }
}

interface HeaderProps{ onClose?: () => void };

const Header = ({onClose, ...props}: HeaderProps) => {
    return (
        <div>
            <Grid item xs={11}>
                <div>
                    <h2 className = "chat-bot-title">Meet the Chat Bot</h2>
                </div>
            </Grid>
            <Grid item xs={1}>
                <div>
                    <IconButton onClick={ (e) => onChatClose(e, onClose)} className={props.classes.closeButton}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Grid>
        </div>
    );
}

const onChatClose = (e, onClose) => {
    onClose();
}

export default withStyles(styles)(Header);