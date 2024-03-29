import React  from 'react';
import MyButton from '../UI/Button/MyButton'
import {Col,Row} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const deleteProp = (props) =>{
 
    return (
        <>
        <div>
            <Row>
                <Col xs={12} md={10}>
                    <span>{props.children}</span>
                </Col>
                <Col xs={12} md={2}>
                    <MyButton variant="danger" clicked={props.onClick}>   <Icon.Trash />  </MyButton>
                </Col>
            </Row>                  
        </div> 
        </>
    )

}

export default deleteProp;