import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import {NavBar, CryptoCurrencies, Footer, Exchanges, Home, News, About} from './components'
import CryptoDetails from './components/CryptoDetails'

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element:
        <div>
          <NavBar/>
          <Home/>
          <Footer/>
        </div>
      },
      {
        path: "/cryptocurrencies",
        element:
        <div>
          <NavBar/>
          <CryptoCurrencies/>
          <Footer/>
        </div>
      },
      {
        path: "/exchanges",
        element:
        <div>
          <NavBar/>
          <Exchanges/>
          <Footer/>
        </div>
      },
      {
        path: "/news",
        element:
        <div>
          <NavBar/>
          <News/>
          <Footer/>
        </div>
      },
      {
        path: "/cryptoDetails/:uuid",
        element:
        <div>
          <NavBar/>
          <CryptoDetails/>
          <Footer/>
        </div>
      },
      {
        path: "/about",
        element:
        <div>
          <NavBar/>
          <About/>
          <Footer/>
        </div>
      }
    ]
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App
