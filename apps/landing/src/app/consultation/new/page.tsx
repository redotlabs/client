'use client';

import ConsultationForm from './_ui/consultation-form';

export default function NewConsultationPage() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white p-8">
          <ConsultationForm />
        </div>
      </div>
    </main>
  );
}
