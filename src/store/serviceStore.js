import { makeObservable, observable, action, runInAction ,computed} from 'mobx'

class ServiceStore {

    baseUrl = 'http://localhost:8787/service';
    list = [];

    constructor() {
        makeObservable(this, {
            list: observable,
            init: action,
            addService: action,
            get: computed
        });
        this.init();
    }

    async init() {
        try {
            const res = await fetch('http://localhost:8787/services');
            const data = await res.json;
            runInAction(() => {
                this.list = data;
                //this.list = {...data};
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async addService(newObject) {
        try {
            const res = await fetch(this.baseUrl, {
                method: 'POST', 
                body: JSON.stringify(newObject),
                headers: { 'Content-Type': 'application/json' }
            });
           // const data = await res.json;
           this.list = {...this.list,newObject}
           console.log(res);
           // this.render()
           this.init();
        } catch (err) {
            console.log(err)
        }

    }

    get get() {
        return this.list;
        // try {
        //     const res = await fetch(this.baseUrl);
        //     const data = await res.json;

        //     runInAction(() => {
        //         this.list = data;
        //     });
        // }
        // catch (err) {
        //     console.log(err);
        // }
    }
}
const singleton = new ServiceStore();
export default singleton;

