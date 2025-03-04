import React from "react";

import "./VerifiedBadge.scss";

import { FaCircle } from "react-icons/fa6";

import { BadgePropsType } from "../../types/types";

export default function VerifiedBadge(props: BadgePropsType) {


    return (
        <span className={`badge ${props.color}`}>
            <FaCircle size={"8px"} />
            {props.text || "Verified"}
        </span>
    )
}