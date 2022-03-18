import Head from 'next/head'
import Image from 'next/image'
import ChatInput from '../src/chat-input';
import Header from '../src/header';
import ChatButton from '../src/chat-button';
import ChatComponent from '../src/chat-component';
import React, { useContext } from 'react';
import AppContext from '../src/appcontext';

import styles from '@/pages/index.module.css'

export default function Home() {

    const context = useContext(AppContext);

    if (context === null) {
        return;
    }

    return (
        <div className={styles.container}>
        <Head>
            <title>Next Chatbot</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            
            {!context.state.chatStarted && <ChatButton onSubmit={() => context.setChatStarted(true)}/>}

            {context.state.chatStarted && <ChatComponent onClose={() => context.setChatStarted(false)}/>}

            <h1>TEST SITE</h1>
            <br/><br/><br/><br/><br/>
            <h1>Background main page</h1>
            <br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            <h1>Background main page</h1>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1>Background main page</h1>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1>Background main page</h1>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </main>

        <footer className={styles.footer}>
        </footer>
        </div>
    )
}