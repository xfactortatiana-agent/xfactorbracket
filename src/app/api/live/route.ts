import { NextRequest, NextResponse } from 'next/server';
import { getLiveGames, getCompletedGames } from '@/lib/espnApi';

// GET /api/live
export async function GET(request: NextRequest) {
  try {
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
      { error: 'Failed to fetch live games' },
      { status: 500 }
    );
  }
}
