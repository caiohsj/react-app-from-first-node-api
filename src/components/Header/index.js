import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const header = () => {
    return (
        <header id="app-header">
            <Link to="/">
                <h1>JSHunt</h1>
            </Link>
        </header>
    )
}

export default header;