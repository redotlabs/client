import { Logo } from '@redotlabs/ui';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="px-10 lg:px-20 py-12 flex flex-col bg-primary-500 text-white">
      <div>
        <Logo className="w-24" color="mono" />
      </div>
      <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <ul className="text-sm font-semibold">
          <li>사업자등록번호: 337-66-00719 | 대표: 박도륜</li>
          <li>주소: 서울특별시 송파구 송파동 14-18, 4층</li>
          <li>연락처: team@redot.me</li>
        </ul>
        <ul className="text-sm">
          <li className="flex gap-2">
            <Link
              href="/terms"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              이용약관
            </Link>
            <span>|</span>
            <Link
              href="/privacy"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보처리방침
            </Link>
          </li>
          <li className="mt-2">
            © {new Date().getFullYear()} Redot. All rights reserved.
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
