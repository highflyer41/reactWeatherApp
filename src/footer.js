import React from 'react';

const Footer = (props) => {
    return ( 
        <footer style={{position: (props.show ? 'static':'absolute')}}>© 2020 Meng Yang</footer>
     );
}
 
export default Footer;