"use client";

import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';
import { Users, User, Mail } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/api/base';

interface OrgMember {
  name: string;
  position: string;
  email: string;
  degree?: string;
  image?: string;
}

interface OrgTeam {
  key: string;
  name: string;
  icon?: string;
  description?: string;
  members: OrgMember[];
}

interface OrgStructureValue {
  leader: OrgMember;
  deputies: OrgMember[];
  teams: OrgTeam[];
}

const ORG_STRUCTURE_API_PATH = process.env.NEXT_PUBLIC_ORG_STRUCTURE_API_PATH || '/api/v1/configuration/homepage.org-structure';

const DEFAULT_ORG_STRUCTURE: OrgStructureValue = {
  leader: {
    name: '',
    position: '',
    email: '',
    image: ''
  },
  deputies: [],
  teams: []
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseJsonIfNeeded(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeMember(value: unknown): OrgMember | null {
  if (!isRecord(value)) return null;

  const name = typeof value.name === 'string' ? value.name : '';
  const position = typeof value.position === 'string' ? value.position : '';
  const email = typeof value.email === 'string' ? value.email : '';

  if (!name || !position || !email) return null;

  return {
    name,
    position,
    email,
    degree: typeof value.degree === 'string' ? value.degree : undefined,
    image: typeof value.image === 'string' ? value.image : undefined,
  };
}

function normalizeTeam(value: unknown, index: number): OrgTeam | null {
  if (!isRecord(value)) return null;

  const name = typeof value.name === 'string' ? value.name : '';
  if (!name) return null;

  const membersRaw = Array.isArray(value.members) ? value.members : [];
  const members = membersRaw
    .map(normalizeMember)
    .filter((member): member is OrgMember => member !== null);

  return {
    key: typeof value.key === 'string' ? value.key : `team-${index}`,
    name,
    icon: typeof value.icon === 'string' ? value.icon : '',
    description: typeof value.description === 'string' ? value.description : '',
    members,
  };
}

function normalizeOrgStructure(value: unknown): OrgStructureValue | null {
  const parsed = parseJsonIfNeeded(value);
  if (!isRecord(parsed)) return null;

  const leader = normalizeMember(parsed.leader);
  if (!leader) return null;

  const deputiesRaw = Array.isArray(parsed.deputies) ? parsed.deputies : [];
  const teamsRaw = Array.isArray(parsed.teams) ? parsed.teams : [];

  const deputies = deputiesRaw
    .map(normalizeMember)
    .filter((member): member is OrgMember => member !== null);

  const teams = teamsRaw
    .map(normalizeTeam)
    .filter((team): team is OrgTeam => team !== null);

  return {
    leader,
    deputies,
    teams,
  };
}

function extractApiValue(data: unknown): unknown {
  const parsed = parseJsonIfNeeded(data);
  if (!isRecord(parsed)) return parsed;

  // New API format: { data: { values: { ... } } } or { values: { ... } }
  if ('values' in parsed) {
    return parseJsonIfNeeded(parsed.values);
  }

  if ('data' in parsed && isRecord(parsed.data) && 'values' in parsed.data) {
    return parseJsonIfNeeded(parsed.data.values);
  }

  // Backward compatibility with previous kv format.
  if ('value' in parsed) {
    return parseJsonIfNeeded(parsed.value);
  }

  return parsed;
}

/**
 * Component to display member avatar with image support and fallback
 */
function MemberAvatar({ 
  image, 
  name, 
  sizeClass, 
  iconSizeClass, 
  iconColorClass,
  fallbackBgClass = "bg-white"
}: { 
  image?: string; 
  name: string; 
  sizeClass: string; 
  iconSizeClass: string; 
  iconColorClass: string;
  fallbackBgClass?: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (image && !imgError) {
    return (
      <div className={`${sizeClass} ${fallbackBgClass} rounded-full overflow-hidden mb-4 shadow-lg flex items-center justify-center border-2 border-white`}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClass} ${fallbackBgClass} rounded-full flex items-center justify-center mb-4 shadow-md overflow-hidden`}>
      <User className={`${iconSizeClass} ${iconColorClass}`} />
    </div>
  );
}

export default function CoCauToChucPage() {
  const [orgStructure, setOrgStructure] = useState<OrgStructureValue>(DEFAULT_ORG_STRUCTURE);
  const [isLoadingOrg, setIsLoadingOrg] = useState(true);
  const [orgError, setOrgError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadOrgStructure = async () => {
      setIsLoadingOrg(true);
      setOrgError(null);

      const response = await fetchWithTimeout<unknown>(ORG_STRUCTURE_API_PATH, { method: 'GET' });

      if (cancelled) return;

      if (!response.success) {
        setOrgStructure(DEFAULT_ORG_STRUCTURE);
        setOrgError('Không tải được dữ liệu cơ cấu tổ chức từ API. Đang hiển thị dữ liệu mặc định.');
        setIsLoadingOrg(false);
        return;
      }

      const normalized = normalizeOrgStructure(extractApiValue(response.data));
      if (!normalized) {
        setOrgStructure(DEFAULT_ORG_STRUCTURE);
        setOrgError('Dữ liệu cơ cấu tổ chức từ API không đúng định dạng. Đang hiển thị dữ liệu mặc định.');
        setIsLoadingOrg(false);
        return;
      }

      setOrgStructure(normalized);
      setIsLoadingOrg(false);
    };

    loadOrgStructure();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Trang chủ
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/gioi-thieu" className="text-gray-600 hover:text-green-600 transition-colors">
                Giới thiệu
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-green-600 font-medium">Cơ cấu tổ chức</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        {/* <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link 
                href="/gioi-thieu"
                className="inline-flex items-center gap-2 text-green-100 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
              </Link>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Cơ cấu tổ chức
              </h1>
              <p className="text-lg md:text-xl text-green-50">
                Sơ đồ tổ chức và ban lãnh đạo Trung tâm Tin học và Kỹ năng mềm
              </p>
            </div>
          </div>
        </section> */}

        {/* Ban lãnh đạo */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {isLoadingOrg && (
                <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  Đang tải dữ liệu cơ cấu tổ chức...
                </div>
              )}

              {orgError && (
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {orgError}
                </div>
              )}

              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Sơ đồ tổ chức
                </h2>
              </div>

              {/* Level 1: Giám đốc */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-8 shadow-2xl w-full max-w-[340px] border-2 border-yellow-400">
                  <div className="flex flex-col items-center">
                    <MemberAvatar 
                      image={orgStructure.leader.image}
                      name={orgStructure.leader.name}
                      sizeClass="w-32 h-32"
                      iconSizeClass="w-16 h-16"
                      iconColorClass="text-green-600"
                      fallbackBgClass="bg-white"
                    />
                    <h3 className="text-xl font-bold mb-1 text-center">
                      {orgStructure.leader.name}
                    </h3>
                    <p className="text-green-100 font-semibold mb-4 text-lg">
                      {orgStructure.leader.position}
                    </p>
                    <div className="w-full bg-white/10 rounded-xl p-4">
                      <a href={`mailto:${orgStructure.leader.email}`} className="flex items-center justify-center gap-2 text-white/90 hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                        <span className="text-sm">{orgStructure.leader.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection line Level 1 -> 2 */}
              <div className="flex justify-center mb-4">
                <div className="w-0.5 h-12 bg-gray-300"></div>
              </div>

              {/* Level 2: Phó Giám đốc */}
              <div className="relative mb-8">
                {/* Horizontal line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-gray-300"></div>

                <div className="grid md:grid-cols-2 gap-8 pt-8">
                  {orgStructure.deputies.map((pgd, index) => (
                    <div key={index} className="relative">
                      {/* Vertical line to parent */}
                      <div className="absolute left-1/2 -top-8 w-0.5 h-8 bg-gray-300 -translate-x-1/2"></div>

                      <div className="bg-green-500 text-white rounded-2xl p-6 shadow-xl">
                        <div className="flex flex-col items-center">
                          <MemberAvatar 
                            image={pgd.image}
                            name={pgd.name}
                            sizeClass="w-24 h-24"
                            iconSizeClass="w-12 h-12"
                            iconColorClass="text-green-500"
                            fallbackBgClass="bg-white"
                          />
                          <h3 className="text-lg font-bold mb-1 text-center">
                            {pgd.name}
                          </h3>
                          <p className="text-green-100 font-semibold mb-3">
                            {pgd.position}
                          </p>
                          <div className="w-full bg-white/20 rounded-lg p-3">
                            <a href={`mailto:${pgd.email}`} className="flex items-center justify-center gap-2 text-white/90 hover:text-white transition-colors">
                              <Mail className="w-4 h-4" />
                              <span className="text-sm">{pgd.email}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection lines Level 2 -> 3 (mỗi Phó Giám đốc nối xuống tổ tương ứng) */}
              <div className="md:hidden flex justify-center mb-6">
                <div className="w-0.5 h-10 bg-gray-300"></div>
              </div>
              <div className="hidden md:grid md:grid-cols-2 gap-8 mb-6">
                {orgStructure.teams.map((team, index) => (
                  <div key={`deputy-team-line-${team.key}-${index}`} className="flex justify-center">
                    <div className="w-0.5 h-10 bg-gray-300"></div>
                  </div>
                ))}
              </div>

              {/* Level 3 + 4: Hai khối ngang nhau, mỗi khối gồm tổ và danh sách nhân sự */}
              <div className="grid md:grid-cols-2 gap-8 mb-8 items-start">
                {orgStructure.teams.map((team) => (
                  <section key={`team-block-${team.key}`} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-6 text-center shadow-lg">
                      <div className="text-4xl mb-2">{team.icon || ''}</div>
                      <h3 className="text-xl font-bold text-green-800 mb-1">
                        {team.name}
                      </h3>
                      <p className="text-sm text-green-600">{team.description || ''}</p>
                    </div>

                    <div className="mt-5 mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                      <h4 className="text-base font-bold text-gray-900">Danh sách nhân sự</h4>
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        {team.members.length} nhân sự
                      </span>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                      {team.members.map((cv, cvIndex) => (
                        <div
                          key={cvIndex}
                          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-400 transition-all group"
                        >
                          <div className="flex flex-col items-center">
                            <MemberAvatar 
                              image={cv.image}
                              name={cv.name}
                              sizeClass="w-14 h-14"
                              iconSizeClass="w-7 h-7"
                              iconColorClass="text-gray-600"
                              fallbackBgClass="bg-gradient-to-br from-gray-100 to-gray-200"
                            />
                            <span className="text-[10px] text-green-600 font-semibold leading-none mb-1">{cv.degree || ''}</span>
                            <h5 className="font-bold text-gray-900 text-center text-xs leading-5 min-h-[40px]">
                              {cv.name}
                            </h5>
                            <p className="text-[10px] text-gray-600 mb-2">{cv.position}</p>

                            <a
                              href={`mailto:${cv.email}`}
                              className="w-full flex items-start justify-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] text-gray-600 hover:text-green-600 hover:border-green-300 transition-colors"
                              title={cv.email}
                            >
                              <Mail className="w-3 h-3 mt-[2px] flex-shrink-0" />
                              <span className="block break-all leading-4 text-center">{cv.email}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>


            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-green-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tìm hiểu thêm về VISC
              </h2>
              <p className="text-lg md:text-xl text-green-50 mb-8">
                Khám phá chức năng và nhiệm vụ của Trung tâm
              </p>
              <Link
                href="/gioi-thieu/chuc-nang-nhiem-vu"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
              >
                Xem chức năng, nhiệm vụ
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
