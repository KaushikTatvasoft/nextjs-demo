"use client"; // This is a client component 👈🏽"
import React, { useEffect } from "react";
import { Card, CardHeader, Media, Table, Row } from "reactstrap";
import { getCategories, handleSortColumn, sortIcon } from "@/utils/middleware";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actions } from "@/redux/actions";
import Pagination from "@/Component/Pagination";
import { Store } from "@/redux/configureStore";
import SearchInput from "@/Component/SearchInput";

const Categories = () => {
  const { page, totalPage, activeSort, sortOrder, search, categories } = useSelector(state => state.categories)

  useEffect(() => {
    getCategories(page, activeSort, sortOrder, search)
  }, [page, activeSort, sortOrder, search])

  return (
    <div className="custom-container">
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0 space-between-div table-header-div">
              <h3 className="mb-0">Categories List</h3>
              <div className="right-div-wrap">
                <SearchInput action="Categories" />
              </div>
            </CardHeader>
            {categories.length !== 0 ? <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope='col' className='serial-number cursor-pointer' onClick={() => handleSortColumn('', '', '', 'Categories')}>No.</th>
                  <th scope='col' onClick={() => handleSortColumn('name', activeSort, sortOrder, 'Categories')}>Name <FontAwesomeIcon icon={sortIcon(activeSort, 'name', sortOrder)} /></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => {
                  return <tr key={index}>
                    <td className='serial-number'>{index + 1}</td>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            {category.name}
                          </span>
                        </Media>
                      </Media>
                    </th>
                  </tr>
                })}
              </tbody>
            </Table> : null}
            <Pagination page={page} totalPage={totalPage} handlePageClick={({ selected }) => Store.dispatch({ type: Actions.Categories.SetPage, payload: selected + 1 })} />
          </Card>
        </div>
      </Row>
    </div>
  )
};

export default Categories
