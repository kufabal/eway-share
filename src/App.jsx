import React, { useState } from 'react';

import { User, Lock, CheckCircle, Navigation, Loader2, Shield, MapPin, Users } from 'lucide-react';



export default function App() {

  const [screen, setScreen] = useState('login'); // login, signup, home, matching

  

  // 사용자 정보 (회원가입 시 입력한 정보 저장)

  const [userInfo, setUserInfo] = useState({ 

    role: '', 

    email: '', 

    revealIdentity: false // 신분 노출 여부 기본값

  });

  

  const [destination, setDestination] = useState('');

  const [isMatching, setIsMatching] = useState(false);

  

  // 화면 전환 함수들

  const goHome = () => setScreen('home');

  const goSignup = () => setScreen('signup');

  const goLogin = () => setScreen('login');

  const startMatching = () => {

    if (destination) {

      setScreen('matching');

      setIsMatching(true);

      // 5초 후 매칭 완료

      setTimeout(() => setIsMatching(false), 5000);

    }

  };



  // --- 1. 로그인 페이지 ---

  if (screen === 'login') {

    return (

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-6">

        <div className="w-full max-w-md">

          <div className="mb-10 text-center">

            <div className="mx-auto w-48 h-48 mb-4 flex items-center justify-center">

              <img 

                src="/logo.png" 

                alt="이화여자대학교 로고" 

                className="w-48 h-48 object-contain"

              />

            </div>

            <h1 className="text-xl font-bold text-green-800">EWAY SHARE</h1>

            <p className="text-gray-500 mt-2 text-sm">이화인을 위한 안심 택시 쉐어링</p>

          </div>

          

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">

            <div className="relative">

              <User className="absolute left-4 top-4 text-gray-400" size={20} />

              <input 

                type="text" 

                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 outline-none" 

                placeholder="이화인 아이디" 

              />

            </div>

            

            <div className="relative">

              <Lock className="absolute left-4 top-4 text-gray-400" size={20} />

              <input 

                type="password" 

                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 outline-none" 

                placeholder="비밀번호" 

              />

            </div>

            

            <button 

              onClick={goHome}

              className="w-full bg-green-800 text-white py-4 rounded-xl font-semibold hover:bg-green-900 transition-colors shadow-md"

            >

              로그인

            </button>

            

            <div className="text-center pt-4">

              <button 

                onClick={goSignup}

                className="text-green-800 font-medium hover:underline"

              >

                회원가입하기

              </button>

            </div>

          </div>

          

          <div className="mt-6 flex items-center justify-center text-gray-500 text-sm">

            <Shield size={16} className="mr-2" />

            <span>이화여대 인증으로 안전하게 보호됩니다</span>

          </div>

        </div>

      </div>

    );

  }



  // --- 2. 회원가입 페이지 ---

  if (screen === 'signup') {

    return (

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-6">

        <div className="w-full max-w-md">

          <div className="mb-8 text-center">

            <h1 className="text-3xl font-bold text-green-800">회원가입</h1>

            <p className="text-gray-500 mt-2">이화인 인증을 완료해주세요</p>

          </div>

          

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-5">

            {/* 신분 선택 */}

            <div>

              <div className="grid grid-cols-2 gap-3">

                <button

                  onClick={() => setUserInfo({...userInfo, role: '학부생'})}

                  className={`p-4 rounded-xl border-2 font-medium transition-all ${

                    userInfo.role === '학부생' 

                      ? 'border-green-800 bg-green-50 text-green-800' 

                      : 'border-gray-300 text-gray-600 hover:border-green-800'

                  }`}

                >

                  학부생

                </button>

                <button

                  onClick={() => setUserInfo({...userInfo, role: '대학원생'})}

                  className={`p-4 rounded-xl border-2 font-medium transition-all ${

                    userInfo.role === '대학원생' 

                      ? 'border-green-800 bg-green-50 text-green-800' 

                      : 'border-gray-300 text-gray-600 hover:border-green-800'

                  }`}

                >

                  대학원생

                </button>

                <button

                  onClick={() => setUserInfo({...userInfo, role: '교직원'})}

                  className={`p-4 rounded-xl border-2 font-medium transition-all ${

                    userInfo.role === '교직원' 

                      ? 'border-green-800 bg-green-50 text-green-800' 

                      : 'border-gray-300 text-gray-600 hover:border-green-800'

                  }`}

                >

                  교직원

                </button>

                <button

                  onClick={() => setUserInfo({...userInfo, role: '교수'})}

                  className={`p-4 rounded-xl border-2 font-medium transition-all ${

                    userInfo.role === '교수' 

                      ? 'border-green-800 bg-green-50 text-green-800' 

                      : 'border-gray-300 text-gray-600 hover:border-green-800'

                  }`}

                >

                  교수

                </button>

              </div>

            </div>



            {/* 이메일 입력 */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">이화메일 인증</label>

              <input

                type="email"

                value={userInfo.email}

                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}

                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 outline-none"

                placeholder="example@ewhain.net"

              />

              <button className="w-full mt-2 py-3 border-2 border-green-800 text-green-800 rounded-xl font-medium hover:bg-green-50 transition-colors">

                인증 메일 발송

              </button>

            </div>



            {/* 신분 노출 설정 */}

            <div className="bg-green-50 rounded-xl p-4">

              <label className="flex items-start cursor-pointer">

                <input

                  type="checkbox"

                  checked={userInfo.revealIdentity}

                  onChange={(e) => setUserInfo({...userInfo, revealIdentity: e.target.checked})}

                  className="w-5 h-5 mt-0.5 mr-3 accent-green-800 cursor-pointer"

                />

                <div className="flex-1">

                  <p className="text-sm font-semibold text-gray-800 mb-1">

                    신분 노출 설정

                  </p>

                  <p className="text-xs text-gray-600">

                    매칭 시 상대방에게 내 신분(학부생/대학원생)을 공개합니다

                  </p>

                </div>

              </label>

            </div>



            {/* 비밀번호 */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호</label>

              <input

                type="password"

                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 outline-none mb-2"

                placeholder="비밀번호"

              />

              <input

                type="password"

                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 outline-none"

                placeholder="비밀번호 확인"

              />

            </div>



            <button 

              onClick={goHome}

              className="w-full bg-green-800 text-white py-4 rounded-xl font-semibold hover:bg-green-900 transition-colors shadow-md"

            >

              가입 완료

            </button>



            <div className="text-center pt-2">

              <button 

                onClick={goLogin}

                className="text-gray-600 text-sm hover:underline"

              >

                이미 계정이 있으신가요?

              </button>

            </div>

          </div>

        </div>

      </div>

    );

  }



  // --- 3. 홈 페이지 (목적지 입력) ---

  if (screen === 'home') {

    return (

      <div className="flex flex-col h-screen bg-white">

        {/* 헤더 */}

        <div className="bg-green-800 text-white p-6 rounded-b-3xl shadow-lg">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold">EWAY SHARE</h2>

              <p className="text-green-100 text-sm mt-1">안전한 이화인 전용 택시</p>

            </div>

            <div className="bg-white/20 rounded-full p-3">

              <User size={24} />

            </div>

          </div>

          

          {/* 사용자 정보 카드 */}

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-green-100 text-sm">내 신분</p>

                <p className="text-xl font-semibold">{userInfo.role || '학부생'}</p>

              </div>

              <div className="text-right">

                <p className="text-green-100 text-sm">신분 노출</p>

                <p className="text-xl font-semibold">{userInfo.revealIdentity ? 'ON' : 'OFF'}</p>

              </div>

            </div>

          </div>

        </div>



        {/* 메인 컨텐츠 */}

        <div className="flex-1 p-6 space-y-6">

          {/* 현재 위치 */}

          <div className="bg-gray-50 rounded-2xl p-4">

            <div className="flex items-center text-gray-600 mb-2">

              <MapPin size={18} className="mr-2" />

              <span className="text-sm font-medium">출발지</span>

            </div>

            <p className="text-lg font-semibold text-gray-800 ml-7">이화여자대학교 정문</p>

          </div>



          {/* 신분 노출 설정 */}

          <div className="bg-green-50 rounded-2xl p-4">

            <label className="flex items-center cursor-pointer">

              <input

                type="checkbox"

                checked={userInfo.revealIdentity}

                onChange={(e) => setUserInfo({...userInfo, revealIdentity: e.target.checked})}

                className="w-5 h-5 mr-3 accent-green-800 cursor-pointer"

              />

              <div>

                <p className="text-sm font-semibold text-gray-800">신분 노출</p>

                <p className="text-xs text-gray-600">매칭 시 상대방에게 내 신분을 공개합니다</p>

              </div>

            </label>

          </div>



          {/* 목적지 입력 */}

          <div className="bg-white border-2 border-green-800 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center text-green-800 mb-3">

              <Navigation size={18} className="mr-2" />

              <span className="text-sm font-medium">목적지</span>

            </div>

            <input

              type="text"

              value={destination}

              onChange={(e) => setDestination(e.target.value)}

              className="w-full text-lg font-medium outline-none ml-7 placeholder-gray-400"

              placeholder="어디로 갈까요?"

            />

          </div>



          {/* 안내 정보 */}

          <div className="bg-green-50 rounded-2xl p-4 space-y-3">

            <div className="flex items-start">

              <CheckCircle size={20} className="text-green-800 mr-3 flex-shrink-0 mt-0.5" />

              <div>

                <p className="font-medium text-gray-800">이화여대 인증 완료</p>

                <p className="text-sm text-gray-600">안전한 이화인들과만 매칭됩니다</p>

              </div>

            </div>

            

            <div className="flex items-start">

              <Shield size={20} className="text-green-800 mr-3 flex-shrink-0 mt-0.5" />

              <div>

                <p className="font-medium text-gray-800">실시간 위치 확인</p>

                <p className="text-sm text-gray-600">GPS 기반으로 같은 구역 사용자와 매칭</p>

              </div>

            </div>

            

            <div className="flex items-start">

              <Users size={20} className="text-green-800 mr-3 flex-shrink-0 mt-0.5" />

              <div>

                <p className="font-medium text-gray-800">최대 4인 매칭</p>

                <p className="text-sm text-gray-600">같은 방향 이용자들과 함께 이동</p>

              </div>

            </div>

          </div>

        </div>



        {/* 매칭 시작 버튼 */}

        <div className="p-6 bg-white border-t">

          <button

            onClick={startMatching}

            disabled={!destination}

            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${

              destination 

                ? 'bg-green-800 text-white hover:bg-green-900 active:scale-95' 

                : 'bg-gray-300 text-gray-500 cursor-not-allowed'

            }`}

          >

            {destination ? '매칭 시작하기' : '목적지를 입력해주세요'}

          </button>

        </div>

      </div>

    );

  }



  // --- 4. 매칭 페이지 ---

  if (screen === 'matching') {

    return (

      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-50 to-white p-6">

        <div className="w-full max-w-md">

          {isMatching ? (

            // 매칭 중

            <div className="text-center space-y-6">

              <div className="relative w-32 h-32 mx-auto">

                <div className="absolute inset-0 bg-green-800 rounded-full animate-ping opacity-20"></div>

                <div className="relative bg-green-800 rounded-full w-32 h-32 flex items-center justify-center">

                  <Loader2 className="text-white animate-spin" size={48} />

                </div>

              </div>

              

              <div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">매칭 중입니다</h2>

                <p className="text-gray-600">

                  <span className="font-semibold text-green-800">{destination}</span> 방향으로<br />

                  가는 이화인을 찾고 있어요

                </p>

              </div>



              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">

                <div className="flex items-center justify-between py-2">

                  <span className="text-gray-600">출발지</span>

                  <span className="font-semibold text-gray-800">이화여대 정문</span>

                </div>

                <div className="border-t border-gray-200"></div>

                <div className="flex items-center justify-between py-2">

                  <span className="text-gray-600">목적지</span>

                  <span className="font-semibold text-green-800">{destination}</span>

                </div>

                <div className="border-t border-gray-200"></div>

                <div className="flex items-center justify-between py-2">

                  <span className="text-gray-600">예상 시간</span>

                  <span className="font-semibold text-gray-800">약 15분</span>

                </div>

              </div>



              <button

                onClick={goHome}

                className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"

              >

                매칭 취소

              </button>

            </div>

          ) : (

            // 매칭 완료

            <div className="space-y-6">

              <div className="text-center">

                <div className="mx-auto w-20 h-20 bg-green-800 rounded-full flex items-center justify-center mb-4">

                  <CheckCircle className="text-white" size={40} />

                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">매칭 완료!</h2>

                <p className="text-gray-600">함께 이동할 이화인을 찾았어요</p>

              </div>



              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">

                <div className="flex items-center justify-between pb-4 border-b border-gray-200">

                  <div className="flex items-center">

                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">

                      <User className="text-green-800" size={24} />

                    </div>

                    <div>

                      <p className="font-semibold text-gray-800">박교수</p>

                      <p className="text-sm text-gray-500">교수</p>

                    </div>

                  </div>

                  <div className="text-right">

                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">

                      같은 방향

                    </span>

                  </div>

                </div>



                <div className="bg-green-50 rounded-xl p-4">

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-sm text-gray-600">총 인원</span>

                    <span className="font-semibold text-gray-800">2명</span>

                  </div>

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-sm text-gray-600">예상 요금</span>

                    <span className="font-semibold text-gray-800">12,000원</span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-gray-600">1인당 요금</span>

                    <span className="font-bold text-green-800 text-lg">6,000원</span>

                  </div>

                </div>

              </div>



              <button

                onClick={goHome}

                className="w-full bg-green-800 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-green-900 transition-colors"

              >

                택시 호출하기

              </button>



              <button

                onClick={goHome}

                className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"

              >

                취소하기

              </button>

            </div>

          )}

        </div>

      </div>

    );

  }



  return null;

}

