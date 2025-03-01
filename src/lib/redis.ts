// lib/redis.ts
import { Redis } from "@upstash/redis";

// Vérifier si on est en environnement local ou production
const redis = new Redis({
    url: process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL // Utiliser les variables publiques en développement
        : process.env.UPSTASH_REDIS_REST_URL, // Utiliser les variables privées en production
    token: process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN // Utiliser les variables publiques en développement
        : process.env.UPSTASH_REDIS_REST_TOKEN, // Utiliser les variables privées en production
});


export default redis;
