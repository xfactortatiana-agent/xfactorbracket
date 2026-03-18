import { NextRequest, NextResponse } from 'next/server';

// Force dynamic to prevent static generation
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Lazy import to prevent build-time issues
async function getPredictor() {
  const { predictHybrid, predictTournamentBatch } = await import('@/lib/hybridPredictor');
  return { predictHybrid, predictTournamentBatch };
}

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
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          error: 'Database not configured',
          message: 'Please set DATABASE_URL environment variable'
        },
        { status: 503 }
      );
    }
    
    const { predictHybrid } = await getPredictor();
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
      { error: 'Failed to generate prediction', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/predict (batch predictions)
export async function POST(request: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          error: 'Database not configured',
          message: 'Please set DATABASE_URL environment variable'
        },
        { status: 503 }
      );
    }
    
    const body = await request.json();
    const { matchups, strategy = 'balanced' } = body;
    
    if (!matchups || !Array.isArray(matchups)) {
      return NextResponse.json(
        { error: 'Missing matchups array' },
        { status: 400 }
      );
    }
    
    const { predictTournamentBatch } = await getPredictor();
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
      { error: 'Failed to generate batch predictions', details: (error as Error).message },
      { status: 500 }
    );
  }
}
