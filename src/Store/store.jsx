import { createContext, useEffect, useState } from "react";


export const DataContext = createContext();

function Store({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user') || "");
  const [token, setToken] = useState(localStorage.getItem('token') || "");

 

    
 
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user); // Assuming backend sends user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return true; // Indicate success
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      return false; // Indicate failure
    }
  };


 
 
 

  // const [studentId, setStudentId] = useState("");

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };


  const studentId=user._id;


  return (
    <DataContext.Provider
      value={{
        studentId,
        user, setUser, token, login, logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default Store;
