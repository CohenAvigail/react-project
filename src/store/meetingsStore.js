import { makeObservable, observable, action, runInAction, computed } from "mobx";


class MeetingsStore {

    baseUrl = 'http://localhost:8787/appointment'
    meetingsList = [];

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
            const data = await res.json();
            runInAction(() => {
                this.meetingsList = { ...data }
            });
        }
        catch (err) {
            console.log(err);
        }

    }

    get getMeeting() {
        return this.meetingsList
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

            runInAction(()=>{
                if(res.status == 200){
                    this.meetingsList = { ...this.meetingsList, meeting }
                    alert("The appointment was successfully set!  Thank you for contacting our services!")
                }
                else if(res.status == 400){
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
