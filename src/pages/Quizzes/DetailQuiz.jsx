import React, { useState } from 'react';
import { Share2, QrCode, Users, Plus, Copy, Check } from 'lucide-react';

export default function QuizDetailsTemplate() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const participants = [
    { id: 1, name: 'Tasnim Belghith', avatar: 'TB' },
    { id: 2, name: 'Kawther Chaieb', avatar: 'KC' },
    { id: 3, name: 'Rabeb Chtiti', avatar: 'RC' },
    { id: 4, name: 'Amenallah Azzouni', avatar: 'AA' },
    { id: 5, name: 'Aziz Mdalel', avatar: 'AM' },
    { id: 6, name: 'Amenallah Ameri', avatar: 'AA' },
  ];

  const questions = [
    {
      id: 1,
      text: 'Laquelle de ces techniques est utilisée dans React.js pour améliorer les performances?',
      options: ['Virtual DOM', 'Hooks', 'Redux', 'Context API'],
    },
    {
      id: 2,
      text: 'Quel est le port par défaut de webpack-dev-server ?',
      options: ['8080', '3000', '5000', '4000'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#624BFF] to-[#7C5FFF] text-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Détails du Quiz</h1>
      </div>

      {/* Quiz Info Card */}
      <div className="w-full bg-white shadow-xl rounded-2xl p-8 my-8 mx-auto max-w-7xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">
          Quiz Biologie Générale 101
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Évaluation complète couvrant les concepts fondamentaux de la biologie. Difficulté : Moyenne.
        </p>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border border-gray-200 shadow-sm">
          <div>
            <p className="text-sm text-gray-500 mb-2 font-medium">ID du Quiz</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-[#212B36] to-[#212B36] bg-clip-text text-transparent">1234568</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-[#624BFF] hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
            </button>
            <button className="p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-[#624BFF] hover:bg-gray-50 transition-all duration-200 shadow-sm">
              <QrCode className="w-5 h-5 text-gray-600" />
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-[#624BFF] to-[#7C5FFF] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium">
              <Share2 className="w-4 h-4" />
              Partager
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-[#624BFF] to-[#7C5FFF] rounded-full"></div>
              Questions du Quiz
            </h3>
            <div className="space-y-8">
              {questions.map((question) => (
                <div key={question.id} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0 hover:bg-gray-50 rounded-xl p-4 transition-colors duration-200">
                  <p className="text-gray-800 font-semibold mb-4 text-lg">{question.id}. {question.text}</p>
                  {question.options.length > 0 && (
                    <ul className="ml-4 space-y-3 list-none text-gray-700">
                      {question.options.map((option, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
                          <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">{idx + 1}</span>
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
                <button className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-[#624BFF] to-[#7C5FFF] text-white hover:shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-200">
              Voir tous les questions
              </button>
          </div>
  </div>

         
        </div>

        {/* Participants */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-gradient-to-br from-[#624BFF] to-[#7C5FFF] rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl">Participants</h3>
             
            </div>
            <div className="space-y-3">
              {participants.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-md">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#624BFF] to-[#7C5FFF] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {p.avatar}
                  </div>
                  <span className="text-gray-700 font-semibold text-sm">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}