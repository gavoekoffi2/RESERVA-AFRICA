import React from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-8">
        <span className="material-symbols-outlined text-sm">arrow_back</span> Retour à l'accueil
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-black mb-2">Conditions Générales d'Utilisation</h1>
      <p className="text-gray-500 mb-8">Dernière mise à jour : Octobre 2023</p>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Bienvenue sur Reseva Africa. En utilisant notre plateforme, vous acceptez les présentes conditions générales. 
            Reseva Africa met en relation des voyageurs avec des hôtes proposant des hébergements, des voitures et des activités.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">2. Réservations et Paiements</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Les réservations sont confirmées une fois le paiement effectué. Nous acceptons les paiements par carte bancaire et mobile money.
            Le prix total inclut le prix de la location ainsi que les frais de service de la plateforme.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">3. Annulation et Remboursement</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Les politiques d'annulation varient selon l'hôte et le service réservé. Veuillez consulter les conditions spécifiques affichées sur la page de paiement avant de confirmer votre réservation.
            En général, une annulation effectuée 48h avant le début du séjour donne droit à un remboursement intégral (hors frais de service).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">4. Responsabilités</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Reseva Africa agit en tant qu'intermédiaire. Nous ne sommes pas responsables de la qualité réelle des services fournis par les hôtes, bien que nous fassions de notre mieux pour vérifier les annonces.
            Les utilisateurs sont tenus de respecter les lieux et le matériel mis à disposition.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;