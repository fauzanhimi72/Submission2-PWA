var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BP3yDdHJYHBxJ7oJ5xT_NQKf7ydxRYL-eTZGxubaa0_HDQPzd_3K1tyq2So5DUFxAPMAsHWRYOdU24B7KwA84bc",
   "privateKey": "fWWrisBPPqtqYJutJe4OOjsqdRPnN2YdK1Y5yJtIuLc"
};


webPush.setVapidDetails(
   'mailto:fauzanhilmi72@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fcH6IdmSfV4:APA91bEgQeNjNGuD2DFkCc4kBdiZCJmB5XorbtoeTU8ycemqHXRMMQhw8S3TIAiKTxUbnz-6fUty8hyw2sex5Z77Z9pQBlCnMdms7b3X759KLBYn0NtME3A2R_WJoIMsskUoZvjwKZKs",
   "keys": {
       "p256dh": "BIaKO/2uAj4naT5W+ggJ2x6NOlijTMT8z2IYD4ss+oyM3Apv287Etv8hkjtHB6OGHglKG6P9cXzKrBnnF00B948=",
       "auth": "KyRttGs61ABqOzTm4kpMsQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '490160056005',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
