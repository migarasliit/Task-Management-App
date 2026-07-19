// frontend/src/components/Navbar.jsx
function Navbar() {
  return (
    <header style={{ backgroundColor: '#4f46e5', color: 'white', padding: '1rem 0', marginBottom: '2rem', borderRadius: '8px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>✅ Task Manager</h1>
        <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>MERN Stack Assignment</span>
      </div>
    </header>
  );
}

export default Navbar;