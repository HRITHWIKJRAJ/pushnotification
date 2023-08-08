import React from "react";
import "./App.css";

function App() {


  function request(){

    Notification.requestPermission((status) =>{
      console.log("permission status: ",status)
    });
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
        <button onClick={buttonClick}>Request Permission</button>
      </div>
      <div className="App">
        <button onClick={request}>send notification</button>
      </div>
    </div>
  );
}

export default App;
