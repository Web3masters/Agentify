import './Features.css'
import Menu from '../../components/Menu/Menu'
import CoverInfo from './components/CoverInfo/CoverInfo'
import SupportChains from './components/Supportchains/SupportChains'
import Agentifypop from './components/Agentifypop/Agentifypop'
import TechnologyContainer from './components/TechnologyContainer/TechnologyContainer'
import AgentifyContainer from './components/AgentifyContainer/AgentifyContainer'
import Agentifyinfo from './components/Agentifyinfo/Agentifyinfo'
const Features=()=>{
    return(
        <>
        <div className='features-main-container'>
            <div className='features-cover-container'>
                <BgmTable/>
                <div className='features-cover-container-content'>
                    <Menu/>
                    <CoverInfo />
                    <SupportChains/>
                    <Agentifypop />
            </div>
            </div>
            <div className='features-technology-container'>
                <TechnologyContainer />
            </div>
            <div className='features-technology-container'>
                <AgentifyContainer />
            </div>
            <div className='features-agentifyinfo-container'>
                <Agentifyinfo />
            </div>
        </div>
        </>
    )
}

export default Features



function BgmTable(){
    return(
        <>
       
         <div className='features-cover-container-lines'>
                    <div className='features-cover-container-lines-div-hr' />
                    <div className='features-cover-container-lines-div-hr' />
                    <div className='features-cover-container-lines-div-hr' />
                    <div className='features-cover-container-lines-div-hr' />
                    <div className='features-cover-container-lines-div-hr' />
                    <div className='features-cover-container-lines-div-hr' />
                    <div className='features-cover-container-lines-div-hr' />
                </div>
                <div className='features-cover-container-lines-vl'>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                    <div className='features-cover-container-lines-vl-div'/>
                </div>
                <div className='features-circle-design' >
            
                </div>
        </>
    )
}