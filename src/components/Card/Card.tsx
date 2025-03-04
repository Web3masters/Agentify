import React, { useEffect, useState } from "react";
import { Image } from 'mui-image'
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import "./Card.scss";

import { FiUser, FiEdit } from "react-icons/fi"
import { FaCircle } from "react-icons/fa6";

import VerifiedBadge from '../VerifiedBadge/VerifiedBadge.tsx';
import { CardProps, MarketplaceCardBadge, DashboardCardBadge } from "../../types/types.ts";

import decentramizedLogo from "../../assets/cardLogos/decentramind.svg";
import useAgentHooks from "../../Hooks/useAgentHooks.js";
import { useAuth0 } from "@auth0/auth0-react";
export default function Card(props: DashboardCardBadge& { refreshAgents: () => void }) {

    const {updateAgentStatus} = useAgentHooks();
    const location = useLocation(); 
    const { getAccessTokenSilently } = useAuth0();
    useEffect(()=>{
        const tokeen =async()=>{
            const token = await getAccessTokenSilently();
            console.log(token);
        }
        tokeen();
    },[])


    const [button,setButton]=useState({buttons: [
        { text: !props.isPublished ? "Publish Now" : "Published", onClick: () => console.log("Publish Now"), variant: "outlined" },
        { text: "Test Agent", onClick: () => window.location.href = "/playground", variant: "filled" }
    ]})

    const buttons = [
        { 
            text: props.isPublished ? "Published" : "Publish Now", 
            onClick: () => {
                if (!props.isPublished) {
                    updateStatus(props._id);
                }
            },
            variant: "outlined" 
        },
        { 
            text: "Test Agent", 
            onClick: () => window.location.href = "/playground", 
            variant: "filled" 
        }
    ];
    

    const updateStatus = async(id:any)=>{
        await updateAgentStatus(id);
        props.refreshAgents();
        setButton({buttons: [
            { text: "Published", onClick: () => console.log("Publish Now"), variant: "outlined" },
            { text: "Test Agent", onClick: () => window.location.href = "/playground", variant: "filled" }
        ]})
    }

const [market,setMarketButton]=useState({buttons: [
    { text: "Run Agent", onClick: () => window.location.href = "/playground", variant: "filled" }
]})

const isDashboard = location.pathname === "/";
const isMarketplace = location.pathname.includes("/marketplace");


    const Tag = isDashboard? Link : "div";

    return (
        <Tag to={ (isDashboard && props._id) ? `/agent-details?agentID=${props._id}` : "/"} className={`Card ${isDashboard ? 'dashboard' : 'marketplace'}`} {...props}>
            <div className="headRow">
                <span className="agentName">
                    <Image src={props.logo || decentramizedLogo} width={20} />
                    {props.agentName || "Title not given"}
                </span>

                <span className="info">
                    {/* {isMarketplace && (
                        <span className="category">
                            {props.agentName || "Blank"}
                        </span>
                    )} */}
                    
                    {
                        (isMarketplace && props) && (
                            <VerifiedBadge color={"green"} />
                        )
                    }
                    {
                        (isDashboard && props.isPublished !== undefined) && (
                            <VerifiedBadge text={(props.isPublished) ? "Published" : "Private"} color={ (props.isPublished) ? "green" : "red" } />
                        )
                    }
                </span>
            </div>
            {
                (props.creatorName) && (
                    <div className="creator">
                        <FiUser />
                        {props.creatorName || "Sabari"}
                    </div>
                )
            }
            
            <div className="descriptionAndEditContainer">
                <span className="cardDescription">
                    {
                        props.agentPurpose || "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, quis?"
                    }
                </span>
                {
                    (isDashboard) && (
                        <span className="editButtonContainer">
                            <Link to={"/edit-agent?agentID=" + props._id}>
                                <FiEdit size={"15px"} />
                            </Link>
                        </span>
                    )
                }
            </div>

            {isMarketplace || isDashboard &&(
                    <div className="stats">
                        <span className="stat">
                            <span className="number">{props.totalRequests}</span> Interactions
                        </span>
                        <span className="stat">
                            <span className="number">{props?.availableFunctions?.length}</span> Available Functions
                        </span>
                    </div>
                    )}

            {
                (isDashboard && buttons) && (
                    <div className="buttons">
                        {
                            (buttons  || []).map((button, index: number) => {
                                return (
                                    <Button className={button.variant || "filled"} onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                         if (button.text === "Publish Now") {
                                                updateStatus(props._id); 
                                            }
                                        button.onClick && button.onClick();
                                    }} key={index}>
                                        {button.text}
                                    </Button>
                                )
                            })
                        }
                    </div>
                )
            }

{
                (isMarketplace && market) && (
                    <div className="buttons">
                        {
                            (market.buttons  || []).map((button, index: number) => {
                                return (
                                    <Button className={button.variant || "filled"} onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                         if (button.text === "Publish Now") {
                                                updateStatus(props._id); 
                                            }
                                        button.onClick && button.onClick();
                                    }} key={index}>
                                        {button.text}
                                    </Button>
                                )
                            })
                        }
                    </div>
                )
            }
           
        </Tag>
        
    )
}