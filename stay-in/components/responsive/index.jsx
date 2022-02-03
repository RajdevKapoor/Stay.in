import React from "react";
import styled from "styled-components";
import { AccountBox } from "../../components/accountBox";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import {
  InnerPageContainer,
  PageContainer,
} from "../../components/pageContainer";

import { deviceSize } from "../../components/responsive";


import { useParams } from "react-router-dom";


const TopSectionContainer = styled.div`
  width: 100%;
  height: 800px;
  background-position: 0px -150px;
  background-size: cover;

  @media screen and (max-width: 700px) {
    height: 700px;
    background-position: 0px 0px;
  }
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 9, 53, 0.7);
  display: flex;
  flex-direction: column;
`;

const TopSectionInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;


export function CustomerAccessPage(props) {
  const { action } = useParams();

  return (
    
    <PageContainer>
      <TopSectionContainer>
        <BackgroundFilter>
        <Navbar useTransparent />
        <TopSectionInnerContainer>
        <AccountBox initialActive={action} />
        </TopSectionInnerContainer>
        </BackgroundFilter>
      </TopSectionContainer>
      <Footer />
    </PageContainer>
    
  );
}
