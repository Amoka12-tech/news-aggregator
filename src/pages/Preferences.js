import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { fetch_categories, get_preference, set_preference } from '../apis/feeds';

function Preferences() {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [processing, setProcessing] = useState(false);
  
    useEffect(() => {
      // Fetch available categories and sources and authors
      const fetchCategories = async () => {
        setProcessing(true);
        try {
            const response = await fetch_categories();
            console.log('Category Response: ',response);
            const data = response?.data; 
            setCategories(data?.categories);
            setSources(data?.sources);
            setAuthors(data?.authors);
            setProcessing(false);
        } catch (error) {
            alert('Critical error: unable to retrieve categories and sources');
            console.log('Category fetching error: ',error);
            setProcessing(false);
        }
      };

      const fetchData = async () => {
        setProcessing(true);
        try {
            const response = await get_preference();
            const data = response?.data; 
            console.log('Preferences Response: ',data?.preferences[0]);
            setSelectedCategories(data?.preferences[0]?.categories ? data?.preferences[0]?.categories : []);
            setSelectedSources(data?.preferences[0]?.sources ? data?.preferences[0]?.sources : []);
            setSelectedAuthors(data?.preferences[0]?.authors ? data?.preferences[0]?.authors : []);
            setProcessing(false);
        } catch (error) {
            alert('Critical error: unable to retrieve settings');
            console.log('Preferences error: ',error);
            setProcessing(false);
        }
      };

      fetchCategories();
      fetchData();
    }, []);
  
    const handleSave = async () => {
        setProcessing(true);
        try {
            const payload = {
                categories: selectedCategories,
                sources: selectedSources,
                authors: selectedAuthors,
              };

            const response = await set_preference(payload);
            const data = response?.data; 
            setSelectedCategories(data?.preferences?.categories);
            setSelectedSources(data?.preferences?.sources);
            setSelectedAuthors(data?.preferences?.authors);
            alert('Preferences saved!');
            setProcessing(false);
        } catch (error) {
            console.log('Saving preferences error: ',error);
            alert('Error: Unable to set preferences, try again!');
            setProcessing(false);
        }
    };
  
    return (
      <div className="container mt-5">
        <h2>Set Preferences</h2>
        <div className="mb-3">
          <label>Categories</label>
          {categories?.length > 0 && categories.map((category) => (
            <div key={category} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedCategories.includes(category)}
                value={category}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category));
                  }
                }}
              />
              <label className="form-check-label">{category}</label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label>Sources</label>
          {sources?.length > 0 && sources.map((source) => (
            <div key={source} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedSources.includes(source)}
                value={source}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSources([...selectedSources, source]);
                  } else {
                    setSelectedSources(selectedSources.filter((s) => s !== source));
                  }
                }}
              />
              <label className="form-check-label">{source === "nyt" ? "new york time" : source}</label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label>Authors</label>
          {authors?.length > 0 && authors?.filter(af => !!af).map((author, index) => (
            <div key={author} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedAuthors.includes(author)}
                value={author}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAuthors([...selectedAuthors, author]);
                  } else {
                    setSelectedAuthors(selectedAuthors.filter((a) => a !== author));
                  }
                }}
              />
              <label className="form-check-label">{author}</label>
            </div>
          ))}
        </div>
        <button disabled={processing} className="btn btn-primary mb-4" onClick={handleSave}>Save Preferences</button>
      </div>
    );
  };

  export default Preferences;