function Search() {
  return (
    <div className="search">
      <form>
        <input
          placeholder="what are you looking for?"
          type="text"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'what are you looking for?')}
        />
      </form>
    </div>
  )
}

export default Search
