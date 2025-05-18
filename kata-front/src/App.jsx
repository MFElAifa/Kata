import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Survey from './components/Survey'
import Header from './components/Header'
import FeedbackForm from './components/FeedbackForm';
import LoginForm from './components/LoginForm';
import Questions from './components/admin/Questions';
import Surveys from './components/admin/Surveys';
import Feedbacks from './components/admin/Feedbacks';
function App() {
  return (
    <Router>
      <Header />
      {/* <Survey /> */}
      <main>
        <Routes>
          <Route path="/" element={<Survey />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<Questions />} />
          <Route path="/admin/survey" element={<Surveys />} />
          <Route path="/admin/feedback" element={<Feedbacks />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
