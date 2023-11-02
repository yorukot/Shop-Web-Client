import { API_URL } from '@/lib/config';
import axios from 'axios';
import type { NextRequest } from 'next/server';

export default async function middlewareCheckPressiom(headers: Headers){
    try {
        const HolloWorldPerssiom = await fetch(API_URL  + '/oauth/checkpressioms', {headers});
        return HolloWorldPerssiom.json()
    } catch (error : any) {
        return error.response
    }
}

