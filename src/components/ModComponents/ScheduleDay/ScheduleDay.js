

import React,{useState} from 'react';
import { connect } from 'react-redux';

import Button from "../../UI/Button/MyButton";
import DeleteProp from '../DeleteProp';
import classes from './ScheduleDay.module.css';
import Modal from '../../UI/Modal/Modal'
import * as actions from '../../../store/actions/index';

import {Row,Col} from 'react-bootstrap';
import {getDay,getHourMin} from '../../../shared/utility';
import DateFnsUtils from "@date-io/date-fns";
import {TimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const ScheduleDay = (props) =>{
    const {onDeleteScheduleSetHourDay,onUpdateScheduleBusinessDay} = props;

    const [checked, setChecked] = useState(false);
    const [newOpening,setNewOpening] = useState(new Date());
    const [newClosing,setNewClosing] = useState(new Date());
    const [showModal,setShowModal] = useState(false);  

    let hours = props.schedule.state === 1   
                        ?  props.schedule.hours.map(setHour =>(
                            <DeleteProp key={setHour.id} onClick={()=> deleteSetHourHandler(setHour.id)}>
                                {setHour.opening}-{setHour.closing}
                            </DeleteProp> )) 
                        : props.schedule.state === 0 ? <p>Closed</p> : null ;
             
    
   let checkbox =  props.schedule.state === 0 || props.schedule.state === 1
                        ? null 
                        : <span><input type="checkbox"   checked={checked}  onChange={ ()=> setChecked(!checked) }/> Closed</span>

    const deleteSetHourHandler = (id) => {
        console.log("To id ",id);  
         onDeleteScheduleSetHourDay(props.schedule.businessId,id );
        if(props.schedule.hours.length === 1){
            console.log("edw")
            const obj = {
                businessId : props.schedule.businessId,
                day : props.schedule.day,
                state :  0,
                hours : []
            }
            console.log(obj)
            onUpdateScheduleBusinessDay(obj,props.schedule.id);
        }     
    }

    const addHourHandler = () =>{
        const openHourMin = getHourMin(newOpening.getHours(),newOpening.getMinutes());
        const closeHourMin = getHourMin(newClosing.getHours(),newClosing.getMinutes());
        console.log(props.schedule.id)

        if(  openHourMin > closeHourMin){
            setShowModal(true);
        }else{
            const obj = {
                businessId : props.schedule.businessId,
                day : props.schedule.day,
                state : !checked ? 1 :   0,
                hours : [{
                    opening : openHourMin,
                    closing : closeHourMin,
                }]
            }
            console.log(obj)
            onUpdateScheduleBusinessDay(obj,props.schedule.id);
        }
    }

    const handleTimeChangeHandler = (time,state) => {
        if(state === "open"){
            setNewOpening(time );
        }
        if(state === "close"){
            setNewClosing(time );
        } 
    };

 
    return(   
        <>  
            <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <h4 style={{textAlign:"center"}}>Οι ώρες ανοίγματος και κλεισίματος δεν συμφωνούν</h4>
            </Modal>
        
            <div className={classes.Day} >
                <Row>
                    <Col>
                        <b>{getDay(props.schedule.day)}</b>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {hours}
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker clearable ampm={false} label="24 hours" value={newOpening} onChange={(event) =>handleTimeChangeHandler(event,"open")}  disabled={checked}/>
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker clearable ampm={false} label="24 hours" value={newClosing} onChange={(event) =>handleTimeChangeHandler(event,"close")}   disabled={checked}/>
                        </MuiPickersUtilsProvider>
                    </Col>
                    <Col md={2}>
                        { checkbox  }
                    </Col>
                    <Col md={2}>
                        <Button  variant="success" clicked={() => addHourHandler()}> Add</Button>
                    </Col>
                </Row>
            </div> 
        </>
    )
}


const mapStateToProps = state => {
    return {
        
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onDeleteScheduleSetHourDay: (busID,id )=> dispatch( actions.deleteScheduleSetHourDay(busID,id ) ),
        onUpdateScheduleBusinessDay: (setHourDay,id)=> dispatch( actions.updateScheduleBusinessDay(setHourDay,id) ),
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( ScheduleDay );