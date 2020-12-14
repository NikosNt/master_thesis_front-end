import React  from 'react';
import MyButton from '../UI/Button/MyButton'
const deleteProp = (props) =>{
 
    return (
        <>
        <div>
            <span>{props.children}</span>
            <MyButton variant="danger" clicked={props.onClick}> Delete</MyButton>
        </div> 
        </>
    )

}

export default deleteProp;