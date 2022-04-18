import React, { useContext } from 'react';
import AppContext from './appcontext';
import { Button } from '@Mui/material';

const UserDialogue = () => {

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
        <>
            <Button onClick = {handleYes} variant="contained" color="primary">
                Yes
            </Button>
            <Button onClick = {handleNo} variant="contained" color="secondary">
                No
            </Button>
        </>
    );
}

export default UserDialogue;