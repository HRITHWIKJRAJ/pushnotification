import React from "react";
import "./App.css";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";

function App() {


  Notification.requestPermission((status) =>{
    console.log("permission status: ",status)
  });


  function displayNotification(){
    const options = {
      body:'notification body',
      vibrate:[100,50,100]
    }
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then( reg => {
        reg?.showNotification('Hello World',options);
      });
    }
  }


  displayNotification();


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

  return (
    <div>
      <div className="App">
        <button onClick={buttonClick}>send notification</button>
        <Notifications />
      </div>
    </div>
  );
}

export default App;
