import React from "react";
import Head from "next/head";
import Nav from "../components/nav";



const Home = () => (
  <div>

    <Head>

    </Head>



    <div className="hero">

    <h1 className="title">Login</h1>


    <div className="row">
    <form>
    <label for="email">Email: </label>
    <input type="email" id="email" name="email"/><br/><br/>
        <label for="password">Password: </label>
        <input type="password" name="password" id="password"/><br/><br/>

      </form>
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






  input {
    width: 100%;
    

  }

  input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  }



    `}</style>
  </div>
);

export default Home;
