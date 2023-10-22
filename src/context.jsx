import React from "react";

const _default = {
    tab: {
        activeTab: "unread",
        setActiveTab: () => null
    },
    inbox: {
        inboxList: [],
        setInboxList: () => null
    },
    viewer: {
        activeEmail: null,
        setActiveEmail: () => null
    }        
}
const Context = React.createContext(_default);

function Wrapper({ children }) {
    const [activeTab, setActiveTab] = React.useState('unread');
    const [inboxList, setInboxList] = React.useState([]);
    const [activeEmail, setActiveEmail] = React.useState(null);

    const props = {
        tab: {
            activeTab,
            setActiveTab
        },
        inbox: {
            inboxList,
            setInboxList,
        },
        viewer: {
            activeEmail,
            setActiveEmail
        }
    }

    return (
        <Context.Provider value={props}>
            {children}
        </Context.Provider>
    )
}

export {
    Wrapper,
    Context,
}
