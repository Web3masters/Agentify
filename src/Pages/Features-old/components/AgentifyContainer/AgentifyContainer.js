import './AgentifyContainer.css'
import Agentifypop from '../Agentifypop/Agentifypop'
function AgentifyContainer(){
    return(
        <>
        <button className='AgentifyContainer-btn'>AGENTIFY</button>
        <p className='AgentifyContainer-header-text'>Effortless Agent Creation in Just a Few Steps,<br/> From ABI to Full Integration</p>
        <p className='AgentifyContainer-sub-header-text'>Get ABI from Smart Contract, Upload ABI, Create Agent, Test and Integrate</p>
        <div className='AgentifyContainer-for-details'>

            <div className="AgentifyContainer-for-details-item-left-card">
                    <div className="">
                    <p className='AgentifyContainer-left-content-header'>Simplified Agent <br/>Creation</p>
                    <p className='AgentifyContainer-left-content-p'>Easily create AI-powered agents by <br/> uploading ABIs—no coding required</p>
                    </div>
            </div>

            <div className="AgentifyContainer-for-details-item-right-card">
                    <div className="AgentifyContainer-for-details-item-right-content">
                    <p className='AgentifyContainer-for-details-item-right-content-counttext'>200 +</p>
                    <p className='AgentifyContainer-right-content-header'>Access Pre Built Agents</p>
                    <p className='AgentifyContainer-right-content-p'>Choose from a library of prebuilt agents <br/> designed for popular protocols.</p>
                    </div>
            </div>

            <div className='AgentifyContainer-for-details-item-third'>
                <p className='AgentifyContainer-right-content-header'>Real time Testing and <br/> Seamless Integration</p>
                    <p className='AgentifyContainer-right-content-p'>Validate your agents in a chat-style <br/>Playground before deployment. Deploy <br/> agents in minutes with embeddable code <br/> snippets or widgets.</p>
                    <div className='AgentifyContainer-pop'>
                        <Agentifypop />
                    </div>
            </div>
            
        </div>
        </>
    )
}

export default AgentifyContainer