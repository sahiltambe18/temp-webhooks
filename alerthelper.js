import * as dotenv from 'dotenv';
dotenv.config()
import axios from 'axios';

class AlertManager {
    static async notify(subject,message,priority){
        try {
                var data = JSON.stringify([
                {
                    "labels": {
                        "alertname": subject
                    },
                    "annotations": {
                        "alert": message
                    }
                }
                ]);

                var config = {
                    method: 'post',
                    url: process.env.ALERT_MANAGER+'/api/v2/alerts',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };

                await axios(config).then(function (response) {
                    console.log(`Sent Alert ${JSON.stringify(data)} with response status ${response.status}`);
                })
                .catch(function (error) {
                    console.log(`Error in Sending Alert ${error}`);
                    // console.log(error)
                });
        } catch(error){
            console.log(error.message);  
        }
    }

    static async silence(alertname , duration ){
        try {
            const startsAt = new Date();
            const endsAt = new Date(startsAt.getTime() + duration * 60 * 1000);
            const data = JSON.stringify({
                matchers:[
                    {
                        "name": "alertname",
                        "value": alertname,
                        "isRegex": false
                    }
                ],
                startsAt,
                endsAt,
                createdBy: "System",
                comment: `Silencing alert ${alertname} for ${duration} minutes`
            })

            const config = {
                method: 'post',
                url: process.env.ALERT_MANAGER+'/api/v2/silences',
                headers:{
                    'Content-Type': 'application/json'
                },
                data:data
            }

            const response = await axios(config);
            if(response.status === 200){
                console.log(`Silence created for alert ${alertname} for ${duration} minutes`);
            }
            // console.log(response)
        } catch (error) {
            console.log("error silencing alert", error);
        }
    }
}

export default AlertManager;
