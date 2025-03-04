import './SupportChains.css'
import image1 from '../../../../assets/supportchanis/image11.png'
import image2 from '../../../../assets/supportchanis/image2.png'
import image3 from '../../../../assets/supportchanis/image3.png'
import image4 from '../../../../assets/supportchanis/image4.png'
import image5 from '../../../../assets/supportchanis/image5.png'
function SupportChains(){
    return(
        <>
        <div className='supportchain-container'>
            <p className='supportchain-header'>
             Supported Chains
            </p>
            <div className='supportchain-list'>
                <div className='supportchain-items'><img src={image1}/></div>
                <div className='supportchain-items'><img src={image2}/></div>
                <div className='supportchain-items'><img src={image3}/></div>
                <div className='supportchain-items'><img src={image4}/></div>
                <div className='supportchain-items'><img src={image5}/></div>
            </div>
        </div>
        </>
    )
}

export default SupportChains