import React from "react";
import TypeWriter from "./components/TypeWriter/TypeWriter";
import SearchBar from "./components/SearchBar";
import {
  TitleWrapper,
  MainTitle,
  Subtext,
  MainSection,
} from "./StyleComponent";
import { BGimg } from "./StyleComponent";

export default function Home() {
  return (
    <MainSection>
      <TitleWrapper>
        <MainTitle>
          Search notes <br />
          for{" "}
          <TypeWriter
            textArray={[
              "Science",
              "Engineering",
              "Commerce",
              "Design",
              "Architecture",
              "Law",
              "Medicine",
            ]}
          />
        </MainTitle>
        <Subtext>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </Subtext>
        <SearchBar />
      </TitleWrapper>
      <BGimg />
    </MainSection>
  );
}
