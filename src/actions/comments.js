export function setListComments(data = []) {
    return {
        type: 'ADD_LIST_COMMENTS',
        payload: data
    };
}