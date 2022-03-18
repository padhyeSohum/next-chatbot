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

const ChatComponent = ({onClose, ...props}) => {

    const context = React.useContext(AppContext);

    if (context === null) {
        return;
    }

    return (
        <div className={styles.chatComponent}>
            <Paper elevation = "7">
                <Header onClose={onClose}/>
                <HistoryList history={context.state.chatHistory}/>
                <ChatInput onSubmit=
                {
                    async (e) => {

                        context.setChatHistory((chatHistory) => (
                            [...chatHistory, {time: Date.now(), content: e, party: 'user'}]
                        ))

                        context.setChatQuery('');
                        
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

                                context.setChatHistory((chatHistory) => (
                                    [...chatHistory, {time: Date.now(), content: botReply, party: 'bot'}]
                                ))                                
                            }
                        )
                    }
                }/>
            </Paper>
        </div>
    );
}

// const handleInput = (userInput) => {

//     axios.post(window.origin + "/api/askbot",
//             {
//                 question: userInput
//             }).then((response) => {
//                 let botReply = "sorry, I don't know about this."
//                 let showDialogue;

//                 if (response.data != "") {
//                     showDialogue = false;
//                     botReply = response.data
//                 }

//                 else {
//                     showDialogue = true;
//                 }

//                 this.setState({
//                     currentUserInput: '',
//                     questionAsked: this.state.currentUserInput,
//                     history: [...this.state.history, {
//                         party: 'bot',
//                         time: Date.now(),
//                         content: botReply
//                     }],
//                     showUserDialogue: showDialogue
//                 })
//             })
//         event.preventDefault();
//     intentsRepo.getData(userInput);
//     // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// }




/*
1. Add fuzzy matching w/ mongoDB
2. Integrate and test submit-answer
3. polish UI
4. Publish to vercel
*/

export default ChatComponent;