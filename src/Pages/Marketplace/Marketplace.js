import React, { useRef, useState, useEffect } from 'react';
import Menu from '../../components/Menu/Menu'
import { Checkbox, Button, FormGroup, FormControlLabel } from '@mui/material';

import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { CiFilter } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


import Card from "../../components/Card/Card.tsx";

import marketplaceCards from "../../data/marketplaceCards.js";

import "./Marketplace.scss"
import { useNavigate } from 'react-router-dom';
import useAgentHooks from '../../Hooks/useAgentHooks.js';

const Marketplace = () => {

    const navigate = useNavigate();

    const [filters, setFilters] = useState([
        "Memes",
        "DeFi",
        "Investing",
        "DAO",
        "Ecosystem",
        "Computational",
        "Other",
    ]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const [cards, setCards] = useState([])
    const [filteredCards, setFilteredCards] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const pageInput = useRef();
    const [startIndex, setStartIndex] = useState(0);
    const [stopIndex, setStopIndex] = useState(itemsPerPage);

  
    const { fetchAgents, agents } = useAgentHooks();
    const fetchData = async () => {
        const response = await fetchAgents({
          search: searchText,
          tags: selectedFilters,
          page: currentPage,
          limit: itemsPerPage,
        });
        if(response.agents && response.agents.length > 0 ) {
          setCards(response.agents);
          setFilteredCards(response.agents);
          console.log("RES:", response.agents)
          setTotalPages(response.page);
        } else {
          setCards([]);
          setFilteredCards([]);
          setTotalPages(response.page);
        }
      };

      useEffect(() => {
        fetchData();
      }, [searchText, selectedFilters, currentPage]);
      
      const handleSearchChange = (e) => {
        setSearchText(e.target.value);
      };
  

    // useEffect(() => {
    //     // we will be doing an API call here to get the cards.
    //     setCards(marketplaceCards);
    //     setFilteredCards(marketplaceCards);
    // }, []);

    const handleFilterChange = (filter) => {
        setSelectedFilters((prevFilters) =>
          prevFilters.includes(filter)
            ? prevFilters.filter((item) => item !== filter)
            : [...prevFilters, filter]
        );
      };

      const goToPage = (index) => {
        setCurrentPage(index + 1);
      };
    
      const handlePagination = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };

    const handlePageInputChange = () => {
        if ( pageInput.current.value > 0 && pageInput.current.value <= Math.ceil(filters.length / itemsPerPage)  ) {
            setStartIndex( (pageInput.current.value - 1)*itemsPerPage );
            setStopIndex( (pageInput.current.value)*itemsPerPage );
        }
    };

    const search = (searchText) => {
        let filteredCards = cards.filter((card) => card.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredCards(filteredCards);
    }

    const filter = () => {
        let filteredCards = cards.filter((card) => selectedFilters.includes(card.category));
        setFilteredCards(filteredCards);
    }

    // useEffect(() => {
    //     filter();
    // }, [selectedFilters])

    return (
        <div className='Marketplace'>
            <Menu />

            <div className='marketplaceContent'>
                <div className='header'>
                    <h1>Agent Marketplace</h1>
                    <Button className='pc-menu-connect-btn' variant="filled" endIcon={<ControlPointRoundedIcon />} onClick={() => navigate("/create")}>
                        Create new Agent
                    </Button>
                </div>

                <div className="inputContainer">
                    <input type="text" placeholder='Search any agent or keyword'   onChange={handleSearchChange}
            value={searchText} />
                    <Button 
                        variant='filled' 
                        startIcon={ <CiFilter/> }
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <span className="text">Filter by</span>
                    </Button>
                </div>
                <FormGroup className={`inputFilters ${(showFilters) ? 'show' : ''}`}>
                    {
                        filters.map((filter, index) => (
                            <FormControlLabel 
                                onChange={() => {
                                    console.log("changed checkbox")
                                    if (selectedFilters.includes(filter)) {
                                        console.log(`Show ${filter}`)
                                        setSelectedFilters(selectedFilters.filter((item) => item !== filter));
                                    } else {
                                        console.log(`Hide ${filter}`)
                                        setSelectedFilters([...selectedFilters, filter]);
                                    }
                                }}
                                className='filter' 
                                control={
                                    <Checkbox 
                                    onChange={() => handleFilterChange(filter)}
                                        sx={{
                                        color: 'white',
                                        '&.Mui-checked': {
                                          color: '#ABBDFE',
                                        },
                                      }} 
                                      inputProps={{
                                        'aria-label': 'primary checkbox',
                                      }}
                                    />
                                } 
                                label={filter} />
                        ))
                    }
                </FormGroup>

                <div className="agentsGridContainer">
                    <div className="agentsGrid">
                        {
                            filteredCards.slice(startIndex, stopIndex).map((card, index) => {
                                return (
                                    <Card
                                        key={index}
                                        {...card}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

            </div>

          

              <div className="bottomPagination">
                      <div className="pagination">
                        <button
                          className="leftArrow"
                          disabled={currentPage === 1}
                          onClick={() => handlePagination('prev')}
                        >
                          <FaChevronLeft size="20px" />
                        </button>
            
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => goToPage(index)}
                          >
                            {index + 1}
                          </button>
                        ))}
            
                        <button
                          className="rightArrow"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePagination('next')}
                        >
                          <FaChevronRight size="20px" />
                        </button>
                      </div>
                    </div>
        </div>
    );
}

export default Marketplace;