import React from 'react';

import {Card,Col} from 'react-bootstrap';
import classes from './Product.module.css' ;


const Product = (props) => {
    return(
        <> 
            <Col  sm={12} md={6} lg={4} className={classes.Column}> 
                <Card key={props.product.id} className={classes.ViewProduct}>
                    <Card.Img    variant="top" src="logo512.png"  height="200" width="150" /> 
                    <Card.Header style={{/*color:"#39a8a8",*/textAlign:"center"}}>{props.product.name}</Card.Header>
                    <Card.Body>
                        <p> Διαθέσιμα : {props.product.number}</p>
                        <p> Τιμή : {props.product.value}</p>
                        <p> Πληροφορίες : {props.product.info}</p>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default Product ;