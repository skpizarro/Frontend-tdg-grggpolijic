
import React from 'react';
import "../css/Error.css";

const Error = ({mensaje}) => {
    return ( 
        <div className="Error_container">
            <p className="Error">{mensaje}</p>
        </div>
     );
}
 

export default Error;