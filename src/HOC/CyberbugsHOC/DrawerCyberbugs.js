import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_FORM_CYBERBUGS,
  OPEN_FORM_CYBERBUGS,
} from "../../redux/constants/Cyberbugs/CyberbugsConst";
const { Option } = Select;

export default function DrawerCyberbugs() {
  const { open, ComponentForm, title } = useSelector(
    (state) => state.DrawerCyberbugsReducer
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch({
      type: CLOSE_FORM_CYBERBUGS,
    });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose} 
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}

      >
        <ComponentForm />
      </Drawer>
    </>
  );
}
