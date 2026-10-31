import { useState } from "react";

function CareerAssistant() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "Hi 👋 I'm CareerGPS Assistant. Ask me about careers, resumes, interviews, skills, or roadmaps."
      }
    ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8081/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            message: userMessage
          })
        }
      );

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Unable to connect to AI Assistant."
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          border: "none",
          background: "#2563eb",
          color: "white",
          fontSize: "32px",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow:
            "0 6px 20px rgba(0,0,0,0.3)"
        }}
      >
        🤖
      </button>

      {/* Chat Window */}

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "380px",
            height: "550px",
            background: "white",
            borderRadius: "18px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.3)"
          }}
        >
          {/* Header */}

          <div
            style={{
              background:
                "#2563eb",
              color: "white",
              padding: "15px",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            <span>
              🤖 CareerGPS Assistant
            </span>

            <button
              onClick={() =>
                setOpen(false)
              }
              style={{
                background:
                  "transparent",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px",
              background:
                "#f8fafc"
            }}
          >
            {messages.map(
              (
                msg,
                index
              ) => (
                <div
                  key={index}
                  style={{
                    marginBottom:
                      "12px",
                    textAlign:
                      msg.sender ===
                      "user"
                        ? "right"
                        : "left"
                  }}
                >
                  <div
                    style={{
                      display:
                        "inline-block",
                      maxWidth:
                        "85%",
                      padding:
                        "12px",
                      borderRadius:
                        "12px",
                      whiteSpace:
                        "pre-wrap",
                      background:
                        msg.sender ===
                        "user"
                          ? "#2563eb"
                          : "#e2e8f0",
                      color:
                        msg.sender ===
                        "user"
                          ? "white"
                          : "black"
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Input Area */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px",
              borderTop:
                "1px solid #e2e8f0",
              background:
                "white"
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  sendMessage();
                }
              }}
              placeholder="Ask a career question..."
              style={{
                flex: 1,
                padding:
                  "12px",
                borderRadius:
                  "10px",
                border:
                  "1px solid #cbd5e1",
                outline:
                  "none"
              }}
            />

            <button
              onClick={
                sendMessage
              }
              style={{
                background:
                  "#2563eb",
                color:
                  "white",
                border:
                  "none",
                borderRadius:
                  "10px",
                padding:
                  "12px 18px",
                fontWeight:
                  "bold",
                cursor:
                  "pointer",
                minWidth:
                  "75px"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CareerAssistant;

