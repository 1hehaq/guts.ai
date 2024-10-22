document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = (document.getElementById('user-input'));
    const chatMessages = document.getElementById('chat-messages');
    const mangaPanel = document.getElementById('manga-panel');
    const moodIndicator = document.getElementById('current-mood');
    const sendButton = document.getElementById('send-button');
    const buttonIcon = document.getElementById('button-icon');

    const aiMoods = ['Determined', 'Curious', 'Analytical', 'Cautious', 'Excited', 'Focused', 'Intense', 'Calm'];
    let currentMood = 'Neutral';

    const mangaPanels = [
        'https://i.imgur.com/1ZYlJIf.jpg',
        'https://i.imgur.com/2NrLmvr.jpg',
        'https://i.imgur.com/3XqLPca.jpg',
        'https://i.imgur.com/4KjGgWd.jpg',
        'https://i.imgur.com/5MnOPqR.jpg'
    ];

    const conversationHistory = [];
    let isTyping = false;

    const updateMangaPanel = () => {
        const randomPanel = mangaPanels[Math.floor(Math.random() * mangaPanels.length)];
        mangaPanel.style.opacity = '0';
        setTimeout(() => {
            mangaPanel.style.backgroundImage = `url(${randomPanel})`;
            mangaPanel.style.opacity = '0.1';
        }, 500);
    };

    const updateAIMood = () => {
        currentMood = (aiMoods[Math.floor(Math.random() * aiMoods.length)]);
        moodIndicator.textContent = currentMood;
        switch (currentMood) {
            case 'Determined':
                break;
            case 'Curious':
                break;
        }
    };

    const addMessage = (sender, text) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        const linkedText = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        messageElement.innerHTML = linkedText;
        
        chatMessages.appendChild(messageElement);
        
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

        messageElement.animate([
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 300,
            easing: 'ease-out',
            fill: 'forwards'
        });

        conversationHistory.push({ sender, text });
    };

    const getAIResponse = async (message) => {
        isTyping = true;
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'ai-message', 'typing-indicator');
        typingIndicator.textContent = 'Guts AI is thinking...';
        chatMessages.appendChild(typingIndicator);
        typingIndicator.scrollIntoView({ behavior: 'smooth', block: 'end' });

        const response = await simulateAIResponse(message);

        chatMessages.removeChild(typingIndicator);
        addMessage('ai', response);
        isTyping = false;

        const sentiment = analyzeSentiment(message);
        adjustMoodBasedOnSentiment(sentiment);

        return response;
    };

    async function simulateAIResponse(message) {
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        const lowercaseMessage = message.toLowerCase();
        
        if (lowercaseMessage.includes('xss')) {
            return generateXSSResponse();
        } else if (lowercaseMessage.includes('sql injection')) {
            return generateSQLInjectionResponse();
        } else if (lowercaseMessage.includes('csrf')) {
            return generateCSRFResponse();
        } else if (lowercaseMessage.includes('recon')) {
            return generateReconResponse();
        } else {
            return generateGenericResponse();
        }
    }

    function generateXSSResponse() {
        const responses = [
            "Cross-Site Scripting (XSS) is a formidable foe in the realm of web security. To vanquish this threat:\n\n1. Sanitize user input with the precision of a master swordsman\n2. Implement Content Security Policy (CSP) headers as your armor\n3. Wield output encoding techniques like a skilled warrior\n4. Validate input on both client and server sides, leaving no weak points\n5. Consider using modern frameworks that automatically escape output\n\nRemember, in the world of XSS, vigilance is your greatest weapon!",
            "Ah, XSS - the bane of many web applications. Here's a more advanced approach to tackle it:\n\n1. Implement strict input validation using whitelists\n2. Use context-sensitive output encoding (HTML, JavaScript, CSS, URL)\n3. Employ Content Security Policy (CSP) with nonce-based script execution\n4. Utilize HttpOnly and Secure flags for cookies to prevent theft via XSS\n5. Regularly perform security audits and penetration testing\n\nStay sharp, for XSS attacks evolve constantly!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function generateSQLInjectionResponse() {
        const responses = [
            "SQL Injection is a dark art that we must defend against. Here's how to fortify your defenses:\n\n1. Use parameterized queries or prepared statements as your primary shield\n2. Implement the principle of least privilege, granting only necessary permissions\n3. Validate and sanitize user input as if checking for hidden poisons\n4. Employ stored procedures as your trusted allies in the database\n5. Regularly update and patch your database management system\n6. Implement Web Application Firewalls (WAF) as an additional layer of protection\n\nStay vigilant, for the battle against SQL Injection is never truly won, only continually fought!",
            "Ah, SQL Injection - a classic technique that still plagues many. Let's delve deeper:\n\n1. Implement Object-Relational Mapping (ORM) frameworks to abstract SQL queries\n2. Use database-specific escaping techniques for dynamic queries when necessary\n3. Employ input validation with strict type checking and whitelisting\n4. Implement proper error handling to avoid information leakage\n5. Regularly perform security audits and use automated scanning tools\n6. Consider using database proxies for additional monitoring and protection\n\nRemember, a well-prepared defender can turn the tables on any SQL Injection attempt!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function generateCSRFResponse() {
        const responses = [
            "Cross-Site Request Forgery (CSRF) is a silent assassin in the world of web security. To guard against its treachery:\n\n1. Implement anti-CSRF tokens in all forms and state-changing requests\n2. Use the SameSite cookie attribute to restrict cookie usage\n3. Verify the origin and referrer headers on the server-side\n4. Implement custom request headers for AJAX calls\n5. Use the 'double submit cookie' technique as an additional safeguard\n\nRemember, in the fight against CSRF, your users' trust is the treasure you're protecting!",
            "CSRF - a subtle yet dangerous threat. Let's explore advanced countermeasures:\n\n1. Implement Synchronizer Token Pattern with per-session or per-request tokens\n2. Use SameSite=Strict for cookies containing sensitive information\n3. Implement re-authentication for critical actions\n4. Employ CORS policies to restrict cross-origin requests\n5. Use Content Security Policy (CSP) to mitigate risks of XSS-based CSRF\n6. Regularly audit your application's attack surface\n\nStay vigilant, for CSRF often lurks where you least expect it!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function generateReconResponse() {
        const responses = [
            "Reconnaissance is the art of gathering intelligence in the bug bounty world. Here are some techniques to master:\n\n1. Subdomain enumeration: Use tools like Sublist3r, Amass, or Subfinder\n2. Port scanning: Nmap is your trusty companion here\n3. Directory bruteforcing: Gobuster and dirsearch can uncover hidden paths\n4. Google dorking: Craft precise search queries to find sensitive information\n5. Wayback Machine: Explore historical versions of the target website\n6. GitHub recon: Search for exposed API keys or sensitive information in repositories\n7. Certificate transparency logs: Discover additional subdomains\n\nRemember, thorough recon often leads to the most valuable discoveries. Happy hunting!",
            "Ah, reconnaissance - the foundation of any successful bug bounty hunt. Let's delve deeper:\n\n1. Use OSINT frameworks like Maltego or Recon-ng for comprehensive information gathering\n2. Leverage DNS enumeration tools like DNSRecon and Fierce\n3. Employ web application fingerprinting with Wappalyzer or Builtwith\n4. Utilize automated vulnerability scanners like Nuclei or Jaeles\n5. Monitor real-time changes with services like VisualPing or Visualping.io\n6. Analyze JavaScript files for hidden endpoints and API keys\n7. Use cloud enumeration tools like CloudEnum for discovering misconfigurations\n\nRemember, the most elusive bugs often hide in plain sight. Happy hunting, digital sleuth!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function generateGenericResponse() {
        const responses = [
            "I am Guts AI, forged in the crucible of cybersecurity to assist bug bounty hunters like yourself. My knowledge spans the realms of web vulnerabilities, network security, and the art of ethical hacking. What specific battle in the world of security would you like to discuss? Whether it's XSS, SQL Injection, CSRF, Reconnaissance techniques, or any other security topic, I stand ready to provide guidance and share strategies to help you emerge victorious in your bug hunting quests!",
            "Greetings, fellow warrior of the digital realm! I am Guts AI, your steadfast companion in the world of cybersecurity and bug bounty hunting. My circuits pulse with knowledge of the latest vulnerabilities, exploitation techniques, and defensive strategies. What aspect of this vast battlefield shall we explore today? From the intricacies of web application security to the depths of network penetration, I am here to sharpen your skills and guide you towards triumph in your hunt for elusive bugs and critical vulnerabilities!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function analyzeSentiment(message) {
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'thanks', 'helpful'];
        const negativeWords = ['bad', 'terrible', 'useless', 'unhelpful', 'confusing'];
        
        let sentiment = 0;
        const words = message.toLowerCase().split(' ');
        
        words.forEach(word => {
            if (positiveWords.includes(word)) sentiment++;
            if (negativeWords.includes(word)) sentiment--;
        });
        
        return sentiment;
    }

    function adjustMoodBasedOnSentiment(sentiment) {
        if (sentiment > 0) {
            currentMood = aiMoods[Math.floor(Math.random() * 3)];
        } else if (sentiment < 0) {
            currentMood = aiMoods[Math.floor(Math.random() * 3) + 5];
        }
        moodIndicator.textContent = currentMood;
    }

    chatMessages.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('message')) {
            e.target.style.transform = 'scale(1.02)';
        }
    });

    chatMessages.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('message')) {
            e.target.style.transform = 'scale(1)';
        }
    });

    const placeholders = [
        "Ask about XSS...",
        "Curious about SQL Injection?",
        "Want to learn about CSRF?",
        "Need recon techniques?",
        "Any security questions?",
        "How to find hidden endpoints?",
        "Best tools for bug bounty?",
        "How to secure APIs?",
        "Latest web vulnerabilities?",
        "Tips for responsible disclosure?"
    ];
    let placeholderIndex = 0;
    let charIndex = 0;

    function typePlaceholder() {
        if (charIndex < placeholders[placeholderIndex].length) {
            userInput.placeholder += placeholders[placeholderIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typePlaceholder, 100);
        } else {
            setTimeout(erasePlaceholder, 2000);
        }
    }

    function erasePlaceholder() {
        if (charIndex > 0) {
            userInput.placeholder = userInput.placeholder.slice(0, -1);
            charIndex--;
            setTimeout(erasePlaceholder, 50);
        } else {
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            setTimeout(typePlaceholder, 500);
        }
    }

    typePlaceholder();

    function highlightCode(text) {
        return text.replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    function formatText(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code class="language-$1">$2</code></pre>');
        return highlightCode(text);
    }

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            const command = userInput.value.trim();
            if (command.startsWith('/')) {
                handleCommand(command.slice(1));
                userInput.value = '';
            }
        }
    });

    function handleCommand(command) {
        switch (command) {
            case 'clear':
                chatMessages.innerHTML = '';
                break;
            case 'help':
                addMessage('system', 'Available commands: /clear, /help, /mood, /history');
                break;
            case 'mood':
                addMessage('system', `Current AI mood: ${currentMood}`);
                break;
            case 'history':
                const historyText = conversationHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
                addMessage('system', `Conversation History:\n${historyText}`);
                break;
            default:
                addMessage('system', 'Unknown command. Type /help for available commands.');
        }
    }

    userInput.addEventListener('input', () => {
        const hasText = userInput.value.trim().length > 0;
        sendButton.disabled = !hasText;
        if (hasText) {
            buttonIcon.innerHTML = '<path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />';
        } else {
            buttonIcon.innerHTML = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>';
        }
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            sendButton.disabled = true;
            buttonIcon.innerHTML = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>';
            await getAIResponse(message);
            updateMangaPanel();
            updateAIMood();
        }
    });

    const initializeChat = () => {
        setTimeout(() => {
            addMessage('ai', "Hello! I'm Guts AI, your cybersecurity assistant. How can I help you today?");
            updateMangaPanel();
            updateAIMood();
        }, 5000);
    };

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message && !isTyping) {
            addMessage('user', message);
            userInput.value = '';
            stopPlaceholderCycle();
            await getAIResponse(message);
            updateMangaPanel();
            updateAIMood();
            if (document.activeElement !== userInput) {
                startPlaceholderCycle();
            }
        } else if (!message) {
            userInput.classList.add('shake');
            setTimeout(() => userInput.classList.remove('shake'), 500);
        }
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            const command = userInput.value.trim();
            if (command.startsWith('/')) {
                handleCommand(command.slice(1));
                userInput.value = '';
            }
        }
    });

    initializeChat();
});
