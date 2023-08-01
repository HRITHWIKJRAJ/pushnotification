import React from "react";
import "./App.css";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";

function App() {
  const AWS = require("aws-sdk");

  AWS.config.update({
    region: "ap-south-1", // e.g., 'us-east-1'
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.access_secret,
  });

  const sns = new AWS.SNS();

  const buttonClick = () => {
    console.log(process.env.access_key , process.env.access_secret);
    addNotification({
      title: "Warning",
      subtitle: "This is a subtitle",
      message: "This is a very long message",
      theme: "darkblue",
      native: true, // when using native, your OS will handle theming.
    });
  };
  const subscribe = async () => {
    const params = {
      Protocol: "https", // Replace with the appropriate protocol for your PWA
      TopicArn: "arn:aws:sns:ap-south-1:363892094207:testTopic",
      Endpoint: "https://3.110.208.152",
    };

    try {
      const response = await sns.subscribe(params).promise();
      console.log("Subscription ARN:", response.SubscriptionArn);
      console.log("response", response);
    } catch (error) {
      console.error("Error subscribing to SNS topic:", error);
      console.log("response", error);
    }
  };

  return (
    <div>
      <div className="App">
        <button onClick={buttonClick}>send notification</button>
        <Notifications />
      </div>
      <div className="App">
        <button onClick={subscribe}>subscribe</button>
        <Notifications />
      </div>
    </div>
  );
}

export default App;
