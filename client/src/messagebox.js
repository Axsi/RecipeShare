import React from 'react';
import './style/authenticationpages.css';

class MessageBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Message-Container">
                <p className="Message">{this.props.usernameMessage}</p>
                <p className="Message">{this.props.passwordMessage}</p>
                <p className="Message">{this.props.existMessage}</p>
                <p className="Message">{this.props.incorrectMessage}</p>
                <p className="Image-Message"> {this.props.ImageWarning}</p>
            </div>
        )
    }
}

export default MessageBox;