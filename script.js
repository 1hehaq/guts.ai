document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = /** @type {HTMLInputElement} */ (document.getElementById('user-input'));
    const chatMessages = document.getElementById('chat-messages');
    const sendButton = document.getElementById('send-button');

    const loxsInfo = {
        name: "Loxs",
        description: "Multi Vulnerability Scanner for web applications",
        features: [
            "LFI Scanner",
            "SQL Injection Scanner",
            "XSS Scanner",
            "Open Redirect Scanner",
            "Multi-threading for speed",
            "Customizable payloads",
            "HTML report generation"
        ],
        githubUrl: "https://github.com/coffinxp/loxs"
    };

    const loxsKeywords = {
        install: ["install", "setup", "get started"],
        features: ["features", "capabilities", "what can it do"],
        usage: ["use", "run", "operate"],
        output: ["output", "results", "report"],
        update: ["update", "upgrade"],
        customize: ["customize", "configure", "settings"],
        limitations: ["limitations", "drawbacks", "weaknesses"],
        contribute: ["contribute", "help", "improve"]
    };

    function generateResponse(message) {
        const lowercaseMessage = message.toLowerCase();
        
        for (const [category, keywords] of Object.entries(loxsKeywords)) {
            if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
                switch (category) {
                    case "install":
                        return `To install Loxs:\n1. Clone: git clone ${loxsInfo.githubUrl}\n2. Navigate: cd loxs\n3. Install requirements: pip3 install -r requirements.txt\n4. Run: python3 loxs.py`;
                    case "features":
                        return `Loxs features:\n${loxsInfo.features.map(feature => "- " + feature).join("\n")}`;
                    case "usage":
                        return "To use Loxs:\n1. Open terminal in Loxs directory\n2. Run: python3 loxs.py\n3. Choose scan type\n4. Enter target URL\n5. View real-time results";
                    case "output":
                        return "Loxs generates HTML reports in the 'reports' folder after each scan.";
                    case "update":
                        return "To update Loxs, select option 5 from the main menu.";
                    case "customize":
                        return "Customize Loxs by editing config files in the 'config' folder.";
                    case "limitations":
                        return "Loxs is a scanner, not an exploit tool. Manual verification of results is recommended.";
                    case "contribute":
                        return `Contribute to Loxs:\n1. Report issues: ${loxsInfo.githubUrl}/issues\n2. Submit pull requests\n3. Share experiences in GitHub discussions`;
                }
            }
        }
        
        return `I'm not sure about that. You can ask about installing, features, usage, output, updates, customization, limitations, or contributing to Loxs.`;
    }

    const addMessage = (sender, text) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        chatMessages.appendChild(messageElement);
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

        if (sender === 'user') {
            messageElement.textContent = text;
        } else {
            typeWriter(messageElement, text);
        }
    };

    const typeWriter = (element, text, index = 0) => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeWriter(element, text, index + 1), 20 + Math.random() * 10);
        }
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            sendButton.disabled = true;
            setTimeout(() => {
                const response = generateResponse(message);
                addMessage('ai', response);
                sendButton.disabled = false;
            }, 500 + Math.random() * 500);
        }
    });

    userInput.addEventListener('input', () => {
        sendButton.disabled = userInput.value.trim().length === 0;
    });

    addMessage('ai', "Hello! I'm Guts, How can I help you with Loxs? You can ask about installation, features, or how to use Loxs.");
});
