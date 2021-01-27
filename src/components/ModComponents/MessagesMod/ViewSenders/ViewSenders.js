import React,{useState,useEffect} from 'react';
//import { connect } from 'react-redux';
import ReactPaginate from "react-paginate";
//import classes from './ViewSenders.module.css'
import './Pagination.css'

import axios from '../../../../axios-orders';
import classes from './ViewSenders.module.css';
//import * as actions from '../../../../store/actions/index'

const ViewSenders = (props) =>{

 //   const {OnfetchdModMessages} = props;

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);

   
 
  
    const getData = async () => {
         await axios.get('api/messages/view/'+ props.businessId )
        .then(res =>{
            const data = res.data;
            console.log(data)
            if(data !== ""){   
                const slice =data.slice(offset, offset + perPage);
                //console.log(slice)
                const postData = slice.map((pd) => (
                <div key={pd.id} className={classes.Senders} onClick={()=> props.valueSender(pd.userId)} >
                    <span>{pd.username_sender} </span>
                </div>
                ));
                setData(postData);
                setPageCount(Math.ceil(data.length / perPage));
            }
        })
        .catch(err => {
            setData("Network error has occured !")            
        })
    };

    const handlePageClick = (e) => {
      const selectedPage = e.selected;
      setOffset(selectedPage + 1);
    };

    useEffect(() => {
      getData();
    }, [offset]);


    return(
        <>
            <div >
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />{" "}
            {data}
            </div>
        </> 
    )
}

// const mapStateToProps = state => {
//     return {
//       //  modMessages:state.messages.modMessages
//     };
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//        // OnfetchdModMessages : (id) => dispatch(actions.fetchedModMessages(id)),
//     };
//   };
export default ViewSenders;
//export default connect( mapStateToProps,mapDispatchToProps )(  ViewSenders);