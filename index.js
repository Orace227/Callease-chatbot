; (() => {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #010ed0);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #010ed0);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            --chat--color-header-bg: #010ed0; /* Purple header background */
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 90px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(1, 14, 208, 0.15);
            border: 1px solid rgba(1, 14, 208, 0.2);
            overflow: hidden;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(1, 14, 208, 0.1);
            position: relative;
            background: var(--chat--color-header-bg);
            color: white;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 30px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
        backgroundColor: none;
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
            border-radius: 10px;
            padding: 4px;
            background: #ffffff;
            
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: white;
        }

        .n8n-chat-widget .new-conversation {
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
            margin: auto;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .welcome-screen {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .welcome-screen.hidden {
            display: none;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            cursor:pointer;
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
            border: 2px solid #4ade80; /* Tailwind's green-400 */
            box-shadow: 0 0 5px #4ade80;
        }
        
        .chat-message.copied {
            background: #4ade80 !important;
            transition: background 0.2s ease;
        }


        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(1, 14, 208, 0.2);
            border: none;
            border-radius: 18px 18px 0 18px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: #f7f7f7;
            border: 1px solid rgba(1, 14, 208, 0.1);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border-radius: 0px 18px 18px 18px;
        }

       .n8n-chat-widget .chat-input {
    padding: 16px;
    background: var(--chat--color-background);
    border-top: 1px solid rgba(1, 14, 208, 0.1);
    display: flex;
    gap: 8px;
    align-items: center; /* This centers items vertically */
}

       .n8n-chat-widget .chat-input textarea {
    flex: 1;
    padding: 12px;
    border: 1px solid rgba(1, 14, 208, 0.2);
    border-radius: 15px;
    background: var(--chat--color-background);
    color: var(--chat--color-font);
    resize: none;
    font-family: inherit;
    font-size: 14px;
    max-height: 150px;  /* Set your desired maximum height */
    overflow-y: auto;   /* Enable vertical scrolling */
}

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input button {
    background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: transform 0.2s;
    font-family: inherit;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center; /* This ensures the button stays centered */
    flex-shrink: 0; /* Prevents the button from shrinking */
}

        .n8n-chat-widget .chat-input button svg {
            
            width: 20px;
            height: 20px;
            fill: white;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 0px 25px rgba(1, 14, 208, 0.6);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.1);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .chat-footer {
            padding: 12px;
            text-align: center;
            background: rgb(233, 232, 232);
            border-top: 1px solid rgba(1, 14, 208, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .n8n-chat-widget .chat-footer a {
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            color: var(--chat--color-primary);
            letter-spacing: 0.3px;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
        }

        .n8n-chat-widget .chat-footer a:hover {
            color: #4A4A4A;
        }

        .n8n-chat-widget .chat-footer-logo {
            height: 14px;
            width: auto;
            margin-left: 4px;
        }

        .n8n-chat-widget .chat-footer-divider {
            display: inline-block;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #4A4A4A;
            margin: 0 6px;
        }

        .n8n-chat-widget .callease-text {
            color: #0F69FF;
            font-weight: 600;
        }

        .n8n-chat-widget .thumbs-container {
            display: flex;
            justify-content: flex-end;
            margin-top: 5px;
            gap: 8px;
        }

        .n8n-chat-widget .thumb-button {
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.2s;
            padding: 5px;
        }

        .n8n-chat-widget .thumb-button:hover {
            opacity: 1;
        }
        
        /* Quick option buttons styles */
        .n8n-chat-widget .quick-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 15px;
            width: 100%;
        }
        
        .n8n-chat-widget .quick-option-btn {
            padding: 12px 16px;
            border-radius: 20px;
            border: 1px solid var(--chat--color-primary);
            background: transparent;
            color: var(--chat--color-primary);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            width: 100%;
            font-family: inherit;
        }
        
        .n8n-chat-widget .quick-option-btn:hover {
            background-color: rgba(1, 14, 208, 0.05);
            transform: translateY(-2px);
        }

        /* Bot avatar styles */
        .n8n-chat-widget .bot-avatar {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            margin-right: 10px;
        }

        .n8n-chat-widget .message-with-avatar {
            display: flex;
            align-items: flex-start;
        }

        /* Feedback buttons */
        .n8n-chat-widget .feedback-buttons {
            display: flex;
            gap: 8px;
            margin-top: 5px;
            justify-content: flex-end;
        }

        .n8n-chat-widget .feedback-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            opacity: 0.6;
            transition: opacity 0.2s;
        }

        .n8n-chat-widget .feedback-button:hover {
            opacity: 1;
        }

        /* Quick reply buttons */
        .n8n-chat-widget .quick-reply-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 15px;
            
            justify-content: center;
        }

        .n8n-chat-widget .quick-reply-button {
            padding: 10px 16px;
            margin: 0px 35px;
            border-radius: 20px;
            border: 1px solid #010ed0;
            background: transparent;
            color: #010ed0;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .n8n-chat-widget .quick-reply-button:hover {
            background-color: rgba(98, 71, 233, 0.1);
             color: #010ed0 !important;
        }
        .n8n-chat-widget .loading-indicator {
            display: flex;
            
            margin: 10px 0;
        }

        .n8n-chat-widget .typing-dots {
            display: flex;
            align-items: center;
        }

        .n8n-chat-widget .typing-dot {
            width: 8px;
            height: 8px;
            margin: 0 2px;
            background-color: rgba(1, 14, 208, 0.6);
            border-radius: 50%;
            opacity: 0.6;
            animation: loadingDot 1.4s infinite ease-in-out both;
        }

        .n8n-chat-widget .typing-dot:nth-child(1) {
            animation-delay: -0.32s;
        }

        .n8n-chat-widget .typing-dot:nth-child(2) {
            animation-delay: -0.16s;
        }

        @keyframes loadingDot {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        } 
      /* Title bubble wrapper styling */
    .n8n-chat-widget .message-bubble-wrapper {
        position: fixed;
        bottom: 280px;
        right: 90px;
        z-index: 999;
        width: 280px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        overflow: hidden;
        border: 1px solid rgba(1, 14, 208, 0.15);
        transition: all 0.3s ease;
        opacity: 0.95;
    }

    .n8n-chat-widget .message-bubble-wrapper:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        opacity: 1;
    }

    .n8n-chat-widget .message-bubble-wrapper.position-left {
        right: auto;
        left: 90px;
    }

    /* Message-only bubble styling */
    .n8n-chat-widget .message-bubble-only-wrapper {
        position: fixed;
        z-index: 999;
        
        background: white;
        border-radius: 12px;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid rgba(1, 14, 208, 0.12);
        transition: all 0.3s ease;
        opacity: 0.9;
    }

    .n8n-chat-widget .message-bubble-only-wrapper:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 16px rgba(0, 0, 0, 0.12);
        opacity: 1;
    }

    .n8n-chat-widget .message-bubble-only-wrapper.position-left {
        right: auto;
        left: 90px;
    }

    /* Bubble header styling */
    .n8n-chat-widget .bubble-header {
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(1, 14, 208, 0.08);
        background-color: rgba(1, 14, 208, 0.02);
    }

    .n8n-chat-widget .bubble-brand {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .n8n-chat-widget .bubble-brand img {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        background: #ffffff;
        padding: 5px;
        object-fit: cover;
        border: 1px solid rgba(1, 14, 208, 0.1);
    }

    .n8n-chat-widget .bubble-brand span {
        font-weight: 600;
        font-size: 15px;
        color: #333;
    }

    .n8n-chat-widget .close-bubble {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        color: #ffffff;

        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
        
        font-size: 30px;
    }

    .n8n-chat-widget .close-bubble:hover {
        
backgroundColor:none
        color: #ffffff;
    }

    /* Message content styling */
    .n8n-chat-widget .message-bubble {
        padding: 14px 18px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        line-height: 1.4;
        color: #444;
        font-weight: 400;
    }

    .n8n-chat-widget .message-bubble:hover {
        background-color: rgba(1, 14, 208, 0.04);
    }
    `

    // Load Geist font
    const fontLink = document.createElement("link")
    fontLink.rel = "stylesheet"
    fontLink.href = "https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css"
    document.head.appendChild(fontLink)

    // Inject styles
    const styleSheet = document.createElement("style")
    styleSheet.textContent = styles
    document.head.appendChild(styleSheet)

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: "",
            route: "",
        },
        branding: {
            logo: "",
            name: "",
            welcomeText: "",
            responseTimeText: "",
            poweredBy: {
                text: "Powered by",
                link: "https://callease.ai",
            },
        },
        style: {
            primaryColor: "",
            secondaryColor: "",
            position: "right",
            backgroundColor: "#ffffff",
            fontColor: "#333333",
        },
        quickOptions: ["Want to make an appointment?", "Want to know more about our services?"],
    }

    // Merge user config with defaults
    const config = window.ChatWidgetConfig
        ? {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style },
            quickOptions: window.ChatWidgetConfig.quickOptions || defaultConfig.quickOptions,
        }
        : defaultConfig

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return
    window.N8NChatWidgetInitialized = true

    let currentSessionId = ""
    let conversationStarted = true

    // Create widget container
    const widgetContainer = document.createElement("div")
    widgetContainer.className = "n8n-chat-widget"

    // Set CSS variables for colors
    widgetContainer.style.setProperty("--n8n-chat-primary-color", config.style.primaryColor)
    widgetContainer.style.setProperty("--n8n-chat-secondary-color", config.style.secondaryColor)
    widgetContainer.style.setProperty("--n8n-chat-background-color", config.style.backgroundColor)
    widgetContainer.style.setProperty("--n8n-chat-font-color", config.style.fontColor)

    const chatContainer = document.createElement("div")
    chatContainer.className = `chat-container${config.style.position === "left" ? " position-left" : ""}`


    const bubbleMessages = [
        "General Queries",
        "Raise a Support Ticket",
        "About Callease AI",
    ];
    // First create a title bubble

    // Create a welcome screen
    const welcomeScreen = document.createElement("div")
    welcomeScreen.className = "welcome-screen"
    welcomeScreen.innerHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-text">${config.branding.welcomeText}</h2>
            <button class="new-chat-btn ">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Send us a message
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
            
            <!-- Quick option buttons -->
            <div class="quick-options">
                ${config.quickOptions.map((option) => `<button class="quick-option-btn">${option}</button>`).join("")}
            </div>
        </div>
    `

    // Create chat interface
    const chatInterface = document.createElement("div")
    chatInterface.className = "chat-interface active"
    chatInterface.innerHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input">
            <textarea placeholder="Send a message..." rows="1"></textarea>
         <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" stroke-width="2" 
            stroke-linecap="round" stroke-linejoin="round" 
            style="min-height: 24px; min-width: 24px; flex-shrink: 0;"
            class="icon icon-tabler icons-tabler-outline icon-tabler-send-2">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" fill="none"/>
            <path d="M6.5 12h14.5" />
            </svg>
        </button>
        </div>
        <div class="chat-footer">
            <a href="${config.branding.poweredBy.link}" target="_blank">
                ${config.branding.poweredBy.text} 
            </a>
        </div>
    `

    // Add both screens to the container
    // chatContainer.appendChild(welcomeScreen)
    chatContainer.appendChild(chatInterface)

    const toggleButton = document.createElement("button")
    toggleButton.className = `chat-toggle${config.style.position === "left" ? " position-left" : ""}`

    toggleButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-message-report">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
      <path d="M12 8v3" />
      <path d="M12 14v.01" />
    </svg>
  `;

    widgetContainer.appendChild(chatContainer)
    widgetContainer.appendChild(toggleButton)
    document.body.appendChild(widgetContainer)

    const newChatBtn = welcomeScreen.querySelector(".new-chat-btn")
    const chatMessage = welcomeScreen.querySelector(".chat-message")
    const messagesContainer = chatInterface.querySelector(".chat-messages")
    const textarea = chatInterface.querySelector("textarea")
    const sendButton = chatInterface.querySelector('button[type="submit"]')
    const quickOptionButtons = welcomeScreen.querySelectorAll(".quick-option-btn")

    function generateUUID() {
        return crypto.randomUUID
            ? crypto.randomUUID()
            : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
                (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
            )
    }
    function formatMessage(message) {
        // Replace new lines with <br>
        let formattedMessage = message.replace(/\n/g, "<br>");

        // Replace **text** with <strong>text</strong>
        formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        formattedMessage = formattedMessage.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g,
            '<a href="$2" target="_blank">$1</a>');

        return formattedMessage;
    }

    // Add feedback buttons to bot messages
    function addFeedbackToMessage(messageDiv) {
        const feedbackContainer = document.createElement("div")
        feedbackContainer.className = "feedback-buttons"

        feedbackContainer.innerHTML = `
            <button class="feedback-button" aria-label="Thumbs up">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="feedback-button" aria-label="Thumbs down">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V11C22 11.5304 21.7893 12.0391 21.4142 12.4142C21.0391 12.7893 20.5304 13 20 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23768 1.99448 4.76965 2.16359 4.40209 2.47599C4.03452 2.78839 3.79217 3.22309 3.72 3.7L2.34 12.7C2.29651 12.9866 2.31583 13.2793 2.39666 13.5577C2.4775 13.8362 2.61788 14.0937 2.80812 14.3125C2.99837 14.5313 3.23387 14.7061 3.49834 14.8248C3.76281 14.9435 4.05008 15.0033 4.34 15H10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `

        messageDiv.appendChild(feedbackContainer)
    }
    let chatHistory = [];
    console.log("chatHistory", chatHistory)
    async function startNewConversation() {
        // Only start new conversation if not already started
        // if (conversationStarted) return

        // conversationStarted = true
        currentSessionId = generateUUID()

        // Clear any existing messages
        messagesContainer.innerHTML = ""

        // Add loading indicator
        const loadingIndicator = document.createElement("div")
        loadingIndicator.className = "message-with-avatar loading-indicator"
        loadingIndicator.innerHTML = `
        <img class="bot-avatar" src="${config.branding.logo}" alt="${config.branding.name}">
        <div class="chat-message bot typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `
        messagesContainer.appendChild(loadingIndicator)

        try {
            const data = [
                {
                    action: "loadPreviousSession",
                    sessionId: currentSessionId,
                    route: config.webhook.route,
                    metadata: {
                        userId: "",
                    },
                },
            ]

            // const response = await fetch(config.webhook.url, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(data),
            // })

            // const responseData = await response.json()

            // Remove loading indicator
            messagesContainer.removeChild(loadingIndicator)

            // Hide welcome screen and show chat interface
            welcomeScreen.classList.add("hidden")
            chatInterface.classList.add("active")

            // Add bot avatar to message
            const botMessageContainer = document.createElement("div")
            botMessageContainer.className = "message-with-avatar"

            const botAvatar = document.createElement("img")
            botAvatar.className = "bot-avatar"
            botAvatar.src = config.branding.logo
            botAvatar.alt = config.branding.name

            if (chatHistory.length <= 0) {
                const botMessageDiv = document.createElement("div")
                botMessageDiv.className = "chat-message bot"
                botMessageDiv.textContent =
                    "Hey there! How can I assist you today? "
                console.log("Chat history:", chatHistory)
                botMessageContainer.appendChild(botAvatar)
                botMessageContainer.appendChild(botMessageDiv)
                messagesContainer.appendChild(botMessageContainer)
                chatHistory.push({
                    type: 'bot',
                    id: generateUUID(),
                    content: "Hey there! How can I assist you today?"
                });

            }

            // addFeedbackToMessage(botMessageDiv)

            // Add quick reply buttons
            const quickReplyContainer = document.createElement("div")
            quickReplyContainer.className = "quick-reply-buttons"
            quickReplyContainer.innerHTML = `
            <button class="quick-reply-button">General Queries</button>
            <button class="quick-reply-button">Raise a Support Ticket</button>
            <button class="quick-reply-button">About Callease AI</button>
        `
            // ["Want to make an appointment?", "Want to know more about our services?"],
            messagesContainer.appendChild(quickReplyContainer)

            // Add event listeners to quick reply buttons
            const quickReplyButtons = quickReplyContainer.querySelectorAll(".quick-reply-button")
            quickReplyButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const replyText = button.textContent
                    sendMessage(replyText)
                    // Remove quick reply buttons after one is clicked
                    quickReplyContainer.remove()
                })
            })
            if (chatHistory.length > 0) {
                // Clear any existing messages
                messagesContainer.innerHTML = "";

                // Restore messages from history array
                chatHistory.forEach((msg) => {
                    if (msg.type === 'user') {
                        const userMessageDiv = document.createElement("div");
                        userMessageDiv.className = `chat-message user index`;
                        userMessageDiv.textContent = msg.content;
                        messagesContainer.appendChild(userMessageDiv);
                    } else if (msg.type === 'bot') {
                        const botMessageContainer = document.createElement("div");
                        botMessageContainer.className = "message-with-avatar";

                        const botAvatar = document.createElement("img");
                        botAvatar.className = "bot-avatar";
                        botAvatar.src = config.branding.logo;
                        botAvatar.alt = config.branding.name;

                        const botMessageDiv = document.createElement("div");
                        botMessageDiv.className = "chat-message bot";
                        botMessageDiv.innerHTML = formatMessage(msg.content);

                        botMessageContainer.appendChild(botAvatar);
                        botMessageContainer.appendChild(botMessageDiv);
                        messagesContainer.appendChild(botMessageContainer);
                    }
                })
            }
            messagesContainer.scrollTop = messagesContainer.scrollHeight
        } catch (error) {
            console.error("Error:", error)

            // Remove loading indicator in case of error
            if (messagesContainer.contains(loadingIndicator)) {
                messagesContainer.removeChild(loadingIndicator)
            }

            // Show error message
            welcomeScreen.classList.add("hidden")
            chatInterface.classList.add("active")

            const errorMessageDiv = document.createElement("div")
            errorMessageDiv.className = "chat-message bot"
            errorMessageDiv.innerText = "Sorry, there was an error connecting to our service. Please try again later."
            messagesContainer.appendChild(errorMessageDiv)
            messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
    }

    async function sendMessage(message) {
        if (!currentSessionId) {
            currentSessionId = generateUUID()
        }
        chatHistory.push({
            type: 'user',
            id: generateUUID(),
            content: message
        });
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: "",
            },
        }

        const userMessageDiv = document.createElement("div")
        userMessageDiv.className = "chat-message user"
        userMessageDiv.textContent = message
        messagesContainer.appendChild(userMessageDiv)
        messagesContainer.scrollTop = messagesContainer.scrollHeight

        // Add loading indicator
        const loadingIndicator = document.createElement("div")
        loadingIndicator.className = "message-with-avatar loading-indicator"
        loadingIndicator.innerHTML = `
        <img class="bot-avatar" src="${config.branding.logo}" alt="${config.branding.name}">
        <div class="chat-message bot typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `
        messagesContainer.appendChild(loadingIndicator)
        messagesContainer.scrollTop = messagesContainer.scrollHeight

        // Disable input while processing
        textarea.disabled = true
        sendButton.disabled = true

        try {
            const response = await fetch(config.webhook.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageData),
            })

            const data = await response.json()
            console.log("Response data:", data)
            const botResponse = Array.isArray(data) ? data[0].output : data.output;
            chatHistory.push({
                type: 'bot',
                id: generateUUID(),
                content: botResponse
            });

            // Remove loading indicator
            messagesContainer.removeChild(loadingIndicator)

            // Add bot avatar to message
            const botMessageContainer = document.createElement("div")
            botMessageContainer.className = "message-with-avatar"

            const botAvatar = document.createElement("img")
            botAvatar.className = "bot-avatar"
            botAvatar.src = config.branding.logo
            botAvatar.alt = config.branding.name

            const botMessageDiv = document.createElement("div")
            botMessageDiv.className = "chat-message bot"
            // botMessageDiv.textContent = Array.isArray(data) ? `${data[0].output}` : `${data.output}`
            botMessageDiv.innerHTML = Array.isArray(data)
                ? formatMessage(data[0].output)
                : formatMessage(data.output);


            botMessageContainer.appendChild(botAvatar)
            botMessageContainer.appendChild(botMessageDiv)
            messagesContainer.appendChild(botMessageContainer)

            // addFeedbackToMessage(botMessageDiv)
            messagesContainer.scrollTop = messagesContainer.scrollHeight
        } catch (error) {
            console.error("Error:", error)

            // Remove loading indicator in case of error
            if (messagesContainer.contains(loadingIndicator)) {
                messagesContainer.removeChild(loadingIndicator)
            }

            // Show error message with avatar, matching the successful message format
            const errorMessageContainer = document.createElement("div")
            errorMessageContainer.className = "message-with-avatar"

            const botAvatar = document.createElement("img")
            botAvatar.className = "bot-avatar"
            botAvatar.src = config.branding.logo
            botAvatar.alt = config.branding.name

            const errorMessageDiv = document.createElement("div")
            errorMessageDiv.className = "chat-message bot error" // Added 'error' class for styling if needed
            errorMessageDiv.textContent = "Sorry, there was an error processing your message. Please try again."

            errorMessageContainer.appendChild(botAvatar)
            errorMessageContainer.appendChild(errorMessageDiv)
            messagesContainer.appendChild(errorMessageContainer)
        } finally {
            // Re-enable input
            textarea.disabled = false
            sendButton.disabled = false
            textarea.focus()

        }
    }

    // Handle quick option button clicks
    quickOptionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const optionText = button.textContent

            // Start conversation if not already started
            if (!conversationStarted) {
                conversationStarted = true
                currentSessionId = generateUUID()

                // Hide welcome screen and show chat interface
                welcomeScreen.classList.add("hidden")
                chatInterface.classList.add("active")
            }

            // Send the quick option text as a message
            sendMessage(optionText)
        })
    })

    // Event listeners
    newChatBtn.addEventListener("click", startNewConversation)

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('chat-message')) {
            const element = e.target;
            const text = element.innerText;

            navigator.clipboard.writeText(text).then(() => {
                // Add green border class
                element.classList.add('copied');

                // Remove it after 1.5 seconds
                setTimeout(() => {
                    element.classList.remove('copied');
                }, 1500);
            });
        }
    });


    sendButton.addEventListener("click", () => {
        const message = textarea.value.trim()
        if (message) {
            sendMessage(message)
            textarea.value = ""
        }
    })

    textarea.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            const message = textarea.value.trim()
            if (message) {
                sendMessage(message)
                textarea.value = ""
            }
        }
    })

    // Auto-resize textarea
    textarea.addEventListener("input", function () {
        this.style.height = "auto"
        this.style.height = this.scrollHeight + "px"
    })

    toggleButton.addEventListener("click", () => {
        chatContainer.classList.toggle("open")

        toggleButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-down">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 5l0 14" />
                <path d="M18 13l-6 6" />
                <path d="M6 13l6 6" />
              </svg>
            `;


        // When toggling open, ensure we start with welcome screen if no conversation
        if (chatContainer.classList.contains("open")) {
            document.querySelectorAll('.message-bubble-only-wrapper, .message-bubble-wrapper').forEach(bubble => {
                bubble.style.display = "none";
            });
            if (conversationStarted) {
                startNewConversation()
                // If conversation already started, show the chat interface
                welcomeScreen.classList.add("hidden")
                chatInterface.classList.add("active")
            } else {
                document.querySelectorAll('.message-bubble-only-wrapper, .message-bubble-wrapper').forEach(bubble => {
                    bubble.style.display = "block";
                });
                // Otherwise show the welcome screen
                welcomeScreen.classList.remove("hidden")
                chatInterface.classList.remove("active")
                // Clear any messages that might be in the container
                messagesContainer.innerHTML = ""
            }
        }
        else {
            toggleButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-message-report">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
              <path d="M12 8v3" />
              <path d="M12 14v.01" />
            </svg>
          `;
        }
    })

    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll(".close-button")
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll('.message-bubble-only-wrapper, .message-bubble-wrapper').forEach(bubble => {
                bubble.style.display = "block";
            });
            chatContainer.classList.remove("open")
            toggleButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-message-report">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
      <path d="M12 8v3" />
      <path d="M12 14v.01" />
    </svg>
  `;
        })
    })
    if (chatContainer.classList.contains("open")) {
        document.querySelectorAll('.message-bubble-wrapper').forEach(bubble => {
            bubble.style.display = "none";
        });
    }
    // Reset conversation on page reload
    window.addEventListener("beforeunload", () => {
        localStorage.removeItem("chatSessionId")
    })
})()

