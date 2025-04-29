import { NextResponse } from 'next/server';
import { verifyToken } from '@libs/auth';
import Property from '@models/property';
import User from '@models/user';
import connectDB from '@libs/mongodb';

export async function POST(req: Request) {
    try {
        await connectDB();
        const token = req.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = verifyToken(token) as { userId: string };
        const userId = decoded.userId;

        const body = await req.json();
        console.log(body);

        const { title, description, price, location, images, propertyType } = body;

        if (!title || !price || !location || !images || !propertyType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const property = await Property.create({
            title,
            description,
            price,
            location,
            images,
            propertyType,          // ✅ EXPLICITLY save type now
            ownerId: userId,
        });

        // Update user's listed properties
        await User.findByIdAndUpdate(userId, {
            $push: { listedProperties: property._id }
        });

        return NextResponse.json({ message: 'Property listed successfully!', property }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}
