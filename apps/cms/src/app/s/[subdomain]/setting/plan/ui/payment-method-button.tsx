'use client';

import { useState } from 'react';
import { Button, Input, Badge, Checkbox } from '@redotlabs/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@repo/ui';
import { CreditCard, Trash2, CheckCircle, Shield, Plus } from 'lucide-react';
import { cn } from '@redotlabs/utils';

interface PaymentMethod {
  id: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  isDefault: boolean;
  createdAt: string;
}

const CARD_BRANDS = {
  visa: {
    name: 'Visa',
    color: 'bg-blue-500',
    icon: '💳',
  },
  mastercard: {
    name: 'Mastercard',
    color: 'bg-red-500',
    icon: '💳',
  },
  amex: {
    name: 'American Express',
    color: 'bg-green-500',
    icon: '💳',
  },
  discover: {
    name: 'Discover',
    color: 'bg-orange-500',
    icon: '💳',
  },
};

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: '1',
    brand: 'visa',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '25',
    cardholderName: '홍길동',
    isDefault: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    brand: 'mastercard',
    last4: '5678',
    expiryMonth: '06',
    expiryYear: '26',
    cardholderName: '홍길동',
    isDefault: false,
    createdAt: '2024-06-20',
  },
];

export default function PaymentMethodDialog() {
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // 새 카드 입력 상태
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);

  // 카드 번호 포맷팅 (4자리씩 공백)
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  // 만료일 포맷팅 (MM/YY)
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // 카드 브랜드 감지
  const detectCardBrand = (number: string): keyof typeof CARD_BRANDS => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    if (cleaned.startsWith('6')) return 'discover';
    return 'visa';
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    const method = paymentMethods.find((m) => m.id === id);
    if (method?.isDefault) {
      alert(
        '기본 결제 수단은 삭제할 수 없습니다. 다른 카드를 기본으로 설정한 후 삭제해주세요.'
      );
      return;
    }
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const [month, year] = expiryDate.split('/');
    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      brand: detectCardBrand(cardNumber),
      last4: cardNumber.replace(/\s/g, '').slice(-4),
      expiryMonth: month,
      expiryYear: year,
      cardholderName,
      isDefault: setAsDefault,
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (setAsDefault) {
      setPaymentMethods((prev) =>
        prev.map((method) => ({ ...method, isDefault: false })).concat(newCard)
      );
    } else {
      setPaymentMethods((prev) => [...prev, newCard]);
    }

    // 입력 초기화
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardholderName('');
    setSetAsDefault(false);
    setIsAddingNew(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlined" className="flex items-center gap-2">
          <CreditCard size={16} />
          결제 수단 관리
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard size={24} />
            결제 수단 관리
          </DialogTitle>
          <DialogDescription>
            등록된 결제 수단을 관리하고 새로운 카드를 추가할 수 있습니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 등록된 카드 목록 */}
          {paymentMethods.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3">등록된 카드</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={cn(
                      'p-4 border rounded-lg transition-colors',
                      method.isDefault
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-12 h-8 rounded flex items-center justify-center text-white text-xl',
                            CARD_BRANDS[method.brand].color
                          )}
                        >
                          {CARD_BRANDS[method.brand].icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {CARD_BRANDS[method.brand].name} ••••{' '}
                              {method.last4}
                            </p>
                            {method.isDefault && (
                              <Badge className="bg-primary-500 text-white">
                                기본
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            만료일: {method.expiryMonth}/{method.expiryYear} |{' '}
                            {method.cardholderName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <Button
                            variant="outlined"
                            size="sm"
                            onClick={() => handleSetDefault(method.id)}
                            className="flex items-center gap-1"
                          >
                            <CheckCircle size={14} />
                            기본으로 설정
                          </Button>
                        )}
                        <button
                          onClick={() => handleDelete(method.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="삭제"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 새 카드 추가 */}
          {!isAddingNew && (
            <Button
              variant="outlined"
              onClick={() => setIsAddingNew(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus size={16} />새 카드 추가
            </Button>
          )}

          {isAddingNew && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">새 카드 추가</h3>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  취소
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  카드 번호
                </label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    if (formatted.replace(/\s/g, '').length <= 16) {
                      setCardNumber(formatted);
                    }
                  }}
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    만료일
                  </label>
                  <Input
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => {
                      const formatted = formatExpiryDate(e.target.value);
                      if (formatted.replace(/\D/g, '').length <= 4) {
                        setExpiryDate(formatted);
                      }
                    }}
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <Input
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        setCvv(value);
                      }
                    }}
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  카드 소유자명
                </label>
                <Input
                  placeholder="홍길동"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={setAsDefault}
                  onChange={(e) => setSetAsDefault(e.target.checked)}
                  id="setAsDefault"
                />
                <label
                  htmlFor="setAsDefault"
                  className="text-sm cursor-pointer"
                >
                  기본 결제 수단으로 설정
                </label>
              </div>

              <Button
                variant="contained"
                onClick={handleAddCard}
                className="w-full"
              >
                카드 추가
              </Button>
            </div>
          )}

          {/* 보안 안내 */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield
              size={20}
              className="text-primary-500 flex-shrink-0 mt-0.5"
            />
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">안전한 결제 보장</p>
              <p className="text-xs">
                모든 결제 정보는 PCI DSS 표준에 따라 암호화되어 안전하게
                보호됩니다. 카드 정보는 저장되지 않으며, 보안 결제 게이트웨이를
                통해 처리됩니다.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outlined">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
