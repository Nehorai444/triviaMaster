import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import HomePage from './components/HomePage';
import { UserContext } from './contextApi';
import { ApiRequests } from './library/Utilities';
import Summary from './components/Summary';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [user, setUser] = useState({ userName: "", rightAnswers: 0, scores: [] });
  const [difficulty, setDifficulty] = useState("");
  const [allQuestions, setAllQuestions] = useState([])
  const [flag, setFlag] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    if (flag && difficulty) {
      ApiRequests.getQuestions(difficulty).then(res => {
        setAllQuestions(res.results)
      }).catch(err => { console.log(err) })
    }
    else if (!difficulty && flag) {
      alert("Please choose difficult level");
      nav("/welcome")
    }
  }, [flag])

  useEffect(() => {
    if (!user.fullName) nav("/welcome")
  }, [])

  return (
    <div className="App">
      <h3 className="title">triviaMaster</h3>
      <UserContext.Provider value={{ user, setUser }} >
        <Routes>
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/signIn' element={<Login setDifficulty={setDifficulty} setFlag={setFlag} difficulty={difficulty} />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path="/" element={<HomePage allQuestions={allQuestions} />} />
          <Route path='/summary' element={<Summary setFlag={setFlag} flag={flag} />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
