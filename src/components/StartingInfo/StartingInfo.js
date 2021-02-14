import React from 'react';

import classes from './StartingInfo.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const startingInfo = (props) =>{

    return(
        <div className={classes.Info} >
                <h1 >Αναζητήστε οποιονδήποτε τύπο επιχείρησης ή υπηρεσίας</h1>
                <p>To FindMe μπορεί να σας βοηθήσει να αναζητήσετε και να βρείτε οποιοδήποτε είδος επιχείρησης η υπηρεσίας <br/>
                   Οπως Γιατροί, Εστιατόρια, Μπαρ, Ξενοδοχεία κ.λπ. στην περιοχή σας</p> 
        </div>
    )

}

export default startingInfo;