import './Agentifyinfo.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
function Agentifyinfo(){
    return(
        <>
        <div className='agentifyinfo-container'>
            <div className='agentifyinfo-first'>
                <p className='agentifyinfo-first-header'>Listen from People</p>
                <p className='agentifyinfo-first-covertext'>From Our<br/> Community.</p>
                <p className='agentifyinfo-first-info'>Here’s what others had to say about <br/> our Agentify</p>
                <div className='agentifyinfo-first-navigationbtn-cnt'>
                    <div className='agentifyinfo-first-navigationbtn'><KeyboardArrowLeftIcon/></div>
                    <div className='agentifyinfo-first-navigationbtn'><KeyboardArrowRightIcon/></div>
                </div>
            </div>
            <div className='agentifyinfo-sec'>
                <p className='agentifyinfo-sec-covertxt'>“Agentify makes blockchain development <br/> effortless by transforming ABIs into fully <br/> functional agents with ease. It's a must-have tool <br/> for any developer looking to streamline their <br/> workflow.”</p>
            </div>
        </div>
        </>
    )
}

export default Agentifyinfo