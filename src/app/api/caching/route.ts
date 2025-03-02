// pages/api/cache-example.ts
import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { EnedisApiService } from '@/services/enedis-api';

export async function GET(req: NextRequest) {
    // Extraction du département à partir de l'URL
    const { searchParams } = new URL(req.url);
    const departement = searchParams.get('departement') || ''; // Valeur par défaut : 'Aisne' si non fourni

    // Construction de la clé du cache en fonction du département
    const cacheKey = departement;

    // Essayer de récupérer les données depuis le cache Redis
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
        console.log('Serving from cache');
        return NextResponse.json(cachedData);
    } else {
        // Si les données ne sont pas dans le cache, récupérer les données depuis l'API externe
        const filters = {
            conso_moyenne_usages_thermosensibles_mwh: 0,
            part_thermosensible: 0,
            nom_departement: departement // Utiliser le département spécifié
        };
        const data = await EnedisApiService.getConsumptionByDepartment(filters, 50);

        // Stocker les données dans Redis avec un TTL (Time-to-Live) de 24 heures
        await redis.setex(cacheKey, 86400, JSON.stringify(data));

        console.log('Serving from Enedis API');
        return NextResponse.json(data); // ✅ Utilisation correcte
    }
}
