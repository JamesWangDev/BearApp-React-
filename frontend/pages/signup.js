import React from "react";
import Head from "next/head";
import Nav from "../components/nav";



const Home = () => (
  <div>

    <Head>

    </Head>



    <div className="hero">
      <h1 className="title">Signup</h1>


      <div className="row">
      <form>
      <label for="email">Email: </label>
      <input type="email" id="email" name="email"/><br/><br/>
          <label for="password">Password: </label>
          <input type="password" name="password" id="password"/><br/><br/>
          <label for="password">Re-enter Password: </label>
          <input type="password" name="password" id="password"/><br/><br/>

          <label for="occasion">What's the occasion? (Select one) </label>

          <input list="occasion"/>
          <datalist id="occasion">
            <option value="Wedding"/>
            <option value="Registry"/>
            <option value="Baby Shower"/>
            <option value="Other"/>
          </datalist> <br/><br/>
            <label for="bigday">When is the big day? </label>
            <input type="date" id="bigday" name="registrydate"/>


          <br/><br/>

          <input type="submit" value="Submit"/>

        </form>
      </div>
    </div>






    <style jsx>{`

      @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');



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
        font-family: Roboto
, sans-serif;

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

      label {

        font-size: 16px;
        line-height: 1.5;
        color: #47353A;
        font-family: Roboto;

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
