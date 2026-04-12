import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.app_id || '',
  key: process.env.key || '',
  secret: process.env.secret || '',
  cluster: process.env.cluster || '',
  useTLS: true,
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

async function parseAuthRequest(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return request.json();
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData();
    return {
      socket_id: formData.get('socket_id'),
      channel_name: formData.get('channel_name'),
    };
  }

  const text = await request.text();
  const params = new URLSearchParams(text);
  return {
    socket_id: params.get('socket_id'),
    channel_name: params.get('channel_name'),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await parseAuthRequest(request);
    const socketId = typeof body?.socket_id === 'string' ? body.socket_id : '';
    const channelName = typeof body?.channel_name === 'string' ? body.channel_name : '';

    if (!socketId || !channelName) {
      return NextResponse.json({ error: 'Missing socket_id or channel_name' }, { status: 400 });
    }

    if (!process.env.app_id || !process.env.key || !process.env.secret || !process.env.cluster) {
      console.error('Missing Pusher server env vars');
      return NextResponse.json({ error: 'Pusher server configuration is incomplete' }, {
        status: 500,
        headers: corsHeaders,
      });
    }

    const auth = pusher.authenticate(socketId, channelName);
    return NextResponse.json(auth, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Pusher auth route error:', error);
    return NextResponse.json({ error: 'Failed to authenticate channel' }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}
