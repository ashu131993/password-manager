// import {Component} from 'react'
import './index.css'

const YourPassword = props => {
  const {passwordList, hidePassword, deletePassword} = props
  const {id, websiteName, username, password} = passwordList

  const initials = websiteName.slice(0, 1).toUpperCase()

  const showHidePassword = () => {
    if (hidePassword) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
          className="stars-logo"
        />
      )
    }
    return <p>{password}</p>
  }

  const onDelete = () => {
    deletePassword(id)
  }

  return (
    <li>
      <div className="initials-container">
        <h1 className="initials">{initials}</h1>
      </div>
      <div className="content-container">
        <p>{websiteName}</p>
        <p>{username}</p>
        {showHidePassword()}
      </div>
      <button
        type="button"
        data-testid="delete"
        onClick={onDelete}
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default YourPassword
