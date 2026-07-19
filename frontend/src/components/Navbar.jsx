// frontend/src/components/Navbar.jsx
function Navbar() {
  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-500 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Task Manager</h1>
          </div>
          <span className="text-sm font-medium text-primary-100">MERN Stack Assignment</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;