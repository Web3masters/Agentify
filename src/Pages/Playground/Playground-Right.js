import React, { useState, useRef, useEffect } from 'react';
import { LuCodeXml, LuMessageSquareText, LuTrash, LuMessageSquareX } from 'react-icons/lu';
import { FiCopy } from 'react-icons/fi';
import './Playground-Right.css';
import useChatHooks from '../../Hooks/useChatHook';
import { useAccount } from 'wagmi';
import { useGeneric } from '../../Hooks/useGeneric';
import { useAuth0 } from '@auth0/auth0-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

function PlaygroundRight({ selectedCard, isSwitched, onSwitch }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const [threadId, setThreadId] = useState('');
  const { loading, error, fetchChat, fetchChatHistory, clearHistory } = useChatHooks();
  const [isTyping, setIsTyping] = useState(false);
  const { address, isConnected } = useAccount();
  const { approveCall, functionCall } = useGeneric();
  const [isCreating, setIsCreating] = useState(false);
  const [executing, setExecuting] = useState(false);
  const { isLoading, isAuthenticated, user, logout } = useAuth0();

  // console.log("User:", user)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchHistory = async (selectedCard) => {
    if (!user || !selectedCard?._id) return;
    const res = await fetchChatHistory(user?.sub?.split("|")[1], selectedCard?._id)
    console.log("History:", res);
    if (res?.success) {
      const formattedMessages = res?.threads
        ?.filter(thread => thread?.message?.trim() !== "")
        .map(thread => ({
          sender: thread?.role === "human" ? "user" : "bot",
          text: thread?.message
        }));

      // Update state with formatted messages
      setMessages(formattedMessages || []);
    }
  }

  const clearChat = async () => {
    if (!user || !selectedCard?._id) return;
    const res = await clearHistory(user?.sub?.split("|")[1], selectedCard?._id);
    console.log("Cleared History:", res);
    setMessages([]);
  }

  useEffect(() => {
    if (selectedCard) {
      fetchHistory(selectedCard);
      setThreadId(selectedCard._id);
    }
  }, [selectedCard]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      setIsTyping(true);
      console.log("SEL CARD;", selectedCard)
      if (!selectedCard || !user) return;
      try {
        const response = await fetchChat({
          message: inputValue,
          agentName: selectedCard?.agentName,  // selectedCard?.agentName || "Uniswap Agent New",
          userId: user?.sub?.split("|")[1],
          walletAddress: address,
          threadId: selectedCard?._id // agent_id replace
        });

        console.log("RES:", response)

        // const response = {
        //   data: {
        //     intent: "final_json",
        //     meta_data: {
        //       contract: "0xed72346f59241D1A8E043f1dd60E2967D9baB90C",
        //       functionName: "contributeUSDT",
        //       isGas: true,
        //       gasLimit: "500000",
        //       parameters: {
        //         amount: "500000"
        //       }
        //     }
        //   }
        // }

        // const response = {
        //   "data": {
        //     "intent": "final_json",
        //     "meta_data": {
        //       "contract": "0xF62c03E08ada871A0bEb309762E260a7a6a880E6",
        //       "functionName": "createExchange",
        //       "isGas": true,
        //       "gasLimit": "500000",
        //       "parameters": {
        //         "token": "0x0EC435037161ACd3bB94eb8DF5BC269f17A4E1b9"
        //       }
        //     }
        //   }
        // }

        // const response = {
        //   "data": {
        //     "intent": "final_json",
        //     "meta_data": {
        //       "contract": "0xF62c03E08ada871A0bEb309762E260a7a6a880E6",
        //       "functionName": "createPair",
        //       "isGas": true,
        //       "gasLimit": "500000",
        //       "parameters": {
        //         "tokenA": "0x5E2F8dfD0E05833f0DD88aFFe71414d08B698D2B",
        //         "tokenB": "0x0EC435037161ACd3bB94eb8DF5BC269f17A4E1b9"
        //       }
        //     }
        //   }
        // }

        // working
        // const response = {
        //   "data": {
        //     "intent": "final_json",
        //     "meta_data": {
        //       "contract": "0xF62c03E08ada871A0bEb309762E260a7a6a880E6",
        //       "functionName": "allPairs",
        //       "isGas": false,
        //       "parameters": {
        //         "_index": "0"
        //       }
        //     }
        //   }
        // }

        if (response) {
          console.log("RES:", response)
          if (response?.tool_response !== "None") {  //  if (response.data.intent === "final_json")

            let metaData;

            try {
              metaData = JSON.parse(response?.tool_response); // Parse tool response
              metaData.params = JSON.parse(metaData.params);  // Parse params separately

              // Convert array to object with dynamic keys (key1, key2, etc.)
              const paramsObject = metaData.params.reduce((acc, value, index) => {
                acc[`key${index + 1}`] = value;
                return acc;
              }, {});

              console.log("Params:", paramsObject)

              metaData.params = paramsObject;
            } catch (error) {
              metaData = response?.tool_response; // If parsing fails, treat it as a normal string
              setMessages(prevMessages => [...prevMessages, { text: response.ai_message, sender: 'bot' }]);
              return;
            }

            // const metaData = JSON.parse(response?.tool_response);
            // console.log("Metadata:", metaData)

            if (metaData.transactionType === "sign") {
              const { functionName, gasFees, contractAddress, blockchain, params, gasLimit } = metaData;
              console.log(functionName, gasFees, contractAddress, blockchain, params, gasLimit)

              if (!address || !isConnected) {
                setMessages((prev) => [...prev, { sender: "bot", text: `Please connect your wallet to execute ${functionName}` }]);
                return;
              }

              if (!address || (address.trim().startsWith("0x") && address.trim().length !== 42)) {
                return;
              }

              setMessages((prev) => [...prev, { sender: "bot", text: `Executing function: ${functionName}...` }]);
              setExecuting(true);

              // const resposeApprove = await approveCall(response.data.meta_data.parameters.amount)
              // console.log("RES:", resposeApprove)

              const res = await functionCall(functionName, params, gasFees);
              console.log(res);

              if (res?.success) {
                if (res?.isGas) {
                  const txData = res.data;
                  // setMessages((prev) => [...prev, { sender: "bot", text: `Function call executed successfully! <a href="https://explorer.testnet.aurora.dev/tx/${txData.transactionHash}" target="_blank" class="hash" style="text-decoration:none; color: #fff;">Status</a>` }]);
                  setMessages((prev) => [...prev, { sender: "bot", text: `Function call executed successfully! [Status](https://explorer.testnet.aurora.dev/tx/${txData.transactionHash})` }]);
                  setExecuting(false);
                  return;
                } else {
                  setMessages((prev) => [...prev, { sender: "bot", text: String(res?.data) }]);
                  setExecuting(false);
                  return;
                }
              } else {
                setMessages((prev) => [...prev, { sender: "bot", text: `Function call execution failed!` }]);
                setExecuting(false);
                return;
              }
            }
          }

          setThreadId(response.threadId);
          setMessages(prevMessages => [...prevMessages, { text: response.ai_message, sender: 'bot' }]);
        }
      } catch (err) {
        console.error("Chat error:", err);
      } finally {
        setIsTyping(false);
      }
    }
  };

  console.log("MSGS:", messages)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // const getCardText = (card) => {
  //   return `Title: ${card.agentName}\nDescription: ${card.agentPurpose}\nCode: ${card.codeSnippet}`;
  // };

  const getCardText = (card) => (
    <>
      <span style={{ color: "#ffffff" }}> Title: </span> {card?.agentName}
      <br />
      <span style={{ color: "#ffffff" }}> Description: </span> {card?.agentPurpose}
      <br />
      <br />
      <span style={{ color: "#ffffff" }}> Code Snippet: <br /> </span>{card?.codeSnippet}
    </>
  );

  <div className="code-text">{getCardText(selectedCard)}</div>;


  return (
    <div className="playground">
      <div className="playground-header">
        <h2>{isSwitched ? 'Embeddable Code' : 'Playground'}</h2>
        <div className="switch-container">
          <span className='switch'>Switch to</span>
          <button
            className="switch-icon-btn"
            onClick={onSwitch}
            title={isSwitched ? "Switch to chat" : "Switch to code"}
          >
            {isSwitched ? <LuMessageSquareText size={20} /> : <LuCodeXml size={20} />}
          </button>
          <button
            className="switch-icon-btn"
            onClick={clearChat}
          >
            <LuMessageSquareX size={20} />
          </button>
        </div>
      </div>

      <div className="playground-content">
        {isSwitched && selectedCard ? (
          <div className="code-content">
            <div className="code-text">
              {getCardText(selectedCard)}
            </div>
            <button
              className="copy-button"
              onClick={() => handleCopy(selectedCard?.codeSnippet)}
              title="Copy to clipboard"
            >
              <FiCopy size={16} />
            </button>
          </div>
        ) : (
          <>
            {messages.length === 0 && <div className="playground-title">Execute Transactions with AI</div>}
            <div className="messages-container">
              {messages.map((message, index) => {
                const isLastMessage = index === messages.length - 1; // Check if it's the last message
                return (
                  <div key={index} className={`message ${message?.sender}`}>
                    <div className={`message-content ${isLastMessage && message.sender === "bot" && message?.text?.includes("Executing") && executing ? "dflex" : ""}`}>
                      {isLastMessage && message.sender === "bot" && message?.text?.includes("Executing") && executing && (
                        <div className="loader"></div>
                      )}
                      {/* <p dangerouslySetInnerHTML={{ __html: message.text }}></p> */}
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="message bot typing-indicator">
                  <div className="message-content">
                    <span>Agent is typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message smart actions"
                  className="message-input"
                />
                <button type="submit" className="send-button">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3333 1.66667L9.16667 10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.3333 1.66667L12.5 18.3333L9.16667 10.8333L1.66667 7.5L18.3333 1.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default PlaygroundRight; 