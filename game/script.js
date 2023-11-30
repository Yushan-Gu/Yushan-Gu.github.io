// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRHV8hRE-TWDWdd3sTQiG-njGlgas3M6Y",
  authDomain: "gameproj33.firebaseapp.com",
  databaseURL: "https://gameproj33-default-rtdb.firebaseio.com",
  projectId: "gameproj33",
  storageBucket: "gameproj33.appspot.com",
  messagingSenderId: "1096621210353",
  appId: "1:1096621210353:web:c7517435d2747da6134750"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref('messages');

document.getElementById('messageForm').addEventListener('submit', sendMessage);

function sendMessage(event) {
    event.preventDefault();

    const senderName = document.getElementById('senderName').value;
    const message = document.getElementById('message').value;

    db.push().set({
        sender: senderName,
        text: message
    });

    document.getElementById('messageForm').reset();
}

// Display messages in real-time
db.on('child_added', function(snapshot) {
    const message = snapshot.val();
    displayMessage(message.sender, message.text);
});

function displayMessage(sender, text) {
    const messageDisplay = document.getElementById('messages');
    const messageElement = document.createElement('p');
    messageElement.innerText = sender + ": " + text;
    messageDisplay.appendChild(messageElement);
}
