import React  from 'react';
import classes from './StartingImage.module.css';

const StartingImage = (props) =>{
    return(
        <div className={classes.DivImage}>
          <img src={"main_image_transparent.png"} alt="img" className={classes.MainImage}></img>
        </div>
    )
}

export default StartingImage;