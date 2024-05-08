import React from "react";
import Header from "../../components/Home/Header/Header";

export default function LayoutHomeTemplate(props) {
  const { Component } = props;
  return (
    <>
      <Header />
      <Component />
    </>
  );
}
