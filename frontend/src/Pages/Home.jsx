import React from 'react'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import ProductCard from '../Components/ProductCard'
import Recommended from '../Components/Recommended'
import Footer from '../Components/Footer'


const Home = () => {
  return (
   <>
   <Navbar></Navbar>
   <HeroSection></HeroSection>
  <Recommended></Recommended>
<Footer></Footer>
 
   </>
  )
}

export default Home
