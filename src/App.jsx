import { useState, useEffect } from "react"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar"

function App() {
  const [ data, setData ] = useState(null)
  const [ showModal, setShowModal] = useState(false)

  // Function to toggle info modal, passed to sidebar and footer for opening/closing controls
  function handleToggleModal() {
    setShowModal(!showModal)
  }

  // useEffect to load today's API data on page load and store in local storage
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod?api_key=' + `${NASA_KEY}`
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`

      // Check local storage and load from there if data is present
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        console.log('Fetched from cache')
        setData(apiData)
        return
      }
      localStorage.clear

      // New API call if local storage is empty
      try {
        const res =  await fetch(url)
        const apiData = await res.json()

        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API')
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])

  // Function to generate an image from a random day since the APOD project started
  function shuffle() {
    // Function to generate random date
    function randomDate() {
      const firstAPOD = new Date('1995-6-16').getTime()
      const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      const t = new Date(today).getTime()
      const random = new Date(firstAPOD + Math.random() * (t - firstAPOD));
      const randomSearchDate = `${random.getFullYear()}-${random.getMonth() + 1}-${random.getDate()}`
      return randomSearchDate
    }

    // API call using random date that bypasses local storage so that refreshing will restore the daily entry from the cache
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod?api_key=' + `${NASA_KEY}&date=${randomDate()}`

      try {
        const res =  await fetch(url)
        const apiData = await res.json()

        setData(apiData)
        console.log('Fetched random entry from API')
      } catch (err) {
        console.log(err.message)
      }
    }
    setData(null)
    fetchAPIData()
  }

  return (
    <>
      {data ? (
        <Content data={data}/>
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <Sidebar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (<Footer data={data} handleToggleModal={handleToggleModal} shuffle={shuffle} />)}
    </>
  )
}

export default App
