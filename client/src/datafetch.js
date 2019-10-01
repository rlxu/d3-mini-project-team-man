require('dotenv').config()

const fetch = require('node-fetch')
const { URLSearchParams } = require('url');
const Twitter = require('twitter');

const atob = (str) => Buffer.from(str).toString('base64')
const btoa = (str) => Buffer.from(str, 'base64').toString('ascii')

const getBearerToken = async (key, secret) => {
    const creds = atob(`${key}:${secret}`)
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': `Basic ${creds}`,
        'Host': 'api.twitter.com',
        'Accept-Encoding': 'gzip'
    }
    const body = new URLSearchParams();
    body.append('grant_type','client_credentials')
    const opts = {
        'method': 'POST',
        headers,
        body
    }

    const res = await fetch('https://api.twitter.com/oauth2/token', opts)
        .then(res => {
            if (res.status === 200){
                return res.json()
            }
        })
        .then(body => body)
    return res
}

const queryAll = async (queries) => {
    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });
    const headers = {

    }
}

console.log(getBearerToken('Lv3IN1MKLABwVvpKrh7z13SuI','Z6uVPTfWvlraSNKoEDMqM35V2rRSGhh6vg4qN9RI4Vm7yutckT'))
