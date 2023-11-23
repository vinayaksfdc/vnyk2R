/* eslint-disable no-console */
import { LightningElement,track } from 'lwc';   
export default class MeetingRooms extends LightningElement {

    @track selectedMeetingRoom;

    meetingRoomsInfo = [
     {roomName:'A-01',roomCapacity:'12'},
     {roomName:'A-02',roomCapacity:'16'},
     {roomName:'A-03',roomCapacity:'12'},
     {roomName:'B-01',roomCapacity:'05'},
     {roomName:'B-02',roomCapacity:'08'},
     {roomName:'B-03',roomCapacity:'10'},
     {roomName:'C-01',roomCapacity:'20'}
    ];

    onTileSelectHandler(event) {
        console.log('event Recieved');
        const meetingRoomInfo = event.detail;
        this.selectedMeetingRoom = meetingRoomInfo.roomName;
    }
}