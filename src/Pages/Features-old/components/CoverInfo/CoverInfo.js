import './CoverInfo.css'
import Button from '@mui/material/Button';
import CallMadeIcon from '@mui/icons-material/CallMade';

function CoverInfo(){
    return(
        <>
        <div className='coverinfo-container'>
            <p className='coverinfo-header-text'>
                Effortlessly create <span style={{color:"#b2a1fc"}}>AI agents</span> for <br/> Blockchain Smart Contracts
            </p> 
            <p className='coverinfo-sub-header-text'>Upload ABIs, access prebuilt agents, and bring your <br/> protocols to life in just a few clicks</p>
            <div className='coverinfo-action-btn'>
                <Button style={{color:"#000000"}} className='coverinfo-getstart-bnt' variant="outlined" endIcon={<CallMadeIcon style={{fontSize:"0.85rem", position:"absolute", top:"1.1rem", left:"9rem"}} />}>
                    Get Start
                </Button>
                <Button className='coverinfo-bnt' variant="outlined" >
                    Explore Marketplace
                </Button>
            </div>
            <p className='coverinfo-sub-header-text'>200+ Pre Built ABI Agents. Test them and embed into your platform</p>

        </div>
        </>
    )
}

export default CoverInfo