import { useState } from 'react'
import './App.css'
import {Container, Row, Col} from "react-bootstrap";
import WaitingRoom from "./components/WaitingRoom.jsx";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import ChatRoom from "./components/ChatRoom.jsx";

function App() {
    const [connection, setConnection] = useState()
    const [messages, setMessage] = useState([])
    const joinChatRoom = async (username, chatroom) => {
        try {
            // Initiate a connection
            const conn = new HubConnectionBuilder().withUrl("http://localhost:5281/chat")
                .configureLogging(LogLevel.Information)
                .build();
            
            // set up handler
            conn.on("ReceiveMessage", (username, msg) => {
                console.log("msg ", msg);
            })

            conn.on("ReceiveSpecificMessage", (username, msg) => {
                setMessage((messages) => [...messages, {username, msg}])
            })
            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", {username, chatroom});            
           
            setConnection(conn);
        } 
        catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message) => {
        try {
            if (connection) {
                await connection.invoke("SendMessage", message);
            } else {
                console.error("Connection not established. Unable to send message.");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
    <>    
         <main>
             <Container>
                 <Row className='px-5 py-5'>
                     <Col sm='12'>
                         <h1 className='fw-light text-center'>Welcome to the Chat App</h1>
                     </Col>
                 </Row>
                 {!connection 
                     ? <WaitingRoom joinChatroom={joinChatRoom}></WaitingRoom>
                     : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
                 }
             </Container>
         </main>
    </>
  )
}

export default App
