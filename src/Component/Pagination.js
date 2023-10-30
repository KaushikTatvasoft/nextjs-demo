import React from 'react'
import { CardFooter } from 'reactstrap'
import ReactPaginate from 'react-paginate';
import { pageSize } from '@/constants/general';

export default function Pagination(props) {
  const { page, totalPage, handlePageClick } = props

  return (
    <CardFooter className="flex justify-end">
      <nav aria-label="...">
        <ReactPaginate
          className='pagination justify-content-end mb-0'
          breakLabel="..."
          nextLabel=" "
          previousLabel=" "
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          forcePage={page - 1}
          pageCount={Math.ceil(totalPage / pageSize)}
          renderOnZeroPageCount={null}
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          nextClassName="page-item next-arrow"
          nextLinkClassName="page-link"
          previousClassName="page-item prev-arrow"
          previousLinkClassName="page-link"
        />
      </nav>
    </CardFooter>
  )
}
