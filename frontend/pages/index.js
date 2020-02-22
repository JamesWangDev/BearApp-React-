import React from "react";
import Head from "next/head";
import Link from 'next/link';


const Home = () => (
  <div>
    <header>
    <h1> Logo </h1>
    <nav>
    <Link href="/login">
    <a>Login</a>
    </Link>
    <Link href="signup">
    <a>Signup</a>
    </Link>

    </nav>
    </header>

    <div className="hero">
      <h1 className="title">unbearlievable: Custom registries for everyone</h1>

      <div className="row">
        <a href="" className="card">
          <h3>Find a couple</h3>
          <p>Wedding guests, click above!</p>
        </a>
        <a href="" className="card">
          <h3>Sign up</h3>
          <p>Already a member? Login</p>
        </a>
      </div>


    </div>

    <style jsx>{`
      @import url("https://fonts.googleapis.com/css?family=Work+Sans&display=swap")
      @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

      body{

        font-size: 16px;
        line-heigt: 1.5;
        color: #47353A;
        font-family: Roboto;

      }

      header{
        padding: 10px 15px;
        background-color: white;
        overflow: hidden;
        font-family: Roboto;

      }

      header h1{

        float: left;

      }

      header nav{
        float: right;
      }

      header nav a{
        color: #47353A;
        text-decoration: none;
        margin-left: 12px;
        text-transform: uppercase;
        font-weight: 700;

      }


      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
        font-family: Roboto, sans-serif;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }




      .rightAlignNavBar {
        float: right;
      }

      #myVideo {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
      }
    `}</style>
  </div>
);

export default Home;
