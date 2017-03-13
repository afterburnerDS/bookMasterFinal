import React from 'react';
import {Link} from 'react-router';

export default function Chrome(props) {
    return (
        <div className="chrome">
            <header>
                <h1><Link to="/">Trelloish</Link></h1>
            </header>
            <main>
                {props.children}
            </main>
        </div>
    );
}
