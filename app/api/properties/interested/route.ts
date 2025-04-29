import { NextResponse } from 'next/server';
import connectDB from '@libs/mongodb';
import Property from '@models/property';
import mongoose from 'mongoose';

export async function POST(req: Request) {
    await connectDB();
    const { propertyId, userId } = await req.json();

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(propertyId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ success: false, message: 'Invalid propertyId or userId.' }, { status: 400 });
    }

    try {
        const property = await Property.findById(propertyId);

        if (!property) {
            return NextResponse.json({ success: false, message: 'Property not found.' }, { status: 404 });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const alreadyInterested = property.interestedUsers.some(
            id => id instanceof mongoose.Types.ObjectId && id.equals(userObjectId)
        );

        if (alreadyInterested) {
            return NextResponse.json({ success: false, message: 'You have already shown interest in this property.' });
        }

        property.interestedUsers.push(userObjectId);
        await property.save();

        return NextResponse.json({ success: true, message: 'Your interest has been marked!' });
    } catch (error) {
        console.error('Error marking interest:', error);
        return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
    }
}
