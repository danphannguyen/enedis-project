const ENEDIS_API_BASE_URL = "https://data.enedis.fr/api/explore/v2.1/catalog/datasets/consommation-electrique-par-secteur-dactivite-commune/records";

export class EnedisApiService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async getConsumptionByDepartment(filters: Record<string, string | number>, limit: number = 20): Promise<any> {
        try {
            const selectParams = "annee, nom_departement, AVG(conso_moyenne_usages_thermosensibles_mwh) AS moyenne_usages_thermosensibles_mwh, AVG(part_thermosensible) AS moyenne_part_thermosensible";

            // Construction dynamique de la clause WHERE
            const whereConditions = Object.entries(filters)
                .map(([key, value]) =>
                    typeof value === "string" ? `${key} = '${value}'` : `${key} > ${value}` // Ajout du support pour l'égalité (=) avec les chaînes
                )
                .join(" and ");

            const queryParams = new URLSearchParams({
                select: selectParams,
                where: whereConditions,
                group_by: "nom_departement, annee",
                limit: limit.toString()
            });

            const url = `${ENEDIS_API_BASE_URL}?${queryParams.toString()}`;
            console.log("Requête API Enedis :", url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des données Enedis :", error);
            throw error;
        }
    }
}
