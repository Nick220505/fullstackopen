const Search = ({ searchedCountry, searchCountries }) => {
    return (
        <div>
            find countries
            <input
                value={searchedCountry}
                onChange={searchCountries}
            />
        </div>
    )
}

export default Search
