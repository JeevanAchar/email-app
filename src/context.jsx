import React, { useEffect } from "react";

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
    const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('favorites') || '[]'));
    const [reads, setReads] = React.useState([]); 

    /** Write to local storage when favorites are changed */
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites]);

    const props = {
        tab: {
            activeTab,
            setActiveTab
        },
        inbox: {
            inboxList,
            setInboxList,
            reads: {
                list: reads,
                markRead: (item) => {
                    return setReads([...reads, item]);
                },
                isRead: (id) => {
                    const index = reads.findIndex((item) => item.id === id.toString());
                    return index > -1 ? true : false;
                }
            }
        },
        viewer: {
            activeEmail,
            setActiveEmail
        },
        favorites: {
            list: favorites,
            add: (item) => {
                setFavorites([...favorites, item]);
            },
            remove: (id) => {
                const index = favorites.findIndex((item) => item.id === id.toString());
                const favoritesClone = [...favorites];
                favoritesClone.splice(index, 0);
                return setFavorites(favoritesClone)
            },
            isMarked: (id) => {
                const index = favorites.findIndex((item) => item.id === id.toString());
                return index > -1 ? true : false;
            }
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
