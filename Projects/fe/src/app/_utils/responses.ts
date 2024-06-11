export const throwError = (msg: string) => {
    throw new Error(msg);
};

export const handleError = (error?: Response | Error) => {
    if (error instanceof Response) {
        console.error(
            "Response status code: %d, Response status text: %s",
            error.status,
            error.statusText
        );
    } else if (error instanceof Error) {
        console.error("Error message: %s", error.message);
    } else {
        console.error("Unknown error");
    }
};

export const throwResponse = (response: Response) => {
    throw response;
};