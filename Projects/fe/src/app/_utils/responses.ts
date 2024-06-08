export const throwError = (msg: string) => {
    throw new Error(msg);
};

export const handleError = (error?: Response | Error) => {
    if (error instanceof Response) {
        console.debug(
            "Response status code: %d, Response status text: %s",
            error.status,
            error.statusText
        );
    } else if (error instanceof Error) {
        console.debug("Error message: %s", error.message);
    }
};

export const throwResponse = (response: Response) => {
    throw response;
};