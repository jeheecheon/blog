
export const fetchComments = async (post_id: string) => {
    return fetch(`/api/blog/post/${post_id}/comments`, {
        credentials: "same-origin",
    })
        .then(res => {
            if (res.ok) 
                return res.json();
        })
        .then(comments => {
            console.log(comments);
        })
        .catch(error => console.error(error))
}
