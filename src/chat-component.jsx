import React, { useContext, useState } from 'react';
import { Paper, Snackbar } from '@mui/material';
import ChatInput from './chat-input';
import HistoryList from './history-list';
import axios from 'axios';
import styles from './chat-component.module.css';
import Header from './header';
import AppContext from './appcontext';
import { v4 as uuidv4 } from 'uuid';
import UserDialogue from './user-dialogue';
import SubmitAnswer from './submit-answer';

const ChatComponent = ({onClose, ...props}) => {

    const [ongoingQuery, setOngoingQuery] = useState('');

    const context = useContext(AppContext);

    if (context === null) {
        return;
    }

    return (
        <div className={styles.chatComponent}>
            <Paper elevation = {7} sx={{borderRadius: '10px'}}>
                <Header onClose={onClose}/>
                <HistoryList history={context.state.chatHistory}/>
                {context.state.questionNotInDb && <UserDialogue message="Do you want to submit an answer?"/>}
                {context.state.userUpdate && <SubmitAnswer ongoingQuery={ongoingQuery}/>}
                {!context.state.userUpdate && 
                <ChatInput onSubmit=
                {
                    async (e) => {

                        const newChatHistory = context.state.chatHistory.slice();
                        const newItemID = uuidv4();

                        newChatHistory.unshift({itemID: newItemID, chatTime: Date.now(), userIntent: e, botReply: null})

                        context.setChatHistory(newChatHistory);
                        setOngoingQuery(e);
                        context.setChatQuery('');

                        context.setServerQueryInProgress(true);
                        
                        await axios.post(window.origin + "/api/askbot",
                            {
                                question: e
                            }).then((response) => {
                                let botReply = "Sorry, I don't know about this."

                                if (response.data != "") {
                                    context.setQuestionNotInDb(false)
                                    botReply = response.data
                                }

                                else {
                                    context.setQuestionNotInDb(true);
                                }

                                const currentItem = newChatHistory.find(c => c.itemID === newItemID)
                                
                                currentItem.botReply = botReply;

                                context.setChatHistory([...newChatHistory]);
                            }
                        ).finally(() => {
                            context.setServerQueryInProgress(false);
                        })
                    }
                    
                }/>}
            </Paper>
            <Snackbar
                open={context.state.userMessage != null}
                autoHideDuration={2000}
                onClose={() => {context.setUserMessage(null)}}
                message={context.state.userMessage}
            />

        </div>
    );
}

/*
1. Add fuzzy matching w/ mongoDB
2. Integrate and test submit-answer
3. polish UI
4. Publish to vercel
*/

export default ChatComponent;