import React, { useEffect } from "react";
import { Context } from "../context";
import { body } from "../mock-data/body";
import dayjs from "dayjs";

function EmailBody() {
    const { viewer: { activeEmail }, favorites } = React.useContext(Context);
    const [emailData, setEmailData] = React.useState(null);

    useEffect(() => {
        setEmailData(null);

        if (!activeEmail) {
            return;
        }

        (async () => {
            try {
                const response = await fetch(`https://flipkart-email-mock.vercel.app/?id=${activeEmail.id}`);
                const data = await response.json();
                setEmailData(data);
            } catch (err) {
                alert(err);
            }
        })()
    }, [activeEmail]);

    if (activeEmail === null) {
        return <></>
    }

    return (
        <div className="email-holder">
            <div className="email-body">
                <div className="header">
                    <img src={`https://ui-avatars.com/api/?background=e54065&color=fff&name=${activeEmail.from.name}&length=1`} />
                    <div className="header-content">
                        <h6>{activeEmail.from.name}</h6>
                        <small>{dayjs.unix(activeEmail.date / 1000).format('DD/MM/YYYY hh:mm a')}</small>
                    </div>
                    {
                        !favorites.isMarked(activeEmail.id) && (
                            <button className="favorite" onClick={() => favorites.add(activeEmail)}>
                                Mark as favorite
                            </button>
                        )
                    }
                </div>
                {
                    emailData === null ? (
                        <>
                            Loading....
                            <p style={{ visibility: 'hidden' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores odit ipsum, illum maiores quidem iure unde, quibusdam similique laboriosam, deserunt quia sapiente enim. Dolorem nostrum eos minus voluptatibus odio voluptate.</p>
                        </>
                    ) : (
                        <div className="email-content" dangerouslySetInnerHTML={{ __html: emailData.body }} />
                    )
                }
            </div>
        </div>
    )
}
export default EmailBody;