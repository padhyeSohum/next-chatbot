import React, { useContext } from 'react';
import AppContext from './appcontext';
import { Button } from '@mui/material';
import styles from './chat-component.module.css';

const UserDialogue = (props) => {

    const context = useContext(AppContext);

    if (context === null) {
        return;
    }
    
    const handleYes = () => {
        context.setUserUpdate(true);
        context.setQuestionNotInDb(false);
    }

    const handleNo = () => {
        context.setUserUpdate(false);
        context.setQuestionNotInDb(false);
    }

    return (
        <div className={styles.userDialogue}>
            <div>{props.message}</div>
            <div className={styles.userDialogueButtons}>
                <Button onClick = {handleYes} variant="contained" color="primary">
                    Yes
                </Button>
                <Button onClick = {handleNo} variant="contained" color="secondary">
                    No
                </Button>
            </div>
        </div>
    );
}

export default UserDialogue;