'use client';

import { Button } from '@redotlabs/ui';
import { Check, ExternalLink } from 'lucide-react';

interface PaymentSuccessModalProps {
  serviceName?: string;
  subdomain?: string;
  onClose: () => void;
}

export default function PaymentSuccessModal({
  serviceName = '내 서비스',
  subdomain = 'example',
  onClose,
}: PaymentSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        {/* 성공 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="size-20 bg-green-100 rounded-full flex items-center justify-center">
            <div className="size-16 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={40} className="text-white" />
            </div>
          </div>
        </div>

        {/* 메시지 */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          앱이 생성되었습니다!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          <strong>{serviceName}</strong> 앱이 성공적으로 생성되었습니다.
          <br />
          이제 CMS에서 콘텐츠를 관리하고 플랜을 선택하세요.
        </p>

        {/* 앱 정보 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">앱 이름</span>
              <span className="font-semibold text-gray-900">{serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">앱 URL</span>
              <span className="font-semibold text-primary-600">
                {subdomain}.redot.com
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">초기 플랜</span>
              <span className="font-semibold text-green-600">Free (무료)</span>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col gap-3">
          <a
            href={`https://${subdomain}.redotlabs.me`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="contained"
              className="w-full flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              CMS에서 관리하기
            </Button>
          </a>
          <Button variant="outlined" onClick={onClose} className="w-full">
            대시보드로 돌아가기
          </Button>
        </div>

        {/* 추가 안내 */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            결제 영수증이 등록하신 이메일로 발송되었습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
