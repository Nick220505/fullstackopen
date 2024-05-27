const Filter = ({ searchedName, handleSearchedName }) => (
    <div>
        filter shown with <input value={searchedName} onChange={handleSearchedName} />
    </div>
)

export default Filter
