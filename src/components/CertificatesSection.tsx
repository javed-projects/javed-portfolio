import React from 'react';
import FadeIn from './FadeIn';
import { HoverExpand_002 } from '@/components/v1/skiper53';
import ScrollFadeElement from './ScrollFadeElement';

const CERTIFICATE_DATA = [
  {
    code: "IBM Intro",
    title: "Introduction to Data Analytics",
    alt: "IBM - Introduction to Data Analytics",
    issuer: "IBM (via Coursera)",
    verifyUrl: "https://coursera.org/verify/LUNBCUWSRVBZ",
    date: "Jan 1, 2026",
    recipient: "Md Javed",
    signatures: [
      { name: "Rav Ahuja", title: "Global Program Director, Skills Network" }
    ],
    platform: "coursera",
    partner: "IBM",
    src: "/certificates/Screenshot 2026-07-25 190543.png"
  },
  {
    code: "IBM Excel",
    title: "Excel Basics for Data Analysis",
    alt: "IBM - Excel Basics for Data Analysis",
    issuer: "IBM (via Coursera)",
    verifyUrl: "https://coursera.org/verify/4L2LRFFQ6HCK",
    date: "May 20, 2026",
    recipient: "Md Javed",
    signatures: [
      { name: "Sandip Saha Joy", title: "Data Scientist, IBM" },
      { name: "Steve Ryan", title: "Learning Consultant, SkillUp" }
    ],
    platform: "coursera",
    partner: "IBM",
    src: "/certificates/Screenshot 2026-07-25 192223.png"
  },
  {
    code: "IBM SQL",
    title: "Databases & SQL for Data Science",
    alt: "IBM - Databases and SQL for Data Science with Python",
    issuer: "IBM (via Coursera)",
    verifyUrl: "https://coursera.org/verify/VBZTAWYMBD6M",
    date: "Jun 21, 2026",
    recipient: "Md Javed",
    signatures: [
      { name: "Rav Ahuja", title: "Global Program Director, Skills Network" },
      { name: "Hima Vasudevan", title: "IBM" }
    ],
    platform: "coursera",
    partner: "IBM",
    src: "/certificates/Screenshot 2026-07-25 190457.png"
  },
  {
    code: "IBM GenAI",
    title: "Generative AI: Career Enhancement",
    alt: "IBM - Generative AI: Enhance your Data Analytics Career",
    issuer: "IBM (via Coursera)",
    verifyUrl: "https://coursera.org/verify/E5NANG02W8KB",
    date: "Jul 9, 2026",
    recipient: "Md Javed",
    signatures: [
      { name: "Dr. Pooja", title: "IBM" },
      { name: "Abhishek Gagneja", title: "IBM" },
      { name: "Rav Ahuja", title: "Global Program Director, Skills Network" }
    ],
    platform: "coursera",
    partner: "IBM",
    src: "/certificates/Screenshot 2026-07-25 190515.png"
  },
  {
    code: "IBM Cognos",
    title: "Data Visualization & Dashboards",
    alt: "IBM - Data Visualization and Dashboards with Excel and Cognos",
    issuer: "IBM (via Coursera)",
    verifyUrl: "https://coursera.org/verify/L4LCE0V6XVVX",
    date: "May 21, 2026",
    recipient: "Md Javed",
    signatures: [
      { name: "Kevin McFaul", title: "IBM" },
      { name: "Sandip Saha Joy", title: "Data Scientist, IBM" },
      { name: "Stephen Ryan", title: "Learning Consultant, SkillUp" }
    ],
    platform: "coursera",
    partner: "IBM",
    src: "/certificates/Screenshot 2026-07-25 190437.png"
  },
  {
    code: "SAP S4 HANA",
    title: "SAP FICO (S4 HANA)",
    alt: "UNIT ERP Academy - SAP FICO (S4 HANA)",
    issuer: "UNIT ERP Academy",
    verifyUrl: "",
    date: "June 2025",
    recipient: "Md. Javed",
    signatures: [
      { name: "Supriya Bira", title: "Director, UNIT ERP Academy" }
    ],
    platform: "ldit",
    src: "/certificates/1753609130428.png"
  },
  {
    code: "SAP ECC",
    title: "SAP FICO (ECC)",
    alt: "UNIT ERP Academy - SAP FICO (ECC)",
    issuer: "UNIT ERP Academy",
    verifyUrl: "",
    date: "March 2025",
    recipient: "Md. Javed",
    signatures: [
      { name: "Supriya Bira", title: "Director, UNIT ERP Academy" }
    ],
    platform: "ldit",
    src: "/certificates/1753609160573.png"
  },
  {
    code: "ADFAP",
    title: "Advanced Diploma in Finance & Accounting Program",
    alt: "Tally Academy - Advanced Diploma in Finance & Accounting Program",
    issuer: "Tally Academy",
    verifyUrl: "",
    date: "31 Mar 2025",
    recipient: "MD JAVED",
    signatures: [
      {
        name: "Tally Academy",
        title: "Institute of Learning"
      }
    ],
    platform: "tally",
    src: "/certificates/advanced-diploma-finance-accounting.png"
  },
  {
    code: "Skill India",
    title: "AI - Data Engineering Analyst",
    alt: "Skill India - AI - Data Engineering Analyst",
    issuer: "Skill India & NASSCOM",
    verifyUrl: "https://www.skillindiadigital.gov.in/",
    date: "Jul 08, 2026",
    duration: "1 Hours",
    recipient: "Md Javed",
    signatures: [
      { name: "Sindhu Gangadharan", title: "Chairperson, IT-ITeS SSC NASSCOM" }
    ],
    platform: "skillindia",
    src: "/certificates/Screenshot 2026-07-25 190417.png"
  },
  {
    code: "SL Excel BI",
    title: "Business Intelligence using Excel Basics",
    alt: "Simplilearn - Business Intelligence using Excel Basics Tutorial",
    issuer: "Simplilearn SkillUP",
    verifyUrl: "https://www.simplilearn.com/",
    credentialId: "8549584",
    date: "30th June 2025",
    recipient: "MD JAVED",
    signatures: [
      { name: "Krishna Kumar", title: "CEO, Simplilearn" }
    ],
    platform: "simplilearn",
    src: "/certificates/Screenshot 2026-07-25 192312.png"
  },
  {
    code: "SL GenAI",
    title: "Project Planning using Generative AI",
    alt: "Simplilearn - Project Planning using Generative AI",
    issuer: "Simplilearn SkillUP",
    verifyUrl: "https://www.simplilearn.com/",
    credentialId: "8554246",
    date: "1st July 2025",
    recipient: "MD JAVED",
    signatures: [
      { name: "Krishna Kumar", title: "CEO, Simplilearn" }
    ],
    platform: "simplilearn",
    src: "/certificates/Screenshot 2026-07-25 192257.png"
  }
];

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="relative flex flex-col items-center justify-center bg-transparent px-4 sm:px-8 md:px-12 py-24 sm:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#B600A8]/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] bg-[#0F62FE]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl w-full z-10 flex flex-col items-center">
        <div className="text-center mb-12 sm:mb-16 w-full">
          <FadeIn delay={0} y={30} as="div" className="w-full">
            <ScrollFadeElement className="hero-heading font-black uppercase leading-[1.1] tracking-normal text-[clamp(2.5rem,8vw,120px)] text-white py-1 drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              Certificates
            </ScrollFadeElement>
          </FadeIn>
        </div>

        <div className="w-full flex justify-center">
          <FadeIn delay={0.15} y={20} as="div" className="w-full flex justify-center">
            <HoverExpand_002 images={CERTIFICATE_DATA} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}