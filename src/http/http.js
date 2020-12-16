import axios from './axios'
import {SYSURL} from './url'

import qs from 'qs'

export function get(url,params) {
    url = SYSURL[url];

    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data)
        })
    })
}


export function post(url,params){
    url = SYSURL[url];

    return new Promise((resolve,reject)=>{
        axios.post(url,qs.stringify(params)).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
}