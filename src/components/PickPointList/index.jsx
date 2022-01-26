import PropTypes from "prop-types"

import PickPointItem from "./PickPointItem"
import styles from "./styles.scss"

export default function PickPointList({ data, marker, setMarker }) {
  return (
    <ul className={styles.wrapper}>
      {data.map(({ address, budgets, latitude, longitude }) => (
        <PickPointItem
          key={address}
          active={marker[0] === latitude && marker[1] === longitude}
          address={address}
          budgets={budgets}
          latitude={latitude}
          longitude={longitude}
          setMarker={setMarker}
        />
      ))}
    </ul>
  )
}

PickPointList.propTypes = {
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
