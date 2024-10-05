import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route ,Routes } from 'react-router-dom'
import { Signin, Signup , Home } from './Pages/Uploaded.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/signin' element = {<Signin />} />
            <Route path='/signup' element = {<Signup />} />
         </Routes>
      </BrowserRouter>
  </StrictMode>,
)
