import PromiseWrapper from "../types/PromiseWrapper";
import { HandleError } from "./responses";

function wrapPromise(promise: Promise<Response>) {
    let status = 'pending'
    let response: Response;
    let data: unknown;

    const suspender = promise
        .then(
            res => {
                if (res.ok) {
                    response = res;
                    return res.json();
                }
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

    const wrap: PromiseWrapper = {
        Await: () => {
            switch (status) {
                case 'success':
                    return data;
                case 'pending':
                    throw suspender
                case 'error':
                    throw response
            }
        }
    }

    return wrap;
}

export default wrapPromise
