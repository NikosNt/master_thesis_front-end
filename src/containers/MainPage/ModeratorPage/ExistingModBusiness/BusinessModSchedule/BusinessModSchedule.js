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
    
    console.log("+++++++++++++++++++")   
    console.log(props.modBusiness)
    console.log("++++++++++++++++++")   

  //  console.log(props.modBusinessSchedule)
    let days = null;
    days = props.modBusinessSchedule.map(day => (
        <ScheduleDay key={day.id} schedule={day} />
    ))

    return(
        <React.Fragment>
            <div className={classes.Schedule}>
                {days}
            </div>
            <br/><br/> <br/>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        modBusinessSchedule:state.modPage.modBusinessSchedule,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnFetchModScheduleBusiness: (id)=> dispatch( actions.fetchModScheduleBusiness(id) ),
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( BusinessModSchedule );