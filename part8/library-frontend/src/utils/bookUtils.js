export const distinctGenres = (books) => {
  return books
    .map((book) => book.genres)
    .reduce((genres, currentGenres) => {
      currentGenres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      })
      return genres
    }, [])
}

export const filterBooks = (books, genre = 'ALL') => {
  return genre === 'ALL' ? books : books.filter((b) => b.genres.includes(genre))
}
