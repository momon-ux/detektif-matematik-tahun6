import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MissionMap from './components/MissionMap';
import CaseBriefing from './components/CaseBriefing';
import InvestigationRoom from './components/InvestigationRoom';
import SafeVaultModal from './components/SafeVaultModal';
import VictoryReport from './components/VictoryReport';
import DossierGuide from './components/DossierGuide';
import ProfileModal from './components/ProfileModal';
import CertificateModal from './components/CertificateModal';
import RodaSifir from './components/RodaSifir';
import { loadProfile, saveProfile, resetAllProgress, DEFAULT_PROFILE } from './utils/storage';
import { sound } from './utils/sound';

export default function App() {
  const [profile, setProfile] = useState(() => loadProfile());
  const [currentView, setCurrentView] = useState('map'); // 'map' | 'briefing' | 'investigation' | 'vault' | 'victory' | 'roda-sifir'
  const [activeCase, setActiveCase] = useState(null);
  const [totalHintsUsedInCase, setTotalHintsUsedInCase] = useState(0);

  // Modals
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Persist profile changes
  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
  };

  // Case flow handlers
  const handleSelectCase = (caseObj) => {
    setActiveCase(caseObj);
    setCurrentView('briefing');
    setTotalHintsUsedInCase(0);
  };

  const handleStartInvestigation = () => {
    setCurrentView('investigation');
  };

  const handleProceedToVault = (hintsUsed) => {
    setTotalHintsUsedInCase(hintsUsed);
    setCurrentView('vault');
  };

  const handleVaultUnlocked = () => {
    if (!activeCase) return;

    // Calculate stars: 0-1 hints = 3 stars, 2-3 hints = 2 stars, 4+ = 1 star
    let earnedStars = 3;
    if (totalHintsUsedInCase >= 4) {
      earnedStars = 1;
    } else if (totalHintsUsedInCase >= 2) {
      earnedStars = 2;
    }

    const xpEarned = activeCase.isBoss ? 800 : 450 + (earnedStars * 50);

    const prevScores = profile.caseScores || {};
    const existingScore = prevScores[activeCase.id];
    const previousStars = existingScore ? existingScore.stars : 0;
    
    // Only add new star difference or update if better
    const bestStars = Math.max(previousStars, earnedStars);

    const completed = profile.completedCases || [];
    const isNewCompletion = !completed.includes(activeCase.id);
    const updatedCompletedCases = isNewCompletion ? [...completed, activeCase.id] : completed;

    // Badges
    const existingBadges = profile.badges || [];
    const hasBadge = existingBadges.some(b => b.id === activeCase.badgeReward.id);
    const updatedBadges = hasBadge ? existingBadges : [...existingBadges, activeCase.badgeReward];

    const updatedProfile = {
      ...profile,
      xp: profile.xp + (isNewCompletion ? xpEarned : 100), // replay gives 100 bonus xp
      completedCases: updatedCompletedCases,
      badges: updatedBadges,
      caseScores: {
        ...prevScores,
        [activeCase.id]: {
          stars: bestStars,
          hintsUsed: totalHintsUsedInCase,
          lastPlayed: new Date().toISOString()
        }
      }
    };

    updateProfile(updatedProfile);
    setCurrentView('victory');
  };

  const handleReturnToMap = () => {
    setActiveCase(null);
    setCurrentView('map');
  };

  const handleReplayCase = () => {
    setTotalHintsUsedInCase(0);
    setCurrentView('investigation');
  };

  const handleResetProgressConfirm = () => {
    const fresh = resetAllProgress();
    setProfile(fresh);
    setCurrentView('map');
    setActiveCase(null);
    setShowResetConfirm(false);
    sound.playClick();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col bg-cyber-grid relative selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Global Cyber Audio Background Hint / Navbar */}
      <Navbar
        profile={profile}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenGuide={() => setShowGuideModal(true)}
        onOpenCertificate={() => setShowCertificateModal(true)}
        onOpenRodaSifir={() => setCurrentView('roda-sifir')}
        onResetProgress={() => setShowResetConfirm(true)}
        onHomeClick={handleReturnToMap}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {currentView === 'map' && (
          <MissionMap
            profile={profile}
            onSelectCase={handleSelectCase}
            onOpenGuide={() => setShowGuideModal(true)}
            onOpenCertificate={() => setShowCertificateModal(true)}
            onOpenRodaSifir={() => setCurrentView('roda-sifir')}
          />
        )}

        {currentView === 'roda-sifir' && (
          <RodaSifir
            profile={profile}
            onUpdateProfile={updateProfile}
            onBack={handleReturnToMap}
          />
        )}

        {currentView === 'briefing' && activeCase && (
          <CaseBriefing
            caseData={activeCase}
            onStartInvestigation={handleStartInvestigation}
            onBack={handleReturnToMap}
          />
        )}

        {currentView === 'investigation' && activeCase && (
          <InvestigationRoom
            caseData={activeCase}
            onProceedToVault={handleProceedToVault}
            onBackToBriefing={() => setCurrentView('briefing')}
          />
        )}

        {currentView === 'vault' && activeCase && (
          <SafeVaultModal
            caseData={activeCase}
            totalHintsUsed={totalHintsUsedInCase}
            onVaultUnlocked={handleVaultUnlocked}
          />
        )}

        {currentView === 'victory' && activeCase && (
          <VictoryReport
            caseData={activeCase}
            totalHintsUsed={totalHintsUsedInCase}
            profile={profile}
            onReturnToMap={handleReturnToMap}
            onReplayCase={handleReplayCase}
            onOpenCertificate={() => setShowCertificateModal(true)}
          />
        )}
      </main>

      {/* Modals */}
      {showProfileModal && (
        <ProfileModal
          profile={profile}
          onSaveProfile={updateProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {showGuideModal && (
        <DossierGuide
          onClose={() => setShowGuideModal(false)}
        />
      )}

      {showCertificateModal && (
        <CertificateModal
          profile={profile}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-rose-800/80 rounded-2xl p-6 shadow-2xl space-y-4">
            <h4 className="font-cyber font-bold text-lg text-rose-400">
              PENGESAHAN: PADAM REKOD SIASATAN?
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Adakah anda pasti ingin menetapkan semula semua kemajuan kes, mata XP, lencana dan bintang siasatan? Tindakan ini tidak boleh diundur.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Batal
              </button>
              <button
                onClick={handleResetProgressConfirm}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-cyber font-bold text-white shadow-lg shadow-rose-950"
              >
                Ya, Mula Semula
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="no-print border-t border-slate-900 bg-slate-950/80 py-6 px-4 text-center text-xs font-tech text-slate-500 space-y-1">
        <p>DETEKTIF SIBER MATEMATIK TAHUN 6 // DSKP KSSR SEMAKAN TERKINI</p>
        <p className="text-slate-600">Direka khas untuk pembelajaran interaktif bilik darjah & kendiri di rumah</p>
      </footer>

    </div>
  );
}
