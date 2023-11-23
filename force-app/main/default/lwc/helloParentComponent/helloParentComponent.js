import { LightningElement, track } from 'lwc';

export default class HelloParentComponent extends LightningElement {
    @track cityList
    getCityList() {
        this.cityList = ['London', 'Paris', 'New York', 'Mumbai', 'Sydney'];
        this.cityList = this.randomizeArray(this.cityList);
        this.cityList = this.cityList.map(city => ({ 'city': city, 'open': false }))
        console.log(this.cityList);
    }

    randomizeArray(arr) {
        const randomArr = arr;
        // Randomize the array
        for (let i = randomArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = randomArr[i];
            randomArr[i] = randomArr[j];
            randomArr[j] = temp;
        }
        return randomArr;
    }
}