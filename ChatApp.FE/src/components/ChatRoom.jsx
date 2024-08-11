import React from 'react';
import {Col, Row} from "react-bootstrap";
import MessageContainer from "./MessageContainer.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

const ChatRoom = ({messages, sendMessage}) => {
    return (
        <div>
            <Row className={'px-5 py-5'}>
                <Col sm={10}>
                    <h2>Chat room</h2>
                </Col>
                <Col>                  
                </Col>
            </Row>
            <Row className={'px-5 py-5'}>
                <Col sm={12}>
                    <MessageContainer messages={messages}></MessageContainer>
                </Col>
                <Col sm={12}>
                    <SendMessageForm sendMessage={sendMessage}></SendMessageForm>
                </Col>
            </Row>
        </div>
    );
};

export default ChatRoom;