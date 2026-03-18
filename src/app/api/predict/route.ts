import { NextRequest, NextResponse } from 'next/server';
import { predictHybrid, predictTournamentBatch } from '@/lib/hybridPredictor';
import { prisma } from '@/lib/dbQueries';

// GET /api/predict?team1=duke&team2=arizona
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const team1 = searchParams.get('team1');
  const team2 = searchParams.get('team2');
  const skipCache = searchParams.get('skipCache') === 'true';
  
  if (!team1 || !team2) {
    return NextResponse.json(
      { error: 'Missing team1 or team2 parameter' },
      { status: 400 }
    );
  }
  
  try {
    const prediction = await predictHybrid(team1, team2, { skipCache });
    
    return NextResponse.json({
      success: true,
      data: prediction,
      cached: !skipCache,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}

// POST /api/predict (batch predictions)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchups, strategy = 'balanced' } = body;
    
    if (!matchups || !Array.isArray(matchups)) {
      return NextResponse.json(
        { error: 'Missing matchups array' },
        { status: 400 }
      );
    }
    
    const predictions = await predictTournamentBatch(matchups);
    
    return NextResponse.json({
      success: true,
      data: predictions,
      count: predictions.length,
      strategy,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Batch prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to generate batch predictions' },
      { status: 500 }
    );
  }
}
