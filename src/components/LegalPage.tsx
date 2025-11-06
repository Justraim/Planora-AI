import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface Props {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

const LegalPage: React.FC<Props> = ({ title, onBack, children }) => {
  return (
    <div className="max-w-3xl mx-auto bg-surface p-6 md:p-10 rounded-2xl shadow-subtle border border-border animate-fade-in-up">
        <h2 className="text-4xl font-bold text-center mb-8">{title}</h2>
        <div className="text-base text-secondary space-y-6 text-left legal-content">
            {children}
        </div>
        <div className="text-center mt-10">
             <button
                onClick={onBack}
                className="inline-flex items-center justify-center bg-surface border border-border text-secondary font-semibold py-2 px-5 rounded-lg hover:bg-background hover:text-primary transition-colors duration-300"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Home
            </button>
        </div>
    </div>
  );
};

export default LegalPage;
