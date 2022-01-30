import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatInput from './chat-input';
import HistoryList from './history-list';
import axios from 'axios';

const ChatComponent = ({onClose, ...props}) => {

    const [chatHistory, setChatHistory] = useState([]);

    return (
        <div className="chatComponent">
            <Paper>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <HistoryList history={chatHistory}/>
                <ChatInput onSubmit=
                {
                    async (e) => {

                        setChatHistory([...chatHistory, {time: Date.now(), content: e, party: 'user'}])
                        
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

                                

                                setChatHistory([...chatHistory, {time: Date.now(), content: botReply, party: 'bot'}])
                                console.log(chatHistory);
                        })
                    }
                }/>
            </Paper>
        </div>
    );
}

const handleInput = (userInput) => {

    axios.post(window.origin + "/api/askbot2",
            {
                question: userInput
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

                this.setState({
                    currentUserInput: '',
                    questionAsked: this.state.currentUserInput,
                    history: [...this.state.history, {
                        party: 'bot',
                        time: Date.now(),
                        content: botReply
                    }],
                    showUserDialogue: showDialogue
                })
            })
        event.preventDefault();
    intentsRepo.getData(userInput);
    // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
}




/*
1. connect to mongoDB
2. chatHistory styling
*/

export default ChatComponent;