document.getElementById("ai-send").addEventListener("click", sendMessage);
document.getElementById("ai-text").addEventListener("keypress", function(e){
    if(e.key === "Enter") sendMessage();
});

async function sendMessage(){
    let input = document.getElementById("ai-text");
    let text = input.value.trim();
    if(!text) return;

    let messages = document.getElementById("ai-messages");
    messages.innerHTML += "<div class='message-user'>"+text+"</div>";
    input.value = "";

    try {
        let response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message: text})
        });
        let data = await response.json();
        messages.innerHTML += "<div class='message-ai'>"+data.answer+"</div>";
        messages.scrollTop = messages.scrollHeight;
    } catch(e) {
        messages.innerHTML += "<div class='message-ai'>Błąd połączenia z serwerem AI</div>";
    }
}