// methodCaller.js
import { LightningElement } from 'lwc';

export default class MethodCaller extends LightningElement {
    video = "https://www.w3schools.com/tags/movie.mp4";

    handlePlay() {
        this.template.querySelector('c-video-player').play();
        console.log('handlePlay'+handlePlay);
    }

    handlePause() {
        this.template.querySelector('c-video-player').pause();
        console.log('handlepause'+handlepause);
    }
}