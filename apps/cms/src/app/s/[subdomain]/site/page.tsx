'use client';

import { Button } from '@redotlabs/ui';
import {
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  Image as ImageIcon,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';
import { Card, RHFCheckbox, RHFInput, RHFTextarea } from '@repo/ui';
import { useForm, FormProvider } from 'react-hook-form';

type SiteFormData = {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  googleAnalytics: string;
  googleSearchConsole: string;
  footerCopyright: string;
  footerText: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  maintenanceMode: boolean;
  allowComments: boolean;
};

const SitePage = () => {
  const methods = useForm<SiteFormData>({
    defaultValues: {
      siteName: 'Redot CMS',
      siteDescription: '강력하고 직관적인 콘텐츠 관리 시스템',
      siteUrl: 'https://cms.redot.com',
      companyName: 'Redot Labs',
      email: 'contact@redot.com',
      phone: '02-1234-5678',
      address: '서울특별시 강남구 테헤란로 123',
      metaTitle: 'Redot CMS',
      metaDescription:
        '강력하고 직관적인 콘텐츠 관리 시스템으로 웹사이트를 쉽게 관리하세요.',
      metaKeywords: 'CMS, 콘텐츠 관리, 웹사이트',
      ogImage: '',
      googleAnalytics: '',
      googleSearchConsole: '',
      footerCopyright: '© 2025 Redot Labs. All rights reserved.',
      footerText: '',
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      maintenanceMode: false,
      allowComments: true,
    },
  });

  const { handleSubmit, watch } = methods;

  const metaTitle = watch('metaTitle');
  const metaDescription = watch('metaDescription');

  const onSubmit = (data: SiteFormData) => {
    console.log('Site settings saved', data);
    // TODO: API 호출로 설정 저장
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <main className="p-10 container mx-auto flex-1 flex flex-col gap-8">
          <section className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">사이트 관리</h1>
            <Button
              type="submit"
              variant="contained"
              className="flex items-center gap-2"
            >
              <Save size={16} />
              저장
            </Button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 사이트 기본 정보 */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">사이트 기본 정보</h2>
              <Card className="flex-1">
                <div className="space-y-6">
                  <div>
                    <RHFInput
                      name="siteName"
                      label="사이트명"
                      placeholder="사이트 이름을 입력하세요"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      브라우저 탭과 검색 결과에 표시됩니다
                    </p>
                  </div>

                  <div>
                    <RHFTextarea
                      name="siteDescription"
                      label="사이트 설명"
                      placeholder="사이트 설명을 입력하세요"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      사이트의 주요 목적과 내용을 간단히 설명해주세요
                    </p>
                  </div>

                  <div>
                    <RHFInput
                      name="siteUrl"
                      label="사이트 URL"
                      startContent={
                        <Globe size={20} className="text-gray-400" />
                      }
                      type="url"
                      placeholder="https://example.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      메인 도메인 주소를 입력하세요
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* 로고 및 파비콘 */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">로고 및 파비콘</h2>
              <Card className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-base font-bold">사이트 로고</div>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                      <ImageIcon
                        size={48}
                        className="mx-auto text-gray-400 mb-3"
                      />
                      <p className="text-sm text-gray-600 mb-2">
                        클릭하여 로고 업로드
                      </p>
                      <p className="text-xs text-gray-400">
                        권장 크기: 200x50px (PNG, SVG)
                      </p>
                      <Button
                        variant="outlined"
                        size="sm"
                        className="mt-4 flex items-center gap-2 mx-auto"
                      >
                        <Upload size={16} />
                        파일 선택
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-base font-bold">파비콘</div>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                      <ImageIcon
                        size={48}
                        className="mx-auto text-gray-400 mb-3"
                      />
                      <p className="text-sm text-gray-600 mb-2">
                        클릭하여 파비콘 업로드
                      </p>
                      <p className="text-xs text-gray-400">
                        권장 크기: 32x32px (PNG, ICO)
                      </p>
                      <Button
                        variant="outlined"
                        size="sm"
                        className="mt-4 flex items-center gap-2 mx-auto"
                      >
                        <Upload size={16} />
                        파일 선택
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 연락처 정보 */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">연락처 정보</h2>
              <Card className="flex-1">
                <div className="space-y-6">
                  <div>
                    <RHFInput
                      name="companyName"
                      label="회사명/조직명"
                      placeholder="회사명을 입력하세요"
                    />
                  </div>

                  <div>
                    <RHFInput
                      name="email"
                      label="이메일"
                      placeholder="이메일을 입력하세요"
                      type="email"
                      startContent={
                        <Mail size={20} className="text-gray-400" />
                      }
                    />
                  </div>

                  <div>
                    <RHFInput
                      name="phone"
                      label="전화번호"
                      placeholder="02-1234-5678"
                      type="tel"
                      startContent={
                        <Phone size={20} className="text-gray-400" />
                      }
                    />
                  </div>

                  <div>
                    <RHFInput
                      name="address"
                      label="주소"
                      placeholder="주소를 입력하세요"
                      startContent={
                        <MapPin size={20} className="text-gray-400" />
                      }
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* SEO 설정 */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">SEO 설정</h2>
              <Card className="flex-1">
                <div className="space-y-6">
                  <div>
                    <RHFInput
                      name="metaTitle"
                      label="메타 타이틀"
                      placeholder="메타 타이틀을 입력하세요"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {metaTitle.length}/60자 (권장: 50-60자)
                    </p>
                  </div>

                  <div>
                    <RHFTextarea
                      name="metaDescription"
                      label="메타 설명"
                      placeholder="메타 설명을 입력하세요"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {metaDescription.length}/160자 (권장: 120-160자)
                    </p>
                  </div>

                  <div>
                    <RHFInput
                      name="metaKeywords"
                      label="메타 키워드"
                      placeholder="키워드1, 키워드2, 키워드3"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      쉼표로 구분하여 입력하세요
                    </p>
                  </div>

                  <div>
                    <label htmlFor="ogImage">
                      OG 이미지 (소셜 미디어 공유)
                    </label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                      <ImageIcon
                        size={40}
                        className="mx-auto text-gray-400 mb-2"
                      />
                      <p className="text-sm text-gray-600 mb-1">
                        OG 이미지 업로드
                      </p>
                      <p className="text-xs text-gray-400 mb-3">
                        권장 크기: 1200x630px (PNG, JPG)
                      </p>
                      <Button
                        variant="outlined"
                        size="sm"
                        className="flex items-center gap-2 mx-auto"
                      >
                        <Upload size={16} />
                        파일 선택
                      </Button>
                    </div>
                  </div>

                  <div>
                    <RHFInput
                      name="googleAnalytics"
                      label="Google Analytics ID"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <RHFInput
                      name="googleSearchConsole"
                      label="Google Search Console 인증 코드"
                      placeholder="google-site-verification=..."
                    />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 소셜 미디어 */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">소셜 미디어</h2>
              <Card className="flex-1">
                <div className="space-y-6">
                  <div>
                    <RHFInput
                      name="facebook"
                      label="Facebook"
                      placeholder="https://facebook.com/yourpage"
                      startContent={
                        <Facebook size={20} className="text-gray-400" />
                      }
                    />
                  </div>

                  <div>
                    <RHFInput
                      name="twitter"
                      label="Twitter (X)"
                      placeholder="https://twitter.com/youraccount"
                      startContent={
                        <Twitter size={20} className="text-gray-400" />
                      }
                    />
                  </div>

                  <div>
                    <RHFInput
                      name="instagram"
                      label="Instagram"
                      placeholder="https://instagram.com/youraccount"
                      startContent={
                        <Instagram size={20} className="text-gray-400" />
                      }
                    />
                  </div>

                  <div>
                    <RHFInput
                      name="youtube"
                      label="YouTube"
                      placeholder="https://youtube.com/@yourchannel"
                      startContent={
                        <Youtube size={20} className="text-gray-400" />
                      }
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* 푸터 설정 */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">푸터 설정</h2>
              <Card className="flex-1">
                <div className="space-y-6">
                  <div>
                    <RHFInput
                      name="footerCopyright"
                      label="저작권 표시"
                      placeholder="© 2025 Company Name. All rights reserved."
                    />
                  </div>

                  <div>
                    <RHFTextarea
                      name="footerText"
                      label="푸터 추가 텍스트"
                      placeholder="푸터에 표시할 추가 정보를 입력하세요"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 사이트 설정 */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">사이트 설정</h2>
              <Card className="flex-1">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label>유지보수 모드</label>
                      <p className="text-sm text-gray-500 mt-1">
                        활성화 시 방문자에게 유지보수 페이지가 표시됩니다
                      </p>
                    </div>
                    <RHFCheckbox name="maintenanceMode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label>댓글 허용</label>
                      <p className="text-sm text-gray-500 mt-1">
                        게시글에 댓글 작성을 허용합니다
                      </p>
                    </div>
                    <RHFCheckbox name="allowComments" />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 하단 저장 버튼 */}
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              variant="contained"
              className="flex items-center gap-2"
            >
              <Save size={16} />
              모든 변경사항 저장
            </Button>
          </div>
        </main>
      </form>
    </FormProvider>
  );
};

export default SitePage;
