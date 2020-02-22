import React from 'react'
import { Card } from 'antd'

const Dashboard = () => {

  return (
    <Card>
      <div>
        This project is a React + Express + MongoDB with Graphql boilerplate, help developing the system like CMS quickly. Based on Typescript.
      </div>
      <div>
        See the code on Github: <a href="https://github.com/Konata9/faiz-admin">Faiz Admin</a>
      </div>
      <hr />
      <div>Used Tech Stack</div>
      <ul>
        <li>
          <div>Language Base: Typescript</div>
        </li>
        <li>
          <div>Frontend</div>
          <ul>
            <li>UI: React</li>
            <li>State Management: Mobx</li>
            <li>Request: Axios, Apollo Client</li>
          </ul>
        </li>
        <li>
          <div>Backend</div>
          <ul>
            <li>Frame: Express</li>
            <li>Graphql: Apollo Server</li>
          </ul>
        </li>
        <li>
          <div>Database</div>
          <ul>
            <li>Database: MongoDB</li>
            <li>ORM: Mongoose</li>
          </ul>
        </li>
      </ul>
    </Card>
  )
}

export default Dashboard