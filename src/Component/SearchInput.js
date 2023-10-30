import { Actions } from '@/redux/actions'
import { Store } from '@/redux/configureStore'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap'

export default function SearchInput(props) {
  // Props
  const { action } = props

  // State
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e) => {
    const text = e.target.value || ''
    setSearchValue(text)
    if (e.key === 'Enter') {
      e.preventDefault()
      Store.dispatch({ type: Actions?.[action].SetSearch, payload: text.trim() })
      Store.dispatch({ type: Actions?.[action].SetPage, payload: 1 })
    }
  }

  const handleSearch = () => {
    console.log(Actions?.[action].SetSearch);
    Store.dispatch({ type: Actions?.[action].SetSearch, payload: searchValue.trim() })
    Store.dispatch({ type: Actions?.[action].SetPage, payload: 1 })
  }

  const clearSearch = () => {
    setSearchValue('')
    Store.dispatch({ type: Actions?.[action].SetSearch, payload: '' })
    Store.dispatch({ type: Actions?.[action].SetPage, payload: 1 })
  }

  return (
    <div className="search-div">
      <Form>
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <Input
              placeholder="Search..."
              type="text"
              value={searchValue}
              onKeyPress={handleChange}
              onChange={handleChange}
            />
            <InputGroupText className="cursor-pointer search-btn">
              {searchValue && <FontAwesomeIcon icon={faXmark} className='mr-2' size='lg' onClick={clearSearch} />}
              <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch} />
            </InputGroupText>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  )
}
