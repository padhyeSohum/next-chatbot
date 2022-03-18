import React from 'react';
import { IconButton } from '@mui/material';
import MinimizeIcon from '@mui/icons-material/Minimize';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './chat-component.module.css';

interface HeaderProps{ onClose?: () => void };

const Header = ({onClose, ...props}: HeaderProps) => {
    return (
        <div className={styles.chatHeader}>
            <div>
                <h4 className = {styles.chatBotTitle}>Meet the Chat Bot</h4>
            </div>
            <div>
                <IconButton sx={{marginRight: 2}} onClick={ (e) => onChatClose(e, onClose)}>
                    <RemoveIcon />
                </IconButton>
            </div>
        </div>
    );
}

const onChatClose = (e, onClose) => {
    onClose();
}

export default Header;