import './Features.css'
import Menu from '../../components/Menu/Menu'
import CoverInfo from './components/CoverInfo/CoverInfo'
import SupportChains from './components/Supportchains/SupportChains'
import Agentifypop from './components/Agentifypop/Agentifypop'
import TechnologyContainer from './components/TechnologyContainer/TechnologyContainer'
import AgentifyContainer from './components/AgentifyContainer/AgentifyContainer'
import Agentifyinfo from './components/Agentifyinfo/Agentifyinfo'
import Footer from './components/Footer/Footer.js'
import appScreenshot from "../../assets/AttractiveFrame.png"
import { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Features=()=>{
    const { getAccessTokenSilently } = useAuth0();
     const tokenn = async () => {
        try {
          const token = await getAccessTokenSilently();
          console.log(token);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      };
      useEffect(() => {
        tokenn();
      }, []);
    return(
        <>
        <div className='features-main-container'>
            <div className='features-cover-container'>
                <BgmTable/>
                <div className='features-cover-container-content'>
                    <Menu/>
                    
                    <CoverInfo />                    
                    

                </div>
            </div>
            <div className='app-screenshot'>
                {/* <AttractiveFrameImage/> */}
                <img src={appScreenshot} alt="App Demo Screenshot" className="app-screenshot-img"/>
                
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
            <div className='footerr'>
                <Footer />
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
                <div className='center-blur' >
            
                </div>
        </>
    )
}