import React  from 'react';
import classes from './NewService.module.css' ;
import {Card} from 'react-bootstrap';
import MyButton from '../../../../components/UI/Button/MyButton'
 

const NewService = (props) => {

    return(
        <>
            <Card   className={classes.NewService}  >
                <Card.Header style={{color:"#2f9c42",textAlign:"center"}}><h5>Πρόσθεσε μια νέα υπηρεσία !</h5></Card.Header>
                <Card.Body>
                    <span>Ονομα : </span>
                    <input  style={{width:"20%"}} value={props.name} onChange={props.nameChange}/> 
                    <span> Τιμή :  </span> 
                    <input  style={{width:"20%"}} value={props.value} onChange={props.priceChange}/> 
                    <p> Πληροφορίες :</p> 
                    <textarea style={{width:"80%",height:"70px" }} value={props.info} onChange={props.infoChange} /><br/>
                    <MyButton  variant="success" clicked={props.addNewService}>Add</MyButton>
                </Card.Body>
            </Card>  
        </>
    )

}

export default NewService;

