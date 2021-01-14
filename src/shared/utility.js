export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}


export const getCurDate = () => {
    const currentdate = new Date(); 

    const hour = currentdate.getHours() >= 10 ? currentdate.getHours() : '0' + currentdate.getHours();
    const min = currentdate.getMinutes() >= 10 ? currentdate.getMinutes() :'0'+ currentdate.getMinutes() ;

    const  month= currentdate.getMonth()+1 >=10 ? currentdate.getMonth()+1 : '0' + (currentdate.getMonth()+1) 

    return { dayNum:currentdate.getDay(),
             date:currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear(),
             hour: hour+ ":" + min,
             time:currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(),
             day_time:currentdate.getFullYear() +"-"
                    + month + "-" 
                    +currentdate.getDate() + " "
                    +currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds(),
            }
}

export const getDay = (day) => {

    let currentDay= '';
    switch(day){
        case 0 : currentDay ="Κυριακή" ;break;
        case 1 : currentDay ="Δευτέρα" ;break;
        case 2 : currentDay ="Τρίτη" ;break;
        case 3 : currentDay ="Τετάρτη" ;break;
        case 4 : currentDay ="Πέμπτη" ;break;
        case 5 : currentDay ="Παρασκευή" ;break;
        case 6 : currentDay ="Σάββατο" ;break;
        default : break;
    }
    return  currentDay;
}

export const getHourMin = (hour,min) =>{
    const rHour =  hour >= 10 ? hour : '0' + hour;
    const rMin =  min >= 10 ? min : '0' + min;
    return rHour+':'+rMin;
}
