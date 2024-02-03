import { HandleError } from "./responses";

export default class PromiseWrapper {
    status = 'pending';
    response: Response | undefined;
    promise: Promise<Response | void> | undefined;
    data: unknown;

    constructor() {
        this.promise = new Promise(res => res());
    }

    Await() {
        switch (this.status) {
            case 'success':
                return this.data;
            case 'pending':
                throw this.promise;
            case 'error':
                throw this.response;
        }
    }

    wrapPromise(promise: Promise<Response>) {
        this.promise = promise
            .then(
                res => {
                    this.response = res;
                    if (res.ok)
                        return res.json();
                    else
                        HandleError(res);
                },
                err => {
                    this.response = err
                    this.status = 'error'
                }
            )
            .then(res => {
                this.data = res
                this.status = 'success';
            })
            .catch(err => {
                this.response = err
                this.status = 'error'
            })
    }
}
