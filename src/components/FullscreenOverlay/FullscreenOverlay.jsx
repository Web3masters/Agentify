import { useState, useEffect } from "react";

import "./FullscreenOverlay.scss";

export default function FullscreenOverlay(props) {
    const [render, setRender] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        if (props.show) {
            setRender(props.show);

            setTimeout(() => {
                setFadeIn(props.show);
            }, 10);
        } else {
            setFadeIn(false);
            setTimeout(() => {
                setRender(false);
            }, 200);
        }
    }, [props.show]);

    return (
        <div>
            {render && (
                <div className={`FullscreenOverlay ${fadeIn ? 'show' : 'hide'}`} onClick={props.close}>
                    { props.children }
                </div>
            )}
        </div>
    );
};