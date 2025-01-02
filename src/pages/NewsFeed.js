import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth_fetch_articles, fetch_articles, fetch_categories } from '../apis/feeds';
import moment from 'moment';

function NewsFeed() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [currentPage, setCurrentPage] = useState(1);


    const localToken = localStorage.getItem('token');

    const fetchArticles = async (page = currentPage) => {
        setProcessing(true);
        try {
            const queryParams = [];
            if (searchText) queryParams.push(`search=${searchText}`);
            if (selectedCategory) queryParams.push(`category=${selectedCategory}`);
            if (selectedSource) queryParams.push(`source=${selectedSource}`);
            if (startDate) queryParams.push(`start_date=${startDate}`);
            if (selectedAuthor) queryParams.push(`author=${selectedAuthor}`);
            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}&page=${page}` : `?page=${page}`;

            const response = localToken ? await auth_fetch_articles(queryString) : await fetch_articles(queryString);
            console.log('Response: ',response);
            const data = await response?.data;
            setArticles(data?.data);
            setPagination(data);
            setProcessing(false);
        } catch (error) {
            alert('Can not retrive articles at this time, refresh the page!');
            console.log('Articles error: ',error);
            setProcessing(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
  
    useEffect(() => {
      fetchArticles();
    }, [searchText, selectedCategory, selectedSource, startDate, selectedAuthor, currentPage]);

    useEffect(() => {
        // Fetch available categories and sources
        const fetchCategories = async () => {
            setProcessing(true);
            try {
                const response = await fetch_categories();
                console.log('Category Response: ',response);
                const data = response?.data; 
                data?.categories?.length > 0 && setCategories(data?.categories);
                data?.sources?.length > 0 && setSources(data?.sources);
                setProcessing(false);
            } catch (error) {
                alert('Critical error: unable to retrieve categories and sources');
                console.log('Category fetching error: ',error);
                setProcessing(false);
            }
        };
        fetchCategories();
    }, []);

    const clearFilter = () => {
        setSearchText('');
        setSelectedCategory('');
        setSelectedSource('');
        setStartDate('');
        setAuthors('');
        setCurrentPage(1);
    };
  
    return (
      <div className="container mt-5">
        <h2>News Feed</h2>

        <div className="mb-3">
            <input
            type="text"
            className="form-control"
            placeholder="Search articles..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            >
            <option value="">All Categories</option>
            {categories?.map((category) => (
                <option key={category} value={category}>{category}</option>
            ))}
            </select>
        </div>

        <div className="mb-3">
            <select
            className="form-select"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            >
            <option value="">All Sources</option>
            {sources?.map((source) => (
                <option key={source} value={source}>{source === "nyt" ? "new york time" : source}</option>
            ))}
            </select>
        </div>

        <div className="mb-3">
            <input
                type="date"
                className="form-control"
                placeholder="Start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                />
        </div>
        <div className='d-flex mb-3 justify-content-end gap-2'>
        <button type="button" onClick={clearFilter} className="btn btn-secondary">Clear filter</button>
        </div>
        

        {processing && <p>Loading articles...</p>}

        {articles?.map((article) => (
          <div key={article.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title"><a href={article?.url ? article?.url : '#'} target='_blank' rel="noreferrer">{article?.title}</a></h5>
              <p className="card-text">{article?.content}</p>
              <p className="card-text">
                <small className="text-muted">{article?.source === "nyt" ? "new york time" : article?.source} | </small>
                {article?.author && <small className="text-muted">{article?.author} | </small>}
                <small className="text-muted">{moment(article?.published_at).format('MMMM Do YYYY, h:mm:ss a')} </small>
              </p>
            </div>
          </div>
        ))}

        {pagination && (
            <nav>
            <ul className="pagination justify-content-center">
                {Array.from({ length: pagination.last_page }, (_, i) => (
                <li key={i + 1} className={`page-item ${pagination.current_page === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                    </button>
                </li>
                ))}
            </ul>
            </nav>
        )}
      </div>
    );
  };

  export default NewsFeed;