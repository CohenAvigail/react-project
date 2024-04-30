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
            getMeetings: computed,
            getMeetingsHistory: computed,
            // getNextMeetings: computed,
            compareDates: action
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

            //this.meetingsList = data;
            runInAction(() => {
                
                this.meetingsList = unwrappedArray;
                // this.meetingsList.replace(unwrappedArray);
                console.log("meetings list (runInAction)", this.meetingsList);
            });
        }
        catch (err) {
            console.log(err);
        }

    }

    compareDates(date){
        const today = new Date();
        const newDate = new Date(date);
        
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
        const todayDay = today.getDate();

        const newDateYear = newDate.getFullYear();
        const newDateMonth = newDate.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
        const newDateDay = newDate.getDate();

        if(newDateYear !== todayYear) {
            return newDateYear - todayYear;
        }   
        
        //else, the years are equal:
        if(newDateMonth !== todayMonth) {
            return newDateMonth - todayMonth;
        }    
        
        //else, the monthes are equal:  
        return newDateDay - todayDay;
    }

    get getMeetings() {
       
        // this.meetingsList.forEach(element => {

        //     console.log("element@: ", element);
        //     console.log("idCounter@: ", idCounter);
        //     element.id = ++idCounter;
        // });

        // const data = this.meetingsList;
        // return data;


        // let arr = this.list.slice(0, this.list.length).sort(({ dateTime: a }, { dateTime: b }) => a < b ? 1 : a > b ? -1 : 0);

        const compareDates = (date1, date2)=>{
            //const today = new Date();
            const newDate1 = new Date(date1);
            const newDate2 = new Date(date2);
            
            const newDate1Year = newDate1.getFullYear();
            const newDate1Month = newDate1.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
            const newDate1Day = newDate1.getDate();
            const newDate1Hour = newDate1.getHours();
            const newDate1Minutes = newDate1.getMinutes();

            const newDate2Year = newDate2.getFullYear();
            const newDate2Month = newDate2.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
            const newDate2Day = newDate2.getDate();
            const newDate2Hour = newDate1.getHours();
            const newDate2Minutes = newDate1.getMinutes();
    
            if(newDate1Year !== newDate2Year) {
                return newDate1Year - newDate2Year;
            }   
            
            //else, the years are equal:
            if(newDate1Month !== newDate2Month) {
                return newDate1Month - newDate2Month;
            }    
            
            //else, the monthes are equal:
            if(newDate1Day !== newDate2Day){
                return newDate1Day - newDate2Day;
            }  

            //else, the days are equal:
            if(newDate1Hour !== newDate2Hour){
                return newDate1Hour - newDate2Hour;
            } 

            //else, the hours are equal:
            return newDate1Minutes - newDate2Minutes;
            
        }

        let data = this.meetingsList.slice(0, this.meetingsList.length);
        
        data = data.filter(x=> compareDates(x.dateTime,new Date()) >= 0);
        // data = data.filter(x=> new Date(x.dateTime).getDate() >= new Date().getDate());

        

        // const compare = (a, b) => new Date(a) - new Date(b);

        // Sort meetings based on date order (today, future, past)
        data.sort((a, b) => {
            // const dateA = new Date(a.dateTime);
            // const dateB = new Date(b.dateTime);
            // const today = new Date();
            
            // if (dateA === today) return -1; // Today's meeting first
            // if (dateA > today && dateB !== today) return -1; // Future meetings next
            return compareDates( a.dateTime, b.dateTime); // Sort by date for future and past meetings
        });



        data.forEach(element => {element.id = ++idCounter;});

        return data;
    }

    async addMeeting(meeting) {

        try {
            console.log(meeting);
            // let newMeeting = { ...meeting}
            meeting.id = `${++idCounter}`;
            const res = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(meeting)
            });

            const data = res;

            // runInAction(() => {
                // if (res.status == 200) {
                //     this.meetingsList = { ...this.meetingsList, newMeetingeeting }
                //     console.log("meetingList: ", this.meetingsList)

                //     Swal.fire({
                //         icon: "error",
                //         title: "The appointment was successfully set!",
                //         text: "Thank you for contacting our services!",
                //     });
                    
                // }
                // else if (res.status == 400) {
                //     Swal.fire({
                //         icon: "error",
                //         title: "Oops...",
                //         text: "The time you requested is not available...",
                //     });
                    
                // }

            // })

            
            return data;

            console.log(res);

        }
        catch (error) {
            console.log(error)
        }
    }

    get getMeetingsHistory(){
        const compareDates = (date1, date2)=>{
            
            const newDate1 = new Date(date1);
            const newDate2 = new Date(date2);
            
            const newDate1Year = newDate1.getFullYear();
            const newDate1Month = newDate1.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
            const newDate1Day = newDate1.getDate();
            const newDate1Hour = newDate1.getHours();
            const newDate1Minutes = newDate1.getMinutes();

            const newDate2Year = newDate2.getFullYear();
            const newDate2Month = newDate2.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
            const newDate2Day = newDate2.getDate();
            const newDate2Hour = newDate1.getHours();
            const newDate2Minutes = newDate1.getMinutes();
    
            if(newDate1Year !== newDate2Year) {
                return newDate1Year - newDate2Year;
            }   
            
            //else, the years are equal:
            if(newDate1Month !== newDate2Month) {
                return newDate1Month - newDate2Month;
            }    
            
            //else, the monthes are equal:
            if(newDate1Day !== newDate2Day){
                return newDate1Day - newDate2Day;
            }  

            //else, the days are equal:
            if(newDate1Hour !== newDate2Hour){
                return newDate1Hour - newDate2Hour;
            } 

            //else, the hours are equal:
            return newDate1Minutes - newDate2Minutes;
            
        }

        let data = this.meetingsList.slice(0, this.meetingsList.length);
        
        data = data.filter(x=> compareDates(x.dateTime,new Date()) < 0);
        
        data.sort((a, b) => {
            return compareDates( a.dateTime, b.dateTime); // Sort by date for future and past meetings
        });

        data.forEach(element => {element.id = ++idCounter;});

        return data;
    }

    // get getMeetingsHistory(){

    //     let data = this.meetingsList.slice(0, this.meetingsList.length);
        
    //     data = data.filter(x=> new Date(x.dateTime) < new Date());

    //     // const compareDates = (a, b) => new Date(a.date) - new Date(b.date);

    //     // Sort meetings based on date order (today, future, past)
    //     // data.sort((a, b) => {
    //     //     const dateA = new Date(a.dateTime).getDate();
    //     //     const dateB = new Date(b.dateTime).getDate();
    //     //     const today = new Date().getDate();

    //     //     if (dateA === today) return -1; // Today's meeting first
    //     //     if (dateA > today && dateB !== today) return -1; // Future meetings next
    //     //     return compareDates(b ,a); // Sort by date for future and past meetings
    //     // });

    //     data.sort((a,b)=>{
    //         const dateA = new Date(a);
    //         const dateB = new Date(b);
    //         return dateA-dateB;
    //     })


    //     data.forEach(element => {element.id = ++idCounter});
        
    //     return data;


    //     // const now = new Date();
    //     // console.log("now ",now);
    //     // let pastMeetings = this.meetingsList.filter(x => x.dateTime < now);
    //     // console.log("past: ",pastMeetings);
    //     // return pastMeetings.sort((a,b)=> b.dateTime - a.dateTime);
    // }

    // get getNextMeetings(){
    //     const now = new Date();
    //     let nextMeetings =  this.meetingsList.filter(x => x.dateTime >= now);
        
    //     return nextMeetings.sort((a,b)=> a.dateTime - b.dateTime);
    // }

    

}

export default new MeetingsStore();
