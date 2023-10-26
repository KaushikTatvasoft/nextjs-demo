"use client"; // This is a client component 👈🏽"
import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'reactstrap'

export default function Loader() {
  const { loading } = useSelector(state => state.user)

  return loading && <div className='loader'>
    <Spinner color="primary" style={{
      height: '3rem',
      width: '3rem'
    }} />
  </div>
}
