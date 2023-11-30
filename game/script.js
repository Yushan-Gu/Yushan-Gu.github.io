// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
