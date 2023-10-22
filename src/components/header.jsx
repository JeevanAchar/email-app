import React from 'react';
import { Context } from '../context';

const FILTERS = ['unread', 'read', 'favorites'];

function Header() {
    const { tab: { activeTab, setActiveTab } } = React.useContext(Context);

    return (
        <header>
            <h6>Filter By:</h6>
            <ul>
                {
                    FILTERS.map((item) => (
                        <li key={item}>
                            <button
                                className={item === activeTab ? "active" : ""}
                                onClick={() => setActiveTab(item)}>
                                    {item}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </header>
    )
}
export default Header;
