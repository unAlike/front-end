import { NextRequest, NextResponse } from 'next/server';
import { put } from "@vercel/blob";

export async function PUT(request: NextRequest) {
    try {
        const { data, token } = await request.json();
        console.log("Data: " + data);
        const { url } = await put('users.txt', data, { access: 'private', token:process.env.BLOB_READ_WRITE_TOKEN, allowOverwrite: true });

        return NextResponse.json({ message: 'Item updated successfully', url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}