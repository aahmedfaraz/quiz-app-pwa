import React from 'react';
import spinner from '../assets/giff/spinner.jpg';

const Spinner:React.FC = () => {
    return (
        <img src={spinner} alt="Loading..." className="spinner" />
    )
}

export default Spinner;