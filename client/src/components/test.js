import React, { Component } from 'react'
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Test(){
    return(
      <div>
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="home" title="Home">
   
  </Tab>
  <Tab eventKey="profile" title="Profile">
  
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
  
  </Tab>
</Tabs>
      </div>
    )
  }
  export default  Test;