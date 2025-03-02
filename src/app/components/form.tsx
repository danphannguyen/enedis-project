import React, { useState } from 'react';

interface FormProps {
    onSubmit: (departement: string) => void; // Fonction de soumission
}

const departements = [
    "Ain", "Aisne", "Allier", "Alpes-Maritimes", "Alpes-de-Haute-Provence", 
    "Ardennes", "Ardèche", "Ariège", "Aube", "Aude", "Aveyron", 
    "Bas-Rhin", "Bouches-du-Rhône", "Calvados", "Cantal", "Charente", 
    "Charente-Maritime", "Cher", "Corrèze", "Creuse", "Côte-d'Or", 
    "Côtes-d'Armor", "Deux-Sèvres", "Dordogne", "Doubs", "Drôme", 
    "Essonne", "Eure", "Eure-et-Loir", "Finistère", "Gard", "Gers", 
    "Gironde", "Haut-Rhin", "Haute-Garonne", "Haute-Loire", "Haute-Marne", 
    "Haute-Savoie", "Haute-Saône", "Haute-Vienne", "Hautes-Alpes", "Hautes-Pyrénées", 
    "Hauts-de-Seine", "Hérault", "Ille-et-Vilaine", "Indre", "Indre-et-Loire", 
    "Isère", "Jura", "Landes", "Loir-et-Cher", "Loire", "Loire-Atlantique", 
    "Loiret", "Lot", "Lot-et-Garonne", "Lozère", "Maine-et-Loire", "Manche", 
    "Marne", "Mayenne", "Meurthe-et-Moselle", "Meuse", "Morbihan", "Moselle", 
    "Nièvre", "Nord", "Oise", "Orne", "Paris", "Pas-de-Calais", "Puy-de-Dôme", 
    "Pyrénées-Atlantiques", "Pyrénées-Orientales", "Rhône", "Sarthe", "Savoie", 
    "Saône-et-Loire", "Seine-Maritime", "Seine-Saint-Denis", "Seine-et-Marne", 
    "Somme", "Tarn", "Tarn-et-Garonne", "Territoire de Belfort", 
    "Territoire-de-Belfort", "Val-d'Oise", "Val-de-Marne", "Var", "Vaucluse", 
    "Vendée", "Vienne", "Vosges", "Yonne", "Yvelines"
];

export default function Form({ onSubmit }: FormProps) {
    const [departement, setDepartement] = useState<string>(''); // État local pour le département

    const handleDepartementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartement(event.target.value); // Mettre à jour le département sélectionné
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (departement) {
            onSubmit(departement); // Appeler la fonction onSubmit passée en prop
        } else {
            alert("Veuillez sélectionner un département.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className=' w-full flex flex-col items-center justify-center gap-4'>
            <select
                id="departement-select"
                value={departement}
                onChange={handleDepartementChange}
            >
                <option value="">Sélectionner un département</option>
                {departements.map((dep) => (
                    <option key={dep} value={dep}>
                        {dep}
                    </option>
                ))}
            </select>
            <button id='department-submit' type="submit">Envoyer</button>
        </form>
    );
}
