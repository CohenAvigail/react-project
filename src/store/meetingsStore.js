import { makeObservable, observable, action, runInAction, computed } from "mobx";

let idCounter = 0;

class MeetingsStore {


    baseUrl = 'http://localhost:8787/appointment';
    meetingsList = [] ;

    constructor() {
        makeObservable(this, {
            meetingsList: observable,
            init: action,
            addMeeting: action,
            getMeeting: computed,
            // getMeetingsHistory: computed,
            // getNextMeetings: computed
        });
        this.init();

    }

    async init() {
        try {
            const res = await fetch('http://localhost:8787/appointments');
            console.log("res (init)", res);

            const data = await res.json();

            // Unwrap the proxy to access the underlying array and update it
            const unwrappedArray = Array.from(this.meetingsList);
            unwrappedArray.push(...data);

            runInAction(() => {
                
                this.meetingsList = unwrappedArray;
                console.log("meetings list (runInAction)", this.meetingsList);
            });
        }
        catch (err) {
            console.log(err);
        }

    }

    get getMeeting() {

        this.meetingsList.forEach(element => {
            element.id = ++idCounter;
        });

        const data = this.meetingsList;
       
        return data;
    }

    async addMeeting(meeting) {

        try {
            console.log(meeting);
        
            const res = await fetch(this.baseUrl, {
                method: 'POST',
                body: JSON.stringify(meeting),
                headers: {
                    'Content-Type': 'application/json'
                } 
            });

            runInAction(() => {
                if (res.status == 200) {
                    this.meetingsList = { ...this.meetingsList, newMeetingeeting }
                    //alert("The appointment was successfully set!  Thank you for contacting our services!")
                }
                else if (res.status == 400) {
                    alert("Error! The time you requested is not available...")
                }
            })

            console.log(res);

        }
        catch (error) {
            console.log(error)
        }
    }

    // get getMeetingsHistory(){
    //     const now = new Date();
    //     let pastMeetings = this.meetingsList.filter(x => x.dateTime < now);
    //     return pastMeetings.sort((a,b)=> b.dateTime - a.dateTime);
    // }

    // get getNextMeetings(){
    //     const now = new Date();
    //     let nextMeetings =  this.meetingsList.filter(x => x.dateTime >= now);
    //     return nextMeetings.sort((a,b)=> a.dateTime - b.dateTime);
    // }


}

export default new MeetingsStore();
