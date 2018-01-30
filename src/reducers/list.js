export default function (state = [], action) {
    switch (action.type) {
        case 'ADD_LIST':
            return action.payload;
        default:
            return state;
    }
}