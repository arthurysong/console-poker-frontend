import React from 'react';
import RoomListItem from './RoomListItem';
import Cable from 'actioncable';
import { NavLink } from 'react-router-dom';

class RoomsList extends React.Component {
    state = {
        rooms: [],
        newForm: false
    }

    //websockets handlers
    handleData(data){
        if (data.type === 'current_rooms'){
            this.setState({
                rooms: data.rooms
            })
        } else if (data.type === 'new_room'){
            this.setState(prevState => ({
                rooms: [...prevState.rooms, data.room]
            }))
        }
        
    }

    // lifecycle hooks
    componentDidMount(){
        this.cable = Cable.createConsumer(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);

        this.subscription = this.cable.subscriptions.create({
            channel: 'RoomsListChannel'
          }, {
            connected: () => {},
            disconnected: () => {},
            received: (data) => {
                console.log(data);
                this.handleData(data);
            }
        });
    }

    componentWillUnmount(){
        this.cable.subscriptions.remove(this.subscription);
    }
    
    //component handlers
    changeHandler = event => {
        this.setState({
            name: event.target.value
        })
    }

    clickHandler = () => {
        this.props.logOut(this.props.history)
    }

    renderRooms = () => (this.state.rooms.map((room,index) => <RoomListItem key={index} index={index} room={room} wsSubscribeRoom={this.props.wsSubscribeRoom} history={this.props.history}/>))
    renderUser = () => {
        if (this.props.user) {
            return (
                // <a href="#" id="user_badge" className="nes-badge">
                    /* <span className="is-primary"> */
                    <>
                        {this.props.user.username} ({this.props.user.chips})
                    </>
                    /* </span> */
                // </a>
            )
        }
    }

    redirectToDeposits = () => {
        this.props.history.push(`/users/${this.props.user.id}/deposit`); // should i have route to something like /users/:id/deposit??
    }
    
    render () {
        return (
            <div id="rooms_component">
                {this.renderUser()}<br/>
                <button className="nes-btn smaller-btn is-error" id="test" onClick={this.clickHandler}>Log Out</button>&nbsp;
                <button className="nes-btn is-success smaller-btn" onClick={this.redirectToDeposits}>Deposit</button><br/><br/><br/><br/>
                {/* <div className="ne"></div> */}
                <NavLink to="/rooms/new" className="nes-btn is-primary smaller-btn">Create Room</NavLink><br/><br/>
                <ul id="rooms_ul">
                    {this.renderRooms()}
                </ul>
                
            </div>
        )
    }
}

export default RoomsList;