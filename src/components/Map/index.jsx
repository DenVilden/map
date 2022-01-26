import PropTypes from "prop-types"
import { useState } from "react"
import { Map as YMap, Placemark, YMaps } from "react-yandex-maps"

import styles from "./styles.scss"

export default function Map({ data, marker, setMarker }) {
  const [loading, setLoading] = useState(true)

  return (
    <div className={loading ? styles.loader : styles.wrapper}>
      <YMaps>
        <YMap
          height="500px"
          onError={(error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          }}
          onLoad={() => {
            setLoading(false)
            setMarker()
          }}
          state={{
            center: marker,
            zoom: 15,
          }}
          width={!loading && "auto"}
        >
          {data.map(({ address, latitude, longitude }) => (
            <Placemark key={address} geometry={[latitude, longitude]} />
          ))}
        </YMap>
      </YMaps>
    </div>
  )
}

Map.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      budgets: PropTypes.arrayOf(PropTypes.string).isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,
  marker: PropTypes.arrayOf(PropTypes.number).isRequired,
  setMarker: PropTypes.func.isRequired,
}
