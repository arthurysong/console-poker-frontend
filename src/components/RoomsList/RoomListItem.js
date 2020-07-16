import React from 'react';
import lock from '../../pictures/lock-icon.png';
import lock2 from '../../pictures/lock-icon-dark.png';

class RoomListItem extends React.Component {
    state = {
        password: ""
    }

    showDialog = () => {
        document.getElementById(`dialog-dark-rounded-${this.props.room.id}`).showModal();
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
            <div className={`nes-container roomli_container is-rounded ${this.props.index % 2 === 0 ? 'is-dark' : ''}`}>
                {console.log(this.props.index)}
            <li className="room_li">{this.props.room.name}<br/>{this.renderLock()} <span className="room_li_desc">{this.props.room.no_users}/8 {this.renderJoinButton()}</span>
            </li>
                <dialog  className="nes-dialog is-dark is-rounded" id={`dialog-dark-rounded-${this.props.room.id}`}>
                    <form onSubmit={() => this.props.authenticateRoomPassword(this.state, this.props.room.id, this.props.history)} method="dialog">
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