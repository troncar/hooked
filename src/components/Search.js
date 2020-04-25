import React ,{ useState } from 'react';

const Search = (props) => {
    // Set State 
    const [searchValue, setSearchValue] = useState('');

    // Handlers
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField =  () => {
        setSearchValue('');
    }

    const callSearchFunction = (e) => {
        e.preventDefault() ;
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input 
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    )
}

export default Search;