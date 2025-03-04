import './Agentifypop.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import uploadIcon from '../../../../assets/Vector.png'
import CallMadeIcon from '@mui/icons-material/CallMade';

function Agentifypop(){

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });


    return(
        <>
            <div className='agentifypop-container'>
              <p className='agentifypop-header'>Agentify
                <div className='agentifypop-create-successfully-pop'>
                    <p className='agentifypop-create-successfully-pop-text'>{"</>"}</p>
                    <p className='agentifypop-create-successfully-pop-text'>Your Agent<br/>
                    created Successfully</p>

                    <Button style={{color:"#000000"}} className='agentify-goback-bnt' variant="outlined">
                      Go to Playground<CallMadeIcon/>
                    </Button>
                </div>
              </p>
              <div className='AgentifyContainer-pop-upload-abi'>
                <p className='agentifypop-lable'>Upload ABI</p>
              <Button
                className='agentifypop-drop-down-button'
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                style={{width: "100%", minWidth: "310px"}}
                >
                    <img src={uploadIcon} />
                    <p className='agentifypop-drop-down-button-mainlable' >Drag and drop your ABI file here</p>
                    <p className='agentifypop-drop-down-button-secondlable'>supported JSON files</p>
               
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                />
               </Button>
              </div>
              <div style={{marginTop:"1rem"}}>
              <p className='agentifypop-lable'>Enter your Agent Name</p>
              <input className='agentifypop-AgentName-input' style={{width: "100px", minWidth: "310px"}} />
              </div>

              <div style={{marginTop:"1rem"}}>
              <Button style={{color:"#000000", width: "310px"}} className='agentify-bnt' variant="outlined">
                    Test agent<CallMadeIcon/>
                </Button>

                <Button style={{color:"#b2a1fc", width: "310px"}} className='agentify-embed-agentbnt' variant="outlined" >
                    Embed the agent
                </Button>
              </div>
            </div>
        </>
    )
}

export default Agentifypop