import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import { Header } from "./components/Header";
import { NewJob } from "./pages/NewJob";
import { ViewJob } from "./pages/ViewJob";
import { Jobs } from "./pages/Jobs";

export const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:title" element={<Jobs />} />
        <Route path="/jobs/view/:id" element={<ViewJob />} />
        <Route path="/jobs/new" element={<NewJob />} />
      </Routes>
    </Router>
  );
};