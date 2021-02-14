import React,{useState} from 'react';
import { connect } from 'react-redux';

import Button from "../../../UI/Button/MyButton";
import DeleteProp from '../../DeleteProp';
import classes from './ScheduleDay.module.css';
import Modal from '../../../UI/Modal/Modal'
import * as actions from '../../../../store/actions/index';

import {Row,Col} from 'react-bootstrap';
import {getDay,getHourMin} from '../../../../shared/utility';
import DateFnsUtils from "@date-io/date-fns";
import {TimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import * as Icon from 'react-bootstrap-icons';


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
        onDeleteScheduleSetHourDay(props.schedule.businessId,id );
        if(props.schedule.hours.length === 1 && !props.failSchedule){
            const obj = {
                businessId : props.schedule.businessId,
                day : props.schedule.day,
                state :  0,
                hours : []
            }
            console.log("mphka  "+props.failSchedule)
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
            let obj = []
            if(!checked){
                obj = {
                    businessId : props.schedule.businessId,
                    day : props.schedule.day,
                    state : 1,
                    hours : [{
                        opening : openHourMin,
                        closing : closeHourMin,
                    }]
                }
            }else{
                obj = {
                    businessId : props.schedule.businessId,
                    day : props.schedule.day,
                    state : 0
                }
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

    //console.log(props.schedule)
    

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
                        <Row>
                            <Col lg={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <span>Άνοιγμα : &nbsp;</span><TimePicker clearable ampm={false} label="24 hours" value={newOpening} onChange={(event) =>handleTimeChangeHandler(event,"open")}  disabled={checked}/>
                                </MuiPickersUtilsProvider>
                            </Col>
                            <Col lg={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <span>Κλείσιμο : &nbsp;</span><TimePicker clearable ampm={false} label="24 hours" value={newClosing} onChange={(event) =>handleTimeChangeHandler(event,"close")}   disabled={checked}/>
                                </MuiPickersUtilsProvider>
                            </Col>
                        </Row>

                    </Col>
                    <Col md={2}>
                        { checkbox  }
                    </Col>
                    <Col md={2}>
                        <Button  variant="success" clicked={() => addHourHandler()}> <Icon.Plus  /></Button>
                    </Col>
                </Row>
            </div> 
            <hr/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        failSchedule:state.schedule.failSchedule
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onDeleteScheduleSetHourDay: (busID,id )=> dispatch( actions.deleteModScheduleSetHourDay(busID,id ) ),
        onUpdateScheduleBusinessDay: (setHourDay,id)=> dispatch( actions.updateModScheduleBusinessDay(setHourDay,id) ),
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( ScheduleDay );