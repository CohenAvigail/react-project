import { makeObservable, observable, action, runInAction ,computed} from 'mobx'

class ServiceStore {

    baseUrl = 'http://localhost:8787';
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
            const res = await fetch(this.baseUrl+'/services');
            const data = await res.json();
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
            const res = await fetch(this.baseUrl+'/service', {
                method: 'POST', 
                body: JSON.stringify(newObject),
                headers: { 'Content-Type': 'application/json' }
            });

           const data = await res.json();
           
           runInAction(()=>{
                this.list.push(data);
           })
           
           console.log(res);
           // this.render()
           // this.init();
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

export default new ServiceStore();

