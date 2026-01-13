import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const COUNTRY_CODES = [
  { code: '+228', country: 'Togo', flag: '🇹🇬' },
  { code: '+229', country: 'Bénin', flag: '🇧🇯' },
  { code: '+225', country: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: '+221', country: 'Sénégal', flag: '🇸🇳' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
  { code: '+223', country: 'Mali', flag: '🇲🇱' },
  { code: '+227', country: 'Niger', flag: '🇳🇪' },
  { code: '+224', country: 'Guinée', flag: '🇬🇳' },
];

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const type = searchParams.get('type') || 'stay';
  const checkinParam = searchParams.get('checkin');
  const checkoutParam = searchParams.get('checkout');

  const { addNotification, allProperties, addBooking, user, systemSettings } = useApp();
  
  const property = allProperties.find(p => p.id === Number(id));
  const displayProperty = property || { title: 'Service', price: '0 F', rawPrice: 0, image: '', location: '', owner: 'Reseva Host' };
  
  const start = checkinParam ? new Date(checkinParam) : new Date();
  const end = checkoutParam ? new Date(checkoutParam) : new Date(new Date().setDate(start.getDate() + 3));
  const diffDays = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  
  const basePrice = displayProperty.rawPrice * diffDays;
  const serviceFeeRate = systemSettings.serviceFeeRate; 
  const serviceFee = Math.round(basePrice * (serviceFeeRate / 100));
  const totalAmount = basePrice + serviceFee;

  const [method, setMethod] = useState<'mobile' | 'bank'>('mobile');
  const [mobileProvider, setMobileProvider] = useState<'mtn' | 'orange' | 'moov' | 'wave'>('mtn');
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if (method === 'mobile' && !phoneNumber) {
        addNotification('error', 'Veuillez entrer votre numéro de téléphone.');
        return;
    }

    setIsProcessing(true);
    const bookingId = `${type === 'stay' ? 'RES' : type === 'car' ? 'CAR' : 'ACT'}-${Date.now().toString().slice(-6)}`;

    setTimeout(() => {
        addBooking({
            id: bookingId,
            title: displayProperty.title,
            location: displayProperty.location,
            dates: checkinParam && checkoutParam 
                ? `${new Date(checkinParam).toLocaleDateString('fr-FR')} - ${new Date(checkoutParam).toLocaleDateString('fr-FR')}` 
                : 'Dates flexibles',
            image: displayProperty.image,
            price: `${totalAmount.toLocaleString()} FCFA`,
            totalAmount: totalAmount,
            status: 'Confirmé',
            type: type as any,
            hostName: displayProperty.owner || 'Reseva Host',
            guestName: user?.name || 'Invité',
            guestAvatar: user?.avatar || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80',
            payoutStatus: 'Pending',
            propertyId: property?.id,
            checkInDate: checkinParam || undefined,
            checkOutDate: checkoutParam || undefined
        });

        setIsProcessing(false);
        navigate(`/booking/confirmation?bookingId=${bookingId}`);
    }, 2500);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-8 font-display">
      <div className="flex flex-col gap-8">
        <div className="max-w-[800px] mx-auto w-full">
          <div className="flex gap-6 justify-between items-end mb-3">
            <p className="font-medium text-gray-500">Étape 2 sur 3</p>
            <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">lock</span> Paiement sécurisé
            </div>
          </div>
          <div className="rounded-full bg-[#e7d7cf] h-2 w-full overflow-hidden">
            <div className="h-full bg-primary w-2/3"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Paiement</h1>
                <p className="text-gray-500 mt-1">Choisissez votre mode de paiement sécurisé.</p>
            </div>
            
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <button 
                    onClick={() => setMethod('mobile')}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        method === 'mobile' 
                        ? 'bg-white dark:bg-[#1e293b] text-primary shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    <span className="material-symbols-outlined">smartphone</span> Mobile Money
                </button>
                <button 
                    onClick={() => setMethod('bank')}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        method === 'bank' 
                        ? 'bg-white dark:bg-[#1e293b] text-primary shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    <span className="material-symbols-outlined">account_balance</span> Virement Bancaire
                </button>
            </div>

            {method === 'mobile' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 shadow-sm animate-fade-in">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Opérateur Mobile</h3>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                      { id: 'mtn', name: 'MTN', color: 'bg-yellow-400' },
                      { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
                      { id: 'moov', name: 'Moov', color: 'bg-blue-600' },
                      { id: 'wave', name: 'Wave', color: 'bg-blue-400' }
                  ].map((provider) => (
                      <div 
                        key={provider.id}
                        onClick={() => setMobileProvider(provider.id as any)}
                        className={`cursor-pointer rounded-xl border-2 p-3 flex flex-col items-center gap-2 transition-all ${
                            mobileProvider === provider.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-100 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                          <div className={`size-8 rounded-full ${provider.color} flex items-center justify-center text-white font-bold text-[10px]`}>
                              {provider.name[0]}
                          </div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{provider.name}</span>
                      </div>
                  ))}
                </div>

                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Numéro de téléphone</label>
                <div className="flex gap-2">
                    <select 
                        value={selectedCountryCode.code}
                        onChange={(e) => setSelectedCountryCode(COUNTRY_CODES.find(c => c.code === e.target.value) || COUNTRY_CODES[0])}
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3.5 font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                    </select>
                    <div className="relative flex-1">
                        <input 
                            type="tel" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="00 00 00 00" 
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-lg tracking-wide" 
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400">smartphone</span>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">Paiement sécurisé par authentification push sur votre mobile {selectedCountryCode.country}.</p>
              </div>
            )}

            {method === 'bank' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 shadow-sm animate-fade-in">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 mb-6">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        Veuillez effectuer le virement sur le compte ci-dessous. Votre réservation sera confirmée dès réception des fonds (24-48h).
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between p-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500">Banque</span>
                        <span className="font-bold text-gray-900 dark:text-white">Ecobank Togo</span>
                    </div>
                    <div className="flex justify-between p-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500">Titulaire</span>
                        <span className="font-bold text-gray-900 dark:text-white">Reseva Africa Ltd</span>
                    </div>
                    <div className="flex justify-between p-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500">IBAN</span>
                        <div className="text-right">
                            <span className="font-mono font-bold text-gray-900 dark:text-white block text-sm">TG76 3005 5029 9100 0123 4567 89</span>
                            <button className="text-xs text-primary font-bold hover:underline mt-1">Copier</button>
                        </div>
                    </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 justify-center text-gray-400 text-sm py-2">
                <span className="material-symbols-outlined text-base">lock</span>
                <span>Toutes les transactions sont chiffrées et sécurisées.</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Récapitulatif</h3>
              <div className="flex gap-4 mb-6">
                  <div className="size-16 rounded-lg bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url("${displayProperty.image}")`}}></div>
                  <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{displayProperty.title}</h4>
                      <p className="text-sm text-gray-500">{diffDays} jours</p>
                  </div>
              </div>
              <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Sous-total</span>
                    <span className="font-bold text-gray-900 dark:text-white">{basePrice.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Frais de service (15%)</span>
                    <span className="font-bold text-gray-900 dark:text-white">{serviceFee.toLocaleString()} FCFA</span>
                  </div>
              </div>
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total à payer</span>
                <span className="text-2xl font-black text-primary">{totalAmount.toLocaleString()} F</span>
              </div>
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-primary hover:bg-[#d65a1f] text-white text-center font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Traitement...' : `Payer ${totalAmount.toLocaleString()} FCFA`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
