import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { constant } from "../config/constant";

const useFunctionMappingHooks = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mappingText, setMappingText] = useState("");

    const fetchFuncMappings = async (data) => {
        try {
            setLoading(true);
            setError(null);
            setMappingText(""); // Reset mapping text before streaming
            
            const response = await fetch(`${constant.PYTHON_SERVER_URL}/api/mapping`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            
            if (!response.body) {
                throw new Error("No response body received");
            }
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            const stream = new ReadableStream({
                start(controller) {
                  function push() {
                    reader.read().then(({ done, value }) => {
                      if (done) {
                        controller.close();
                        setLoading(false);
                        return;
                      }
                      const chunk = decoder.decode(value, { stream: true });
                      setMappingText((prevResponse) => prevResponse + chunk);
                      controller.enqueue(value);
                      push();
                    });
                  }
        
                  push();
                },
              });
            
            await new Response(stream).text();
        } catch (err) {
            console.error("Error occurred:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, mappingText, fetchFuncMappings };
};

export default useFunctionMappingHooks;