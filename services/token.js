exports.handler = function (context, event, callback) {
  
  IDENTITY = 'elevator';

  const {
    TWILIO_TWIML_APP_SID,
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    TWILIO_CHAT_SERVICE_SID,
  } = context;

  const { AccessToken } = Twilio.jwt;
  const { VoiceGrant, ChatGrant, VideoGrant } = AccessToken;
  const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET);
  
  accessToken.identity = IDENTITY;

  // Adding voice grant
  const grant = new VoiceGrant({
    outgoingApplicationSid: TWILIO_TWIML_APP_SID,
    incomingAllow: true,
  });
  accessToken.addGrant(grant);

  // Adding chat grant
  const chatGrant = new ChatGrant({
    serviceSid: TWILIO_CHAT_SERVICE_SID
  });
  accessToken.addGrant(chatGrant);
  
  // Adding voice grant
  const videoGrant = new VideoGrant({
    room: 'elevator room',
  });
  accessToken.addGrant(videoGrant);


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
