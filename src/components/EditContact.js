import React from 'react'
import { Link } from "react-router-dom"

class EditContact extends React.Component{
    constructor(props){
        super(props)
        const {id, name, email} = props.location.state.contact
        this.state = {
            id: id,
            name: name,
            email: email
        }
    }

    update = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("All fields are mandatory!")
            return
        }

        this.props.updateContactHandler(this.state)
        this.setState({ id:"", name: "", email: ""})
        this.props.history.push("/")
    }

    render(){
        return (
            <div className="ui main">
                <div class="ui top attached label">ADD CONTACT</div>
                <form className="ui form" onSubmit = {this.update}>
                    <div className="field">
                        <div class="ui labeled input">
                            <div class="ui label">
                                Name
                            </div>
                            <input
                                type="text" 
                                name="name" 
                                value={this.state.name}
                                onChange={ (e) => this.setState({ name: e.target.value }) }
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div class="ui labeled input">
                            <div class="ui label">
                                Email
                            </div>
                            <input
                                type="text" 
                                name="email" 
                                value={this.state.email}
                                onChange = { (e) => this.setState({ email: e.target.value })}
                            />
                        </div>
                    </div>
                    <button className="fluid ui button blue">Update</button>
                    <br />
                    <Link to="/">
                        <button className="fluid ui primary basic button">GO BACK</button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default EditContact
