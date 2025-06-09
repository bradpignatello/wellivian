// app/api/oura/route.ts
import { NextResponse } from 'next/server';
import { OuraService } from '@/lib/services/oura';

export async function GET() {
  try {
    const ouraToken = process.env.OURA_API_KEY;
    
    if (!ouraToken) {
      return NextResponse.json(
        { error: 'Oura API key not configured' },
        { status: 500 }
      );
    }
    
    const ouraService = new OuraService(ouraToken);
    const summary = await ouraService.getTodaysSummary();
    
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Oura API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Oura data' },
      { status: 500 }
    );
  }
}