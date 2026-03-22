import { promises as fs } from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest, { params }: { params: { productId: string } }) {
    try {
        const dataPath = path.join(process.cwd(), 'public/data/RegisterData.json');
        const jsonData = await fs.readFile(dataPath, 'utf-8');
        const objectData = JSON.parse(jsonData);
        objectData.test = "hi";
        console.log(objectData)
        await fs.writeFile(dataPath, objectData);

        return new Response(JSON.stringify({ message: 'Data uploaded', data: objectData }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
    }


    catch (e) {
        return new Response(JSON.stringify({ message: e}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
    }
}
