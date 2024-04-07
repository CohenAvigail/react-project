import { makeObservable, observable, action, runInAction, computed } from "mobx";
class BusinessDetails {

    baseUrl = "http://localhost:8787/businessData";
    businessDetails = {
        id: 0,
        name: "",
        address: "",
        phone: "",
        owner: "",
        logo: "",
        description: "",
    }
    detailBegin = {
        id: 0,
        name: "Business name",
        address: "Business adress",
        phone: "Your phone number",
        owner: "The name of the business owner",
        // logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQd07c32eHv3pYOsIRKDfv8QaZB88Z1Jfo3A&usqp=CAU",
        logo: 'Your business logo',
        description: "A short description of your business",
    };

    constructor() {
        makeObservable(this, {
            businessDetails: observable,
            init: action,
            addDetails: action,
            updateDetails: action,
            get: computed
        });
        
        this.addDetails(this.detailBegin);
        this.init();
        
    }

    async init() {
        try {
            const res = await fetch(this.baseUrl);
            const data = await res.json();

            runInAction(() => {
                this.businessDetails = {...data};
            });

        }
        catch (err) {
            console.log(err);
        }
    }

    async addDetails(newObject) {
        try {
            const res = await fetch(this.baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...newObject})

            });
            const data = await res.json();
            this.businessDetails = data ;
            this.init();
        } catch (err) {
            console.log(err)
        }
    }

    async updateDetails(newObject) {
        try {
            const res = await fetch(this.baseUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...newObject})
            });
            const data = await res.json();
            this.businessDetails = data;
            this.init();

        } catch (err) {
            console.log(err)
        }
    }


    get get() {
        return this.businessDetails;

    }
}
export default new BusinessDetails();