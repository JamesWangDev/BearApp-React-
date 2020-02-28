import React from "react";

const Admin = () => (
  <div className="flex h-screen w-screen">
    <section className="side-menu w-3/12">side menu</section>
    <section className="main bg-gray-300 flex-grow">
      <div className="bg-white h-20">Header</div>
      <div>Main</div>
    </section>
  </div>
);

export default Admin;
