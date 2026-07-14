import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Discipline {
  _id: string;
  name: string;
  description: string;
  history: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
}

interface AuthResponse {
  _id: string;
  token: string;
}

const App = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [history, setHistory] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);

  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/api/disciplines`, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setDisciplines(data));
    }
  }, [token]);

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: name,
        password: description
      })
    })
    .then(response => response.json())
    .then((data: AuthResponse) => {
      localStorage.setItem('token', data.token);
      setToken(data.token);
    });
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: name,
        password: description
      })
    })
    .then(response => response.json())
    .then((data: AuthResponse) => {
      localStorage.setItem('token', data.token);
      setToken(data.token);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const handleCreateDiscipline = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${API_URL}/api/disciplines`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        history
      })
    })
    .then(response => response.json())
    .then((data: Discipline) => {
      setDisciplines([...disciplines, data]);
      setName('');
      setDescription('');
      setHistory('');
    });
  };

  const handleUpdateDiscipline = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${API_URL}/api/disciplines/${selectedDiscipline?._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        history
      })
    })
    .then(response => response.json())
    .then((data: Discipline) => {
      setDisciplines(disciplines.map(discipline => discipline._id === data._id ? data : discipline));
      setName('');
      setDescription('');
      setHistory('');
    });
  };

  const handleDeleteDiscipline = (id: string) => {
    fetch(`${API_URL}/api/disciplines/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setDisciplines(disciplines.filter(discipline => discipline._id !== id));
    });
  };

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" className="input-field" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="input-field" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <button type="submit" className="btn-primary">Login</button>
          </form>
          <h2 className="auth-title">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" className="input-field" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="input-field" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <button type="submit" className="btn-primary">Register</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <nav className="nav-bar">
        <h1 className="nav-title">Club Social y Deportivo</h1>
        <button className="btn-secondary" onClick={handleLogout}>Logout</button>
      </nav>
      <h1 className="section-title">Disciplines</h1>
      <div className="table-container">
        <table className="table-base">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>History</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {disciplines.map(discipline => (
              <tr key={discipline._id}>
                <td>{discipline.name}</td>
                <td>{discipline.description}</td>
                <td>{discipline.history}</td>
                <td>
                  <button className="btn-primary" onClick={() => {
                    setSelectedDiscipline(discipline);
                    setName(discipline.name);
                    setDescription(discipline.description);
                    setHistory(discipline.history);
                  }}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDeleteDiscipline(discipline._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="section-title">Create Discipline</h1>
      <form onSubmit={handleCreateDiscipline}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input type="text" className="input-field" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input type="text" className="input-field" value={description} onChange={(event) => setDescription(event.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">History</label>
          <input type="text" className="input-field" value={history} onChange={(event) => setHistory(event.target.value)} />
        </div>
        <button type="submit" className="btn-primary">Create</button>
      </form>
      {selectedDiscipline && (
        <h1 className="section-title">Update Discipline</h1>
      )}
      {selectedDiscipline && (
        <form onSubmit={handleUpdateDiscipline}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="input-field" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input type="text" className="input-field" value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">History</label>
            <input type="text" className="input-field" value={history} onChange={(event) => setHistory(event.target.value)} />
          </div>
          <button type="submit" className="btn-primary">Update</button>
        </form>
      )}
    </div>
  );
};

export default App;