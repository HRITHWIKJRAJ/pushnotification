import React from "react";
import "./App.css";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";

function App() {
  // const express = require("express");
  // const bodyParser = require("body-parser");
  // const AWS = require("aws-sdk");

  // AWS.config.update({
  //   region: "ap-south-1", // e.g., 'us-east-1'
  // });

  // const sns = new AWS.SNS();
  // const app = express();
  // app.use(bodyParser.json());

  // app.post(
  //   "/subscribe",
  //   async (
  //     req: { body: { endpoint: any; topicArn: any } },
  //     res: { sendStatus: (arg0: number) => void }
  //   ) => {
  //     const { endpoint, topicArn } = req.body;

  //     const params = {
  //       Protocol: "https", // Replace with the appropriate protocol for your PWA
  //       TopicArn: topicArn,
  //       Endpoint: endpoint,
  //     };

  //     try {
  //       const response = await sns.subscribe(params).promise();
  //       console.log("Subscription ARN:", response.SubscriptionArn);
  //       res.sendStatus(200);
  //     } catch (error) {
  //       console.error("Error subscribing to SNS topic:", error);
  //       res.sendStatus(500);
  //     }
  //   }
  // );

  // const port = process.env.PORT || 3001;
  // app.listen(port, () => {
  //   console.log(`Server listening on port ${port}`);
  // });

  const buttonClick = () => {
    addNotification({
      title: "Warning",
      subtitle: "This is a subtitle",
      message: "This is a very long message",
      theme: "darkblue",
      // native: true, // when using native, your OS will handle theming.
    });
  };

  return (
    <div className="App">
      <button onClick={buttonClick}>send notification</button>
      <Notifications />
    </div>
  );
}

export default App;
