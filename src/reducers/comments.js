export default function (state = [], action) {
    switch (action.type) {
        case 'ADD_LIST_COMMENTS':
            return action.payload;
        default:
            return state;
    }
}