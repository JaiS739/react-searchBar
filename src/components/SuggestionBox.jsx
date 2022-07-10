import React from "react";
import styles from "./SearchBar.module.css";
import styled from "styled-components";

const SuggestionBox = ({ items }) => {
  return <>{/* <SuggestionBoxItems>{items}</SuggestionBoxItems> */}</>;
};

export default SuggestionBox;

const SuggestionBoxItems = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  max-height: 200px;
  overflow: auto;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  & * {
    flex: 1;
    text-align: left;
    padding: 10px;
  }
`;
