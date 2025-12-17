import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const HostProfile: React.FC = () => {
  const { id } = useParams();
  const { allUsers, allProperties, reviews } = useApp();

  // Find host data
  const host = useMemo(() => allUsers.find(u => u.id === id), [allUsers, id]);
  
  // Find host properties
  const hostProperties = useMemo(() => 
    allProperties.filter(p => p.ownerId === id || p.owner === host?.name), 
  [allProperties, host, id]);

  // Find reviews for all host's properties
  const hostReviews = useMemo(() => {
    const propIds = hostProperties.map(p => p.id);
    return reviews.filter(r => propIds.includes(r.propertyId));
  }, [reviews, hostProperties]);

  const avgRating = useMemo(() => {
    if (hostReviews.length === 0) return "Nouveau";
    const sum = hostReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / hostReviews.length).toFixed(1);
  }, [hostReviews]);

  if (!host) return <div className="p-20 text-center font-bold">Hôte introuvable</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 font-display">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Left Info Card */}
         <div className="lg:col-span-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-lg bg-white dark:bg-[#1a202c] sticky top-24">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-gray-100" style={{backgroundImage: `url("${host.avatar}")`}}></div>
                        <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white" title="Identité vérifiée">
                            <span className="material-symbols-outlined text-sm font-bold block">verified_user</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{host.name}</h1>
                    <p className="text-gray-500 font-medium mb-4">Hôte depuis {host.joinDate?.split(' ')[2] || '2023'} • {host.location || 'Afrique'}</p>
                    
                    <div className="flex gap-8 border-y border-gray-100 dark:border-gray-700 py-4 w-full justify-center mb-6">
                        <div>
                            <span className="block font-black text-lg">{hostReviews.length}</span>
                            <span className="text-xs text-gray-500 uppercase font-bold">Avis</span>
                        </div>
                        <div>
                            <span className="block font-black text-lg">{avgRating}</span>
                            <span className="text-xs text-gray-500 uppercase font-bold">Note</span>
                        </div>
                        <div>
                            <span className="block font-black text-lg">Hôte</span>
                            <span className="text-xs text-gray-500 uppercase font-bold">Reseva</span>
                        </div>
                    </div>

                    <div className="text-left w-full space-y-3 mb-6">
                         <div className="flex items-center gap-3 text-sm">
                             <span className="material-symbols-outlined text-gray-400">work</span>
                             <span>Professionnel vérifié</span>
                         </div>
                         <div className="flex items-center gap-3 text-sm">
                             <span className="material-symbols-outlined text-gray-400">language</span>
                             <span>Parle Français, Anglais</span>
                         </div>
                    </div>

                    <button className="w-full bg-black text-white dark:bg-white dark:text-black font-bold py-3 rounded-xl hover:opacity-80 transition-colors">Contacter l'hôte</button>
                </div>
            </div>
         </div>

         {/* Right Listings & Bio */}
         <div className="lg:col-span-8 flex flex-col gap-10">
             <div>
                 <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">À propos de {host.name.split(' ')[0]}</h2>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                     {host.bio || `Bienvenue dans mes établissements. Je m'engage à fournir une expérience de voyage exceptionnelle en mettant l'accent sur le confort, la sécurité et l'authenticité locale.`}
                 </p>
             </div>

             <hr className="border-gray-200 dark:border-gray-700" />

             <div>
                 <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Annonces de {host.name.split(' ')[0]} ({hostProperties.length})</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hostProperties.map(property => (
                        <Link to={`/search/${property.type === 'Hébergement' ? 'stays' : 'cars'}/${property.id}`} key={property.id} className="group flex flex-col gap-3 cursor-pointer">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 relative">
                                <img src={property.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={property.title} />
                                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> {property.rating}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight group-hover:underline">{property.title}</h3>
                                <p className="text-gray-500 text-sm">{property.location}</p>
                            </div>
                        </Link>
                    ))}
                 </div>
             </div>

             <hr className="border-gray-200 dark:border-gray-700" />
             
             {/* Reviews Section */}
             <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <span className="material-symbols-outlined text-yellow-500 icon-filled">star</span>
                    {avgRating} · {hostReviews.length} avis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hostReviews.slice(0, 4).map((r) => (
                        <div key={r.id} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-300 bg-cover" style={{backgroundImage: `url("${r.authorAvatar}")`}}></div>
                                 <div>
                                     <h4 className="font-bold text-sm text-gray-900 dark:text-white">{r.authorName}</h4>
                                     <p className="text-xs text-gray-500">{r.date}</p>
                                 </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{r.comment}"</p>
                        </div>
                    ))}
                    {hostReviews.length === 0 && <p className="text-gray-500 italic">Aucun avis pour le moment.</p>}
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default HostProfile;