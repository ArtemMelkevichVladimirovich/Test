export function setDetail(data = []) {
    return {
        type: 'SHOW_ONE_PRODUCT',
        payload: data
    };
}