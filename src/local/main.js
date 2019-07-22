import moment from 'moment'


export const setSelectedLocationStatus = ({ status }) => {
    // console.log("seetting", status)
    localStorage.setItem('losect', status) //
}

export const getSelectedLocationStatus = async () => {
    let state = await localStorage.getItem('losect') //
    if (state) return state != 'undefined' ? JSON.parse(state) : state
    //    else return null

}

export const setLoggedInTime = async () => {
    localStorage.setItem('wrapin_time', moment().format())
}

export const getLoggedInTime = async () => {
    let t = await localStorage.getItem('wrapin_time')
    if (t) {
        try {
            if(moment(t).format('l')=="Invalid date")
            {;setLoggedInTime();return moment()} 
            else return t 
        }
        catch (E) {
            console.log(E)
        }
    }
}
export const resetApp = async () => {
    localStorage.clear()
}