import './Zoom.css';
import { ZoomMtg } from '@zoomus/websdk';
import {useEffect} from "react";
//import userEvent from "@testing-library/user-event";


const crypto = require('crypto');
function generateSignature(apiKey, apiSecret, meetingNumber, role){
    return new Promise((res, rej) =>{
        const timestamp = new Date().getTime() - 30000;
        const msg = Buffer.from(apiKey+meetingNumber+timestamp+role).toString('base64');
        const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
        const signature = Buffer.from('${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}').toString('base64');
        res(signature);
    })

}

//console.log(generateSignature(process.env.API_KEY, process.env.API_SECRET, 123456789, 0));




var apiKey = 'JWT_APT_KEY';
var apiSecret = "";
var meetingNumber = 123456789;
var leaveUrl = 'http://localhost:3000';
var userName = 'WebSDK';
var userEmail = '';
var passWord = '';
var signature = '';
    generateSignature(apiKey, apiSecret, meetingNumber, 0).then((res =>{
    signature = res;
}));
    //'eHUzSlBhQV9SSlcyLTlsNV9IQWFMQS4xMjM0NTY3ODkuMTU4MzE2OTUzODc3My4wLkJMNEtiM3FINGx5ZzA1MUZtbGJOcGtPRnlFQS9lQUR2bGllVzJNNGZJeWs9';


const Zoom = () => {
    useEffect(() => {
        showZoomDIv();
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        initiateMeeting();
    }, []);

    const showZoomDIv = () => {
        document.getElementById("zmmtg-root").style.display = "block";
    };
    const initiateMeeting = () => {
            ZoomMtg.init({
                leaveUrl: leaveUrl,
                isSupportAV: true,
                success: (success) => {
                    console.log(success)
                ZoomMtg.join({
                    signature: signature,
                    meetingNumber: meetingNumber,
                    userName: userName,
                    apiKey: apiKey,
                    userEmail:userEmail,
                    passWord:passWord,
                    success: (success) => {
                        console.log(success)
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })

            },
                error: (error) => {
                    console.log(error)
                }

})

};
    return <div className="App">Zoom</div>;
};

export default Zoom;
