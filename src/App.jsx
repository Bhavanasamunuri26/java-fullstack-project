import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home'
import Account from './Account'
import User from './User'

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/account" element={<Account/>}></Route>
          <Route path="/user" element={<User/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
