
import React from 'react';
import './m.css';


const roomTypes = [
  'Bedroom', 'Dining Room', 'Kitchen', 
  'Living Room', 'Office', 'Study Room'
];

class RoomSelector extends React.Component {
  handleRoomSelect = (roomType) => {
    this.props.onSelectRoom(roomType);
  };

  render() {
    return (
      <div className="ui-section">
        <h3>Room Selection</h3>
        <div className="button-group">
          {roomTypes.map((room) => (
            <button
              key={room}
              className={this.props.currentRoom === room ? 'active' : ''}
              onClick={() => this.handleRoomSelect(room)}
            >
              {room}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default RoomSelector;