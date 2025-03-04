import './Agentifyinfo.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import downloadImage from '../../../../assets/download.png';
import React from 'react';
function Agentifyinfo() {
    const isDesktop = () => window.innerWidth > 768;
    const defaultText = {
        text: isDesktop()
        ? "``Agentify makes blockchain development\neffortless by transforming ABIs into fully\nfunctional agents with ease. It's a must-have tool\nfor any developer looking to streamline their\nworkflow.``"
        : "``Agentify makes blockchain development effortless by transforming ABIs into fully functional agents with ease. It's a must-have tool for any developer looking to streamline their workflow.``",
        name: "Genelia D'souza\n\n",
        desc: 'CEO, The Network of Brains'
    };

    const alternateText = {
        text: "This Web Developed by HK\n\n",
        name: "Harish Kumar T\n\n",
        desc: 'Intern in TecKas'
    };

    const [currentText, setCurrentText] = React.useState(defaultText);

    const updateText = (text) => {
        const secText = document.querySelector('.agentifyinfo-sec-covertxt');
        const name = document.querySelector('.image');
        const desc = document.querySelector('.description');
        if (secText) {
            secText.innerHTML = text.text;
            name.innerHTML = text.name;
            desc.innerHTML = text.desc;
            setCurrentText(text);
        }
    };

    return (
        <>
            <div className='agentifyinfo-container'>
                <div className='agentifyinfo-first'>
                    <p className='agentifyinfo-first-header'><br />
                        Listen from People</p>
                    <p className='agentifyinfo-first-covertext'>From Our<br /><strong>Community</strong>.</p>
                    <p className='agentifyinfo-first-info'>Here's what others had to say about <br /> our Agentify</p>
                    <div className='agentifyinfo-first-navigationbtn-cnt'>
                        <div className='agentifyinfo-first-navigationbtn' onClick={() => updateText(defaultText)}><KeyboardArrowLeftIcon /></div>
                        <div className='agentifyinfo-first-navigationbtn' onClick={() => updateText(alternateText)}><KeyboardArrowRightIcon /></div>
                    </div>
                </div>
                <div className='agentifyinfo-sec'>
                    <p className='agentifyinfo-sec-covertxt' style={{ whiteSpace: 'pre-line' }}>{currentText.text}</p>
                    <div className='review'>
                        <img src={downloadImage} className='circle-image' />

                        <div className='text-holder'>
                            <p className='image'>{currentText.name}</p>
                            <p className='description'>{currentText.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Agentifyinfo