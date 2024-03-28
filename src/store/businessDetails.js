import { makeObservable ,observable,action,runInAction,computed} from "mobx"; 
class BusinessDetails{

    baseUrl = "http://localhost:8787/businessData"
    businessDetails = {}

    constructor(){
        makeObservable(this,{
            businessDetails: observable,
            init: action,
            addDetails:action,
            updateDetails: action,
            get: computed
        });
        this.initData();
    }

    async initData() {
        try {
            const res = await fetch(this.baseUrl);
            const data = await res.json;

            runInAction(() => {
                this.businessDetails = data;
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
                body: JSON.stringify(newObject)
            });
            const data = await res.json;
            console.log(data);
            this.render()
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
            const data = await res.json;
            console.log(data);
            this.render()
        } catch (err) {
            console.log(err)
        }
    }


    async get() {
        try {
            const res = await fetch(this.baseUrl);
            const data = await res.json;

            runInAction(() => {
                this.businessDetails = data;
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
const singleton = new BusinessDetails();
export default singleton;