import React, { useEffect } from "react";
import { Context } from "../context";
import dayjs from "dayjs";

function Sidebar() {
    const {
            viewer: {
                setActiveEmail
            }, 
            inbox: { 
                inboxList, 
                setInboxList,
                reads
            },
            tab: {
                activeTab
            },
            favorites,
        } = React.useContext(Context);

    useEffect(() => {
        (async () => {
            try {
                if (activeTab === "favorites") {
                    return setInboxList(favorites.list)
                }

                if (activeTab === "read") {
                    return setInboxList(reads.list);
                }

                const response = await fetch('https://flipkart-email-mock.vercel.app/');
                const { list } = await response.json();

                if (activeTab === "unread") {
                    const unread = list.reduce((a, b) => {
                        if (!reads.isRead(b.id)) {
                            a.push(b);
                        }

                        return a;
                    }, []);

                    return setInboxList(unread);
                }                

                return setInboxList(list);
            } catch (err) {
                return alert(err);
            }
        })()
    }, [activeTab]);

    return (
        <div className="sidebar">
            {inboxList.map((item) => (
                <div key={item.id} className={`email-card ${reads.isRead(item.id) && "is-read"}`} role="button" onClick={() => {
                    setActiveEmail(item);
                    return reads.markRead(item);
                }}>
                    <img src={`https://ui-avatars.com/api/?background=e54065&color=fff&name=${item.from.name}&length=1`} />
                    <div className="information">
                        <h6>
                            From: <span>{`${item.from.name} <${item.from.email}>`}</span>
                        </h6>
                        <h6>
                            Subject: <span>{item.subject}</span>
                        </h6>
                        <p>{item.short_description}</p>
                        <small>{dayjs.unix(item.date / 1000).format('DD/MM/YYYY hh:mm a')}</small>
                        {
                            favorites.isMarked(item.id) && (
                                <small className="favorite">Favorite</small>
                            )
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Sidebar;
