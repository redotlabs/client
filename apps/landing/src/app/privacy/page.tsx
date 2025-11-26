import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@redotlabs/ui';
import React from 'react';

const PrivacyPage = () => {
  return (
    <main className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">개인정보처리방침</h1>

      <div className="space-y-8 text-gray-700">
        <section>
          <p className="leading-relaxed mb-4">
            Redot(이하 &quot;회사&quot;)는 이용자의 개인정보를 중요시하며,
            &quot;개인정보 보호법&quot;, &quot;정보통신망 이용촉진 및 정보보호
            등에 관한 법률&quot; 등 관련 법령을 준수하고 있습니다.
          </p>
          <p className="leading-relaxed">
            회사는 개인정보처리방침을 통하여 이용자께서 제공하시는 개인정보가
            어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한
            조치가 취해지고 있는지 알려드립니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            1. 수집하는 개인정보의 항목 및 수집방법
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                가. 수집하는 개인정보의 항목
              </h3>
              <div className="space-y-3 ml-4">
                <div>
                  <p className="font-medium">① 회원가입 시</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>필수항목: 이메일, 비밀번호, 이름, 연락처</li>
                    <li>선택항목: 회사명, 부서, 직책</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">
                    ② 서비스 이용 과정에서 자동 수집되는 정보
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>
                      IP 주소, 쿠키, 서비스 이용 기록, 방문 기록, 불량 이용 기록
                    </li>
                    <li>기기정보(OS, 화면사이즈, 기기 식별값)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">③ 결제 시</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>신용카드 결제 시: 카드사명, 카드번호 등</li>
                    <li>계좌이체 시: 은행명, 계좌번호 등</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                나. 개인정보 수집방법
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>홈페이지, 서면양식, 팩스, 전화, 상담 게시판, 이메일</li>
                <li>협력회사로부터의 제공</li>
                <li>생성정보 수집 툴을 통한 수집</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            2. 개인정보의 수집 및 이용목적
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다:
            </p>
            <div className="space-y-3 ml-4">
              <div>
                <p className="font-medium">
                  가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른
                  요금정산
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 요금결제·정산
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium">나. 회원 관리</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의
                    부정 이용 방지와 비인가 사용 방지
                  </li>
                  <li>
                    가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항
                    전달
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium">다. 마케팅 및 광고에 활용</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보
                    제공 및 참여기회 제공
                  </li>
                  <li>
                    인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속 빈도
                    파악
                  </li>
                  <li>회원의 서비스 이용에 대한 통계</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            3. 개인정보의 보유 및 이용기간
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당
              정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의
              이유로 명시한 기간 동안 보존합니다:
            </p>
            <div className="space-y-3 ml-4">
              <div>
                <p className="font-medium">
                  가. 회사 내부 방침에 의한 정보보유 사유
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    부정이용기록: 보존 이유 - 부정 이용 방지 / 보존 기간 - 1년
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium">나. 관련법령에 의한 정보보유 사유</p>
                <p className="text-sm mt-2">
                  상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의
                  규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한
                  일정한 기간 동안 회원정보를 보관합니다:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의
                    소비자보호에 관한 법률)
                  </li>
                  <li>
                    대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래
                    등에서의 소비자보호에 관한 법률)
                  </li>
                  <li>
                    소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래
                    등에서의 소비자보호에 관한 법률)
                  </li>
                  <li>
                    표시·광고에 관한 기록: 6개월 (전자상거래 등에서의
                    소비자보호에 관한 법률)
                  </li>
                  <li>웹사이트 방문기록: 3개월 (통신비밀보호법)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            4. 개인정보의 파기절차 및 방법
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당
              정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다:
            </p>
            <div className="space-y-3 ml-4">
              <div>
                <p className="font-medium">가. 파기절차</p>
                <p className="mt-2">
                  회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후
                  별도의 DB로 옮겨져 (종이의 경우 별도의 서류함) 내부 방침 및
                  기타 관련 법령에 의한 정보보호 사유에 따라 (보유 및 이용기간
                  참조) 일정 기간 저장된 후 파기됩니다.
                </p>
              </div>
              <div>
                <p className="font-medium">나. 파기방법</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는
                    기술적 방법을 사용하여 삭제합니다.
                  </li>
                  <li>
                    종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여
                    파기합니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            5. 개인정보 제공
          </h2>
          <p className="leading-relaxed">
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 아래의 경우에는 예외로 합니다:
          </p>
          <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
            <li>이용자들이 사전에 동의한 경우</li>
            <li>
              법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
              방법에 따라 수사기관의 요구가 있는 경우
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            6. 개인정보의 처리위탁
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              회사는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고
              있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수
              있도록 필요한 사항을 규정하고 있습니다:
            </p>
            <div className="mt-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead align="left">수탁업체</TableHead>
                    <TableHead align="left">위탁업무 내용</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>AWS</TableCell>
                    <TableCell>클라우드 서비스 제공</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PG사</TableCell>
                    <TableCell>결제 처리</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            7. 이용자 및 법정대리인의 권리와 그 행사방법
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만
              14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를
              요청할 수도 있습니다.
            </p>
            <p className="leading-relaxed">
              이용자 혹은 만 14세 미만 아동의 개인정보 조회·수정을 위해서는
              &apos;개인정보변경&apos;(또는 &apos;회원정보수정&apos; 등)을,
              가입해지(동의철회)를 위해서는 &quot;회원탈퇴&quot;를 클릭하여 본인
              확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
            </p>
            <p className="leading-relaxed">
              혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면
              지체없이 조치하겠습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            8. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              회사는 이용자의 정보를 수시로 저장하고 찾아내는
              &apos;쿠키(cookie)&apos; 등을 운용합니다. 쿠키란 회사의 웹사이트를
              운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은
              텍스트 파일로서 이용자의 컴퓨터 하드디스크에 저장됩니다.
            </p>
            <div className="space-y-2 ml-4">
              <div>
                <p className="font-medium">가. 쿠키 등 사용 목적</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    이용자의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과
                    관심분야를 파악 및 자취 추적
                  </li>
                  <li>
                    각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟
                    마케팅 및 개인 맞춤 서비스 제공
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium">나. 쿠키 설정 거부 방법</p>
                <p className="mt-2">
                  이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서,
                  이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를
                  허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든
                  쿠키의 저장을 거부할 수도 있습니다.
                </p>
                <p className="mt-2 text-sm">
                  설정방법 예: 웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt;
                  개인정보에서 변경 가능
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  ※ 단, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부
                  서비스는 이용에 어려움이 있을 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            9. 개인정보의 기술적·관리적 보호 대책
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              회사는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실, 도난,
              유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은
              기술적/관리적 대책을 강구하고 있습니다:
            </p>
            <div className="space-y-3 ml-4">
              <div>
                <p className="font-medium">가. 비밀번호 암호화</p>
                <p className="mt-2">
                  회원 아이디(ID)의 비밀번호는 암호화되어 저장 및 관리되고 있어
                  본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를
                  알고 있는 본인에 의해서만 가능합니다.
                </p>
              </div>
              <div>
                <p className="font-medium">나. 해킹 등에 대비한 대책</p>
                <p className="mt-2">
                  회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가
                  유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.
                  개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신
                  백신프로그램을 이용하여 이용자들의 개인정보나 자료가
                  유출되거나 손상되지 않도록 방지하고 있습니다.
                </p>
              </div>
              <div>
                <p className="font-medium">
                  다. 개인정보 취급 직원의 최소화 및 교육
                </p>
                <p className="mt-2">
                  회사의 개인정보관련 취급 직원은 담당자에 한정시키고 있고 이를
                  위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며,
                  담당자에 대한 수시 교육을 통하여 개인정보처리방침의 준수를
                  항상 강조하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            10. 개인정보관리책임자 및 담당자의 연락처
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호
              관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수
              있습니다. 회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을
              드릴 것입니다.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="font-medium mb-2">개인정보관리책임자</p>
              <ul className="space-y-1 text-sm">
                <li>이름: 박도륜</li>
                <li>소속: Redot</li>
                <li>이메일: team@redot.me</li>
              </ul>
            </div>
            <p className="leading-relaxed mt-4">
              기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래
              기관에 문의하시기 바랍니다:
            </p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2 text-sm">
              <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
              <li>개인정보분쟁조정위원회 (www.kopico.go.kr / 1833-6972)</li>
              <li>대검찰청 사이버범죄수사단 (www.spo.go.kr / 국번없이 1301)</li>
              <li>
                경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182)
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            11. 고지의 의무
          </h2>
          <p className="leading-relaxed">
            현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소
            7일전부터 홈페이지의 &apos;공지사항&apos;을 통해 고지할 것입니다.
            다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의
            중요한 변경이 있을 경우에는 최소 30일 전에 고지합니다.
          </p>
        </section>

        <section className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">
            <strong>부칙</strong>
            <br />본 방침은 2025년 1월 1일부터 시행됩니다.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPage;
