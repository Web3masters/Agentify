import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu'
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import { FiUpload, FiCopy } from "react-icons/fi";

import dashboardCards from "../../data/dashboardCards.js";
import "./AgentDetails.scss"
import useAgentHooks from '../../Hooks/useAgentHooks.js';
import FullscreenOverlay from '../../components/FullscreenOverlay/FullscreenOverlay.jsx';
import PopupModal from '../../components/PopupModal/PopupModal.jsx';

const AgentDetails = () => {

    const [showPopup, setShowPopup] = useState(false);

    const [agentID, setAgentID] = useState("");
    const [agentDetails, setAgentDetails] = useState({});
    const { fetchAgentById, loading, error } = useAgentHooks();
    const [copyText, setCopyText] = useState("Copy");

    useEffect(() => {
        if (copyText === "Copied!") {
            const timeout = setTimeout(() => setCopyText("Copy"), 5000);
            return () => clearTimeout(timeout); // Cleanup on unmount
        }
    }, [copyText]);


    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    const navigate = useNavigate();

    const handleCopy = (text) => {
        setCopyText("Copied!")
        navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        const id = query.get('agentID');
        console.log(`Agent ID: ${id}`);
        setAgentID(id);
        const fetchAgentDetailsById = async () => {
            const response = await fetchAgentById(id);
            setAgentDetails(response);
        }
        fetchAgentDetailsById();
        console.log(`Agent Details: ${JSON.stringify(dashboardCards.find((card) => card.id === id))}`);
    }, [])

    const calculateSuccessPercentage = (totalRequests, failedRequest) => {
        if (totalRequests === 0) return "N/A";
        const successPercentage = ((totalRequests - failedRequest) / totalRequests) * 100;
        return `${successPercentage.toFixed(2)}%`;
    };

    return (
        <div className='AgentDetails'>
            <Menu />

            <FullscreenOverlay show={showPopup} close={() => setShowPopup(false)}>
                <PopupModal
                    title={"Agentify"}
                    message={`${agentDetails?.codeSnippet}`}
                    buttons={[
                        // { text: "Home", variant: "outlined", onClick: () => navigate('/') },
                        { text: copyText, variant: "filled", onClick: () => handleCopy(agentDetails?.codeSnippet) },
                    ]}
                />
            </FullscreenOverlay>

            <form className="AgentDetailsContent" onSubmit={() => { }}>

                <div className="AgentDetailsSection">
                    <h3>Agent Details</h3>

                    <div className="basicDetails">
                        <table>
                            <tr>
                                <td className='key'>Agent Name</td>
                                <td className="value">{agentDetails?.agentName}</td>
                            </tr>
                            <tr>
                                <td className='key'>Agent Description</td>
                                <td className="value">{agentDetails?.agentPurpose?.slice(0, 60) + "..."}</td>
                            </tr>
                            <tr>
                                <td className='key'>Contact Address</td>
                                <td className="value">
                                    {agentDetails.smartContractAddress}
                                    <FiCopy />
                                </td>
                            </tr>
                            <tr>
                                <td className='key'>Last Modified</td>
                                <td className="value">{agentDetails.updatedDate}</td>
                            </tr>
                        </table>
                    </div>

                    {agentDetails?.availableFunctions && agentDetails?.availableFunctions.length > 0 && <div className="availableFunctionsDetails">
                        <div className="title">Available Functions</div>
                        <div className="functionsBox" style={{maxHeight: "200px", overflowY: "scroll"}}>
                            {agentDetails.availableFunctions.map((func, index) => (
                                <div key={index} className="functionItem">
                                    {func} ,
                                </div>
                            ))}
                        </div>
                    </div>}

                    <div className="statDetails">
                        <div className="field">
                            <span className="number">{agentDetails.totalRequests}</span>
                            <span className="text">Interactions</span>
                        </div>
                        <div className="field">
                            <span className="number">{calculateSuccessPercentage(agentDetails.totalRequests, agentDetails.failedRequest)}%</span>
                            <span className="text">Response Rate</span>
                        </div>
                    </div>

                    <div className="buttons">
                        <Button className='filled' onClick={() => navigate("/playground")}>
                            Test in Playground
                        </Button>
                        <Button
                            className='outlined'
                            onClick={() => {
                                setShowPopup(true)
                            }}
                        >
                            Get Code
                        </Button>
                    </div>

                </div>

                <div className="agentPurposeSection">
                    <h3>Agent Creation Details</h3>

                    <div className="creationDetails">
                        <table>
                            <tr>
                                <td className='key'>Creator Name</td>
                                <td className="value">{agentDetails.creatorName}</td>
                            </tr>
                            <tr>
                                <td className='key'>Creation Date</td>
                                <td className="value">{agentDetails.createdDate}</td>
                            </tr>
                            <tr>
                                <td className='key'>Creator Wallet Address</td>
                                <td className="value">
                                    {agentDetails.creatorWalletAddress}
                                    <FiCopy />
                                </td>
                            </tr>
                            <tr>
                                <td className='key'>Last Modified</td>
                                <td className="value">{agentDetails.updatedDate}</td>
                            </tr>
                        </table>
                    </div>

                </div>

            </form>
        </div>
    );
}

export default AgentDetails;