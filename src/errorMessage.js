import React from 'react';

const ErrorMessage = (props) => {
    return ( 
        <div style={{display: (props.showTwo ? 'block':'none')}}>
              <h2>Invalid Zip Code. Try again!</h2>
        </div>
     );
}
 
export default ErrorMessage;