var socketio = io()

const messages = document.getElementById("messages")
const input = document.getElementById("message")
const sendBtn = document.getElementById("send-btn")

const createMessage = (name, msg) => {
    const content = `
        <div class="text">
            <span class="message_text">
                <strong>${name}:</strong> ${msg}
            </span>
            <span class="muted">
                ${new Date().toLocaleTimeString()}
            </span>
        </div>
    `

    messages.innerHTML += content;
}

socketio.on("message", (data) => {
    createMessage(data.name, data.message)
})

const sendMessage = () => {
    const message = document.getElementById("message")
    if (message.value == "") return;
    socketio.emit("message", { data: message.value })
    message.value = "";
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendBtn.click();
    }
})

sendBtn.addEventListener("click", sendMessage)