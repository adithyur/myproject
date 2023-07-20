import React from 'react';
import "./UserNav.css";

function NoIconNav() {
  return (
    <div>
    <div>
<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>New2U</title>
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="style.css" />
<div className="main-navbar shadow-sm sticky-top">
<div className="top-navbar">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
        <div className="gradient-text">
        <a className="nav-link" href="/">
        <h5 className="brand-name">New2U</h5>
        </a>
        </div>
      </div>
      <div className="col-md-5 my-auto">
        <form role="search">
          <div className="input-group">
            <input type="search" placeholder="Search your product" className="form-control" />
            <span className="search-button">
            <button className="search-button1" type="submit">
              <i className="fa fa-search" />
            </button>
            </span>
          </div>
        </form>
      </div>
      
      <div className="col-md-5 my-auto">
        <ul className="nav justify-content-end">
          
          <li className="nav-item">
          <div className="gradient-text">
            <a className="nav-link" href="#">
              <i className="fa fa-shopping-cart" /> Cart
            </a>
          </div>
          </li>
          <li className="nav-item">
          <div className="gradient-text">
            <a className="nav-link" href="#">
              <i className="fa fa-heart" /> Wishlist
            </a>
          </div>
          </li>
          <li className="nav-item">
          <div className="gradient-text">
            <a className="nav-link" href="/login">
              <i className="fa fa-user" /> Login
            </a>
          </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</div>

    </div>
  )
}

export default NoIconNav