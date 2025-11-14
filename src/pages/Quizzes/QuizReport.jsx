import React from 'react';
import { FileText, Users, CheckCircle, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TableauDeBordQuiz() {

  const participants = [
    { id: 1, name: 'Tasnim Belghith', email: 'belghith.tasnim@gmail.com', activity: 'Aujourd\'hui', timing: '10:30', avatar: 'TB'},
    { id: 2, name: 'Kawther Chaieb', email: 'kawtherchaieb@gmail.com', activity: 'Hier', timing: '14:00',avatar: 'KC' },
    { id: 3, name: 'Rabeb Chtiti', email: 'rabebchtiti@gmail.com', activity: 'Aujourd\'hui', timing: '09:15',avatar: 'RB' },
    { id: 4, name: 'Amenallah Azzouni', email: 'amenallahazzouni@gmail.com', activity: 'La semaine dernière', timing: '11:45' ,avatar: 'AA'},
    { id: 5, name: 'Aziz Mdalel', email: 'azizmdalel@gmail.com', activity: 'Aujourd\'hui', timing: '16:20',avatar: 'AM' },
    { id: 6, name: 'Amenallah Ameri', email: 'amenallahameri@gmail.com', activity: 'Hier', timing: '13:10' ,avatar: 'AA'},
  ];

  const questions = [
    'Lequel des éléments suivants est utilisé dans React.js pour améliorer les performances ?',
    'Quel est le port par défaut de webpack-dev-server ?',
    'Quel est le port par défaut de webpack-dev-server ?',
    'Quel est le port par défaut de webpack-dev-server ?',
    'Quel est le port par défaut de webpack-dev-server ?'
  ];

  // Cartes statistiques
  const statsCards = [
    {
      title: 'Nombre de questions',
      value: questions.length,
      icon: <FileText className="w-5 h-5 text-[#624BFF]"/>,
      bg: 'bg-[#EDEBFF]' 
    },
    {
      title: 'Participants',
      value: participants.length,
      icon: <Users className="w-5 h-5 text-[#624BFF]"/>,
      bg: 'bg-[#EDEBFF]'
    },
    {
      title: 'Taux de réussite',
      value: '76%',
      icon: <CheckCircle className="w-5 h-5 text-[#624BFF]"/>,
      bg: 'bg-[#EDEBFF]'
    },
    {
      title: 'Durée du quiz',
      value: '30 min',
      icon: <Clock className="w-5 h-5 text-[#624BFF]"/>,
      bg: 'bg-[#EDEBFF]'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <div className="bg-[#624BFF] text-white px-8 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rapport du quiz</h1>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 mt-6">
        {statsCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 font-semibold">{card.title}</span>
              <div className={`w-10 h-10 ${card.bg} rounded flex items-center justify-center`}>
                {card.icon}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto px-8 py-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Questions */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Questions du Quiz</h2>
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  <span className="font-medium">{idx + 1}.</span> {q}
                </div>
              ))}
            </div>
          </div>

          {/* Performance des participants */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Performance des étudiants</h2>
            <div className="flex items-end justify-center gap-8 h-64">
              <div className="flex flex-col items-center">
                <div className="bg-green-500 rounded-lg" style={{ width: '80px', height: '180px' }}></div>
                <span className="text-xs text-gray-600 mt-2">Réussite</span>
                <span className="text-sm font-semibold">50</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-red-500 rounded-lg" style={{ width: '80px', height: '100px' }}></div>
                <span className="text-xs text-gray-600 mt-2">Échec</span>
                <span className="text-sm font-semibold">15</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-yellow-500 rounded-lg" style={{ width: '80px', height: '140px' }}></div>
                <span className="text-xs text-gray-600 mt-2">Fraude</span>
                <span className="text-sm font-semibold">30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des participants */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Liste des participants</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-sm">Nom</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-sm">Dernière activité</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-sm">Temps</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {participants.map(p => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#624BFF] to-[#7C5FFF] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {p.avatar}
                  </div>
                    <span className="font-semibold text-gray-900">{p.name}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{p.activity}</td>
                  <td className="py-4 px-4 text-gray-600">{p.timing}</td>
                  <td className="py-4 px-4">
                    <button className="px-4 py-2 text-sm text-[#624BFF] border border-[#624BFF] rounded-lg hover:bg-[#EDEBFF] flex items-center gap-1">
                      <Eye className="w-4 h-4"/> Voir performance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
