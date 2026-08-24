import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 40 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        // 1. Target prompt string
        const promptToSend = prompt !== undefined ? prompt : input;
        setRecentPrompt(promptToSend);

        // 2. Add to prevPrompts cleanly without duplicates
        if (promptToSend && promptToSend.trim() !== "") {
            setPrevPrompts((prev) => {
                if (!prev.includes(promptToSend.trim())) {
                    return [...prev, promptToSend.trim()];
                }
                return prev;
            });
        }

        setInput("");

        try {
            console.log("Sending prompt to Gemini:", promptToSend);
            const response = await run(promptToSend);

            // Parse bold tags
            let responseArray = response.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            // Map standard symbols
            let formattedResponse = newResponse
                .replaceAll("* ", "<br>• ")
                .replaceAll("*", "")
                .replaceAll("\n", "<br>")
                .replaceAll("### ", "<br><b>")
                .replaceAll("`", "<code>");

            // Word animation logic
            let newResponseArray = formattedResponse.split(" ");
            setLoading(false);

            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }
        } catch (error) {
            console.error("Error executing Gemini prompt:", error);
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;