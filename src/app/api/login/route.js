import dbConnect from '@/lib/dbConnect';
import Users from '../../../Models/users'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        await dbConnect()
        let userData = await req.json();
        const user = await Users.findOne({ $and: [{ "username": userData.username }, { "password": userData.password }] })
        console.log(user);
        if(user){
            return NextResponse.json({ data : user.username,message: 'Login Succesfully' }, { status: 200 })
        }else{
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 })
        }
    } catch (e) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 400 })
    }
}

