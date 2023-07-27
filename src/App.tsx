import React from 'react';
import './App.css';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';



function App() {

  const buttonClick = () => {
    addNotification({
        title: 'Warning',
        subtitle: 'This is a subtitle',
        message: 'This is a very long message',
        theme: 'darkblue',
        native: true // when using native, your OS will handle theming.
    });
};

  return (
    <div className="App">
      <button onClick={buttonClick}>
        send notification
      </button>
      <Notifications />
    </div>
  );
}

export default App;
