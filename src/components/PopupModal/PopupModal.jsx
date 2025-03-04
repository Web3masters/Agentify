import { Button } from "@mui/material";
import "./PopupModal.scss";

import { useState } from "react";




export default function PopupModal(props) {


    return (
        <div className="popupModal" onClick={(e) => e.stopPropagation()}>
            <div className="title">
                {props.title}
            </div>
            <div className="content">
                <div className="message">
                    {props.message}
                </div>
                <div className="buttons">
                    {
                        props.buttons.map((button, index) => {
                            return (
                                <Button variant={button.variant} className={button.variant} onClick={button.onClick} key={index}>
                                    {button.text}    
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}