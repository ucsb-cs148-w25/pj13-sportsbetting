
import { jest } from '@jest/globals';

// Mock axios using unstable_mockModule for ES modules
jest.unstable_mockModule('axios', () => ({
    default: {
        get: jest.fn().mockResolvedValue({
            data: [
                {
                    id: "test-bet-1",
                    sport_key: "basketball_nba",
                    commence_time: "2025-01-24T01:30:38Z",
                    home_team: "Team A",
                    away_team: "Team B",
                    bookmakers: [{
                        markets: [{
                            outcomes: [
                                { name: "Team A", price: 1.5 },
                                { name: "Team B", price: 2.5 }
                            ]
                        }]
                    }]
                }
            ]
        })
    }
}));

// Mock node-cron using unstable_mockModule
jest.unstable_mockModule('node-cron', () => ({
    default: {
        schedule: jest.fn()
    }
}));


describe('Betting System Basic Test', () => {
    test('script can be imported', async () => {
        const { script } = await import('./script.js');
        expect(script).toBeDefined();
    });
});