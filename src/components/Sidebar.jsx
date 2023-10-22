import React, { useEffect } from "react";
import { Context } from "../context";

function Sidebar() {
    const [list, setList] = React.useState([]);
    const { viewer: { setActiveEmail } } = React.useContext(Context);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://flipkart-email-mock.vercel.app/');
                const { list } = await response.json();

                return setList(list);
            } catch (err) {
                return alert(err);
            }
        })()
    }, []);

    return (
        <div className="sidebar">
            {list.map((item) => (
                <div key={item.id} className="email-card" role="button" onClick={() => setActiveEmail(item)}>
                    <img src={`https://ui-avatars.com/api/?background=e54065&color=fff&name=${item.from.name}&length=1`} />
                    <div className="information">
                        <h6>
                            From: <span>{`${item.from.name} <${item.from.email}>`}</span>
                        </h6>
                        <h6>
                            Subject: <span>${item.subject}</span>
                        </h6>
                        <p>{item.short_description}</p>
                        <small>{item.date}</small>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Sidebar;
