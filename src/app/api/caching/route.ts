// pages/api/cache-example.ts
import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { EnedisApiService } from '@/services/enedis-api';

export async function GET(req: NextRequest) {
    const cacheKey = 'myApiData';

    // Try to retrieve data from Redis cache
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
        console.log('Serving from cache');
        return NextResponse.json(cachedData);
    } else {
        // If not in cache, fetch from an external API
        const filters = {
            conso_moyenne_usages_thermosensibles_mwh: 0,
            part_thermosensible: 0,
            nom_departement: "Aisne"
        };
        const data = await EnedisApiService.getConsumptionByDepartment(filters, 50);

         // Store the result in Redis with a TTL (time-to-live) of 1 hour
        await redis.setex(cacheKey, 3600, JSON.stringify(data));
        
        console.log('Serving from Enedis API');
        return NextResponse.json(data); // ✅ Utilisation correcte
    }
}