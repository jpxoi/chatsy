# Chatsy

## Table of Contents

* Video Demo
* Description

### Video Demo: <https://youtube.com>

### Description

Chatsy is a web-based chat application built using the Flask framework and Flask-SocketIO library. It enables real-time communication between multiple clients in a chat room environment. The application allows users to create new chat rooms or join existing ones, exchange messages with other participants, and stay engaged in dynamic conversations.

#### Requirements

* Python 3.6 or above
* Flask
* Flask-SocketIO
* eventlet (required by Flask-SocketIO for WebSocket support)

You can install the required packages using pip:

```zsh
pip install flask flask-socketio eventlet
```

### Installation

1. Clone the repository from GitHub:

    ```zsh
    git clone https://github.com/exampleuser/flask-chat-app.git
    ```

2. Navigate to the project directory:

    ```zsh
    cd flask-chat-app
    ```

3. Install the required dependencies using pip:

    ```zsh
    pip install flask flask-socketio eventlet
    ```

#### Usage

To test this application, you must start the Flask development server:

```zsh
python app.py
```

Then, open your browser and navigate to <http://localhost:5000> to open the application.

### Features

#### Home Page

The home page allows users to enter their name and choose whether they want to create a new chat room or join an existing one.

* If the user chooses to create a new chat room, a unique 4-character code is generated, and the user is redirected to the chat room page with the newly created room.
* If the user chooses to join an existing chat room, they need to enter the 4-character room code. If the code is valid, the user is redirected to the chat room page with the specified room.
* If the user doesn't enter a name or a room code when required, an error message is displayed.

#### Chat Room Page

The chat room page displays the chat room's code and the list of messages exchanged in the room.

* If the user tries to access the chat room page without a valid room code or name, they are redirected to the home page.
* The user can send messages to the chat room by typing in the message input box and pressing Enter or clicking the Send button.
* The user's messages and other participants' messages are displayed in the chat room.
* When a user enters the chat room, a message is sent to notify other participants. Likewise, when a user leaves the chat room, a message is sent to notify other participants.

### Code Structure

The Flask Chat Application consists of the following main files:

* `app.py`: This file contains the Flask application code, including the routes, socket events, and server setup.
* `templates/base.html`: This template file defines the base HTML structure for all pages.
* `templates/home.html`: This template file defines the HTML structure for the home page.
* `templates/room.html`: This template file defines the HTML structure for the chat room page.
* `static/css/style.css`: This stylesheet file defines the CSS styles for the application.
* `static/script/main.js`: This script file defines the JavaScript code for the application.

The application uses Flask-SocketIO to enable real-time communication between the server and the client.

#### App.py File

Let's go through each function and understand its purpose in the provided code:

1. `generate_unique_code(length)`: This function generates a unique room code of the specified length. It repeatedly generates random uppercase letters until it finds a code that is not already in the rooms dictionary. It returns the generated code.

2. `home()`: This function serves as the view for the home page ("/"). It handles both GET and POST requests. On a GET request, it renders the "home.html" template. On a POST request, it retrieves the submitted form data (name, code, join, create), validates the input, generates a unique room code if "create" is selected, and stores the room and name in the session. Finally, it redirects the user to the "room" page.

3. `room()`: This function serves as the view for the room page ("/room"). It retrieves the room and name from the session and checks if they exist and are valid. If not, it redirects the user to the home page. If valid, it renders the "room.html" template, passing the room code and the list of messages for that room.

4. `message(data)`: This function is an event handler for the "message" event received through the WebSocket connection. It retrieves the room from the session, checks if the room exists, creates a content dictionary with the sender's name and the message, sends the content to all members of the room, appends the content to the room's message list, and prints the message in the console.

5. `connect(auth)`: This function is an event handler for the "connect" event received through the WebSocket connection. It retrieves the room and name from the session and checks if they exist. If not, it leaves the current room and returns. If valid, it joins the user to the room, sends a notification message to all members, increments the member count for the room, and prints a join message in the console.

6. `disconnect()`: This function is an event handler for the "disconnect" event received through the WebSocket connection. It retrieves the room and name from the session. If the room exists, it decrements the member count for the room and removes the room if there are no members left. It sends a notification message to all members and prints a leave message in the console.

7. `if __name__ == "__main__":`: This conditional statement checks if the script is being run directly (not imported as a module). If it is the main script, it runs the Flask application with the SocketIO server in debug mode.

These functions collectively define a Flask application with Flask-SocketIO integration. The application provides a home page where users can join or create chat rooms. Once in a room, users can exchange messages in real-time through WebSocket communication. The `rooms` dictionary stores the information about each active room, including the members and their messages.

#### Main.js File

For the `main.js` file, let's go through each function and understand its purpose:

`var socketio = io()`: This line initializes the SocketIO client and assigns it to the socketio variable. It establishes a WebSocket connection with the server to enable real-time communication.

`const messages = document.getElementById("messages")`: This line selects the HTML element with the "messages" ID and assigns it to the messages constant. It represents the container where chat messages will be displayed.

`const input = document.getElementById("message")`: This line selects the HTML input element with the "message" ID and assigns it to the input constant. It represents the input field where users can type their messages.

`const sendBtn = document.getElementById("send-btn")`: This line selects the HTML element with the "send-btn" ID and assigns it to the sendBtn constant. It represents the button that users can click to send a message.

`const createMessage = (name, msg) => { ... }`: This function takes the name and message as arguments and creates an HTML content string representing a chat message. It appends the content to the messages container, effectively displaying the message in the chat interface. The message includes the sender's name, the message text, and the current timestamp.

`socketio.on("message", (data) => { ... })`: This event listener listens for the "message" event received from the server via the WebSocket connection. When a message event is received, it invokes the createMessage function to display the received message in the chat interface.

`const sendMessage = () => { ... }`: This function is invoked when the user clicks the send button. It retrieves the message from the input field, emits a "message" event to the server via the WebSocket connection, and clears the input field. This sends the user's message to the server for broadcasting to other connected clients.

`input.addEventListener("keypress", function(event) { ... })`: This event listener listens for the "keypress" event on the input field. When the Enter key is pressed, it prevents the default behavior (submitting the form) and triggers a click event on the send button (sendBtn.click()), effectively invoking the sendMessage function.

`sendBtn.addEventListener("click", sendMessage)`: This event listener listens for the "click" event on the send button. When clicked, it invokes the sendMessage function to send the user's message.

These functions collectively handle the client-side functionality of the chat room interface. They interact with the DOM to display messages, listen for user input, send messages to the server, and update the chat interface in real-time.

### Customization

You can customize the application according to your needs:

* Modify the HTML templates (`base.html`, `home.html` and `room.html`) to change the look and feel of the application.
* Adjust the length of the room codes by modifying the generate_unique_code function in `app.py`.
* Add additional functionality to the chat room, such as user authentication, message timestamps, or message persistence.

### Deployment

To deploy the Flask Chat Application to a production environment, you can follow standard Flask deployment practices, such as using WSGI servers like Gunicorn or serving the application behind a reverse proxy like Nginx.

Make sure to update the Flask `SECRET_KEY` in the `app.py` file with a strong secret key when deploying the application in a production environment.

### Conclusion

This Flask Chat Application provides a basic foundation for building a real-time chat room using Flask and Flask-SocketIO. It can be extended and customized to fit your specific requirements. Feel free to explore and enhance the application based on your needs.
