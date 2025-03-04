import React, { useEffect, useState, useRef } from 'react';
import SearchBar from './SearchBar';
import { FaChevronDown } from "react-icons/fa";
import Card from "../../components/Card/Card.tsx";
import './LeftPanel.css';

import decentramizedLogo from "../../assets/cardLogos/decentramind.svg";

function LeftPanel({ initialCards,onCardSelect, onCardSelectMobile, selectedCard, handleSearch, onClick, fetchAgents,searchText }) {
  const [cards, setCards] = useState(initialCards);
  const [filteredCards, setFilteredCards] = useState(initialCards);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
   const [selectedFilters, setSelectedFilters] = useState([]);

   const panelRef = useRef(null);

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
  
    // commented for search close
    useEffect(() => {
      setCurrentPage(1);
      fetchData(false);
    }, [searchText, selectedFilters]);
  
    useEffect(() => {
      const handleScroll = () => {
        const container = panelRef.current;
        if (!container) return;
        if (
          currentPage < totalPages &&
          !loading
        ) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };
  
      const container = panelRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
      }
  
      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }
      };
    }, [currentPage, totalPages, loading]);
  
    useEffect(() => {
      if (currentPage > 1) {
        fetchData(true); 
      }
    }, [currentPage]);
  

  // Automatically select the first card after cards update
  useEffect(() => {
    // onCardSelect(cards[0]);
    onCardSelectMobile(cards[0])
  }, [cards]);

  return (
    <div className="left-panel">
      <div className="left-panel-header">
        <h2>Agents</h2>
      </div>
      <div className="left-panel-content">
        <SearchBar onSearch={handleSearch} />
        <div className="cards-container" ref={panelRef}>
          {filteredCards?.map((card) => (
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
        {loading && <div className="loading-spinner">Loading...</div>}
        <div className="mobile-cards-container" onClick={onClick}>
          <div className="selectedCard">
            <div className="left">
              <span className="icon">
                <img src={decentramizedLogo} alt="logo" />
              </span>
              <span className="title">{selectedCard?.agentName}</span>
            </div>
            <div className="right">
              <FaChevronDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
