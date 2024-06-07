import React, { useState } from 'react';
import useFetchData from '../hooks/useFetchData';

const CardView = () => {
  const { data: usersData, loading, error } = useFetchData("https://dummyjson.com/users");
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6; 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredusers = usersData.users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastuser = currentPage * usersPerPage;
  const indexOfFirstuser = indexOfLastuser - usersPerPage;
  const currentusers = filteredusers.slice(indexOfFirstuser, indexOfLastuser);

  const totalPages = Math.ceil(filteredusers.length / usersPerPage);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Users Card View</h2>
      <div className="mb-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by firstName..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
      </div>
      <div className="row">
        {currentusers.map(user => (
          <div key={user.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img 
                src={user.image} 
                className="card-img-top" 
                alt={user.firstName} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body">
                <h5 className="card-firstName">{user.firstName}</h5>
                <p className="card-text">{user.description}</p>
                <p className="card-text"><strong>Age:</strong>{user.age}</p>
                <p className="card-text"><strong>ID:</strong> {user.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <button 
          className="btn btn-primary" 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardView;
