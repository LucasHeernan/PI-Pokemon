import React from "react";
import SearchBar from "../searchBar/SearchBar";
import Container from "../container/Container";

// PÁGINA PRINCIPAL
// Se van a ver ALL pokemones || el que se busque por NAME

export default function Home() {
    return (
        <div>
            <SearchBar />
            <br />
            <Container />
        </div>
    )
}