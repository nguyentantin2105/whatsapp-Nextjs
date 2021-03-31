import { Avatar, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useState } from 'react';
import firebase from 'firebase';

function ChatScreen({chat, messages}) {

    const [user] = useAuthState(auth);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));
    const [input, setInput] = useState("");

    const showMessages = () =>{
         if (messagesSnapshot){
             return messagesSnapshot.docs.map(message => (
                 <Message 
                        key={message.id} 
                        user={message.data().user} 
                        message={{
                            ...message.data(),
                            timestamp: message.data().timestamp?.toDate().getTime()
                        }} />
             ));
         } else{
             return JSON.parse(messages).map(message=>{
                <Message 
                key={message.id} 
                user={message.user} 
                message={message} />
             })
         }
    }

    const sendMessage = (e) =>{
        e.preventDefault();

        //update the last seen
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),  
        },{merge: true});

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
    };

    return (
        <Container>
            <Header>
                <Avatar />

                <HeaderInf>
                    <h3>Recipient Email</h3>
                    <p>Last seen</p>
                </HeaderInf>

                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessages />
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon />
                <Input value={input} onChange={e => setInput(e.target.value)}/>
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <MicIcon />
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    width: 70vw;
    overflow-y: scroll;

    ::-webkit--scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInf = styled.div`
    margin-left: 15px;
    flex: 1;

    >h3{
        margin-bottom: 3px;
    }

    >p{
        font-size: 14px;
        color: gray;
        margin-top: 10px;
    }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding:30px;
    background-color: #e5ded8;
    min-height: 90vh;

`; 

const EndOfMessages = styled.div``;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`;