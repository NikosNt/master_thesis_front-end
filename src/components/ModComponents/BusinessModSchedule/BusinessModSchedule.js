import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import ScheduleDay from './ScheduleDay/ScheduleDay'
import classes from './BusinessModSchedule.module.css';
import Modal from '../../UI/Modal/Modal'

import * as actions from '../../../store/actions/index';

    const BusinessModSchedule = (props) =>{

    const {OnFetchModScheduleBusiness,OnFailSchedule} = props;

    useEffect(() => {
        async function fetchData() {
            await OnFetchModScheduleBusiness(props.modBusiness.id);
        }
        fetchData();
    }, [OnFetchModScheduleBusiness,props.modBusiness.id]); 
    
    //Debug
    // console.log("+++++++++++++++++++")   
    // console.log(props.modBusiness)
    // console.log("++++++++++++++++++")   

    // console.log(props.modBusinessSchedule)
    let days = null;
    days = props.modBusinessSchedule.map(day => (
        <ScheduleDay key={day.id} schedule={day} />
    ))

    return(
        <React.Fragment>
            <Modal show={props.failSchedule} modalClosed={() => OnFailSchedule(false) }>
                <p style={{textAlign:"center"}}>An error has occured !</p>
            </Modal>
            <div className={classes.Schedule}>
                {days}
            </div>
            <br/><br/> <br/>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        modBusinessSchedule:state.schedule.modBusinessSchedule,
        failSchedule:state.schedule.failSchedule
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnFetchModScheduleBusiness: (id)=> dispatch( actions.fetchModScheduleBusiness(id) ),
        OnFailSchedule:(err)=>dispatch(actions.failSchedule(err))
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( BusinessModSchedule );