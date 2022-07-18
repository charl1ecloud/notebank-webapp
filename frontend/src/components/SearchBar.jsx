import React from "react";
import {
  SearchbarWrapper,
  SearchbarInput,
  SearchButton,
} from "../StyleComponent";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [inputText, setInputText] = React.useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setInputText((preText) => {
      event.preventDefault();
      return event.target.value;
    });
  }
  return (
    <SearchbarWrapper>
      <SearchbarInput
        type="text"
        className="inputfield"
        placeholder="Start typing your course number"
        onChange={handleChange}
      />
      <SearchButton onClick={() => navigate("/viewnotes")}>Search</SearchButton>
    </SearchbarWrapper>
  );
}
