'use client';

import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Chat_diagnose from '@/components/AI/chat_diagnose';
import Chat_kostengutsprache from '@/components/AI/chat_kostengutsprache';
import Chat_stellungsnahme from '@/components/AI/chat_stellungsnahme';
import Chat_documente from '@/components/AI/chat_dokumente';
import Chat_labor from '@/components/AI/chat_labor';
import Chat_literatur from '@/components/AI/chat_literatur';
import Chat_medis from '@/components/AI/chat_medis';
import Chat_summary from '@/components/AI/chat_summary';
import Chat_calculator from '@/components/AI/chat_calculator';
import Chat_plaene from '@/components/AI/chat_plaene';
import Chat_news from '@/components/AI/chat_news';
import Chat_freitext from '@/components/AI/chat_freitext';
import Chat_reise from '@/components/AI/chat_reise';
// PDF Module
import Chat_pdf from '@/components/AI/chat_pdf';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ClientPage() {
  const [activeComponent, setActiveComponent] = useState('diagnose');

  let ActiveComponent;
  switch (activeComponent) {
    case 'diagnose':
      ActiveComponent = Chat_diagnose;
      break;
    case 'kostengutsprache':
      ActiveComponent = Chat_kostengutsprache;
      break;
    case 'stellungsnahme':
      ActiveComponent = Chat_stellungsnahme;
      break;
    case 'documente':
      ActiveComponent = Chat_documente;
      break;
    case 'labor':
      ActiveComponent = Chat_labor;
      break;
    case 'literatur':
      ActiveComponent = Chat_literatur;
      break;
    case 'medis':
      ActiveComponent = Chat_medis;
      break;
    case 'summary':
      ActiveComponent = Chat_summary;
      break;
    case 'calculator':
      ActiveComponent = Chat_calculator;
      break;
    case 'plaene':
      ActiveComponent = Chat_plaene;
      break;
    case 'news':
      ActiveComponent = Chat_news;
      break;
    case 'freitext':
      ActiveComponent = Chat_freitext;
      break;

    case 'reise':
      ActiveComponent = Chat_reise;
      break;

    case 'pdf':
      ActiveComponent = Chat_pdf;
      break;

    default:
      ActiveComponent = null;
  }

  const getButtonClass = (component) => {
    return activeComponent === component ? 'px-4 py-2 bg-gray-500 text-white rounded' : 'px-4 py-2 bg-gray-400 text-white rounded hover:bg-amber-500';
  };

  return (
    <>
      <section className="pb-3">
        <div className="container">
          <div className="mt-4 space-x-2">
            <button onClick={() => setActiveComponent('diagnose')} className={getButtonClass('diagnose')}>
              Differentialdiagnose
            </button>
            <button onClick={() => setActiveComponent('stellungsnahme')} className={getButtonClass('stellungsnahme')}>
              Stellungsnahme
            </button>
            <button onClick={() => setActiveComponent('kostengutsprache')} className={getButtonClass('kostengutsprache')}>
              Gutsprache
            </button>
            <button onClick={() => setActiveComponent('labor')} className={getButtonClass('labor')}>
              Labor
            </button>
            <button onClick={() => setActiveComponent('literatur')} className={getButtonClass('literatur')}>
              Literatur
            </button>
            <button onClick={() => setActiveComponent('medis')} className={getButtonClass('medis')}>
              Medikamente
            </button>
            {/* <button onClick={() => setActiveComponent('summary')} className={getButtonClass('summary')}>
              Zusammenfassung
            </button> */}
            <button onClick={() => setActiveComponent('documente')} className={getButtonClass('documente')}>
              Dokumente
            </button>
            <button onClick={() => setActiveComponent('calculator')} className={getButtonClass('calculator')}>
              Rechner
            </button>

            <button onClick={() => setActiveComponent('reise')} className={getButtonClass('reise')}>
              Reise
            </button>

            <button onClick={() => setActiveComponent('pdf')} className={getButtonClass('pdf')}>
              PDF
            </button>


            {/* Needs Dev*/}
            {/* <button onClick={() => setActiveComponent('plaene')} className={getButtonClass('plaene')}>
              Pläne
            </button> */}
            {/* Browsing does not work yet */}
            {/* <button onClick={() => setActiveComponent('news')} className={getButtonClass('news')}>
              News
            </button> */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex items-center px-4 py-2  text-white bg-gray-400  rounded hover:bg-amber-500">
                  Freitext
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-200" aria-hidden="true" />
                </MenuButton>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">

                  </div>
                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={() => setActiveComponent('freitext')}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          zur Eingabe
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={() => setActiveComponent('freitext')}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Hilfe
                        </a>
                      )}
                    </MenuItem>
                  </div>

                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={() => setActiveComponent('freitext')}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Funktionen im Entwicklung
                        </a>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </section>

      <section className="pt-5">
        <div className="container">
          <div className="text-left">
            <h2 className="pl-1 text-2xl font-bold text-black dark:text-white">
              {activeComponent === 'diagnose' && 'Differentialsdiagnosen Copilot'}
              {activeComponent === 'kostengutsprache' && 'Kostengutsprache Copilot'}
              {activeComponent === 'stellungsnahme' && 'Stellungsnahme Copilot'}
              {activeComponent === 'labor' && 'Laborwerte Copilot'}
              {activeComponent === 'documente' && 'Dokumente Copilot'}
              {activeComponent === 'literatur' && 'Literatur Copilot'}
              {activeComponent === 'medis' && 'Medikamente Copilot'}
              {activeComponent === 'summary' && 'Zusammenfassungs Copilot'}
              {activeComponent === 'calculator' && 'Rechner Copilot'}
              {activeComponent === 'plaene' && 'Pläne Copilot'}
              {activeComponent === 'news' && 'News Copilot'}
              {activeComponent === 'freitext' && 'Freitext Copilot'}
              {activeComponent === 'pdf' && 'PDF'}
              {activeComponent === 'reise' && 'Reise'}
            </h2>
            {ActiveComponent && <ActiveComponent />}
            <p className="text-center text-gray-500 text-sm pt-2">
              Testversion - der Copilot kann Fehler machen. Bitte alle Angaben im Detail kontrollieren und nicht blind kopieren.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
