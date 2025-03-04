import { NavLink } from 'react-router-dom'
import './Menu.css'
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
// import image from './image.png';
import { RiMenu3Line } from "react-icons/ri";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { useAuth0 } from '@auth0/auth0-react';

function Menu(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isConnected } = useAppKitAccount();
    const { connect, connectors, isConnecting } = useConnect();
    const { disconnect } = useDisconnect();
    const { address } = useAccount();
    const { chainId,caipNetwork } = useAppKitNetwork();
    const { open } = useAppKit();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { logout } = useAuth0();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    useEffect(()=>{
        console.log(isConnecting);
        console.log(address)
        console.log(chainId);
        console.log(caipNetwork.name);
    },[address]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleConnect = () => {
        open({ view: 'Connect' });
    };

    const handleDisconnect = () => {
        open({ view: 'Account' });
    };


    return(
        <>
        <nav className='pc-menu-container' style={{position: isMenuOpen ? "fixed" : "sticky"}}>
            <NavLink to={"/"}>Agentify</NavLink>
            <div className='pc-menu-items'>
                <NavLink to={'/'}>Dashboard</NavLink>
                <NavLink to={'/marketplace'}>Marketplace</NavLink>
                <NavLink to={'/create'}>Create Agent</NavLink>
                <NavLink to={'/playground'}>Playground</NavLink>
                </div>
            <div className='menu-right'>
            <div>
                {!address ? (
                    <div style={{cursor:"pointer"}} onClick={handleConnect}>
                     <svg width="55" height="54" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.696289" width="54" height="54" rx="27" fill="url(#paint0_linear_85_1527)"/>
                    <path d="M20.665 22.5H25.4463" stroke="white" stroke-width="1.6875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M38.3951 23.6953H35.2849C33.1513 23.6953 31.4229 25.3006 31.4229 27.2812C31.4229 29.2619 33.1525 30.8672 35.2837 30.8672H38.3951C38.4955 30.8672 38.5445 30.8672 38.5864 30.8648C39.2318 30.8254 39.7458 30.3484 39.7876 29.7496C39.79 29.7113 39.79 29.6647 39.79 29.5727V24.9898C39.79 24.8978 39.79 24.8512 39.7876 24.8129C39.7446 24.2141 39.2318 23.7371 38.5864 23.6977C38.5457 23.6953 38.4955 23.6953 38.3951 23.6953Z" stroke="white" stroke-width="2.53125"/>
                    <path d="M38.5529 23.6953C38.4597 21.4577 38.1608 20.0855 37.1938 19.1197C35.7941 17.7187 33.5397 17.7188 29.0322 17.7188H25.4463C20.9388 17.7188 18.6844 17.7187 17.2847 19.1197C15.885 20.5206 15.8838 22.7737 15.8838 27.2812C15.8838 31.7888 15.8838 34.0431 17.2847 35.4428C18.6856 36.8426 20.9388 36.8438 25.4463 36.8438H29.0322C33.5397 36.8438 35.7941 36.8437 37.1938 35.4428C38.1608 34.477 38.4609 33.1048 38.5529 30.8672" stroke="white" stroke-width="2.53125"/>
                    <path d="M34.998 27.2812H35.01" stroke="white" stroke-width="1.6875" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_85_1527" x1="0.696289" y1="27.5993" x2="54.6963" y2="26.4007" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#B2A1FC"/>
                    <stop offset="1" stop-color="#B2A1FC"/>
                    </linearGradient>
                    </defs>
                    </svg>
                </div>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" ,cursor:"pointer"}} onClick={handleDisconnect}>
                   <svg width="55" height="54" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.696289" width="54" height="54" rx="27" fill="url(#paint0_linear_85_1527)"/>
                  <path d="M20.665 22.5H25.4463" stroke="white" stroke-width="1.6875" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M38.3951 23.6953H35.2849C33.1513 23.6953 31.4229 25.3006 31.4229 27.2812C31.4229 29.2619 33.1525 30.8672 35.2837 30.8672H38.3951C38.4955 30.8672 38.5445 30.8672 38.5864 30.8648C39.2318 30.8254 39.7458 30.3484 39.7876 29.7496C39.79 29.7113 39.79 29.6647 39.79 29.5727V24.9898C39.79 24.8978 39.79 24.8512 39.7876 24.8129C39.7446 24.2141 39.2318 23.7371 38.5864 23.6977C38.5457 23.6953 38.4955 23.6953 38.3951 23.6953Z" stroke="white" stroke-width="2.53125"/>
                  <path d="M38.5529 23.6953C38.4597 21.4577 38.1608 20.0855 37.1938 19.1197C35.7941 17.7187 33.5397 17.7188 29.0322 17.7188H25.4463C20.9388 17.7188 18.6844 17.7187 17.2847 19.1197C15.885 20.5206 15.8838 22.7737 15.8838 27.2812C15.8838 31.7888 15.8838 34.0431 17.2847 35.4428C18.6856 36.8426 20.9388 36.8438 25.4463 36.8438H29.0322C33.5397 36.8438 35.7941 36.8437 37.1938 35.4428C38.1608 34.477 38.4609 33.1048 38.5529 30.8672" stroke="white" stroke-width="2.53125"/>
                  <path d="M34.998 27.2812H35.01" stroke="white" stroke-width="1.6875" stroke-linecap="round" stroke-linejoin="round"/>
                  <defs>
                  <linearGradient id="paint0_linear_85_1527" x1="0.696289" y1="27.5993" x2="54.6963" y2="26.4007" gradientUnits="userSpaceOnUse">
                  <stop stop-color="red"/>
                  <stop offset="1" stop-color="red"/>
                  </linearGradient>
                  </defs>
                  </svg>
                    <span className='address-text' style={{ fontSize: "18px"}}>
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>                  
                )}
                </div>
                   <Button className='pc-menu-connect-btn' onClick={() => logout({ returnTo: window.location.origin })}>
                     Log Out
                    </Button>
                <div className='mobile-only'>
                    <RiMenu3Line className='hamburger-btn' onClick={toggleMenu} />
                </div>
            </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
            <div className='mobile-menu-links'>
                <NavLink to={'/'} onClick={toggleMenu}>DASHBOARD</NavLink>
                <NavLink to={'/marketplace'} onClick={toggleMenu}>MARKETPLACE</NavLink>
                <NavLink to={'/create'} onClick={toggleMenu}>CREATE AN AGENT</NavLink>
                <NavLink to={'/playground'} onClick={toggleMenu}>PLAYGROUND</NavLink>
            </div>
        </div>
        </>
    )
}

export default Menu
