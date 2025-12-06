'use client';

import { useState } from 'react';
import WebsiteInput from './_ui/website-input';
import RenewalPreview from './_ui/renewal-preview';
import ConsultationForm from './_ui/consultation-form';

export default function RenewalConsultationPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [pageJson, setPageJson] = useState<string>('');

  const handleWebsiteSubmit = (url: string) => {
    setWebsiteUrl(url);
    setStep(2);
  };

  const handlePreviewNext = (generatedPageJson: string) => {
    setPageJson(generatedPageJson);
    setStep(3);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step >= 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                1
              </div>
              <span className="text-sm font-medium text-gray-600 mt-2 text-center">
                홈페이지 주소 입력
              </span>
            </div>

            {/* Connector 1 */}
            <div className="flex-1 flex items-center px-4 pt-5">
              <div
                className={`flex-1 h-1 ${
                  step > 1 ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step >= 2
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                2
              </div>
              <span className="text-sm font-medium text-gray-600 mt-2 text-center">
                리뉴얼 미리보기
              </span>
            </div>

            {/* Connector 2 */}
            <div className="flex-1 flex items-center px-4 pt-5">
              <div
                className={`flex-1 h-1 ${
                  step > 2 ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step >= 3
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                3
              </div>
              <span className="text-sm font-medium text-gray-600 mt-2 text-center">
                상담 요청
              </span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 1 && <WebsiteInput onSubmit={handleWebsiteSubmit} />}
          {step === 2 && (
            <RenewalPreview
              websiteUrl={websiteUrl}
              onNext={handlePreviewNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <ConsultationForm
              websiteUrl={websiteUrl}
              pageJson={pageJson}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </main>
  );
}

