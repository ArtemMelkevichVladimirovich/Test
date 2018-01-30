export default function (state = [], action) {
    switch (action.type) {
        case 'SHOW_ONE_PRODUCT':
            return action.payload;
        default:
            return state;
    }
}