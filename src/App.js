import React, { useState, useEffect } from 'react'
import { Device } from '@twilio/voice-sdk';

import { OUTBOUND_NUMBER } from './constants';
import styles from './styles'
import NotificationIcon from './notificationIcon'

function App() {

  const [token, setToken] = useState('')
  const [device, setDevice] = useState('')

  useEffect(() => {
    fetch('https://twilio-voice-javascript-sdk-quickstart-node-3436-dev.twil.io/token')
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token)
      })
  },[])

  useEffect(() =>{
    if(token) {
      initDevice()
    }
  }, [token])

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

  const callEmergency = async () => {
    const params = { To: OUTBOUND_NUMBER}
    if (device) {
      console.log(`Attempting to call ${params.To} ...`);

      const call = await device.connect({ params });

      /*  Uncomment & adapt listneres to the UI
          call.on('accept', () => console.log('call accepted'));
          call.on('disconnect', () => console.log('call disconnected'));
          call.on('cancel', () => console.log('call canceled'));
          call.on('reject', () => console.log('call rejected'));
      */
    } else {
      console.log('Unable to make call.');
    }
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.screen}>
        <div style={styles.floor}>
          <div style={styles.floorNumber}/>
          <div style={styles.arrowUp}></div>
        </div>
        <label style={styles.alertMsg}>Hello! An error has occured our agent will answer shortly</label>
      </div>
      <div style={styles.content}>
        <button  onClick={() => console.log("floor 1")} style={styles.button}><label style={styles.text}>1</label></button>
        <button  onClick={() => console.log("floor 1")} style={styles.button}><label style={styles.text}>2</label></button>
      </div>
      <div style={styles.content}>
        <button  onClick={() => console.log("floor 1")} style={styles.button}><label style={styles.text}>3</label></button>
        <button  onClick={() => console.log("floor 1")} style={styles.button}><label style={styles.text}>4</label></button>
      </div>
      <div style={styles.content}>
        <button  onClick={() => console.log("floor 1")} style={styles.button}><label style={styles.text}>5</label></button>
        <button  onClick={() => console.log("floor 1")} style={styles.button}><label style={styles.text}>6</label></button>
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