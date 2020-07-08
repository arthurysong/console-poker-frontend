import React from 'react';
import lock from '../lock-icon.png';
import lock2 from '../lock-icon-dark.png';
import { fetchWithToken } from '../utilities/fetchWithToken';
import { BASE_URL } from '../utilities/BASE_URL';

class RoomListItem extends React.Component {
    state = {
        password: ""
    }

    showDialog = () => {
        // console.log(this.props.room.id);
        document.getElementById(`dialog-dark-rounded-${this.props.room.id}`).showModal();
    }

    authenticatePassword = () => {
        const body = JSON.stringify(this.state);
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }

        fetchWithToken(`${BASE_URL}/rooms/${this.props.room.id}/authenticate`, options)
            .then(resp => resp.json())
            .then(json => {
                // console.log(json);
                if (json.error) {
                    document.getElementById(`dialog-dark-rounded-alert`).showModal();
                } else {
                    this.props.history.push(`/rooms/${this.props.room.id}`)
                }
            })
    }

    redirect = () =>  {
        this.props.history.push(`/rooms/${this.props.room.id}`)
    }

    renderJoinButton = () => {
        if (this.props.room.has_password) {
            return (<button onClick={this.showDialog}>join</button>)
        }
        if (this.props.room.no_users < 8){
            return (<button onClick={this.redirect}>join</button>)
        }
    }

    renderLock = () => {
        if (this.props.room.has_password) {
            if (this.props.index % 2 === 0) {
                return (<img className="lock_img" src={lock} alt="Lock" />)
            }
            return (<img className="lock_img" src={lock2} alt="Lock2" />)
        }
    }
    
    handleChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div className={`nes-container room_container is-rounded ${this.props.index % 2 === 0 ? 'is-dark' : ''}`}>
                {console.log(this.props.index)}
            <li className="room_li">{this.props.room.name}<br/>{this.renderLock()} <span className="room_li_desc">{this.props.room.no_users}/8 {this.renderJoinButton()}</span>
            </li>
                <dialog  className="nes-dialog is-dark is-rounded" id={`dialog-dark-rounded-${this.props.room.id}`}>
                    <form onSubmit={this.authenticatePassword} method="dialog">
                    {/* <p class="title">Dark dialog</p> */}
                        <p>Please enter password!</p>
                        <menu className="dialog-menu">
                            <input type="password" className="nes-input" name="password" onChange={this.handleChange} value={this.state.password}/>
                            <button type="submit" className="nes-btn is-primary">Confirm</button>
                        </menu>
                    </form>
                </dialog>
                <dialog className="nes-dialog is-dark is-rounded" id={`dialog-dark-rounded-alert`}>
                    <form method="dialog">
                        <p>Invalid Password, Not Authorized.</p>
                        <menu className="dialog-menu">
                            <button className="nes-btn">Okay</button>
                        </menu>
                    </form>
                </dialog>
            </div>
        )
    }
}

export default RoomListItem;