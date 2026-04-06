import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'nl', flag: '🇳🇱', label: 'Dutch' },
  { code: 'es', flag: '🇪🇸', label: 'Spanish' },
  { code: 'fr', flag: '🇫🇷', label: 'French' },
  { code: 'ru', flag: '🇷🇺', label: 'Russian' },
  { code: 'de', flag: '🇩🇪', label: 'German' },
  { code: 'it', flag: '🇮🇹', label: 'Italian' },
  { code: 'pt', flag: '🇵🇹', label: 'Portuguese' },
  { code: 'ja', flag: '🇯🇵', label: 'Japanese' },
  { code: 'zh-CN', flag: '🇨🇳', label: 'Chinese' },
  { code: 'ko', flag: '🇰🇷', label: 'Korean' },
  { code: 'ar', flag: '🇸🇦', label: 'Arabic' },
  { code: 'hi', flag: '🇮🇳', label: 'Hindi' },
];

interface LanguageSwitcherProps {
  isScrolled: boolean;
}

export default function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages.find(l => l.code === localStorage.getItem('selectedLang')) || languages[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
      applyLanguage(savedLang);
    }
  }, []);

  const applyLanguage = (langCode: string) => {
    const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      setTimeout(() => applyLanguage(langCode), 100);
    }
  };

  const changeLanguage = (lang: typeof languages[0]) => {
    setSelected(lang);
    localStorage.setItem('selectedLang', lang.code);
    setOpen(false);

    if (lang.code === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.srinathayogaschool.com; path=/';
      window.location.reload();
      return;
    }

    const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (selectEl) {
      selectEl.value = lang.code;
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setTimeout(() => {
      const langSelector = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (langSelector) {
        langSelector.value = lang.code;
        langSelector.dispatchEvent(new Event('change'));
      }
    }, 500);
  };

  const borderColor = isScrolled ? 'border-gray-300 text-gray-700 hover:border-teal-500' : 'border-white/30 text-white hover:border-teal-400 hover:bg-white/10';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all text-sm font-medium ${borderColor}`}
        aria-label="Select language"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="hidden lg:block text-xs font-semibold">{selected.label}</span>
        <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${open ? 'rotate-180' : ''}`}></i>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[9999] max-h-80 overflow-y-auto">
          <div className="p-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  selected.code === lang.code
                    ? 'bg-teal-50 text-teal-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
                {selected.code === lang.code && (
                  <i className="ri-check-line ml-auto text-teal-500"></i>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
