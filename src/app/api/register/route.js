import dbConnect from '../../../lib/dbConnect';
import Users from '../../../Models/users'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        await dbConnect()
        let userData = await req.json();
        const user = await Users.findOne({ "username": userData.username });
        if(user){
            return NextResponse.json({ message: 'User Already exist.' }, { status: 401 })
        }else{
            await Users.create({
                username: userData.username,
                password: userData.password,
            })
            return NextResponse.json({ message: 'Register Successfully' }, { status: 200 })
        }
    } catch (e) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 400 })
    }
}

