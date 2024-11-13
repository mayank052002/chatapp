document.getElementById("send-button").addEventListener("click", sendMessage)

function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();

    if (userMessage) {
        // Append user message
        appendMessage(userMessage, "user-message");

        // Clear input
        userInput.value = "";

        // Send user message to Django backend
        fetch("/bot/response/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add CSRF token here if CSRF is enabled in your Django app
                },
                body: JSON.stringify({ message: userMessage })
            })
            .then(response => response.json())
        console.log(bot.response)
            .then(data => {
                // Append bot response from Django
                appendMessage(data.response, "bot-message");
            })
            .catch(error => {
                console.error("Error:", error);
                appendMessage("Error: Could not connect to server.", "bot-message");
            });
    }
}


function appendMessage(message, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}