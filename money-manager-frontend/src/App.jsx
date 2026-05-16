import { BrowserRouter, Route, Routes } from 'react-router'
import { Login } from "./pages/Login";
import { Signup } from './pages/Signup';
import './index.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}