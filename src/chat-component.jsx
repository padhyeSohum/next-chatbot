import React, { useContext } from 'react';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatInput from './chat-input';
import HistoryList from './history-list';
import axios from 'axios';
import styles from './chat-component.module.css';
import Header from './header';
import AppContext from './appcontext';
import { v4 as uuidv4 } from 'uuid';

const ChatComponent = ({onClose, ...props}) => {

    const context = React.useContext(AppContext);

    if (context === null) {
        return;
    }

    return (
        <div className={styles.chatComponent}>
            <Paper elevation = {7}>
                <Header onClose={onClose}/>
                <HistoryList history={context.state.chatHistory}/>
                <ChatInput onSubmit=
                {
                    async (e) => {

                        const newChatHistory = context.state.chatHistory.slice();
                        const newItemID = uuidv4();

                        newChatHistory.push({itemID: newItemID, chatTime: Date.now(), userIntent: e, botReply: null})

                        context.setChatHistory(newChatHistory);
                        context.setChatQuery('');

                        context.setServerQueryInProgress(true);
                        
                        await axios.post(window.origin + "/api/askbot",
                            {
                                question: e
                            }).then((response) => {
                                let botReply = "sorry, I don't know about this."
                                let showDialogue;

                                if (response.data != "") {
                                    showDialogue = false;
                                    botReply = response.data
                                }

                                else {
                                    showDialogue = true;
                                }

                                const currentItem = newChatHistory.find(c => c.itemID === newItemID)
                                
                                currentItem.botReply = botReply;

                                context.setChatHistory([...newChatHistory]);
                            }
                        ).finally(() => {
                            context.setServerQueryInProgress(false);
                        })
                    }
                }/>
            </Paper>
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