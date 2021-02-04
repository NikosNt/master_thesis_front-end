import React from 'react';

import {Card,Col,Carousel} from 'react-bootstrap';
import classes from './Product.module.css' ;
 


const Product = (props) => {

 
    let images = props.product.files.map( (img,index) =>(
        // <img key={index}  className="preview"  src={img.url}  alt="" height={200}/>
        <Carousel.Item  interval={999999} key={index}>
           <img  className="d-block w-100"  src={img.url}  alt="" height={350} />
        </Carousel.Item>
    ))


    if(!props.product.files.length   ){
       images=( <Carousel.Item  interval={999999}  >
                    <img  className="d-block w-100"  src="/logo512.png"  alt="" height={320} />
                </Carousel.Item>)
    }
   
    return(
        <> 
            <Col  sm={12} md={6} lg={4} className={classes.Column}> 
                <Card key={props.product.id} className={classes.ViewProduct}>
                    <Card.Header className={classes.Header}>{props.product.name}</Card.Header>
                    <Card.Body>
                        <div className={classes.MyCarousel}>
                            <Carousel>{images}</Carousel>
                        </div>
                        <hr/>
                        <div style={{marginTop:"20px"}}>
                            <p> Διαθέσιμα : {props.product.number}</p>
                            <p> Τιμή : {props.product.value}</p>
                            <p> Πληροφορίες : {props.product.info}</p>
                        </div> 
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default Product ;