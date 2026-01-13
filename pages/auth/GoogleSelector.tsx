import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const GoogleSelector: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect');
  
  const { login, addNotification } = useApp();
  const [isFinishing, setIsFinishing] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'add'>('list');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const ACCOUNTS = [
      { id: 'g1', name: 'Jean Dupont', email: 'jean.dupont@gmail.com', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200' },
      { id: 'g2', name: 'Fatou Diagne', email: 'fatou.diagne@outlook.com', avatar: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&w=200&h=200' },
  ];

  const handleSelect = (account: typeof ACCOUNTS[0]) => {
      setIsFinishing(account.id);
      setTimeout(() => {
          login({
              id: account.id,
              name: account.name,
              email: account.email,
              avatar: account.avatar,
              role: 'GUEST',
              status: 'Active',
              joinDate: new Date().toLocaleDateString('fr-FR')
          });
          addNotification('success', `Connecté avec ${account.email}`);
          if (redirectPath) navigate(redirectPath);
          else navigate('/');
      }, 1500);
  };

  const handleCreateNew = (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !name) return;
      
      setIsFinishing('new');
      setTimeout(() => {
          const newUser = {
              id: 'g-' + Math.random().toString(36).substr(2, 9),
              name: name,
              email: email,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
              role: 'GUEST' as const,
              status: 'Active' as const,
              joinDate: new Date().toLocaleDateString('fr-FR')
          };
          login(newUser);
          addNotification('success', `Compte Google ${email} créé et connecté !`);
          if (redirectPath) navigate(redirectPath);
          else navigate('/');
      }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 font-sans relative">
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
      >
        <span className="material-symbols-outlined">close</span>
        <span className="text-sm font-semibold">Annuler</span>
      </button>

      <div className="w-full max-w-[450px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden p-8 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center w-full">
            <svg className="w-[75px] h-[24px] mb-4" viewBox="0 0 74 24" fill="none">
                <path d="M9.2 18.6C4.1 18.6 0 14.5 0 9.3C0 4.1 4.1 0 9.2 0C11.9 0 13.9 1 15.4 2.5L13.1 4.8C12 3.8 10.7 3.1 9.2 3.1C6.1 3.1 3.7 5.6 3.7 9.3C3.7 13 6.2 15.5 9.2 15.5C11.6 15.5 13 14.5 13.9 13.6C14.6 12.9 15.1 11.9 15.3 10.5H9.2V7.4H18.4C18.5 7.8 18.6 8.3 18.6 8.9C18.6 10.6 18.1 12.7 16.4 14.4C14.7 16.1 12.6 17.1 9.7 17.1V18.6ZM30.7 11.7C30.7 15.5 27.8 18.3 24.3 18.3C20.8 18.3 17.9 15.5 17.9 11.7C17.9 7.9 20.8 5.1 24.3 5.1C27.8 5.1 30.7 7.9 30.7 11.7ZM27.1 11.7C27.1 9.3 25.5 7.8 24.3 7.8C23.1 7.8 21.5 9.3 21.5 11.7C21.5 14.1 23.1 15.6 24.3 15.6C25.5 15.6 27.1 14.1 27.1 11.7ZM44.2 11.7C44.2 15.5 41.3 18.3 37.8 18.3C34.3 18.3 31.4 15.5 31.4 11.7C31.4 7.9 34.3 5.1 37.8 5.1C41.3 5.1 44.2 7.9 44.2 11.7ZM40.6 11.7C40.6 9.3 39 7.8 37.8 7.8C36.6 7.8 35 9.3 35 11.7C35 14.1 36.6 15.6 37.8 15.6C39 15.6 40.6 14.1 40.6 11.7ZM56.7 5.6V17.5C56.7 21.6 54.3 23.3 51.3 23.3C48.5 23.3 46.8 21.4 46.2 19.8L49.3 18.5C49.9 19.8 50.4 20.6 51.3 20.6C53.1 20.6 54.3 19.5 54.3 17.4V16.7H54.2C53.6 17.4 52.6 18.1 51.2 18.1C48.3 18.1 45.7 15.5 45.7 11.7C45.7 7.9 48.3 5.3 51.2 5.3C52.6 5.3 53.6 5.9 54.2 6.6H54.3V5.6H56.7ZM53.3 11.7C53.3 9.3 51.9 7.8 50.8 7.8C49.6 7.8 48.2 9.3 48.2 11.7C48.2 14.1 49.6 15.6 50.8 15.6C51.9 15.6 53.3 14.1 53.3 11.7ZM61 0.6H63.6V18.1H61V0.6ZM73.1 14.5L75.6 16.2C74.8 17.4 73.1 18.3 70.4 18.3C67.4 18.3 65.2 16.1 65.2 11.7C65.2 7.2 67.4 5.1 70.1 5.1C72.8 5.1 74.8 7.2 75.3 8.7L75.6 9.5L68.5 12.4C69.1 13.5 69.9 14.1 71.1 14.1C72.3 14.1 73.1 13.5 73.1 14.5ZM67.5 11.5L71.8 9.7C71.5 8.9 70.6 8.3 69.6 8.3C68.4 8.3 67.5 9.4 67.5 11.5Z" fill="#4285F4"/>
            </svg>
            <h1 className="text-2xl text-gray-800 font-normal">
                {view === 'list' ? 'Choisir un compte' : 'Utiliser un autre compte'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">pour continuer vers Reserve Africa</p>
        </div>

        {view === 'list' ? (
            <div className="w-full space-y-px">
                {ACCOUNTS.map((acc) => (
                    <button 
                        key={acc.id}
                        onClick={() => handleSelect(acc)}
                        disabled={!!isFinishing}
                        className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-y border-gray-100 first:border-t-0 last:border-b-0 relative"
                    >
                        <div className="size-10 rounded-full bg-cover bg-center shrink-0 border border-gray-100" style={{backgroundImage: `url("${acc.avatar}")`}}></div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-semibold text-gray-700">{acc.name}</p>
                            <p className="text-xs text-gray-500">{acc.email}</p>
                        </div>
                    </button>
                ))}
            </div>
        ) : (
            <form onSubmit={handleCreateNew} className="w-full space-y-4 animate-fade-in">
                <input required type="text" placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg outline-none text-sm" />
                <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg outline-none text-sm" />
                <button type="submit" className="w-full bg-[#1a73e8] text-white py-3 rounded-lg font-semibold shadow-sm">Suivant</button>
            </form>
        )}
      </div>
    </div>
  );
};

export default GoogleSelector;