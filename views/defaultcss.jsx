var React = require('react');
import React, { Component } from 'react';

class Defaultcss extends React.Component {
  render() {
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" />
        <title>Pokemon Trading Card Game Deck-Builder</title>
        </head>
        <header>

        </header>
        <body className="container-fluid">
        <nav>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link text-info" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-info" href="/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-info" href="/users">Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-info" href="/user/signin">Sign In</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-info" href="/user/new">Sign Up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-info" href="/user/signout" tabindex="-1" ><svg id="i-signout" viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M28 16 L8 16 M20 8 L28 16 20 24 M11 28 L3 28 3 4 11 4" />
                </svg></a>
              </li>
            </ul>
        </nav>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {this.props.children}
                </div>
              </div>
            </div>
        <footer className="sticky-bottom">
            Copyright 2019 <span> </span>
            Created with &hearts; by <span>Sean Chan</span><span> </span>
            <i className="fas fa-at"></i>
            <a href="https://github.com/seany94" target="_blank"><i class="fab fa-github-square"></i>
            </a>
            <a href="https://www.linkedin.com/in/seancwl" target="_blank"><i className="fab fa-linkedin"></i>
            </a>
            <a href="https://seany94.github.io/" target="_blank"><i className="fab fa-chrome"></i>
            </a>
        </footer>
        <script src="/script/ajax.js"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Defaultcss;