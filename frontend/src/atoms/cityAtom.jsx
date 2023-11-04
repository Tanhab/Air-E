import {atom} from 'recoil';


const cityAtom = atom({
    key : "city",
    default : {
        type:'air',
        property:'aqi'
    }
})

export default cityAtom