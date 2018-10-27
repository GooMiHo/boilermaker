import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Nav = ({ handleClick, isLoddedIn }) => {
  return (
    <div>
      <h1>BOILERMAKER</h1>
      <nav>
        {isLoddedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>Logout</a>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

// const mapState = state => {
//   return {
//     //checks if logged in
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }
// export default connect(mapState, mapDispatch)(Nav)

export default Nav
