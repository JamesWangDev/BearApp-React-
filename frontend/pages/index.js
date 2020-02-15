import React from "react";
import Head from "next/head";
import Nav from "../components/nav";



const Home = () => (
  <div>

    <Head>
    <ul>
      <li><a href="">Logo</a></li>
      <li className="rightAlignNavBar" ><a href="">Sign up</a></li>
      <li className="rightAlignNavBar"><a href="">Login</a></li>
    </ul>
    </Head>



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

      @import url('https://fonts.googleapis.com/css?family=Work+Sans&display=swap');

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
        font-family: 'Work Sans', sans-serif;

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
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0px;
        overflow: hidden;
        background-color: #333;
        position: fixed;
        top: 0;
        width: 100%;

      }

  li {
    float: left;

  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-family: 'Work Sans', sans-serif;
  }

  /* Change the link color to #111 (black) on hover */
  li a:hover {
    background-color: #111;
  }

  .rightAlignNavBar{

    float:right;
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
