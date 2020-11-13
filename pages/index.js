import Head from 'next/head'
import { Col, Row, Card, Button } from "react-bootstrap";
import Link from "react-router-dom"
import Test from "components/test"

export default function Home() {
  return (
    <div className="container">
      <p className="title-text text-primary">.text-primary</p>
      <Card className='w-100 mb-2'>
        <Card.Body>
          <div className="container row">
            <div className="title-text mr-2">CS350</div>
            <div className="title-text-light">Introduction to Software Engineering</div>
          </div>
          <div className='mt-2 body-text'>
            Prof. Bae Doo-hwan
          </div>
          <button type="button" className="mt-4 custom-btn">Enter</button>
        </Card.Body>
      </Card>

      <Card className='w-100 mb-2'>
        <Card.Body>
          <div className="container row">
            <div className="title-text mr-2">CS350</div>
            <div className="title-text-light">Introduction to Software Engineering</div>
          </div>
          <div className='mt-2 body-text'>
            Prof. Bae Doo-hwan
          </div>
          <button type="button" className="mt-4 custom-btn">Enter</button>
        </Card.Body>
      </Card>
    </div>
  )
}
