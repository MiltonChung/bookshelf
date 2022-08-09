/** @jsx jsx */
import './bootstrap'
import * as React from 'react'
import {jsx} from '@emotion/core'
import Tooltip from '@reach/tooltip'
import {FaTimes} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'
import * as colors from './styles/colors'
import {client} from './utils/api-client'
import {BookRow} from './components/book-row'
import {BookListUL, Input, Spinner} from './components/lib'
import {useAsync} from 'utils/hooks'

function DiscoverBooksScreen() {
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()

  // 🐨 Add a useEffect callback here for making the request with the
  // client and updating the status and data.
  // 💰 Here's the endpoint you'll call: `books?query=${encodeURIComponent(query)}`
  // 🐨 remember, effect callbacks are called on the initial render too
  // so you'll want to check if the user has submitted the form yet and if
  // they haven't then return early (💰 this is what the queried state is for).
  React.useEffect(() => {
    if (!queried) {
      return
    }

    run(client(`books?query=${encodeURIComponent(query)}`))
  }, [query, run, queried])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target.elements.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
