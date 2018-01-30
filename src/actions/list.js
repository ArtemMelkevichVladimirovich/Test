export function setListProduct(data = []) {
    return {
        type: 'ADD_LIST',
        payload: data
    };
}