import { NextRequest, NextResponse } from 'next/server';
import { put, list, get, del } from "@vercel/blob";
import { text } from 'stream/consumers';


export async function GET(request: NextRequest) {
    try {
        //List all blobs
        const listResult = await list();
        //Filter all blobs that start with 'lanes/' and end with '.json'
        let lanesList = listResult.blobs.filter((item)=>{
            return typeof item?.pathname === 'string' && item.pathname.startsWith('lanes/') && item.pathname.endsWith('.json');
        })
        //Get the latest blob data based on the timestamp in the filename
        let latestBlob = lanesList.reduce((prev, curr) => {
            return Number(curr.pathname.replace(/^lanes\//, '').replace(/\.json$/, '')) > Number(prev.pathname.replace(/^lanes\//, '').replace(/\.json$/, '')) ? curr : prev;
        });
        //Get the content of the latest blob
        const result = await get(latestBlob.pathname, {
            access: 'private',
            token: process.env.BLOB_READ_WRITE_TOKEN,
            headers: {
                'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
                Pragma: 'no-cache',
                Expires: '0',
            },
        });

        //Delete all other blobs except the latest one to save storage space
        for (const item of lanesList) {
            if (item.pathname !== latestBlob.pathname) {   
                await del(item.pathname);
            }
        }


        if (result?.statusCode !== 200) {
            return new NextResponse('Not found', { status: 404 });
        }

        //@ts-ignore
        const streamText = await text(result.stream);
        const data = JSON.parse(streamText);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to fetch data', { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { data, token } = await request.json();
        console.log("Date: " + Date.now().toString());
        const { url } = await put(`lanes/${Date.now().toString()}.json`, JSON.stringify(data), { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN, allowOverwrite: true });

        return NextResponse.json({ message: 'Item updated successfully', url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}
