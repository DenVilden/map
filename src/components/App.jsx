import { useEffect, useState } from "react"

import styles from "./App.scss"
import Map from "./Map"
import PickPointList from "./PickPointList"

export default function App() {
  const [data, setData] = useState(null)
  const [marker, setMarker] = useState([0, 0])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("https://express-shina.ru/vacancy/geo-state")
        const { pickPoints } = await res.json()
        setData(pickPoints)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })()
  }, [])

  return (
    data && (
      <div className={styles.wrapper}>
        <PickPointList data={data} marker={marker} setMarker={setMarker} />
        <Map
          data={data}
          marker={marker}
          setMarker={() => setMarker([data[0].latitude, data[0].longitude])}
        />
      </div>
    )
  )
}
