exports.handler = function (context, event, callback) {
  
    IDENTITY = event.identity || 'elevator';
  
    const {
      TWILIO_TWIML_APP_SID,
      TWILIO_ACCOUNT_SID,
      TWILIO_API_KEY,
      TWILIO_API_SECRET,
      TWILIO_CHAT_SERVICE_SID,
    } = context;
  
    const { AccessToken } = Twilio.jwt;
    const { VoiceGrant, ChatGrant, SyncGrant } = AccessToken;
    const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET);
    
    accessToken.identity = IDENTITY;
  
    const grant = new VoiceGrant({
      outgoingApplicationSid: TWILIO_TWIML_APP_SID,
      incomingAllow: true,
    });
  
    accessToken.addGrant(grant);
  
    if (TWILIO_CHAT_SERVICE_SID) {
      const chatGrant = new ChatGrant({
        serviceSid: TWILIO_CHAT_SERVICE_SID
      });
      accessToken.addGrant(chatGrant);
    }
  
    const response = new Twilio.Response();
  
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    response.appendHeader('Content-Type', 'application/json');
    response.setBody({
      identity: IDENTITY,
      token: accessToken.toJwt(),
    });
    
    callback(null, response);
  };
  