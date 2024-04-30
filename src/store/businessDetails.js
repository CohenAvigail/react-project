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
            getBusinessDetails: computed
        });

        // this.addDetails(this.detailBegin);
        this.init();

    }

    async init() {
        try {
            const storedData = localStorage.getItem('businessDetails');
            if (storedData) {
                this.businessDetails = JSON.parse(storedData);
            } else {
            const res = await fetch(this.baseUrl);
            const data = await res.json();

            console.log('init data', data)

            runInAction(() => {
                // this.businessDetails = { ...data };
                this.businessDetails = data || this.detailBegin;
                localStorage.setItem('businessDetails', JSON.stringify(this.businessDetails));
            });

            console.log("businessDetails: ", this.businessDetails);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async addDetails(newObject) {
        try {
            const res = await fetch(this.baseUrl, {
                method: 'POST',
                body: JSON.stringify(newObject)
                // Id: this.businessDetails,
                // title: newObject.title,
                // body: newObject.body,
                // userId: newObject.userId
                ,
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log("data in addFunction: ", data);

            this.businessDetails = data;
            console.log("business in addFunction: ", this.businessDetails);

            // this.init();

            //this.render()
        } catch (err) {
            console.log(err)
        }
    }

    async updateDetails(newObject) {
        try {
            const res = await fetch(this.baseUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObject)
            });
            const data = await res.json();
            this.businessDetails = data;
            console.log("data", data, "businessDetails", this.businessDetails);
            //this.init();

            //this.render()
        } catch (err) {
            console.log(err)
        }
    }


    get getBusinessDetails() {
        console.log('get this.businessDetails', this.businessDetails)
        return this.businessDetails;
        // try {
        //     const res = await fetch(this.baseUrl);
        //     const data = await res.json;

        //     runInAction(() => {
        //         this.businessDetails = data;
        //     });
        // }
        // catch (err) {
        //     console.log(err);
        // }
    }
}

export default new BusinessDetails();