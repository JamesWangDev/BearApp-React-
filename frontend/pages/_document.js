import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
      <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-163932621-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-163932621-1');
</script>
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body className="text-gray-800">
          <Main />
          {/* Here we will mount our modal portal */}
          <div id="modal" />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
