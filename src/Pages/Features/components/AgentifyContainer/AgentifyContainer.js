import './AgentifyContainer.css'
import Agentifypop from '../Agentifypop/Agentifypop'
import AttractiveFrameImage from '../AttractiveFrameImage/AttractiveFrameImage'

import appScreenshot from "../../../../assets/AttractiveFrame.png"
import { useMediaQuery } from '@mui/material';

function AgentifyContainer() {
    const isDesktop = useMediaQuery('(min-width:1024px)');
    return (
        <>

            <button className='AgentifyContainer-btn'>AGENTIFY</button>
            <br />
            <p className='AgentifyContainer-header-text'>Effortless Agent Creation in Just a Few Steps,<br /> From ABI to Full Integration</p>
            <p className='AgentifyContainer-sub-header-text'>Get ABI from Smart Contract, Upload ABI, Create Agent, Test and Integrate</p>
            <div className='AgentifyContainer-for-details'>

                <div className="row">

                    <div className="AgentifyContainer-for-details-item-left-card">
                        <div className="AgentifyContainer-for-details-item-left-content">
                            <p className='AgentifyContainer-left-content-header'>Simplified Agent <br />Creation</p>
                            <p className='AgentifyContainer-left-content-p'>Easily create AI-powered agents by {isDesktop && <br />} uploading ABIs—no coding required</p>
                        </div>
                    </div>

                    <div className="AgentifyContainer-for-details-item-right-card">
                        <div className="AgentifyContainer-for-details-item-right-content">
                            <p className='AgentifyContainer-for-details-item-right-content-counttext'>200 +</p>
                            <p className='AgentifyContainer-right-content-header'>Access Pre Built Agents</p>
                            <p className='AgentifyContainer-right-content-p'>Choose from a library of prebuilt agents {isDesktop && <br />} designed for popular protocols.</p>
                        </div>
                    </div>

                </div>

                <div className="row">

                    <div className='AgentifyContainer-for-details-item-third'>
                        <div className="text">
                            <p className='AgentifyContainer-right-content-header'>Real time Testing and <br /> Seamless Integration</p>
                            <p className='AgentifyContainer-right-content-p'>Validate your agents in a chat-style <br />Playground before deployment. Deploy <br /> agents in minutes with embeddable code <br /> snippets or widgets.</p>
                        </div>

                        <div className='appscreenshot-container'>
                            <img src={appScreenshot} alt="App screenshot demo" />
                        </div>
                    </div>

                </div>



            </div>
        </>
    )
}

export default AgentifyContainer