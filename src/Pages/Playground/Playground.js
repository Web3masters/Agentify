import React, { useState, useRef, useEffect } from 'react';
import { LuCodeXml, LuMessageSquareText } from 'react-icons/lu';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosCloseCircle } from "react-icons/io";
import './Playground.css';

import PlaygroundRight from './Playground-Right';
import LeftPanel from "./LeftPanel";

import FullScreenOverlay from "../../components/FullscreenOverlay/FullscreenOverlay";
import SearchBar from './SearchBar';
import Card from '../../components/Card/Card.tsx';

import Menu from "../../components/Menu/Menu";
import useAgentHooks from '../../Hooks/useAgentHooks.js';
import { useContract } from '../../contexts/ContractProvider.js';

const initialCards = [];

function Playground() {

  const [showMenu, setShowMenu] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSwitched, setIsSwitched] = useState(false);

  const [cards, setCards] = useState(initialCards);
  const [searchQuery, setSearchQuery] = useState('');

  const [showAgentSelectModal, setShowAgentSelectModal] = useState(false);
  const [filteredCards, setFilteredCards] = useState(cards);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const pageInput = useRef();
  const [startIndex, setStartIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(itemsPerPage);

  const panelRef = useRef(null);
  const { changeAgent, setChangeAgent, setAbi, setContractAddress } = useContract();

  const { fetchAgents, agents } = useAgentHooks();
  const fetchData = async (isAppending = false) => {
    const response = await fetchAgents({
      search: searchText,
      tags: selectedFilters,
      page: currentPage,
      limit: itemsPerPage,
    });

    if (isAppending) {
      setCards((prevCards) => [...prevCards, ...response.agents]);
      setFilteredCards((prevCards) => [...prevCards, ...response.agents]);
    } else {
      setCards(response.agents);
      setFilteredCards(response.agents);
    }

    setTotalPages(response.page);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchData(false);
  }, [searchText, selectedFilters]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        currentPage < totalPages
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };
    handleScroll();
    const container = panelRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
      }
  
      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }
      };
  }, [currentPage,totalPages]);
  

  useEffect(() => {
    if (currentPage > 1) {
      fetchData(true);
    }
  }, [currentPage]);

  // commented for search close
  // useEffect(() => {
  //   if (showAgentSelectModal) {
  //     setShowAgentSelectModal(true); 
  //   }
  // }, [searchText]);


  const onCardSelect = async (card) => {
    setChangeAgent(!changeAgent);
    setAbi(card?.abi);
    setContractAddress(card?.smartContractAddress);
    setSelectedCard(card);
    setIsSwitched(false);
    setShowAgentSelectModal(false);
  };

  const onCardSelectMobile = async (card) => {
    setSelectedCard(card);
    setIsSwitched(false);
    setChangeAgent(!changeAgent);
    setAbi(card?.abi);
    setContractAddress(card?.smartContractAddress);
  };

  const handleSwitch = () => {
    setIsSwitched(!isSwitched);
  };

  const handleSearch = (query) => {
    setShowAgentSelectModal(true);
    setSearchText(query);
    setShowAgentSelectModal(true);
  };

  const handleSearchDesktop = (query) => {
    setSearchText(query);
  }

  return (
    <div className="app">

      {showAgentSelectModal && <div className="agentSelectModal">
        <FullScreenOverlay show={showAgentSelectModal} close={() => setShowAgentSelectModal(false)}>
          <>
            {/* <div className="closeIcon">
            </div> */}
            <div className='agentSelectModalContent' onClick={(e) => e.stopPropagation()}>
              <div className="agent-select-modal-header">
                <h2>Agents</h2>
                <IoIosCloseCircle size={"30px"} onClick={() => setShowAgentSelectModal(false)} />
              </div>
              <div className="agent-select-modal-content" ref={panelRef}>
                <SearchBar className="agent-select-modal-search" onSearch={handleSearch} />
                <div className="agent-select-modal-cards-container">
                  {filteredCards?.map(card => (
                    <div
                      key={card._id}
                      onClick={() => onCardSelect(card)}
                      className={`card-wrapper ${selectedCard?._id === card._id ? 'selected' : ''}`}
                    >
                      <Card
                        agentName={card.agentName}
                        agentPurpose={card.agentPurpose}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        </FullScreenOverlay>
      </div>}

      <div className="desktop-header">
        <Menu />
      </div>
      <main className="main-content">
        <div className="panels-container">
          <LeftPanel initialCards={filteredCards} onCardSelectMobile={onCardSelectMobile} onClick={() => setShowAgentSelectModal(true)} handleSearch={handleSearchDesktop} onCardSelect={onCardSelect} selectedCard={selectedCard} fetchAgents={fetchAgents} searchText={searchText} />
          <PlaygroundRight
            selectedCard={selectedCard}
            isSwitched={isSwitched}
            onSwitch={handleSwitch}
          />
        </div>
      </main>
    </div>
  )
}

export default Playground; 