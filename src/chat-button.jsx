import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { withStyles } from '@mui/styles';

// const styles = {
//     chatButton: {
//         position: "fixed",
//         bottom: 20,
//         right: 20
//     }
// }

const ChatButton = ({onSubmit, ...props}) => {
    return (
        <div className="chatButton">
            <IconButton color='primary' onClick={onSubmit}>
                <ChatIcon style={{width: 50, height: 50}}/>
            </IconButton>
        </div>
    )
}

// export default withStyles(styles)(ChatButton);
export default ChatButton;