import { NextRequest, NextResponse } from 'next/server';

// Force dynamic to prevent static generation
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Lazy import to prevent build-time issues
async function getESPN() {
  const { getLiveGames, getCompletedGames } = await import('@/lib/espnApi');
  return { getLiveGames, getCompletedGames };
}

// GET /api/live
export async function GET(request: NextRequest) {
  try {
    const { getLiveGames, getCompletedGames } = await getESPN();
    
    const [liveGames, completedGames] = await Promise.all([
      getLiveGames(),
      getCompletedGames(),
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        live: liveGames,
        completed: completedGames.slice(0, 10), // Last 10 completed
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Live data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live games', details: (error as Error).message },
      { status: 500 }
    );
  }
}
