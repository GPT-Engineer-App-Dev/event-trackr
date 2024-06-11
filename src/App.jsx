import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Login from "./pages/Login.jsx";
import Jobs from "./pages/Jobs.jsx"; // Import the Jobs page

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/jobs" element={<Jobs />} /> {/* Add route for Jobs page */}
      </Routes>
    </Router>
  );
}

export default App;
