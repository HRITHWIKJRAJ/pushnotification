import React from "react";
import "./App.css";
import AWS from 'aws-sdk';

function App() {

  let creds = {
    accessKey : process.env.REACT_APP_ACCESS_KEY ? process.env.REACT_APP_ACCESS_KEY : "",
    accessSecret : process.env.REACT_APP_ACCESS_SECRET ? process.env.REACT_APP_ACCESS_SECRET : ""
  }
  
  let endpoint = "";

  AWS.config.update({
    region: 'ap-south-1', // Replace with your AWS region (e.g., 'us-east-1')
    credentials: new AWS.Credentials(creds.accessKey, creds.accessSecret) // Replace with your AWS credentials
  });


  function request(){

    Notification.requestPermission((status) =>{
      console.log("permission status: ",status)

    });    
    subscribeNotification();
  }

  async function subscribeNotification() {
    let sw = await navigator.serviceWorker.ready;

    let push = await sw.pushManager.subscribe({
      userVisibleOnly:true,
      applicationServerKey: urlB64ToUint8Array(process.env.REACT_APP_SERVER_KEY?process.env.REACT_APP_SERVER_KEY:"")
    });
    endpoint = push.endpoint;
    console.log(JSON.stringify(push));
  }
    

  function displayNotification(){
    const options = {
      body:'notification  body',
      vibrate:[100,50,100]
    }
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then( reg => {
        reg?.showNotification('Hello World',options);
      }); 
    }
  }

  function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    console.log("output : ", outputArray);
    
    return outputArray;
  }


  const buttonClick = () => {
    
    displayNotification();
    // console.log(process.env.REACT_APP_ACCESS_KEY , process.env.REACT_APP_ACCESS_SECRET);
    // addNotification({
    //   title: "Warning",
    //   subtitle: "This is a subtitle",
    //   message: "This is a very long message",
    //   theme: "darkblue",
    //   native: true, // when using native, your OS will handle theming.
    // });
  };

  const subscribeSns = () => {
    var params = {
      Protocol: 'HTTPS', /* required */
      TopicArn: 'arn:aws:sns:ap-south-1:363892094207:testTopic', /* required */
      Endpoint: endpoint
    };
    var subscribePromise = new AWS.SNS().subscribe(params).promise();

    // Handle promise's fulfilled/rejected states
    subscribePromise.then(
      function(data) {
        console.log("Subscription ARN is " + data.SubscriptionArn);
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });    
  };

  return (
    <div>
      <div className="App">
        <button onClick={buttonClick}>send notification</button>
      </div>
      <div className="App">
        <button onClick={request}>Subscribe</button>
      </div>
      <div className="App">
        <button onClick={subscribeSns}>subscribe to sns</button>
      </div>
    </div>
  );
}

export default App;
