import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import ScheduleDay from '../../../../../components/ModComponents/ScheduleDay/ScheduleDay'
import classes from './BusinessModSchedule.module.css';

import * as actions from '../../../../../store/actions/index';

    const BusinessModSchedule = (props) =>{

    const {OnFetchModScheduleBusiness} = props;

    useEffect(() => {
        async function fetchData() {
            await OnFetchModScheduleBusiness(props.modBusiness.id);
        }
        fetchData();
    }, [OnFetchModScheduleBusiness,props.modBusiness.id]); 

    // const[scheduleUpdateState,setScheduleUpdateState]
    
    // console.log("+++++++++++++++++++")   
    // console.log(props.modBusiness)
    // console.log("++++++++++++++++++")   

  //  console.log(props.modBusinessSchedule)
    let days = null;
    days = props.modBusinessSchedule.map(day => (
        <ScheduleDay key={day.id} schedule={day} />
    ))

    return(
        <React.Fragment>
            {/* <br/> */}
            <div className={classes.Schedule}>
                {days}
            </div>
            <br/>
            <br/>
            <br/>
        </React.Fragment>
    )

}


const mapStateToProps = state => {
    return {
        updateSchedule:state.modPage.updateSchedule,
        modBusinessSchedule:state.modPage.modBusinessSchedule,
        userId:state.auth.userId,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnFetchModScheduleBusiness: (id)=> dispatch( actions.fetchModScheduleBusiness(id) ),

    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( BusinessModSchedule );