import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-8">
        <span className="material-symbols-outlined text-sm">arrow_back</span> Retour à l'accueil
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-black mb-2">Politique de Confidentialité</h1>
      <p className="text-gray-500 mb-8">Votre vie privée est importante pour nous chez Reserva Africa.</p>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Collecte des données</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Nous collectons les informations que vous nous fournissez directement (nom, email, téléphone) lorsque vous créez un compte ou effectuez une réservation sur Reserva Africa.
            Nous collectons également des données techniques (adresse IP, type d'appareil) pour améliorer votre expérience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Utilisation des données</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Vos données sont utilisées pour :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Traiter vos réservations et paiements.</li>
              <li>Communiquer avec vous concernant votre séjour.</li>
              <li>Améliorer nos services et prévenir la fraude.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Partage des informations</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Nous ne vendons pas vos données personnelles. Nous partageons uniquement les informations nécessaires avec les hôtes (votre nom et dates de séjour) pour permettre la prestation du service réservé via Reserva Africa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Vos droits</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez exercer ces droits depuis les paramètres de votre compte Reserva Africa.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;