import React from 'react';
import Slide from 'material-ui/transitions/Slide';


const Transition = props => (
    <Slide direction={props.direction || 'up'} {...props}/>
);

export default Transition;
