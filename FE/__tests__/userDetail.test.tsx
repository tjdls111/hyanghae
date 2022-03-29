/*
mypage.test.tsx
@author scarlet
@version 1.0.0
생성일 2022-03-16
마지막 수정일 2022-03-16
*/
import React from "react";
import userDetail from "../pages/userDetail";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, fireEvent, screen, waitFor, cleanup } from "@testing-library/react";
import axios from "axios";
import { BASE_URL } from "../api/utils";



