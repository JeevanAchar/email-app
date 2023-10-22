import { Context, Wrapper } from "./context";
import EmailBody from "./components/Email-body";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";
import React, { useEffect } from "react";

function Inbox() {
    const { viewer: { activeEmail } } = React.useContext(Context);

    useEffect(() => {
        return;
    }, [activeEmail]);

    return (
        <Wrapper>
            <div className="inbox">
                <Header />
                <div className="flex">
                    <Sidebar />
                    <EmailBody />
                </div>
            </div>
        </Wrapper>
    )
}
export default Inbox;
