import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { useParams } from "react-router-dom";
export default function UserLoginTemplate({ Component, ...restParams }) {
  const { Sider, Content, Header, Footer } = Layout;
  const [{width, height}, setSize] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect = () => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }

  return (
    <>
      <Layout>
        <Sider width={width / 2} style={{height:height, backgroundImage: "url(https://picsum.photos/2000)", backgroundRepeat: "no-repeat"}}></Sider>
        <Content>
          <Component {...restParams} />
        </Content>
      </Layout>
    </>
  );
}
   