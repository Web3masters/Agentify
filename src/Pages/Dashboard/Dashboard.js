import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu/Menu';
import { Checkbox, Button, FormGroup, FormControlLabel } from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { CiFilter } from 'react-icons/ci';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import Card from '../../components/Card/Card.tsx';
import dashboardCards from '../../data/dashboardCards.js';
import { useNavigate } from 'react-router-dom';

import './Dashboard.scss';
import useAgentHooks from '../../Hooks/useAgentHooks.js';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([
    'Memes',
    'DeFi',
    'Investing',
    'DAO',
    'Ecosystem',
    'Computational',
    'Other',
  ]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);
  const { fetchAgents, agents } = useAgentHooks();
  const { user } = useAuth0();
  const fetchData = async () => {
    const response = await fetchAgents({
      search: searchText,
      tags:selectedFilters,
      startDate,
      endDate,
      page: currentPage,
      limit: itemsPerPage,
      creatorId:user.sub
    });
    setCards(response.agents);
    setFilteredCards(response.agents);
    console.log(response.agents);
    console.log(response.page);
    if(response.page!=0){
      setTotalPages(response.page);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchText, tags,selectedFilters, startDate, endDate, currentPage]);
  

  useEffect(() => {
    console.log("Updating filteredCards:", cards);
    setFilteredCards(
      cards?.filter(
        (card) =>
          (!selectedFilters.length ||
            selectedFilters.some((filter) => card.tags?.includes(filter))) &&
          card.creatorName?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [cards, searchText, selectedFilters, currentPage]);
  
  

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

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
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        return newPage;
      });
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        return newPage;
      });
    }
  };
  

  return (
    <div className="Dashboard">
      <Menu />

      <div className="DashboardContent">
        <div className="header">
          <h1>Agent Dashboard</h1>
          <Button
            className="pc-menu-connect-btn"
            variant="contained"
            endIcon={<ControlPointRoundedIcon />}
            onClick={() => navigate('/create')}
          >
            Create new Agent
          </Button>
        </div>

        <div className="inputContainer">
                    <input type="text" placeholder='Search any agent or keyword'  onChange={handleSearchChange}
            value={searchText} />
                    <Button 
                        variant='filled' 
                        startIcon={ <CiFilter/> }
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <span className="text">Filter by</span>
                    </Button>
                </div>


        <FormGroup className={`inputFilters ${showFilters ? 'show' : ''}`}>
          {filters.map((filter, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  onChange={() => handleFilterChange(filter)}
                  sx={{
                    color: 'white',
                    '&.Mui-checked': {
                      color: '#ABBDFE',
                    },
                  }}
                />
              }
              label={filter}
            />
          ))}
        </FormGroup>

        <div className="agentsGridContainer">
          <div className="agentsGrid">
          {filteredCards && filteredCards.map((card, index) => (
  <Card key={index} {...card} updatedDate={card.updatedDate} createdDate={card.createdDate} refreshAgents={fetchData} />
))}

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
    </div>
  );
};

export default Dashboard;
