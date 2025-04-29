import { NextResponse } from 'next/server';
import  connectDB  from '@libs/mongodb'; // your db connect function
import Property from '@models/property'; // your mongoose Property model

export async function POST(req: Request) {
    await connectDB();
    const { minPrice, maxPrice, location, propertyType } = await req.json();

    let query: any = {};

    if (minPrice !== undefined) {
        query.price = { ...query.price, $gte: minPrice };
    }
    if (maxPrice !== undefined) {
        query.price = { ...query.price, $lte: maxPrice };
    }
    if (location) {
        query.location = { $regex: new RegExp(location, 'i') }; // case insensitive match
    }
    if (propertyType) {
        query.propertyType = propertyType;
    }

    const properties = await Property.find(query).lean();

    return NextResponse.json(properties);
}
