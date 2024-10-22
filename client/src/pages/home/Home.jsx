import React from 'react'
import Banner from '../../components/Banner'
import PopularPlants from './PopularPlants'
import OutdoorPlants from './OutdoorPlants'
import PlantCare from './PlantCare'



const Home = () => {
  return (<>
    <Banner/>
    <PopularPlants/>
    <OutdoorPlants/>
    <PlantCare/>
  </>
  )
}

export default Home