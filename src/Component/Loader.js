import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loader() {
  return (
    <div className='loader'>
      <Spinner color="primary" style={{
        height: '3rem',
        width: '3rem'
      }} />
    </div>
  )
}
