import pool from '@/lib/db';
import { NextResponse } from 'next/server';
// You might need bcrypt for password hashing if you include password updates here
// import bcrypt from 'bcrypt';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;

    const [rows] = await pool.execute('SELECT id, username, email, profile_image_url, is_admin, is_banned, banned_until, created_at FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Assuming rows[0] contains the user data
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Error fetching user' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;
    // Destructure fields that are allowed to be updated.
    // Be careful about allowing password updates here without proper re-authentication.
    const { username, email, is_admin, is_banned, banned_until } = await request.json();

    // In a real application, you would add authentication and authorization
    // checks here to ensure only admins or the user themselves can update.

    const [result] = await pool.execute(
      'UPDATE users SET username = ?, email = ?, is_admin = ?, is_banned = ?, banned_until = ? WHERE id = ?',
      [username, email, is_admin, is_banned, banned_until, userId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'User not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}