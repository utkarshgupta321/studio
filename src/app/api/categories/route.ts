import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get('serverId');

    let query = 'SELECT * FROM categories';
    const params: (string | number)[] = [];

    if (serverId) {
      query += ' WHERE server_id = ?';
      params.push(serverId);
    }

    const [rows] = await pool.execute(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
  }
}