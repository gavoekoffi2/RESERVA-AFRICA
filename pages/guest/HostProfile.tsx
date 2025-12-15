import React from 'react';
import { Link } from 'react-router-dom';

const HostProfile: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Left Info Card */}
         <div className="lg:col-span-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-lg bg-white dark:bg-[#1a202c] sticky top-24">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-gray-100" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80")'}}></div>
                        <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white" title="Identité vérifiée">
                            <span className="material-symbols-outlined text-sm font-bold block">verified_user</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Kodjo Mensah</h1>
                    <p className="text-gray-500 font-medium mb-4">Hôte depuis 2019 • Lomé, Togo</p>
                    
                    <div className="flex gap-8 border-y border-gray-100 dark:border-gray-700 py-4 w-full justify-center mb-6">
                        <div>
                            <span className="block font-black text-lg">145</span>
                            <span className="text-xs text-gray-500 uppercase font-bold">Avis</span>
                        </div>
                        <div>
                            <span className="block font-black text-lg">4.92</span>
                            <span className="text-xs text-gray-500 uppercase font-bold">Note</span>
                        </div>
                        <div>
                            <span className="block font-black text-lg">4</span>
                            <span className="text-xs text-gray-500 uppercase font-bold">Années</span>
                        </div>
                    </div>

                    <div className="text-left w-full space-y-3 mb-6">
                         <div className="flex items-center gap-3 text-sm">
                             <span className="material-symbols-outlined text-gray-400">work</span>
                             <span>Gestionnaire immobilier</span>
                         </div>
                         <div className="flex items-center gap-3 text-sm">
                             <span className="material-symbols-outlined text-gray-400">language</span>
                             <span>Parle Français, Anglais, Ewe</span>
                         </div>
                         <div className="flex items-center gap-3 text-sm">
                             <span className="material-symbols-outlined text-gray-400">music_note</span>
                             <span>Aime le Jazz et la Rumba</span>
                         </div>
                    </div>

                    <button className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors">Contacter l'hôte</button>
                </div>
            </div>
         </div>

         {/* Right Listings & Bio */}
         <div className="lg:col-span-8 flex flex-col gap-10">
             <div>
                 <h2 className="text-2xl font-bold mb-4">À propos de Kodjo</h2>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                     Bonjour ! Je suis Kodjo, passionné par mon pays le Togo et son hospitalité légendaire. 
                     J'accueille des voyageurs du monde entier depuis 4 ans dans mes propriétés soigneusement décorées.
                     Mon objectif est de vous faire sentir comme chez vous tout en vous faisant découvrir les trésors cachés de Lomé et ses environs.
                     N'hésitez pas à me demander mes meilleures adresses de restaurants locaux !
                 </p>
             </div>

             <hr className="border-gray-200 dark:border-gray-700" />

             <div>
                 <h2 className="text-2xl font-bold mb-6">Les annonces de Kodjo</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Listing 1 */}
                    <Link to="/search/stays/1" className="group flex flex-col gap-3 cursor-pointer">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 relative">
                            <img src="https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Villa" />
                            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> 4.96
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight group-hover:underline">Villa Prestige Océan</h3>
                            <p className="text-gray-500 text-sm">Lomé, Baguida</p>
                        </div>
                    </Link>

                    {/* Listing 2 */}
                    <Link to="/search/stays/2" className="group flex flex-col gap-3 cursor-pointer">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 relative">
                            <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Appart" />
                            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> 4.85
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight group-hover:underline">Appartement Cosy Centre</h3>
                            <p className="text-gray-500 text-sm">Lomé, Centre-ville</p>
                        </div>
                    </Link>
                 </div>
             </div>

             <hr className="border-gray-200 dark:border-gray-700" />
             
             {/* Reviews Preview */}
             <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-500 icon-filled">star</span>
                    4.92 (145 avis)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                             <div className="w-10 h-10 rounded-full bg-gray-300 bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80")'}}></div>
                             <div>
                                 <h4 className="font-bold text-sm">Sarah</h4>
                                 <p className="text-xs text-gray-500">Octobre 2023</p>
                             </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">"Superbe séjour ! Kodjo est très accueillant et la villa est magnifique."</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                             <div className="w-10 h-10 rounded-full bg-gray-300 bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80")'}}></div>
                             <div>
                                 <h4 className="font-bold text-sm">Marc</h4>
                                 <p className="text-xs text-gray-500">Septembre 2023</p>
                             </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">"Tout était parfait, je recommande vivement."</p>
                    </div>
                </div>
                <button className="mt-4 border border-gray-300 dark:border-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Afficher les 145 avis</button>
             </div>
         </div>
      </div>
    </div>
  );
};

export default HostProfile;