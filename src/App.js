import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

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
      <h1>CRUD App with DataTable</h1>
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
      <DataTable
        title="User List"
        columns={columns}
        data={filteredData}
        pagination
      />
    </div>
  );
};

export default App;

