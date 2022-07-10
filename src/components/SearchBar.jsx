import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { useThrottle } from "use-throttle";
import styles from "./SearchBar.module.css";
import SuggestionBox from "./SuggestionBox";

const SearchBar = ({ setLoading, loading, suggestions, onChange }) => {
  console.log(suggestions);

  const [inputText, setInputText] = useState("");

  const [active, setActive] = useState(0);

  const scrollRef = useRef();

  const throttledValue = useThrottle(inputText, 1000);

  useEffect(() => {
    onChange(throttledValue);
  }, [throttledValue, onchange]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);

    setLoading(true);
  };

  const handleClear = () => {
    setInputText("");

    // this onchange also deleting the values from the suggestions
    onChange("");
    setLoading(false);
  };

  const handleActiveSuggestions = (e) => {
    switch (e.keyCode) {
      // arrowDown:-
      case 40:
        if (active >= 5) {
          setActive(0);

          // scrollRef.current.scrollTop += 38.5;
          setActive((prev) => prev + 1);
        } else {
          setActive((prev) => prev + 1);
        }

        break;

      // arrowUp:-
      case 38:
        if (active <= 1) {
          setActive(5);
        } else {
          setActive((prev) => prev - 1);
        }

        break;

      case 13:
        break;

      default:
        return;
    }
  };

  return (
    <>
      <SearchBarWrapper
        len={suggestions.length}
        onKeyUp={handleActiveSuggestions}
      >
        <Image
          src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"
          alt="Search-Icon"
        />
        <Input value={inputText} onChange={handleInputChange} />
        <RightSide>
          {inputText && (
            <Image
              src="https://cdn.iconscout.com/icon/premium/png-256-thumb/cross-3158260-2635455.png"
              alt="Close button"
              style={{ cursor: "pointer" }}
              onClick={handleClear}
            />
          )}
          {loading && (
            <StyledSpinner viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
            </StyledSpinner>
          )}
        </RightSide>
      </SearchBarWrapper>

      {!loading &&
        suggestions.length > 0 &&
        suggestions.map((e) => <SuggestionBox loading={loading} items={e} />)}

      {!loading && suggestions.length > 0 && (
        <SuggestionBoxItems
          len={suggestions.length}
          limit={5}
          active={active}
          ref={scrollRef}
        >
          {suggestions.map((item, index) => (
            <div key={item} onMouseOver={() => setActive(index + 1)}>
              {item}
            </div>
          ))}
        </SuggestionBoxItems>
      )}
    </>
  );
};

export default SearchBar;

const SuggestionBoxItems = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  max-height: 200px;
  overflow: auto;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-color: ${({ len }) => (len ? "transparent" : "black")};
  & * {
    flex: 1;
    text-align: left;
    padding: 10px;
    padding-left: 50px;
  }

  & :nth-child(${({ active }) => active}) {
    background: lightblue;
    color: black;
    font-weight: 700;
    cursor: pointer;
  }
  &: nth-child(n + ${({ limit }) => limit + 1}) {
    display: none;
  }
`;

const SearchBarWrapper = styled.div`
  border: 1px solid black;
  display: flex;

  border-radius: 20px;
  padding: 5px 10px;
  align-items: center;

  border-bottom-right-radius: ${({ len }) => (len ? "0px" : "20px")};

  border-bottom-left-radius: ${({ len }) => (len ? "0px" : "20px")};
`;

const Image = styled.img`
  height: 20px;

  padding-right: 20px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 20px;
  flex: 1;
`;

const RightSide = styled.div``;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;

  width: 20px;
  height: 20px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
