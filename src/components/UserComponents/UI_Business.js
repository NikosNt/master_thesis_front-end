import React  from 'react';
import MyButton from '../UI/Button/MyButton';
import {Col,Card} from 'react-bootstrap';
import {Rating} from '@material-ui/lab'; 
import classes from './UI_Business.module.css';
import {getDay} from '../../shared/utility';

const UI_Business = (props) => {
    
    return (
        <>
            <Col  sm={12} md={12} lg={12} xl={4} className={classes.Column} > 
                <Card  className={classes.ViewBusiness}  >
                    <Card.Header style={{color:"#39a8a8",textAlign:"center",fontSize:"22px"}}>{props.business.business_name}</Card.Header>  
                    <Card.Body>
                        <div className={classes.Rating}>             
                            {props.business.rating === -1
                                ? <p>Δεν υπάρχει αξιολόγηση</p> 
                                : <Rating  name="half-rating" defaultValue={props.business.rating} precision={0.1} readOnly  />} 
                        </div>                      
                        {/* <p>Διεύθυνση :</p> {addressOutput}            */}
                        { props.business.ref === null ?
                            <p> Δεν υπάρχει ιστοσελίδα διαθέσιμη</p>
                            :<p>Σύνδεσμος : <a href={props.business.ref} target="_blank" rel="noreferrer">  {props.business.ref} </a></p>
                        }
                        <p>Τηλέφωνα : </p>{props.phones}<br/><br/>
                        <p>Ωράριο λειτουργίας για  {getDay(props.business.day)} :  </p><p>{props.schedule}</p>
                        {props.open?<h6 className={classes.Open}>Ανοιχτά</h6>:null}
                        {!props.open && props.close?<h6 className={classes.Closed} >Κλειστά</h6>:null}
                        <hr/>
                        <MyButton size="c" variant="custom"  clicked={props.infoClicked } >Περισσότερες πληροφορίες</MyButton>
                        <MyButton size="c" variant="success" clicked={props.mapClicked }>Άνοιγμα στον χάρτη</MyButton>
                    </Card.Body>
                </Card> 
            </Col>
            <style type="text/css">
            {`
            .btn-c {
                box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.2);
                padding: 0.5rem 2rem;
                font-size: 1rem;
            }
            `}
      </style>
        </>

    )

}
export default UI_Business;