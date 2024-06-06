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
        statusText: "Something went wrong..."
    })
};

export const Throw403Response = () => {
    throw new Response("", {
        status: 403,
        statusText: "Forbidden! Access denied..."
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

export const HandleError = (res: Response) => {
    if (res.status === 400)
        Throw400Response()
    else if (res.status === 500)
        Throw500Response()
    else if (res.status === 404)
        Throw404Response();
    else
        Throw500Response();
}

export const PropagateResponse = (response: Response) => {
    throw new Response("", {
        status: response.status,
        statusText: response.statusText
    })
}