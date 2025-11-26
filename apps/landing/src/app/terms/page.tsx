import React from 'react';

const TermsPage = () => {
  return (
    <main className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">이용약관</h1>
      
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 1 조 (목적)</h2>
          <p className="leading-relaxed">
            본 약관은 Redot(이하 "회사")가 제공하는 웹사이트 제작 및 관련 서비스(이하 "서비스")의 이용과 관련하여 
            회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 2 조 (정의)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. "서비스"란 회사가 제공하는 웹사이트 제작, 호스팅, 유지보수 및 관련된 모든 서비스를 의미합니다.
            </p>
            <p className="leading-relaxed">
              2. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 의미합니다.
            </p>
            <p className="leading-relaxed">
              3. "회원"이란 회사와 서비스 이용계약을 체결하고 이용자 아이디를 부여받은 자를 의미합니다.
            </p>
            <p className="leading-relaxed">
              4. "비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 3 조 (약관의 게시와 개정)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
            </p>
            <p className="leading-relaxed">
              2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
            </p>
            <p className="leading-relaxed">
              3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 
              서비스 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 4 조 (서비스의 제공 및 변경)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회사는 다음과 같은 서비스를 제공합니다:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>웹사이트 제작 서비스</li>
              <li>웹사이트 호스팅 서비스</li>
              <li>웹사이트 유지보수 및 관리 서비스</li>
              <li>기타 회사가 정하는 서비스</li>
            </ul>
            <p className="leading-relaxed">
              2. 회사는 상당한 이유가 있는 경우 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 5 조 (서비스의 중단)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우 
              서비스의 제공을 일시적으로 중단할 수 있습니다.
            </p>
            <p className="leading-relaxed">
              2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 
              입은 손해에 대하여 배상합니다. 단, 회사에 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 6 조 (회원가입)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 
              회원가입을 신청합니다.
            </p>
            <p className="leading-relaxed">
              2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 
              회원으로 등록합니다:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
              <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
              <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 7 조 (회원 탈퇴 및 자격 상실)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다.
            </p>
            <p className="leading-relaxed">
              2. 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>가입 신청 시에 허위 내용을 등록한 경우</li>
              <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
              <li>서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 8 조 (회원에 대한 통지)</h2>
          <p className="leading-relaxed">
            1. 회사가 회원에 대한 통지를 하는 경우 본 약관에 별도 규정이 없는 한 회원이 제공한 전자우편 주소로 
            할 수 있습니다.
          </p>
          <p className="leading-relaxed">
            2. 회사는 불특정다수 회원에 대한 통지의 경우 1주일 이상 서비스 게시판에 게시함으로써 개별 통지에 
            갈음할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 9 조 (개인정보보호)</h2>
          <p className="leading-relaxed">
            회사는 이용자의 개인정보를 보호하기 위하여 관련 법령이 정하는 바를 준수하며, 
            개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 10 조 (회사의 의무)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회사는 관련 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 
              본 약관이 정하는 바에 따라 지속적이고 안정적으로 서비스를 제공하기 위해 노력합니다.
            </p>
            <p className="leading-relaxed">
              2. 회사는 이용자가 안전하게 서비스를 이용할 수 있도록 이용자의 개인정보 보호를 위한 
              보안 시스템을 갖추어야 합니다.
            </p>
            <p className="leading-relaxed">
              3. 회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 인정할 경우 
              이를 처리하여야 합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 11 조 (회원의 의무)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회원은 다음 행위를 하여서는 안 됩니다:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>신청 또는 변경 시 허위 내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
              <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 12 조 (저작권의 귀속 및 이용제한)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.
            </p>
            <p className="leading-relaxed">
              2. 이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 
              회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 
              제3자에게 이용하게 하여서는 안 됩니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 13 조 (분쟁해결)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 
              피해보상처리기구를 설치·운영합니다.
            </p>
            <p className="leading-relaxed">
              2. 회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 
              다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">제 14 조 (재판권 및 준거법)</h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              1. 회사와 이용자 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용합니다.
            </p>
            <p className="leading-relaxed">
              2. 회사와 이용자 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.
            </p>
          </div>
        </section>

        <section className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">
            <strong>부칙</strong>
            <br />
            본 약관은 2025년 1월 1일부터 시행됩니다.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsPage;

