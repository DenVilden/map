import PropTypes from "prop-types"

import styles from "./styles.scss"

export default function PickPointItem({
  active,
  address,
  budgets,
  latitude,
  longitude,
  setMarker,
}) {
  const setActive = () => {
    setMarker([latitude, longitude])
  }

  return (
    <li
      className={`${styles.wrapper} ${active ? styles.active : ""}`}
      onClick={setActive}
      onKeyPress={setActive}
      role="menuitem"
      tabIndex="0"
    >
      <p>{address}</p>
      <div>
        {budgets.map((budget) => (
          <span key={budget}>{budget}</span>
        ))}
      </div>
    </li>
  )
}

PickPointItem.propTypes = {
  address: PropTypes.string.isRequired,
  budgets: PropTypes.arrayOf(PropTypes.string).isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  setMarker: PropTypes.func.isRequired,
}
