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
        this.initData();
    }

    async initData() {
        try {
            const res = await fetch(this.baseUrl);
            const data = await res.json;

            runInAction(() => {
                this.list = data;
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
                this.list = data;
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
const singleton = new ServiceStore();
export default singleton;

