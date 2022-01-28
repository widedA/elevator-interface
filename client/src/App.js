import React, { useState, useEffect } from 'react'
import { Device } from '@twilio/voice-sdk';
import { Client as ConversationsClient } from '@twilio/conversations';
import { connect } from 'twilio-video'
import { OUTBOUND_NUMBER } from './constants';
import styles from './styles'
import NotificationIcon from './notificationIcon'

function App() {

  const [token, setToken] = useState('')
  const [identity, setIdentity] = useState('')
  const [device, setDevice] = useState('')
  const [alertText, setAlertText] = useState('An error has occured!! Please click the Alert button')
  const [conversationClient, setConversationsClient] = useState('') 
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    fetch('https://chat-5758.twil.io/token')
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token)
        setIdentity(data.identity)
      })
  },[])

  useEffect(() =>{
    if(token && identity) {
      initDevice()
      initConversations()
      initVideo()
    }
  }, [token, identity])

  const initDevice = () => {
    const newDevice = new Device(token, {
      logLevel:1,
      answerOnBridge: true,
      codecPreferences: ["opus", "pcmu"],
    })
    /*  Uncomment to add actions when device is registered
        newDevice.on('registered', () => console.log('Twilio.Device Ready to make calls!'));
    */
    newDevice.on('error', (error) => console.log('Twilio.Device Error: ' + error.message));
    newDevice.register()

    setDevice(newDevice)
  }


  const initConversations = () => {
    const newConversationsClient = new ConversationsClient(token)
    newConversationsClient.on('connectionStateChanged', (state) => {})
    newConversationsClient.on('conversationJoined', (conversation) =>
      setConversations([...conversations, conversation])
    );
    newConversationsClient.on('conversationLeft', (thisConversation) =>
      setConversations([...conversations.filter((it) => it !== thisConversation)])
    );
    newConversationsClient.on('messageAdded', (message) => {
      const { author, body} = message
      if (author != identity ) { 
        setAlertText(body) 
      }
    })

    setConversationsClient(newConversationsClient)
  };

  const initVideo = () => {
    connect(token, { name:'elevator', audio: true, video: true }).then(room => {
      room.on('participantConnected', participant => {
        console.log(`A remote Participant connected: ${participant}`);
      });
    }, error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    });
  }

  const callEmergency = async () => {
    const params = { To: OUTBOUND_NUMBER}
    if (device) {
      setAlertText('Calling emergency line')

      const call = await device.connect({ params });
      /*  Uncomment & adapt listneres to the UI
          call.on('accept', () => console.log('call accepted'));
          call.on('disconnect', () => console.log('call disconnected'));
          call.on('cancel', () => console.log('call canceled'));
          call.on('reject', () => console.log('call rejected'));
      */
    } else {
      setAlertText('Unable to make call. Please try again.');
    }
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.screen}>
        <div style={styles.floor}>
          <div style={styles.floorNumber}/>
          <div style={styles.arrowUp}></div>
        </div>
        <div style={styles.alert}>
          <label style={styles.alertMsg}>{alertText}</label>
        </div>
      </div>
      <div style={styles.content}>
        <button  onClick={() => console.log("floor 1")} style={styles.button}><label style={styles.text}>1</label></button>
        <button  onClick={() => console.log("floor 2")} style={styles.button}><label style={styles.text}>2</label></button>
      </div>
      <div style={styles.content}>
        <button  onClick={() => console.log("floor 3")} style={styles.button}><label style={styles.text}>3</label></button>
        <button  onClick={() => console.log("floor 4")} style={styles.button}><label style={styles.text}>4</label></button>
      </div>
      <div style={styles.content}>
        <button  onClick={() => console.log("floor 5")} style={styles.button}><label style={styles.text}>5</label></button>
        <button  onClick={() => console.log("floor 6")} style={styles.button}><label style={styles.text}>6</label></button>
      </div>
      <div style={styles.content}>
        <button  onClick={() => console.log('close')} style={styles.button}>
          <div style={styles.actionButtons}>
            <div style={styles.arrowRight}></div>
            <div style={styles.verticalLign}></div>
            <div style={styles.arrowLeft}></div>
          </div>
        </button>
        <button  onClick={callEmergency} style={styles.button}><NotificationIcon/></button>
        <button  onClick={() => console.log('open')} style={styles.button}>
          <div style={styles.actionButtons}>
            <div style={styles.arrowLeft}></div>
            <div style={styles.verticalLign}></div>
            <div style={styles.arrowRight}></div>
          </div>
        </button>
      </div>
    </div>
      
      
  )
}

export default App