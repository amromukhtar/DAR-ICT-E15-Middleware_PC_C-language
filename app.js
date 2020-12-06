const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
let response;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const options = {
    key: fs.readFileSync(path.join(__dirname, "ssl", "privkey.pem")),
    cert: fs.readFileSync(path.join(__dirname, "ssl", "cacert.pem")) // these paths might differ for you, make sure to copy from the certbot output
};

// HTTP Server 
// app.listen(8080, () => {
//     console.log('HTTP Server is listening');
// })

app.use('/', (req, res) => {

     response = {
        services:
            [
                {
                    service_id: 23,
                    service_name: "دعم الجامعة ",
                    editable: 1,
                    service_fees: 500,
                    service_fees_int: 500000,
                    currency_id: 1,
                    currency_name: "جنيه سوداني ",
                    currency_fraction: "قرش ",
                    currency_code: "SDG",
                    sub_services: [
                        {
                            "class_id": 106186,
                            "class_name": " دمغة ايصال ",
                            "class_fees": 2,
                            "class_fees_int": 2000,
                            "percentage": 0
                        }
                    ]
                },
                {
                    service_id: 21,
                    service_name: "المرور",
                    editable: 0,
                    service_fees: 500,
                    service_fees_int: 500000,
                    currency_id: 1,
                    currency_name: "جنيه سوداني ",
                    currency_fraction: "قرش ",
                    currency_code: "SDG",
                    sub_services: [
                        {
                            "class_id": 106186,
                            "class_name": " دمغة ايصال ",
                            "class_fees": 2,
                            "class_fees_int": 2000,
                            "percentage": 0
                        }
                    ]
                },
                {
                    service_id: 20,
                    service_name: "الخارجية",
                    editable: 1,
                    service_fees: 300,
                    service_fees_int: 300000,
                    currency_id: 1,
                    currency_name: "جنيه سوداني ",
                    currency_fraction: "قرش ",
                    currency_code: "SDG",
                    sub_services: [
                    ]
                }
            ],
        vat: 17,
        stamp_duty: 0,
        response_code: 200,
        response_message: "OK",
        version: 1,
    }

    console.log("URL", req.url);
    console.log("Body", req.body);
    try{
    console.log("Services", req.body.receipts[0].services);
    }catch{
        
    }

    if(req.url == 'https://10.202.1.162/E15/api/v2/online_terminal/get_receipt'){
        response = { "response_code": 200, "response_message": "OK", "unit_name": "وحدة إختبارات تجريبية ", "description": "", "payer_name": "Ahmed", "payment_details": [ { "unit_name": "وحدة إختبارات تجريبية ", "unit_code": "", "service_name": "دعم الجامعة ", "fees": 498, "fees_int": 498000, "currency_name": "جنيه سوداني ","fraction_name": "قرش " }, { "unit_name": "وحدة إختبارات تجريبية ", "unit_code": "", "service_name": "دمغة ايصال ", "fees": 2, "fees_int": 2000, "currency_name": "جنيه سوداني ", "fraction_name": "قرش " } ], "total_amount": 500, "total_amount_int": 500000, "total_in_word": " فقط خمسمائه جنيه سوداني لاغير ", "date": "2016-03-29 13:21:23", "identity_type": "", "identity": "", "status": 1, "discount": 0, "paymentmethod_id": 1}
    }else if('https://10.202.1.162/E15/api/v2/online_terminal/register'){
        response = { "services": [ { "service_id": 23, "service_name": " دعم الجامعة ", "editable": 1, "service_fees": 500, "currency_name": " جنيه سوداني ", "currency_fraction": "قرش ", "currency_code": "SDG", "currency_id": 1, "classes_no": 1, "classes": [ { "class_id": 106186, "class_name": " دمغة ايصال ", "class_fees": 2, "percentage": 0 } ] } ], "full_name": "Testing Offline User","user_id": 57210, "time_threshold": 10000, "money_threshold": 100000, "unit_id": 15864, "unit_name": " وحدة إختبارات تجريبية ", "receipts_threshold": 100000, "last_receipt_offline": "161005721004000000", "vat": 17, "stamp_duty": 0, "payment_methods": [ { "method_id": 1, "method_name": "نقد " }, { "method_id": 2, "method_name": "شيك " }, { "method_id": 3, "method_name": "الكتروني " } ], "version": 1, "response_code": 200,"response_message": "OK" }
    }

    res.set({
        host: '192.168.43.29',
        connection: 'Keep-Alive',
        accept: '*/*',
        'content-length': '51',
        'cache-control': 'no-cache',
        x_e15_date: 'Wed Oct 14 11:55:39 +0200 2020',
        authorization: 'AM:iCZMGLToC0cW5fWFyVBfSVj1MG+4qEeMoVRHgebkGGA=',
        app_id: 'DAR-E15-PoS-2.0-1',
        cookie: '',
        'content-type': 'application/json'
    })
    res.json(response);
})

https.createServer(options, app).listen(8080);

const headers = {

}