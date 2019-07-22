
import iziToast from 'izitoast'

const checkAuth = async ()=>{
    let check = await localStorage.getItem('wdm_dskd')
    if (!check) {
    iziToast.info({
        title: 'Authendication Required',
        message: 'Please Login to Continue',
        timeout: 1300,
        close: true,
        // overlay: true,
        theme: 'dark',
        color: '#ff7675',
        displayMode: 'once',
        zindex: 1999,
        position: 'topCenter'
    });
    return null
}
    else {return check}
}
export default checkAuth