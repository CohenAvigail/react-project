import { action, makeObservable, observable } from "mobx";

class LogInStore {
    baseUrl = 'http://localhost:8787';
    login = {}

    constructor() {
        makeObservable(this, {
            login: observable,
            addLogin: action
        })
    }

    async addLogin(login) {
        try {
            const res = await fetch(this.baseUrl+"/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });
            const data = res;
            console.log("data: ",data);
            // runInAction(() => {
            //     this.login = data
            //     console.log("login: ",login)
            // });
            return data;
        }
        catch (error) {
            console.log(error)
        }
    }


}

const singleton = new LogInStore();
export default singleton;
