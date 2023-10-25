"use client"; // This is a client component 👈🏽"
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Cards = (props) => {
  // Props
  const { label, value, parcentage, tag, icon, lastData, color, xl } = props

  return (
    <Col md="6" xl={xl} className="mb-4">
      <Card className="card-stats full-height">
        <CardBody className={`flex flex-direction-column ${color}-gradient-bg`}>
          <Row className="mb-3">
            <Col>
              <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                {label}
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">
                {value}
              </span>
            </Col>
            <Col className="col-auto">
              <div className="icon icon-shape rounded-circle shadow">
                <FontAwesomeIcon icon={icon} />
              </div>
            </Col>
          </Row>
          <p className="mt-auto mb-0 text-sm">
            <span className="text-success mr-2">
              {value !== 0 && lastData === 0 ? '-' : <FontAwesomeIcon icon={parcentage < 0 ? faArrowDown : faArrowUp} className="mr-1" />}
              {value !== 0 && lastData === 0 ? '-' : parcentage !== undefined ? `${parcentage}%` : ''}
            </span>
            <span className="text-nowrap">{tag}</span>
          </p>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Cards;
