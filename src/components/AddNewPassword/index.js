import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import YourPassword from '../YourPassword'
import './index.css'

class AddNewPassword extends Component {
  state = {
    websiteName: '',
    username: '',
    password: '',
    passwordList: [],
    hidePassword: true,
    searchInput: '',
  }

  onChangeWebsite = event => {
    const webAddress = event.target.value
    this.setState({websiteName: webAddress})
  }

  onChangeUsername = event => {
    const name = event.target.value
    this.setState({username: name})
  }

  onChangePassword = event => {
    const passwordKey = event.target.value
    this.setState({password: passwordKey})
  }

  onSubmitForm = event => {
    const {websiteName, username, password} = this.state
    event.preventDefault()
    if (websiteName !== '' && username !== '' && password !== '') {
      const newPasswordObj = {
        id: uuidv4(),
        websiteName,
        username,
        password,
      }

      this.setState(preState => ({
        passwordList: [...preState.passwordList, newPasswordObj],
        websiteName: '',
        username: '',
        password: '',
      }))
    } else {
      alert('Please enter correct details')
    }
  }

  onClickCheckbox = () => {
    this.setState(preState => ({
      hidePassword: !preState.hidePassword,
    }))
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const updatedList = passwordList.filter(eachItem => eachItem.id !== id)

    this.setState({
      passwordList: [...updatedList],
    })
  }

  searchResult = event => {
    const searchValue = event.target.value
    this.setState({searchInput: searchValue})
  }

  showNoPasswordImage = () => {
    const {passwordList, hidePassword, searchInput} = this.state

    const searchResultList = passwordList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (searchResultList.length > 0) {
      return (
        <ul>
          {searchResultList.map(eachItem => (
            <YourPassword
              key={eachItem.id}
              passwordList={eachItem}
              hidePassword={hidePassword}
              deletePassword={this.deletePassword}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-password-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password-logo"
        />
        <p className="no-password-text">No passwords</p>
      </div>
    )
  }

  render() {
    const {
      websiteName,
      username,
      password,
      passwordList,
      hidePassword,
    } = this.state

    const renderPasswordList = this.showNoPasswordImage()

    return (
      <div className="app-bg-container">
        <div>
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="new-password-input-container">
          <div className="input-container">
            <h2 className="new-password-heading">Add New Password</h2>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <div className="input-box">
                <div className="input-logo-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-logo"
                  />
                </div>
                <input
                  className="input-entry-box"
                  type="text"
                  placeholder="Enter Website"
                  value={websiteName}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-box">
                <div className="input-logo-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-logo"
                  />
                </div>
                <input
                  className="input-entry-box"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-box">
                <div className="input-logo-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-logo"
                  />
                </div>
                <input
                  className="input-entry-box"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="your-password-container">
          <div className="header-container">
            <div className="header-container-name">
              <h2>Your Passwords</h2>
              <div className="password-count">
                <p>{passwordList.length}</p>
              </div>
            </div>
            <div className="input-box">
              <div className="input-logo-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-logo"
                />
              </div>
              <input
                className="input-entry-box"
                type="search"
                placeholder="search"
                onChange={this.searchResult}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              value={hidePassword}
              onClick={this.onClickCheckbox}
            />
            <label htmlFor="showPassword" className="label-show-pass">
              Show Passwords
            </label>
          </div>
          {renderPasswordList}
        </div>
      </div>
    )
  }
}

export default AddNewPassword
