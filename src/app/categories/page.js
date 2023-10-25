"use client"; // This is a client component 👈🏽"
import React, { useEffect } from "react";
import { Card, CardHeader, Media, Table, Row } from "reactstrap";
import { getCategories } from "@/utils/middleware";
import { useSelector } from "react-redux";

const Categories = () => {
  const { categories } = useSelector(state => state.user)

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="custom-container">
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0 space-between-div table-header-div">
              <h3 className="mb-0">Categories List</h3>
            </CardHeader>
            {categories.length !== 0 ? <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope='col' className='serial-number cursor-pointer'>No.</th>
                  <th scope='col' >Name </th>
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
          </Card>
        </div>
      </Row>
    </div>
  )
};

export default Categories
