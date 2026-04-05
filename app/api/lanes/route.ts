import { NextRequest, NextResponse } from 'next/server';
import { put, list, get } from "@vercel/blob";
import { text } from 'stream/consumers';

export async function GET(request: NextRequest) {
    try {
        const result = await get('lanes.json', { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN, headers:{'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate', 'Pragma': 'no-cache', 'Expires': '0'} });

        if (result?.statusCode !== 200) {
            return new NextResponse('Not found', { status: 404 });
        }
        //@ts-ignore
        const streamText = await text(result.stream);
        const data = JSON.parse(streamText);
        console.log("Fetched lanes data: ", data);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to fetch data', { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { data, token } = await request.json();
        // console.log("Data: " + data);
        const { url } = await put('lanes.json', JSON.stringify(data), { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN, allowOverwrite: true });

        return NextResponse.json({ message: 'Item updated successfully', url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}