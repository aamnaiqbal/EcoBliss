import {createContext, useState, useEffect} from 'react';
import axios from 'axios'

export const PlantContext=createContext();

export const PlantProvider=({children})=>{
    const [orchidPlants, setOrchidPlants]= useState([])
    const [outdoorPlants, setOutdoorPlants]= useState([])
    const [housePlants, setHousePlants]= useState([])
    const [popularPlants, setPopularPlants]= useState([])

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                console.log("Plant data is fetched")
                const response= await axios.get("http://localhost:8000/api/v1/plant")
                const data=response.data.data.plants;
                setOutdoorPlants(data.filter((item)=>item.category==='Outdoor'))
                setOrchidPlants(data.filter((item)=>item.category==="Orchid"))
                setHousePlants(data.filter((item)=>item.category==="HousePlants"))
                setPopularPlants(data.filter((item)=>item.popular))

            }
            catch(err){
                console.log("Some error occured fetching the data", err);
            }
        }
        fetchData();
    }, [])
    return <PlantContext.Provider value={{orchidPlants, housePlants, outdoorPlants, popularPlants}}>{children}</PlantContext.Provider>

}