const Countries = ({ countryNames, showCountry }) => {

    if (countryNames.length === 1) {
        return null
    }

    if (countryNames.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    return (
        <>
            {countryNames.map(name => (
                <div key={name}>
                    {name}
                    <button onClick={() => showCountry(name)}>
                        show
                    </button>
                </div>
            ))}
        </>
    )
}

export default Countries
