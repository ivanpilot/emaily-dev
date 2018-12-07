import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  renderContent() {
    console.log('this props is: ', this.props.auth)
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return(
          <li><a href="/auth/google"> Login with Google</a></li>
        )
      default:
        return(
          <li><a href="/api/logout">Logout</a></li>
        )
    }
  }

  render() {

    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

// export default Header;

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  null
)(Header)