import React from 'react';

import {Card,Col} from 'react-bootstrap';
import classes from './Service.module.css' ;


const Service = (props) => {
    return(
        <> 
            <Col  sm={12} md={6} lg={4} className={classes.Column}> 
                <Card key={props.service.id} className={classes.ViewService}  >
                    <Card.Header style={{/*color:"#39a8a8",*/textAlign:"center"}}>{props.service.name}</Card.Header>
                    <Card.Body>
                        <p> Τιμή : {props.service.value}</p>
                        
                    </Card.Body>
                    <Card.Footer>
                        <p> Πληροφορίες : {props.service.info}</p>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default Service ;