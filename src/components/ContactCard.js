import React from "react"
import { Link } from "react-router-dom"
import user from "../images/user.png"

const ContactCard = (props) => {
    const {id, name, email} = props.contact
    return (
        <div className="item">
            <img src={user} alt="user" className="ui avatar image" />
                <div className="content">
                    <Link to={{pathname:`/contact/${id}`, state:{contact: props.contact}}}>
                        <div className="header">{name}</div>
                        <div>{email}</div>
                    </Link>
                </div>
                <Link to={{pathname: `/edit`, state:{contact: props.contact}}}>
                    <i className="edit outline icon"
                    style={{ color: "black", marginTop: "7px" }}
                    />
                </Link>
                <i className="trash alternate outline icon"
                style={{ color: "red", marginTop: "7px" }}
                onClick={()=>props.clickHandler(id)}/>
        </div>
    )
}

export default ContactCard