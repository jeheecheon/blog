export const ThrowResponse = ({
    status,
    statusText = "Server doesn't respond"
}: {
    status: number,
    statusText: string
}) => {
    throw new Response("", {
        status: status,
        statusText: statusText
    })
}

export const Throw500Response = () => {
    throw new Response("", {
        status: 500,
        statusText: "Server doesn't respond"
    })
};

export const Throw404Response = () => {
    throw new Response("", {
        status: 404,
        statusText: "Page Not Found"
    });
}

export const Throw400Response = () => {
    throw new Response("", {
        status: 400,
        statusText: "Bad Request"
    });
}

export const HandleError = (response: Response) => {
    if (response.status === 400)
        Throw400Response()
    else if (response.status === 500)
        Throw500Response()
    else if (response.status === 404)
        Throw404Response();
    else
        ThrowResponse({
            status: response.status,
            statusText: "Something went wrong...😒"
        });
}

export const PropagateResponse = (response: Response) => {
    throw new Response("", {
        status: response.status,
        statusText: response.statusText
    })
}