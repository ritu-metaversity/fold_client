import {React, useState} from 'react'
import Alert from 'react-bootstrap/Alert';
import './Alert.css'

function AlertBtn(props) {

    const [showHide, setShowHide]=useState(true)

    const handleClick = ()=>{
        if(showHide===true){
            setShowHide(false)
        }
        else{
            setShowHide(true);
        }
    }
    return(
    <>
    {
        showHide?<Alert variant={props.color} className="alert-messege">
        <p className='error-mes' style={{float:"left"}}>{props.val}</p>
        <p><i className="fa fa-close" style={{float:"right"}} onClick={handleClick}></i></p>

    </Alert>:""
    }
        
    </>
    )
}

export default AlertBtn