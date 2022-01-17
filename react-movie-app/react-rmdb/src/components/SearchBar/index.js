import React, { useState, useRef, useEffect } from "react";

//styles
import { Wrapper, Content } from "./SearchBar.styles";

//img
import searchIcon from '../../images/search-icon.svg';

const SearchBar = ({ setSearchTerm }) => {
    const [searchValue, setSearchValue] = useState('');
    let initial = useRef(true);
    
    useEffect(() => {
        if (initial.current) {
            initial.current = false;
        }
        let timer = setTimeout(() => {
            setSearchTerm(searchValue);
        }, 500)
        return () => clearTimeout(timer);
    }, [setSearchTerm, searchValue])
    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon"></img>
                <input
                    type='text'
                    placeholder="Search Movie"
                    onChange={event => setSearchValue(event.currentTarget.value)}
                    value={searchValue}
                ></input>
            </Content>
        </Wrapper>
    );
}

export default SearchBar;