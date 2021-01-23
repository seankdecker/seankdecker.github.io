/** user-tracking.js
 *
 * Used to save user statisitics, because that's what
 * all real websites do
 *
 */

function getUserIP(onNewIP) {
  let myPeerConnection = 
    window.RTCPeerConnection || 
    window.mozRTCPeerConnection || 
    window.webkitRTCPeerConnection;
  let pc = new myPeerConnection({
    iceServers: []
  });
  const noop = () => {};
  const ipRegex = 
    /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  let localIPs = {};
  let key;
  
  function iterateIP(ip) {
    if (!localIPs[ip])
      onNewIP(ip);
    localIPs[ip] = true;
  }

  //create a bogus data channel
  pc.createDataChannel("");

  // create offer and set local description
  pc.createOffer((sdp) => {
    sdp.sdp.split('\n').forEach((line) => {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });

    pc.setLocalDescription(sdp, noop, noop);
  }, noop);

  // listen for candidate events
  pc.onicecandidate = (ice) => {
    if (
      !ice || 
      !ice.candidate || 
      !ice.candidate.candidate || 
      !ice.candidate.candidate.match(ipRegex)
    ) 
      return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}


getUserIP((ip) => {
  console.log(
    'Got your IP ! : '+ip +' | verify in http://www.whatismypublicip.com/'
  );
});




