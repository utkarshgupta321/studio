import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // Assuming you have bcrypt installed for password hashing

export async function GET(request: Request) {
  try {
    // In a real application, you would add authentication and authorization
    // checks here to ensure only admins can access this endpoint.

    const [rows] = await pool.execute('SELECT id, username, email, is_admin, is_banned, banned_until, created_at FROM users');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // In a real application, you would add authentication and authorization
    // checks here to ensure only admins or registration process can use this.

    const { username, email, password, is_admin } = await request.json();

    // Basic validation (you might need more robust validation)
    if (!username || !email || !password) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, is_admin]
    );

    return NextResponse.json({ message: 'User created successfully', userId: (result as any).insertId }, { status: 201 });
  } catch (error: any) {
    console.error('Database error:', error);
    // Check for duplicate entry error
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: 'Username or email already exists' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}