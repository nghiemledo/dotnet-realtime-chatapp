import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

const WaitingRoom = ({ joinChatroom }) => {
    const [username, setUsername] = useState();
    const [chatroom, setChatroom] = useState();
    
    return (
       <Form onSubmit={ e => {
           e.preventDefault();
           joinChatroom(username, chatroom);
       }}>
           <Row className={'px-5 py-5'}>
               <Col sm={12}>
                   <Form.Group>
                       <Form.Control placeholder='Username' className={'mb-3'} onChange={e => setUsername(e.target.value)} />
                       <Form.Control placeholder='Chatroom' onChange={e => setChatroom(e.target.value)} />
                   </Form.Group>
               </Col>
               <Col sm={12}>
                   <hr/>
                   <Button variant={"success"} type={"submit"}> Join </Button>
               </Col>
           </Row>
       </Form>
    );
};

export default WaitingRoom;