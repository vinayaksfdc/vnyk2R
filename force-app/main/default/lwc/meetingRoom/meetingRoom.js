/* eslint-disable no-console */
import { LightningElement,api } from 'lwc';

export default class MeetingRoom extends LightningElement {
    @api meetingRoomInfo={};

    get(){
        console.log(this.meetingRoomInfo);
    }

    @api showRoomInfo = false;
    tileClickHandler(){
        console.log(';this.meetingRoomInf'+this.meetingRoomInfo.roomName);
    const tileClick = new CustomEvent('tileclick', {detail:this.meetingRoomInfo});
    this.dispatchEvent(tileClick);
    console.log('event fired');
}
}