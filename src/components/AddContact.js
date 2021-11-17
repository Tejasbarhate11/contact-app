import React from 'react'


class AddContact extends React.Component{
    state = {
        name: "",
        email: ""
    }

    add = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("All fields are mandatory!")
            return
        }

        this.props.addContactHandler(this.state)
        this.setState({ name: "", email: ""})
        this.props.history.push("/")
    }

    render(){
        return (
            <div className="ui main">
                <div class="ui top attached label">ADD CONTACT</div>
                <form className="ui form" onSubmit = {this.add}>
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
                    <button className="fluid ui button blue">ADD</button>
                </form>
            </div>
        )
    }
}

export default AddContact
