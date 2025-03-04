import React, { useEffect, useRef, useState } from 'react';
import Menu from '../../components/Menu/Menu'
import FullscreenOverlay from '../../components/FullscreenOverlay/FullscreenOverlay';
import PopupModal from '../../components/PopupModal/PopupModal';

import { Button, TextField } from '@mui/material';
import { FiUpload } from "react-icons/fi";

import "./CreateAgent.scss"
import useAgentHooks from '../../Hooks/useAgentHooks';
import { useAuth0 } from "@auth0/auth0-react";
import { useAccount } from 'wagmi';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useNavigate } from 'react-router-dom';
import useFunctionMappingHooks from '../../Hooks/useFunctionMappingHook';

const CreateAgent = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [showFailedPop, setShowFailedPop] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [tags] = useState(["DeFi", "AI", "DAO", "Memes", "Investing", "Computational", "Ecosystem"]);
    const [selectedTags, setSelectedTags] = useState([]);
    const dropdownRef = useRef(null);
    const { user } = useAuth0();
    const { loading, error, createAgent } = useAgentHooks();
    const { address } = useAccount();
    const { chainId, caipNetwork } = useAppKitNetwork();
    const [createdAgentDetails, setCreatedAgentDetails] = useState();
    const [errMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const { mapLoading, mapError, mappingText, fetchFuncMappings } = useFunctionMappingHooks();
    const [inputData, setInputData] = useState("");


    useEffect(() => {
        console.log(user);
    }, [user]);

    const [formData, setFormData] = useState({
        creatorName: user.name,
        creatorId: user.sub,
        abi: '',
        smartContractAddress: '',
        agentName: '',
        agentPurpose: '',
        chain: caipNetwork.name,
        agentInstructions: '',
        creatorWalletAddress: address,
        tags: []
    });

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            agentInstructions: mappingText // Assigns streamed text with paragraph formatting
        }));
    }, [mappingText]);
    

    const handleFetch = () => {
        if(!formData.agentInstructions) {
            if (formData.abi.trim()) {
                fetchFuncMappings({ abi: formData.abi });
            }
        }
    };

    const handleFocus = () => {
        setDropdownVisible(true);
    };

    const handleBlur = (e) => {
        // Ensure the click inside dropdown doesn't close it
        if (!dropdownRef.current?.contains(e.relatedTarget)) {
            setDropdownVisible(false);
        }
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTagClick = (tag) => {
        // Add tag if not already selected
        if (!selectedTags.includes(tag)) {
            setSelectedTags((prev) => [...prev, tag]);
        }
        setDropdownVisible(false);
    };

    const handleRemoveTag = (tag) => {
        setSelectedTags((prev) => prev.filter((t) => t !== tag));
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData((prev) => ({
                    ...prev,
                    abi: event.target.result,
                }));
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const agentData = {
            ...formData,
            tags: selectedTags,
        };
        console.log(agentData);
        const res = await createAgent(agentData);
        if (res) {
            console.log("RES:", res)
            if(res.success) {
                setCreatedAgentDetails(res?.data);
                setShowPopup(true);
                setFormData({
                    creatorName: '',
                    creatorId: '',
                    abi: '',
                    smartContractAddress: '',
                    agentName: '',
                    agentPurpose: '',
                    chain: '',
                    agentInstructions: '',
                    creatorWalletAddress: '',
                    tags: []
                });
            } else {
                setShowFailedPop(true);
                setErrorMsg(res?.err)
            }
        }
    };

    return (
        <div className='CreateAgent'>
            <Menu />

            <FullscreenOverlay show={showPopup} close={() => setShowPopup(false)}>
                <PopupModal
                    title={"Agentify"}
                    message={`Your Agent ${createdAgentDetails?.agentName} has been created successfully`}
                    buttons={[
                        { text: "Home", variant: "outlined", onClick: () => navigate('/') },
                        { text: "Test Agent", variant: "filled", onClick: () => navigate('/playground') },
                    ]}
                />
            </FullscreenOverlay>

            <FullscreenOverlay show={showFailedPop} close={() => setShowFailedPop(false)}>
                <PopupModal
                    title={"Agentify"}
                    message={`${errMsg}`}
                    buttons={[
                        { text: "Check Inputs", variant: "outlined", onClick: () => setShowFailedPop(false) }
                    ]}
                />
            </FullscreenOverlay>

            <form className="createAgentContent" onSubmit={(e) => {
                // e.preventDefault();
                handleSubmit(e);
            }}>

                <div className="createAgentSection">
                    <h2>Create New Agent</h2>
                    <h4>Upload your ABIs and create agents with help of AI</h4>

                    <div className="abi">
                        <TextField
                            className="abiInput"
                            placeholder='Enter your ABI here'
                            multiline
                            rows={6}
                            variant="filled"
                            value={formData.abi}
                            onChange={handleInputChange}
                            id="abi"
                            slotProps={{
                                input: {
                                    disableUnderline: true,
                                },
                            }}
                        />
                        <div className="uploadABIBox">
                            <Button
                                className="uploadABI"
                                endIcon={<FiUpload size={"14px"} />}
                                component="label"
                            >
                                <span>or Upload ABI</span>
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleFileUpload}
                                />
                            </Button>
                            {/* <input type="file" id="file" name="file"></input> */}
                        </div>
                    </div>

                    <div className="contract">
                        <h2>Enter Contract Details</h2>

                        <label htmlFor="smartContractAddress">Smart Contract Address</label>
                        <input
                            id="smartContractAddress"
                            placeholder='Ex. 0x1234abcd5678efgh9012ijkl3456mnop7890qrst'
                            value={formData.smartContractAddress}
                            onChange={handleInputChange}
                        />
                        <span className="info">
                            Ensure the address corresponds to the uploaded ABI file.
                        </span>

                        <label htmlFor="agentName">Agent Name</label>
                        <input
                            id='agentName'
                            placeholder='Ex. Customer Support Chatbot'
                            value={formData.agentName}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>

                <div className="agentPurposeSection">
                    <h2>Agent Purpose</h2>
                    <TextField
                        id="agentPurpose"
                        placeholder="Write your description"
                        multiline
                        rows={6}
                        variant="filled"
                        value={formData.agentPurpose}
                        onChange={handleInputChange}
                        slotProps={{
                            input: {
                                disableUnderline: true,
                            },
                        }}
                    />

                    <h2 style={{ marginTop: "5px" }}>Instructions</h2>
                    <TextField
                        id="agentInstructions"
                        placeholder="Write your instructions for functions which is listed in the ABI..."
                        multiline
                        rows={6}
                        variant="filled"
                        value={formData.agentInstructions}
                        onChange={handleInputChange}
                        onClick={handleFetch}
                        slotProps={{
                            input: {
                                disableUnderline: true,
                            },
                        }}
                    />

                    <div className="createAgentSection" style={{ padding: 0 }}>
                        <div className="contract" style={{ marginTop: 0, position: "relative" }}>
                            <label htmlFor="tags" style={{ marginTop: "20px" }}>Tags</label>
                            <input
                                id='tags'
                                onClick={handleFocus}
                                placeholder='Ex. DeFi, Memes, DAO, etc..'
                            />

                            {isDropdownVisible && (
                                <div
                                    className="dropdown"
                                    ref={dropdownRef}
                                    style={{
                                        position: "absolute",
                                        bottom: "98%",
                                        left: 0,
                                        width: "100%",
                                        background: "#111521",
                                        border: "1px solid #ccc",
                                        boxShadow: "rgba(255, 255, 255, 0.21) 1.95px 1.95px 2.6px",
                                        borderRadius: "13px",
                                        marginTop: "4px",
                                        zIndex: 10,
                                    }}
                                >
                                    {tags.map((tag) => (
                                        <div
                                            key={tag}
                                            onClick={() => handleTagClick(tag)}
                                            tabIndex={0}
                                            style={{
                                                padding: "8px",
                                                cursor: "pointer",
                                                borderBottom: "1px solid #eee",
                                            }}
                                            onKeyDown={(e) => e.key === "Enter" && handleTagClick(tag)}
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div
                            className="selected-tags"
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                            }}
                        >
                            {selectedTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="tag-view"
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        style={{
                                            marginLeft: "8px",
                                            fontSize: 15,
                                            background: "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "#00796b",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="buttons">
                        <Button className='discard' variant='outlined'>
                            Discard
                        </Button>
                        <Button
                            className='create'
                            variant='filled'
                            // onClick={() => {
                            //     setShowPopup(!showPopup)
                            // }}
                            type='submit'
                        >
                            {loading ? "Creating..." : "Create Agent"}
                        </Button>
                    </div>

                </div>

            </form>
        </div>
    );
}

export default CreateAgent;