import React, {useState} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
    const [msg,setMsg] = useState('');
    return <Form onSubmit={e => {
        e.preventDefault();
        sendMessage(msg);
        setMsg('');
        }}> 
        <InputGroup className={'mb-3'}>
            <InputGroup.Text>Chat</InputGroup.Text>
            <FormControl onChange={e => setMsg(e.target.value)} value={msg} placeholder={'Type a message'}></FormControl>
            <Button variant={'primary'} type={'submit'} disabled={!msg}>Send</Button>
        </InputGroup>
    </Form>
};

export default SendMessageForm;