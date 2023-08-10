import React from "react";
import "./App.css";

function App() {


  function request(){
    console.log(process.env.SERVER_KEY);
    

    Notification.requestPermission((status) =>{
      console.log("permission status: ",status)
      console.log(process.env.REACT_APP_ACCESS_KEY , process.env.REACT_APP_ACCESS_SECRET);

    });    
    subscribeNotification();
  }

  async function subscribeNotification() {
    let sw = await navigator.serviceWorker.ready;

    let push = await sw.pushManager.subscribe({
      userVisibleOnly:true,
      applicationServerKey: process.env.SERVER_KEY
    });
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
      </div>
      <div className="App">
        <button onClick={request}>Subscribe</button>
      </div>
    </div>
  );
}

export default App;
