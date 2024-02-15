import { HandleError } from "@/common/utils/responses";

export type PromiseAwaiter = {
    Await: () => unknown;
}

export const CreateDummyPromiseAwaiter = () => {
    const dummy: PromiseAwaiter = {
        Await: () => {
            throw new Promise((res) => {
                setTimeout(() => res(null), 9999999)
            })
        }
    }
    return dummy;
}

export const wrapPromise = (promise: Promise<Response>) => {
    let status = 'pending';
    let response: Response | undefined;
    let data: unknown;

    promise
        .then(
            res => {
                response = res;
                if (res.ok)
                    return res.json();
                else
                    HandleError(res);
            },
            err => {
                response = err
                status = 'error'
            }
        )
        .then(res => {
            data = res
            status = 'success';
        })
        .catch(err => {
            response = err
            status = 'error'
        })

    const awaiter: PromiseAwaiter = {
        Await: () => {
            switch (status) {
                case 'success':
                    return data;
                case 'pending':
                    throw promise;
                case 'error':
                    throw response;
            }
        }
    }
    return awaiter;
}


export class PromiseWrapper {
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