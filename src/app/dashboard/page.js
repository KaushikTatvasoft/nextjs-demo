"use client"; // This is a client component 👈🏽"
import React from "react";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Cards from "@/Component/Cards";
import { faBarChart, faPercent, faPieChart, faUsers } from "@fortawesome/free-solid-svg-icons";
import { ordersChartTooltips, ordersChartscales } from "@/constants/general";
import { chartOptions, parseOptions } from "@/lib/charts";

const Dashboard = () => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const chart = [
    {
      "month": "May",
      "orders": 0,
      "sales": 0
    },
    {
      "month": "Jun",
      "orders": 0,
      "sales": 0
    },
    {
      "month": "Jul",
      "orders": 0,
      "sales": 0
    },
    {
      "month": "Aug",
      "orders": 0,
      "sales": 0
    },
    {
      "month": "Sep",
      "orders": 0,
      "sales": 0
    },
    {
      "month": "Oct",
      "orders": 6,
      "sales": 817.65
    }
  ]

  return <>
    <div>
      <div className="card-list-wrapper mb-0">
        <div>
          {/* Card stats */}
          <Row>
            <Cards label="New users" value={10} parcentage={5} lastData={2} tag="Since last week" icon={faPieChart} color="green" xl={4} />
            <Cards label="Total Orders" value={25} parcentage={8} lastData={2} tag="Since yesterday" icon={faUsers} color="orange" xl={4} />
            <Cards label="Menu Items" value={15} parcentage={14} lastData={2} tag="Since last month" icon={faPercent} color="blue" xl={4} />
          </Row>
        </div>
      </div>

      {/* Page content */}
      <div className="card-list-wrapper">
        <Row>
          <Col className="mb-4 mb-xl-0" xl="6">
            <Card className="">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Sales</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={{
                      labels: chart.map(data => data.month),
                      datasets: [
                        {
                          label: "Performance",
                          data: chart.map(data => data.sales)
                        }
                      ]
                    }}
                    options={{
                      scales: {
                        yAxes: [
                          {
                            gridLines: {
                              color: "#212529",
                              zeroLineColor: "#212529"
                            },
                            ticks: {
                              callback: function (value) {
                                if (!(value % 10)) {
                                  return '₹' + value + "k";
                                }
                              }
                            }
                          }
                        ]
                      },
                      tooltips: {
                        callbacks: {
                          label: function (item, data) {
                            var label = data.datasets[item.datasetIndex].label || "";
                            var yLabel = item.yLabel;
                            var content = "";

                            if (data.datasets.length > 1) {
                              content += label;
                            }

                            content += '₹' + yLabel + "k";
                            return content;
                          }
                        }
                      }
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card className="">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Total Orders</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={{
                      labels: chart.map(data => data.month),
                      datasets: [
                        {
                          label: "Sales",
                          data: chart.map(data => data.orders),
                          maxBarThickness: 10
                        }
                      ]
                    }}
                    options={{
                      scales: ordersChartscales,
                      tooltips: ordersChartTooltips
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div >
  </>
};

export default Dashboard
