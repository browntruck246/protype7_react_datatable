import './App.css';

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';


const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newEntry, setNewEntry] = useState({ id: "", name: "" });

  useEffect(() => {
    // Fetch initial data (you can replace this with an API call)
    const fetchData = async () => {
      const result = await axios.get("https://jsonplaceholder.typicode.com/users");
      setData(result.data);
      setFilteredData(result.data); // Default filter.
    };
    fetchData();
  }, []);

  // CRUD Handlers
  const handleAdd = () => {
    setData([...data, newEntry]);
    setFilteredData([...data, newEntry]); // Update filtered data.
    setNewEntry({ id: "", name: "" });
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setFilteredData(updatedData); // Update filtered data.
  };

  const handleFilter = (term) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const customStyles = {
    header: {
      style: {
        fontSize: '22px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4A90E2',
        backgroundColor: '#f0f8ff',
      },
    },
    rows: {
      style: {
        fontSize: '16px',
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      },
    },
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: '600',
        backgroundColor: '#e3f2fd',
        color: '#333',
      },
    },
    cells: {
      style: {
        padding: '8px',
        color: '#555',
      },
    },
  };

  const h1Style = {
    color: 'blue',
    fontSize: '36px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  

  // Table Columns
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button onClick={() => handleDelete(row.id)}>Delete</button>
      ),
    },
  ];

  return (
    <div>
      <Container>
          <h1 style={h1Style} >CRUD App with DataTable</h1>

          <div className="input-container">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="ID"
              value={newEntry.id}
              onChange={(e) => setNewEntry({ ...newEntry, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            />
            <button onClick={handleAdd}>Add</button>
          </div>

          <DataTable
            title="User List"
            columns={columns}
            data={filteredData}
            pagination
            customStyles={customStyles}
          />
      </Container>
    </div>
    
  );
};

export default App;

