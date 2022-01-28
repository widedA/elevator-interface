function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}

exports.handler = function (context, event, callback) {
  const toNumberOrClientName = event.To;
  const callerId = context.TWILIO_CALLER_ID;
  let twiml = new Twilio.twiml.VoiceResponse();
  // If the request to the /voice endpoint is TO your Twilio Number, 
  // then it is an incoming call towards your Twilio.Device.
  if (toNumberOrClientName == callerId) {
    let dial = twiml.dial();
    // This will connect the caller with your Twilio.Device/client 
    dial.client('elevator');

  } else if (event.To) {
    // This is an outgoing call

    // set the callerId
    let dial = twiml.dial({ callerId });

    // Check if the 'To' parameter is a Phone Number or Client Name
    // in order to use the appropriate TwiML noun 
    const attr = isAValidPhoneNumber(toNumberOrClientName)
      ? "number"
      : "client";
    dial[attr]({}, toNumberOrClientName);
  } else {
    twiml.say("Thanks for calling!");
  }

  callback(null, twiml);

};