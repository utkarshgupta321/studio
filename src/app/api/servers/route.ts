import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const [rows] = await pool.execute('SELECT * FROM servers');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Error fetching servers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // In a real application, you would add authentication and authorization
    // checks here to ensure only admins can create servers.

    const { name, description } = await request.json();

    const [result] = await pool.execute(
      'INSERT INTO servers (name, description) VALUES (?, ?)',
      [name, description]
    );

    return NextResponse.json({ message: 'Server created successfully', serverId: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Error creating server' }, { status: 500 });
  }
}