// Ganti dengan API Key OpenAI Anda
const API_KEY = "YOUR_API_KEY";  // Ganti dengan API Key Anda

const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// Fungsi untuk mengirim pesan ke OpenAI API
async function sendMessageToChatGPT(message) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${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}`,  // Gunakan API Key Anda di sini
      },
      body: JSON.stringify({
        model: "gpt-3.5",  // Model yang digunakan, bisa juga ganti ke gpt-3.5
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from OpenAI API");
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error sending message to OpenAI:", error);
    return "Maaf, terjadi kesalahan. Coba lagi nanti.";
  }
}

// Fungsi untuk menampilkan pesan di layar
function displayMessage(content, sender) {
  const messageElement = document.createElement('p');
  messageElement.classList.add(sender);
  messageElement.textContent = content;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;  // Scroll ke bawah setelah pesan baru
}

// Menangani input pengguna dan mengirimkan ke OpenAI
sendButton.addEventListener('click', async () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    displayMessage(userMessage, 'user');
    userInput.value = '';  // Clear input setelah kirim

    // Kirim pesan ke API OpenAI dan tampilkan respons AI
    const aiResponse = await sendMessageToChatGPT(userMessage);
    displayMessage(aiResponse, 'ai');
  }
});

// Menangani tekan Enter untuk kirim pesan
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
