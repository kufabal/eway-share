import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { CheckCircle, Users, DollarSign, Leaf, History, Star, Bell, Shield, Home, List, User, Plus, Search, MapPin, User as UserIcon, MessageSquare, Send, ThumbsUp, ThumbsDown, Gamepad2 } from 'lucide-react';
import logoImage from './assets/logo.png';

// 더미 데이터
const mockRides = [
  {
    id: 'ride_1',
    pickupZone: '정문',
    destinationZone: '서울역',
    participants: 1,
    maxParticipants: 2,
    estimatedCost: 6000,
    departureTime: 'now',
    isQuiet: true,
    femaleOnly: false,
    isBlindMode: true, // 아이디 비공개
    participantInfo: [] // 비공개
  },
  {
    id: 'ride_2',
    pickupZone: '후문',
    destinationZone: '당산역',
    participants: 2,
    maxParticipants: 3,
    estimatedCost: 4000,
    departureTime: 'now',
    isQuiet: false,
    femaleOnly: true,
    isBlindMode: true, // 아이디 비공개
    participantInfo: [] // 비공개
  },
  {
    id: 'ride_3',
    pickupZone: 'ECC 앞',
    destinationZone: '을지로입구역',
    participants: 2,
    maxParticipants: 3,
    estimatedCost: 4500,
    departureTime: '22:00',
    isQuiet: false,
    femaleOnly: false,
    isBlindMode: false, // 공개
    participantInfo: [
      { role: 'professor', nickname: '목동언니', emoji: '👩‍🏫' },
      { role: 'student', nickname: '치키차카', emoji: '🐱' }
    ]
  },
];

// 로그인 화면
function LoginScreen({ onLogin, onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container">
      <div style={{ marginBottom: '20px' }}>
        <img 
          src={logoImage} 
          alt="이화여자대학교 로고" 
          style={{ 
            width: '150px', 
            height: '150px', 
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%'
          }}
        />
      </div>
      <div className="login-title">EWAY SHARE</div>
      <div className="login-subtitle">안전한 이화 택시 쉐어링</div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            className="form-input"
            placeholder="이화 이메일 (student@ewha.ac.kr)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          로그인
        </button>
        <button 
          type="button" 
          onClick={onSignup}
          style={{ 
            marginTop: '12px', 
            background: 'transparent',
            border: 'none',
            color: '#2E7D32',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '8px',
            width: '100%'
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

// 회원가입 화면
function SignupScreen({ onBack, onSignupComplete }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState('');
  const [isBlindMode, setIsBlindMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
    
    if (password.length < 6) {
      alert('비밀번호는 6자 이상이어야 합니다');
      return;
    }
    
    if (!nickname) {
      alert('닉네임을 입력해주세요');
      return;
    }
    
    if (!role) {
      alert('신분을 선택해주세요');
      return;
    }
    
    alert('회원가입이 완료되었습니다!');
    onSignupComplete({ nickname, email, role, isBlindMode, profileImage });
  };

  return (
    <div className="login-container">
      <div style={{ marginBottom: '24px' }}>
        <img 
          src={logoImage} 
          alt="이화여자대학교 로고" 
          style={{ 
            width: '200px', 
            height: '200px', 
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto'
          }}
        />
      </div>
      <div className="login-title">회원가입</div>
      <div className="login-subtitle">이화인 인증을 완료해주세요</div>
      <form className="login-form" onSubmit={handleSignup}>
        <div className="form-group">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <button
              type="button"
              onClick={() => setRole('student')}
              style={{ 
                padding: '12px', 
                fontSize: '14px',
                border: '2px solid #2E7D32',
                borderRadius: '12px',
                background: role === 'student' ? '#2E7D32' : 'transparent',
                color: role === 'student' ? 'white' : '#2E7D32',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              학부생
            </button>
            <button
              type="button"
              onClick={() => setRole('graduate')}
              style={{ 
                padding: '12px', 
                fontSize: '14px',
                border: '2px solid #2E7D32',
                borderRadius: '12px',
                background: role === 'graduate' ? '#2E7D32' : 'transparent',
                color: role === 'graduate' ? 'white' : '#2E7D32',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              대학원생
            </button>
            <button
              type="button"
              onClick={() => setRole('professor')}
              style={{ 
                padding: '12px', 
                fontSize: '14px',
                border: '2px solid #2E7D32',
                borderRadius: '12px',
                background: role === 'professor' ? '#2E7D32' : 'transparent',
                color: role === 'professor' ? 'white' : '#2E7D32',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              교수
            </button>
            <button
              type="button"
              onClick={() => setRole('staff')}
              style={{ 
                padding: '12px', 
                fontSize: '14px',
                border: '2px solid #2E7D32',
                borderRadius: '12px',
                background: role === 'staff' ? '#2E7D32' : 'transparent',
                color: role === 'staff' ? 'white' : '#2E7D32',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              교직원
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">프로필 이미지</label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div 
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                border: '2px dashed #2E7D32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: profileImage ? `url(${profileImage}) center/cover` : '#f5f5f5',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => document.getElementById('profile-upload').click()}
            >
              {!profileImage && <span style={{ fontSize: '48px' }}>📷</span>}
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfileImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('profile-upload').click()}
              style={{
                padding: '8px 16px',
                background: '#2E7D32',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              이미지 선택
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">닉네임</label>
          <input
            type="text"
            className="form-input"
            placeholder="벗123"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">이화 이메일</label>
          <input
            type="email"
            className="form-input"
            placeholder="student@ewha.ac.kr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            type="button" 
            className="submit-button secondary"
            style={{ marginTop: '8px', background: '#1976D2', fontSize: '14px', padding: '12px' }}
          >
            인증 메일 발송
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">비밀번호</label>
          <input
            type="password"
            className="form-input"
            placeholder="비밀번호 (6자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">비밀번호 확인</label>
          <input
            type="password"
            className="form-input"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <div className="checkbox-item" style={{ marginBottom: '20px' }}>
          <input
            type="checkbox"
            checked={isBlindMode}
            onChange={(e) => setIsBlindMode(e.target.checked)}
          />
          <span>신분 노출 거부 (블라인드 모드)</span>
        </div>

        <button type="submit" className="submit-button">
          가입 완료
        </button>
        <button 
          type="button" 
          className="submit-button secondary"
          onClick={onBack}
          style={{ marginTop: '12px', background: '#f5f5f5', color: '#333' }}
        >
          돌아가기
        </button>
      </form>
    </div>
  );
}

// 홈 화면
function HomeScreen({ onNavigate, userInfo }) {
  return (
    <>
      <div className="user-card">
        <div 
          className="avatar"
          style={{
            background: userInfo?.profileImage ? `url(${userInfo.profileImage}) center/cover` : undefined,
            fontSize: userInfo?.profileImage ? undefined : '32px'
          }}
        >
          {!userInfo?.profileImage && (userInfo?.emoji || '🐷')}
        </div>
        <div className="user-info">
          <h2>{userInfo?.nickname || '벗123'}</h2>
          <div className="manner-temp" style={{ color: '#2E7D32' }}>
            🌱 에코점수 {userInfo?.ecoScore || 0}점
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-button" onClick={() => onNavigate('create')}>
          <Plus size={48} style={{ marginBottom: '8px' }} />
          팟 만들기
        </button>
        <button 
          className="action-button" 
          onClick={() => onNavigate('list')}
          style={{ background: '#666', color: 'white' }}
        >
          <Search size={48} style={{ marginBottom: '8px' }} />
          팟 찾기
        </button>
      </div>

      <div className="section-title">지금 출발해요</div>
      <div className="card" onClick={() => onNavigate('list')}>
        <div className="card-header">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#2E7D32" />
            서울역
          </div>
        </div>
        <div className="card-subtitle">지금 1개 팟 대기중</div>
      </div>
      <div className="card" onClick={() => onNavigate('list')}>
        <div className="card-header">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#2E7D32" />
            당산역
          </div>
        </div>
        <div className="card-subtitle">지금 1개 팟 대기중</div>
      </div>
      <div className="card" onClick={() => onNavigate('list')}>
        <div className="card-header">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#2E7D32" />
            을지로입구역
          </div>
        </div>
        <div className="card-subtitle">지금 1개 팟 대기중</div>
      </div>

      <div className="section-title">최근 이용 내역</div>
      <div className="card" style={{ background: '#F5F5F5' }}>
        <div className="card-header">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#2E7D32" />
            신촌역
          </div>
          <div className="ride-cost">₩4,200</div>
        </div>
        <div className="card-subtitle">2024.03.15 14:30</div>
      </div>
    </>
  );
}

// 팟 만들기 화면
function CreateRideScreen({ onBack, onStartMatching, userInfo, onUpdateUserInfo }) {
  const [pickupZone, setPickupZone] = useState('');
  const [destinationZone, setDestinationZone] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(2);
  const [isQuiet, setIsQuiet] = useState(false);
  const [femaleOnly, setFemaleOnly] = useState(false);
  const [isHonorTaxi, setIsHonorTaxi] = useState(false);
  const [useCoupon, setUseCoupon] = useState(false);
  const [useEcoScore, setUseEcoScore] = useState(false);
  const [ecoScoreDiscount, setEcoScoreDiscount] = useState(0);
  const [favorites, setFavorites] = useState(['서울시 마포구 신촌로 123', '서울시 마포구 홍익로 123']);
  const [showFavorites, setShowFavorites] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  // 할인권 로드
  useEffect(() => {
    const savedCoupons = JSON.parse(localStorage.getItem("user_coupons") || "[]");
    const validCoupons = savedCoupons.filter(coupon => {
      return new Date(coupon.expiryDate) > new Date();
    });
    setAvailableCoupons(validCoupons);
  }, []);

  const baseCost = Math.floor(12000 / maxParticipants);
  const couponDiscount = useCoupon && maxParticipants === 2 && availableCoupons.length > 0 
    ? 1000 
    : 0;
  
  // 에코점수 할인 (1점 = 100원, 최대 사용 가능한 점수만큼)
  const ecoScore = userInfo?.ecoScore || 0;
  const canUseEcoScore = ecoScore >= 50;
  const maxEcoDiscount = Math.floor(ecoScore * 100); // 1점 = 100원
  const requestedEcoDiscount = ecoScoreDiscount * 100; // 사용자가 요청한 할인 금액
  const ecoDiscountAmount = useEcoScore && canUseEcoScore 
    ? Math.min(requestedEcoDiscount, maxEcoDiscount, baseCost) // 최대 사용 가능한 만큼
    : 0;
  // 실제 사용된 점수 (할인 금액 / 100, 소수점 올림)
  const actualEcoScoreUsed = useEcoScore && ecoDiscountAmount > 0 
    ? Math.ceil(ecoDiscountAmount / 100)
    : 0;
  
  const totalDiscount = couponDiscount + ecoDiscountAmount;
  const estimatedCost = Math.max(0, baseCost - totalDiscount);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupZone || !destinationZone) {
      alert('출발지와 목적지를 선택해주세요');
      return;
    }
    
    // 에코점수 사용 시 차감 (실제 할인된 금액에 맞게 차감)
    if (useEcoScore && actualEcoScoreUsed > 0 && onUpdateUserInfo) {
      const currentScore = userInfo?.ecoScore || 0;
      const newScore = Math.max(0, currentScore - actualEcoScoreUsed);
      onUpdateUserInfo({ ...userInfo, ecoScore: newScore });
      if (actualEcoScoreUsed > 0) {
        alert(`에코점수 ${actualEcoScoreUsed}점이 사용되었습니다. (${ecoDiscountAmount.toLocaleString()}원 할인) 🌱`);
      }
    }
    
    // 즐겨찾기에 추가 (중복 체크)
    if (!favorites.includes(destinationZone)) {
      setFavorites([...favorites, destinationZone]);
    }
    // 매칭 화면으로 이동
    onStartMatching({ pickupZone, destinationZone, maxParticipants, isQuiet, femaleOnly, isHonorTaxi });
  };

  const handleFavoriteClick = (fav) => {
    setDestinationZone(fav);
    setShowFavorites(false);
  };

  const handleAddFavorite = () => {
    if (destinationZone && !favorites.includes(destinationZone)) {
      setFavorites([...favorites, destinationZone]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">출발 위치</label>
          <select
            className="form-select"
            value={pickupZone}
            onChange={(e) => setPickupZone(e.target.value)}
            required
          >
            <option value="">픽업존 선택</option>
            <option value="정문">정문</option>
            <option value="후문">후문</option>
            <option value="신세계관 앞">신세계관 앞</option>
            <option value="ECC 앞">ECC 앞</option>
            <option value="학생문화관 앞">학생문화관 앞</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">목적지 주소</label>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="목적지 주소를 입력하세요 (예: 서울시 마포구 신촌로 123)"
                value={destinationZone}
                onChange={(e) => setDestinationZone(e.target.value)}
                onFocus={() => setShowFavorites(true)}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowFavorites(!showFavorites)}
                style={{
                  padding: '12px 16px',
                  background: '#2E7D32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Star size={20} fill="white" color="white" />
              </button>
            </div>
            {showFavorites && favorites.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 10,
                maxHeight: '200px',
                overflowY: 'auto',
                marginTop: '4px'
              }}>
                {favorites.map((fav, index) => (
                  <div
                    key={index}
                    onClick={() => handleFavoriteClick(fav)}
                    style={{
                      padding: '12px',
                      cursor: 'pointer',
                      borderBottom: index < favorites.length - 1 ? '1px solid #eee' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    <span>{fav}</span>
                    <Star size={16} fill="#FFD700" color="#FFD700" />
                  </div>
                ))}
              </div>
            )}
            {destinationZone && !favorites.includes(destinationZone) && (
              <button
                type="button"
                onClick={handleAddFavorite}
                style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  background: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#666'
                }}
              >
                <Star size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> 즐겨찾기에 추가
              </button>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">최대 인원</label>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '12px', alignItems: 'center' }}>
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setMaxParticipants(num)}
                style={{
                  padding: '12px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px'
                }}
              >
                <UserIcon 
                  size={32} 
                  color={num <= maxParticipants ? '#2E7D32' : '#ddd'}
                  fill={num <= maxParticipants ? '#2E7D32' : 'transparent'}
                  style={{
                    transition: 'all 0.2s',
                    transform: num <= maxParticipants ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
              </button>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '14px', color: '#666' }}>
            {maxParticipants}명 선택됨
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">팟 옵션</label>
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={isQuiet}
                onChange={(e) => setIsQuiet(e.target.checked)}
              />
              <span>조용히 가기 (대화 없이 조용히 이동)</span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={femaleOnly}
                onChange={(e) => setFemaleOnly(e.target.checked)}
              />
              <span>여학생만 (여학생만 참여 가능)</span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={isHonorTaxi}
                onChange={(e) => setIsHonorTaxi(e.target.checked)}
              />
              <span>명예의 택시 (이화인이 추천하는 베스트 택시)</span>
            </label>
          </div>
        </div>

        {/* 할인권 사용 옵션 (2인 쉐어일 때만) */}
        {maxParticipants === 2 && availableCoupons.length > 0 && (
          <div className="form-group">
            <label className="checkbox-item" style={{
              background: '#FFF9E6',
              border: '2px solid #FFD700',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <input
                type="checkbox"
                checked={useCoupon}
                onChange={(e) => setUseCoupon(e.target.checked)}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  🎫 할인권 사용
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  1,000원 할인 적용 (2인 쉐어 전용)
                </div>
              </div>
            </label>
          </div>
        )}

        {/* 에코점수 할인 옵션 (50점 이상일 때만) */}
        {canUseEcoScore && (
          <div className="form-group">
            <label className="checkbox-item" style={{
              background: '#E8F5E9',
              border: '2px solid #4CAF50',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <input
                type="checkbox"
                checked={useEcoScore}
                onChange={(e) => {
                  setUseEcoScore(e.target.checked);
                  if (!e.target.checked) {
                    setEcoScoreDiscount(0);
                  }
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  🌱 에코점수 할인 사용
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  보유 에코점수: {ecoScore}점 (1점 = 100원)
                </div>
                {useEcoScore && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <input
                        type="number"
                        min="1"
                        max={ecoScore}
                        value={ecoScoreDiscount || ''}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          setEcoScoreDiscount(Math.min(Math.max(0, value), ecoScore));
                        }}
                        placeholder="사용할 점수"
                        style={{
                          width: '80px',
                          padding: '6px',
                          border: '1px solid #4CAF50',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        점 사용
                      </span>
                    </div>
                    {ecoScoreDiscount > 0 && (
                      <div style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 'bold', marginTop: '4px' }}>
                        예상 할인: {(Math.min(ecoScoreDiscount * 100, baseCost)).toLocaleString()}원
                      </div>
                    )}
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                      최대 사용 가능: {ecoScore}점 ({Math.min(maxEcoDiscount, baseCost).toLocaleString()}원)
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>
        )}

        <div className="cost-estimate">
          <div className="cost-label">예상 1인당 비용</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            {(useCoupon || useEcoScore) && totalDiscount > 0 && (
              <div style={{ fontSize: '14px', color: '#d32f2f', textDecoration: 'line-through' }}>
                ₩{baseCost}
              </div>
            )}
            <div className="cost-value">₩{estimatedCost}</div>
            {totalDiscount > 0 && (
              <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 'bold' }}>
                할인: -₩{totalDiscount.toLocaleString()}
                {useCoupon && couponDiscount > 0 && (
                  <span style={{ fontSize: '11px', color: '#666', marginLeft: '4px' }}>
                    (할인권: -₩{couponDiscount.toLocaleString()})
                  </span>
                )}
                {useEcoScore && ecoDiscountAmount > 0 && (
                  <span style={{ fontSize: '11px', color: '#666', marginLeft: '4px' }}>
                    (에코점수: -₩{ecoDiscountAmount.toLocaleString()})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="submit-button">
          팟 만들기
        </button>
      </form>
    </>
  );
}

// 팟 목록 화면
function RideListScreen({ onStartMatching }) {
  const [selectedRide, setSelectedRide] = useState(null);

  const handleApprove = (ride) => {
    // 승인 버튼 클릭 시 바로 매칭 완료 상태로 전달
    onStartMatching({
      pickupZone: ride.pickupZone,
      destinationZone: ride.destinationZone,
      maxParticipants: ride.maxParticipants,
      isQuiet: ride.isQuiet,
      femaleOnly: ride.femaleOnly,
      skipMatching: true, // 매칭 중 화면 건너뛰기 플래그
      existingRide: ride // 기존 팟 정보 전달
    });
    setSelectedRide(null);
  };

  return (
    <>
      <div className="section-title">모집 중인 팟 ({mockRides.length})</div>
      
      {mockRides.map((ride) => (
        <div
          key={ride.id}
          className="ride-card"
          onClick={() => {
            // 정문-서울역 팟은 바로 매칭 완료로 이동
            if (ride.pickupZone === '정문' && ride.destinationZone === '서울역') {
              onStartMatching({
                pickupZone: ride.pickupZone,
                destinationZone: ride.destinationZone,
                maxParticipants: ride.maxParticipants,
                isQuiet: ride.isQuiet,
                femaleOnly: ride.femaleOnly,
                skipMatching: true, // 매칭 중 화면 건너뛰기
                existingRide: ride // 기존 팟 정보 전달
              });
            } else {
              // 다른 팟은 모달 표시
              setSelectedRide(ride);
            }
          }}
        >
          <div className="ride-route">
            <div className="ride-location">
              📍 {ride.pickupZone}
            </div>
            <span className="ride-arrow">→</span>
            <div className="ride-location">
              🚩 {ride.destinationZone}
            </div>
          </div>
          <div className="ride-info">
            <div style={{ color: '#2E7D32', fontWeight: 'bold' }}>
              {ride.departureTime === 'now' ? '🚀 지금 출발' : `⏰ ${ride.departureTime} 출발 예약`}
            </div>
          </div>
          <div className="ride-info">
            <div className="ride-participants">
              👥 {ride.participants}/{ride.maxParticipants}명
            </div>
            <div className="ride-cost">₩{ride.estimatedCost}</div>
          </div>
          {/* 참여자 정보 표시 */}
          {!ride.isBlindMode && ride.participantInfo && ride.participantInfo.length > 0 && (
            <div style={{ 
              marginTop: '12px', 
              padding: '12px', 
              background: '#f5f5f5', 
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#666' }}>참여자:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ride.participantInfo.map((participant, idx) => (
                  <span 
                    key={idx}
                    style={{
                      padding: '4px 12px',
                      background: '#2E7D32',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{participant.emoji || '👤'}</span>
                    <span>{participant.role === 'professor' ? '교수' : participant.role === 'student' ? '학부생' : participant.role} {participant.nickname}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          {ride.isBlindMode && (
            <div style={{ 
              marginTop: '12px', 
              padding: '8px 12px', 
              background: '#fff3cd', 
              borderRadius: '8px',
              fontSize: '12px',
              color: '#856404',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              🔒 아이디 비공개
            </div>
          )}
          {(ride.isQuiet || ride.femaleOnly || ride.isHonorTaxi) && (
            <div className="ride-tags">
              {ride.isQuiet && <span className="tag quiet">조용히 가기</span>}
              {ride.femaleOnly && <span className="tag female">여학생만</span>}
              {ride.isHonorTaxi && <span className="tag" style={{ background: '#FFD700', color: '#000' }}>⭐ 명예의 택시</span>}
            </div>
          )}
        </div>
      ))}

      {selectedRide && (
        <div className="modal-overlay" onClick={() => setSelectedRide(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">팟 상세 정보</div>
            <div className="modal-content">
              <p><strong>출발:</strong> {selectedRide.pickupZone}</p>
              <p><strong>도착:</strong> {selectedRide.destinationZone}</p>
              <p><strong>출발 시간:</strong> {selectedRide.departureTime === 'now' ? '지금 출발' : `${selectedRide.departureTime} 출발 예약`}</p>
              <p><strong>현재 인원:</strong> {selectedRide.participants}/{selectedRide.maxParticipants}명</p>
              <p><strong>예상 비용:</strong> ₩{selectedRide.estimatedCost}</p>
              {selectedRide.isBlindMode ? (
                <p style={{ color: '#856404', background: '#fff3cd', padding: '8px', borderRadius: '8px', marginTop: '12px' }}>
                  🔒 아이디 비공개
                </p>
              ) : selectedRide.participantInfo && selectedRide.participantInfo.length > 0 && (
                <div style={{ marginTop: '12px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>참여자:</p>
                  {selectedRide.participantInfo.map((participant, idx) => (
                    <p key={idx} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{participant.emoji || '👤'}</span>
                      <span>{participant.role === 'professor' ? '교수' : participant.role === 'student' ? '학부생' : participant.role} {participant.nickname}</span>
                    </p>
                  ))}
                </div>
              )}
              {selectedRide.isQuiet && <p>✅ 조용히 가기</p>}
              {selectedRide.femaleOnly && <p>✅ 여학생만</p>}
            </div>
            <div className="modal-buttons">
              <button
                className="modal-button secondary"
                onClick={() => setSelectedRide(null)}
              >
                취소
              </button>
              <button
                className="modal-button primary"
                onClick={() => handleApprove(selectedRide)}
              >
                승인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 후기 게시판 화면
function CommunityScreen({ userInfo, onUpdateUserInfo }) {
  const [activeTab, setActiveTab] = useState('share'); // 'share' or 'taxi'
  
  const [sharePosts, setSharePosts] = useState([
    { 
      id: 1, 
      author: '귀여운 돼지', 
      emoji: '🐷',
      content: '오늘 택시 쉐어링 너무 좋았어요! 함께 탄 분들이 모두 친절하셨고, 비용도 절약할 수 있어서 만족합니다 😊', 
      time: '2시간 전',
      likes: 5,
      type: 'share',
      ecoScore: 8
    },
    { 
      id: 2, 
      author: '목동언니', 
      emoji: '👩‍🏫',
      content: '조용히 가기 옵션 덕분에 편하게 이동했어요. 다음에도 이용할게요!', 
      time: '5시간 전',
      likes: 3,
      type: 'share',
      ecoScore: 51
    },
    { 
      id: 3, 
      author: '치키차카', 
      emoji: '🐱',
      content: '매너 온도 시스템이 있어서 더 안전하게 느껴져요. 이화인들만 모여서 신뢰가 가네요!', 
      time: '1일 전',
      likes: 8,
      type: 'share',
      ecoScore: 90
    }
  ]);

  const [taxiPosts, setTaxiPosts] = useState([
    { 
      id: 101, 
      author: '귀여운 돼지', 
      emoji: '🐷',
      content: '명예의 택시 기사님 정말 친절하셨어요! 안전 운전도 최고고요 👍', 
      time: '3시간 전',
      likes: 12,
      type: 'taxi',
      ecoScore: 8
    },
    { 
      id: 102, 
      author: '치키차카', 
      emoji: '🐱',
      content: '오늘 택시가 깨끗하고 편안했어요. 다음에도 같은 기사님 차를 타고 싶네요!', 
      time: '6시간 전',
      likes: 7,
      type: 'taxi',
      ecoScore: 90
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showWriteForm, setShowWriteForm] = useState(false);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: activeTab === 'share' ? sharePosts.length + 1 : taxiPosts.length + 101,
        author: userInfo?.nickname || '귀여운 돼지',
        emoji: userInfo?.emoji || '🐷',
        content: newPost,
        time: '방금 전',
        likes: 0,
        type: activeTab,
        ecoScore: userInfo?.ecoScore || 0
      };
      
      if (activeTab === 'share') {
        setSharePosts([post, ...sharePosts]);
      } else {
        setTaxiPosts([post, ...taxiPosts]);
      }
      
      setNewPost('');
      setShowWriteForm(false);
      
      // 후기 작성 시 에코점수 상승 (1점씩)
      if (onUpdateUserInfo) {
        const currentScore = userInfo?.ecoScore || 0;
        const newScore = currentScore + 1; // 1점씩 증가 (최대 제한 없음)
        onUpdateUserInfo({ ...userInfo, ecoScore: newScore });
        alert(`후기를 작성했습니다! 에코점수가 ${newScore}점으로 상승했습니다! 🌱`);
      }
    }
  };

  const currentPosts = activeTab === 'share' ? sharePosts : taxiPosts;

  return (
    <>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="section-title">후기 게시판</div>
        <button
          onClick={() => setShowWriteForm(!showWriteForm)}
          style={{
            padding: '8px 16px',
            background: '#2E7D32',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Plus size={16} />
          글쓰기
        </button>
      </div>

      {/* 탭 메뉴 */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '16px',
        borderBottom: '2px solid #eee'
      }}>
        <button
          onClick={() => {
            setActiveTab('share');
            setShowWriteForm(false);
          }}
          style={{
            flex: 1,
            padding: '12px',
            background: activeTab === 'share' ? '#2E7D32' : 'transparent',
            color: activeTab === 'share' ? 'white' : '#666',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderBottom: activeTab === 'share' ? '3px solid #2E7D32' : 'none'
          }}
        >
          쉐어 후기
        </button>
        <button
          onClick={() => {
            setActiveTab('taxi');
            setShowWriteForm(false);
          }}
          style={{
            flex: 1,
            padding: '12px',
            background: activeTab === 'taxi' ? '#2E7D32' : 'transparent',
            color: activeTab === 'taxi' ? 'white' : '#666',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderBottom: activeTab === 'taxi' ? '3px solid #2E7D32' : 'none'
          }}
        >
          탑승한 택시 후기
        </button>
      </div>

      {showWriteForm && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={activeTab === 'share' ? "쉐어 후기를 작성해주세요..." : "탑승한 택시 후기를 작성해주세요..."}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical',
              outline: 'none',
              marginBottom: '12px'
            }}
          />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setShowWriteForm(false);
                setNewPost('');
              }}
              style={{
                padding: '8px 16px',
                background: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              취소
            </button>
            <button
              onClick={handlePostSubmit}
              disabled={!newPost.trim()}
              style={{
                padding: '8px 16px',
                background: newPost.trim() ? '#2E7D32' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: newPost.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Send size={16} />
              등록
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {currentPosts.map((post) => {
          // 에코점수에 따른 테두리 색상 결정
          const ecoScore = post.ecoScore || 0;
          let borderColor = 'transparent';
          let borderWidth = '0px';
          
          if (ecoScore >= 90) {
            borderColor = '#FFC107'; // 노란색
            borderWidth = '3px';
          } else if (ecoScore > 50) {
            borderColor = '#C8E6C9'; // 아주 연한 연두색
            borderWidth = '3px';
          } else if (ecoScore <= 10) {
            borderColor = 'transparent'; // 테두리 없음
            borderWidth = '0px';
          }
          
          return (
            <div
              key={post.id}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#9E9E9E',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  border: `${borderWidth} solid ${borderColor}`
                }}>
                  {post.emoji || post.author[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                    {post.author}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {post.time}
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#333',
                marginBottom: '12px',
                whiteSpace: 'pre-wrap'
              }}>
                {post.content}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #eee'
              }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    color: '#666',
                    fontSize: '14px'
                  }}
                >
                  <span>👍</span>
                  <span>{post.likes}</span>
                </button>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    color: '#666',
                    fontSize: '14px'
                  }}
                >
                  <MessageSquare size={16} />
                  <span>댓글</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// 게임 화면 - Stop The Light
function GameScreen({ onBack }) {
  const [light, setLight] = useState("red"); // red → yellow → green
  const [gameState, setGameState] = useState("waiting"); // waiting, playing, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [couponEarned, setCouponEarned] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [lightPositions, setLightPositions] = useState({ red: 0, yellow: 1, green: 2 }); // 각 색상의 위치 (0: 위, 1: 중간, 2: 아래)
  const [hitFeedback, setHitFeedback] = useState(null); // 'success' or 'fail'
  const [hitAnimation, setHitAnimation] = useState(false); // 애니메이션 트리거
  const gameStartTime = useRef(null);
  const gameIntervalRef = useRef(null);
  const colorChangeTimeoutRef = useRef(null);
  const nextColorChangeTime = useRef(0);
  const audioContextRef = useRef(null);
  const backgroundOscillatorsRef = useRef([]); // 배경음악용 오실레이터들
  const backgroundGainNodeRef = useRef(null); // 배경음악 볼륨 조절
  const backgroundMusicIntervalRef = useRef(null); // 배경음악 반복 재생용

  // 색상 변경 속도 계산 (경과 시간에 따라) - 15초에 맞춰 느리게 조정
  const getColorChangeInterval = (elapsedSeconds) => {
    if (elapsedSeconds <= 5) {
      return 2000; // 0~5초: 느리게 (2초)
    } else if (elapsedSeconds <= 10) {
      return 1200; // 5~10초: 중간 속도 (1.2초)
    } else if (elapsedSeconds <= 13) {
      return 800; // 10~13초: 빠르게 (0.8초)
    } else {
      return 600; // 13~15초: 매우 빠르게 (0.6초)
    }
  };

  // AudioContext 초기화 (동기)
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // AudioContext 활성화 (비동기, 사용자 상호작용 후 호출) - iOS 호환성 개선
  const resumeAudioContext = async () => {
    try {
      const audioContext = audioContextRef.current;
      if (!audioContext) {
        return;
      }

      // iOS에서 오디오를 "unlock"하기 위해 빈 오디오 버퍼 재생
      if (audioContext.state === 'suspended') {
        // iOS 호환: 빈 오디오 버퍼로 오디오 시스템 활성화
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
        source.stop(0.01);
      }

      // AudioContext 상태가 'running'이 될 때까지 기다림
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // iOS에서 상태 변경이 비동기일 수 있으므로 확인
      let attempts = 0;
      while (audioContext.state !== 'running' && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 50));
        attempts++;
      }
    } catch (error) {
      console.log('오디오 컨텍스트 활성화 실패:', error);
    }
  };

  // EDM/8비트 스타일 노트 재생
  const playEDMNote = (frequency, duration, startTime, volume = 0.05, waveType = 'square', attack = 0.01) => {
    try {
      const audioContext = initAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = waveType;

      // 빠른 어택, 부드러운 릴리즈
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + attack);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + duration - 0.02);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    } catch (error) {
      // 사운드 재생 실패 무시
    }
  };

  // 킥 드럼 사운드 (베이스)
  const playKick = (startTime, volume = 0.08) => {
    try {
      const audioContext = initAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(60, startTime);
      oscillator.frequency.exponentialRampToValueAtTime(30, startTime + 0.1);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    } catch (error) {
      // 사운드 재생 실패 무시
    }
  };

  // 배경음악 시작 (EDM/8비트 아케이드 스타일)
  const startBackgroundMusic = () => {
    try {
      const audioContext = initAudioContext();
      
      // iOS 호환: AudioContext가 활성화되지 않았으면 시도
      if (audioContext.state === 'suspended') {
        audioContext.resume().catch(err => {
          console.log('배경음악 재생 실패 (AudioContext suspended):', err);
          return;
        });
      }
      
      // 기존 배경음악 정지
      stopBackgroundMusic();
      
      // iOS에서 AudioContext가 'running' 상태가 아니면 잠시 대기 후 재시도
      if (audioContext.state !== 'running') {
        setTimeout(() => {
          if (audioContext.state === 'running') {
            startBackgroundMusic();
          }
        }, 200);
        return;
      }

      // 뽕뽕 거리는 아케이드 스타일 멜로디 패턴
      // 빠른 템포 (약 150 BPM) - 더 경쾌하게
      const beatInterval = 0.4; // 150 BPM = 60/150 = 0.4초 per beat
      const totalDuration = beatInterval * 8; // 8비트 패턴 (더 짧고 반복적)

      const playEDMLoop = () => {
        const startTime = audioContext.currentTime;

        // 강한 베이스 라인 - 더 낮고 강렬하게
        const bassPattern = [
          { time: 0, freq: 98 },     // G2
          { time: 1, freq: 110 },    // A2
          { time: 2, freq: 98 },     // G2
          { time: 3, freq: 110 },    // A2
          { time: 4, freq: 123.47 }, // B2
          { time: 5, freq: 110 },    // A2
          { time: 6, freq: 98 },      // G2
          { time: 7, freq: 110 },    // A2
        ];

        // 뽕뽕 거리는 밝은 멜로디 - 높은 주파수, 반복적 패턴
        const melodyPattern = [
          { time: 0, freq: 659.25, dur: 0.15 },   // E5 - 뽕
          { time: 0.25, freq: 783.99, dur: 0.15 }, // G5 - 뽕
          { time: 0.5, freq: 880, dur: 0.15 },   // A5 - 뽕
          { time: 0.75, freq: 783.99, dur: 0.15 }, // G5
          { time: 1, freq: 659.25, dur: 0.15 },   // E5
          { time: 1.25, freq: 587.33, dur: 0.15 }, // D5
          { time: 1.5, freq: 659.25, dur: 0.2 },  // E5
          { time: 2, freq: 880, dur: 0.15 },     // A5 - 뽕
          { time: 2.25, freq: 987.77, dur: 0.15 }, // B5 - 뽕
          { time: 2.5, freq: 1174.66, dur: 0.2 }, // D6 - 뽕뽕
          { time: 2.75, freq: 987.77, dur: 0.15 }, // B5
          { time: 3, freq: 880, dur: 0.15 },     // A5
          { time: 3.25, freq: 783.99, dur: 0.15 }, // G5
          { time: 3.5, freq: 659.25, dur: 0.2 },  // E5
        ];

        // 강한 킥 드럼 - 더 자주, 더 강하게
        const kickPattern = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5];

        // 베이스 라인 재생 - 볼륨 약간 증가
        bassPattern.forEach((note) => {
          const noteTime = startTime + (note.time * beatInterval);
          playEDMNote(note.freq, beatInterval * 0.8, noteTime, 0.02, 'square', 0.005);
        });

        // 멜로디 라인 재생 - 밝고 경쾌하게
        melodyPattern.forEach((note) => {
          const noteTime = startTime + (note.time * beatInterval);
          playEDMNote(note.freq, note.dur, noteTime, 0.025, 'square', 0.005);
        });

        // 킥 드럼 재생 - 더 강하고 자주
        kickPattern.forEach((beat) => {
          const kickTime = startTime + (beat * beatInterval);
          playKick(kickTime, 0.03);
        });
      };

      // 첫 재생
      playEDMLoop();

      // 반복 재생
      backgroundMusicIntervalRef.current = setInterval(() => {
        if (gameState === "playing") {
          playEDMLoop();
        }
      }, totalDuration * 1000);

    } catch (error) {
      console.log('배경음악 재생 실패:', error);
    }
  };

  // 배경음악 정지
  const stopBackgroundMusic = () => {
    try {
      if (backgroundMusicIntervalRef.current) {
        clearInterval(backgroundMusicIntervalRef.current);
        backgroundMusicIntervalRef.current = null;
      }
      if (backgroundOscillatorsRef.current.length > 0) {
        backgroundOscillatorsRef.current.forEach(({ oscillator, gainNode }) => {
          try {
            const audioContext = audioContextRef.current;
            if (audioContext) {
              gainNode.gain.cancelScheduledValues(audioContext.currentTime);
              gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
              setTimeout(() => {
                oscillator.stop();
                oscillator.disconnect();
                gainNode.disconnect();
              }, 100);
            }
          } catch (error) {
            // 이미 정지된 경우 무시
          }
        });
        backgroundOscillatorsRef.current = [];
      }
      if (backgroundGainNodeRef.current) {
        backgroundGainNodeRef.current.disconnect();
        backgroundGainNodeRef.current = null;
      }
    } catch (error) {
      console.log('배경음악 정지 실패:', error);
    }
  };

  // 사운드 생성 함수 (Web Audio API)
  const playSound = (frequency, duration, type = 'success') => {
    try {
      const audioContext = initAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type === 'success' ? 'sine' : 'sawtooth';

      // 볼륨 조절 (성공: 밝게, 실패: 어둡게)
      gainNode.gain.setValueAtTime(type === 'success' ? 0.3 : 0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('사운드 재생 실패:', error);
    }
  };

  // 위치 랜덤 섞기
  const shufflePositions = () => {
    const positions = [0, 1, 2];
    // Fisher-Yates 셔플 알고리즘
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    return {
      red: positions[0],
      yellow: positions[1],
      green: positions[2]
    };
  };

  // 다음 색상으로 변경하고 다음 변경 시간 예약
  const scheduleNextColorChange = () => {
    if (colorChangeTimeoutRef.current) {
      clearTimeout(colorChangeTimeoutRef.current);
    }

    const now = Date.now();
    const elapsed = (now - gameStartTime.current) / 1000;
    
    if (elapsed >= 15) {
      return; // 게임 종료
    }

    const interval = getColorChangeInterval(elapsed);
    nextColorChangeTime.current = now + interval;

    colorChangeTimeoutRef.current = setTimeout(() => {
      // 색상 변경과 동시에 위치도 랜덤하게 섞기
      setLightPositions(shufflePositions());
      setLight(prev => {
        if (prev === "red") return "yellow";
        if (prev === "yellow") return "green";
        return "red"; // green → red
      });
      scheduleNextColorChange(); // 다음 색상 변경 예약
    }, interval);
  };

  // 할인권 발급 함수
  const issueCoupon = () => {
    const coupons = JSON.parse(localStorage.getItem("user_coupons") || "[]");
    const newCoupon = {
      id: Date.now(),
      type: "게임 보상",
      discount: "1,000원",
      description: "STOP THE LIGHT 게임 보상",
      earnedDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString() // 1일 후 만료
    };
    coupons.push(newCoupon);
    localStorage.setItem("user_coupons", JSON.stringify(coupons));
    setCouponEarned(true);
    setShowCouponModal(true);
  };

  // 게임 시작 로직
  const startGame = async () => {
    // iOS 호환: 사용자 상호작용 이벤트 핸들러 내에서 AudioContext 생성 및 활성화
    try {
      // AudioContext 초기화 (사용자 상호작용 이벤트 핸들러 내에서)
      initAudioContext();
      
      // AudioContext 활성화 (iOS에서 중요)
      await resumeAudioContext();
      
      // iOS에서 오디오가 활성화되었는지 확인 후 배경음악 시작
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        // 배경음악 시작 (약간의 지연을 두어 iOS에서 안정적으로 작동하도록)
        setTimeout(() => {
          startBackgroundMusic();
        }, 100);
      } else {
        // 상태가 'running'이 아니어도 시도 (일부 경우 작동할 수 있음)
        startBackgroundMusic();
      }
    } catch (error) {
      console.log('오디오 초기화 오류:', error);
      // 오디오 실패해도 게임은 계속 진행
      startBackgroundMusic();
    }
    
    setGameState("playing");
    setLight("red");
    setScore(0);
    setTimeLeft(15);
    setCouponEarned(false);
    setLightPositions(shufflePositions()); // 초기 위치 랜덤 배치
    gameStartTime.current = Date.now();
    nextColorChangeTime.current = Date.now();

    // 게임 타이머 (15초 카운트다운)
    gameIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - gameStartTime.current) / 1000;
      const remaining = 15 - elapsed;
      
      if (remaining <= 0) {
        // 게임 종료
        clearInterval(gameIntervalRef.current);
        if (colorChangeTimeoutRef.current) {
          clearTimeout(colorChangeTimeoutRef.current);
        }
        stopBackgroundMusic(); // 배경음악 정지
        setGameState("finished");
        setTimeLeft(0);
        return;
      }

      setTimeLeft(Math.ceil(remaining));
    }, 100); // 100ms마다 체크

    // 첫 색상 변경 (빨강 → 노랑) 예약
    const firstInterval = getColorChangeInterval(0);
    colorChangeTimeoutRef.current = setTimeout(() => {
      setLightPositions(shufflePositions()); // 위치 섞기
      setLight("yellow");
      scheduleNextColorChange(); // 다음 색상 변경 예약
    }, firstInterval);
  };

  // 유저가 탭했을 때
  const handleTap = () => {
    if (gameState !== "playing") return;

    // 초록불일 때 점수 획득
    if (light === "green") {
      // 성공 피드백
      setHitFeedback('success');
      setHitAnimation(true);
      playSound(800, 0.15, 'success'); // 높은 톤, 밝은 소리
      
      setScore(prev => {
        const newScore = prev + 1;
        // 5점 달성 시 즉시 할인권 발급
        if (newScore === 5 && !couponEarned) {
          issueCoupon();
        }
        return newScore;
      });

      // 피드백 메시지 제거
      setTimeout(() => {
        setHitFeedback(null);
        setHitAnimation(false);
      }, 300);
    } 
    // 빨강이나 노랑을 잘못 터치하면 감점
    else if (light === "red" || light === "yellow") {
      // 실패 피드백
      setHitFeedback('fail');
      setHitAnimation(true);
      playSound(200, 0.2, 'fail'); // 낮은 톤, 어두운 소리
      
      setScore(prev => {
        const newScore = Math.max(0, prev - 1); // 점수가 0 이하로 내려가지 않도록
        return newScore;
      });

      // 피드백 메시지 제거
      setTimeout(() => {
        setHitFeedback(null);
        setHitAnimation(false);
      }, 400);
    }
  };

  // 게임 상태에 따라 배경음악 제어
  useEffect(() => {
    if (gameState === "playing") {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [gameState]);

  // 컴포넌트 언마운트 시 타이머 및 배경음악 정리
  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
      if (colorChangeTimeoutRef.current) {
        clearTimeout(colorChangeTimeoutRef.current);
      }
      stopBackgroundMusic();
    };
  }, []);

  // 각 신호등 동그라미 스타일
  const getLightCircleStyle = (colorName) => {
    const isActive = light === colorName;
    const isHit = hitFeedback === 'success' && colorName === 'green' && isActive;
    const isMiss = hitFeedback === 'fail' && (colorName === 'red' || colorName === 'yellow') && isActive;
    
    const colors = {
      red: { 
        active: { bg: "#ef4444", shadow: "rgba(239, 68, 68, 0.6)" },
        inactive: { bg: "#7f1d1d", shadow: "none" }
      },
      yellow: { 
        active: { bg: "#eab308", shadow: "rgba(234, 179, 8, 0.6)" },
        inactive: { bg: "#713f12", shadow: "none" }
      },
      green: { 
        active: { bg: "#22c55e", shadow: "rgba(34, 197, 94, 0.6)" },
        inactive: { bg: "#14532d", shadow: "none" }
      }
    };
    const color = isActive ? colors[colorName].active : colors[colorName].inactive;
    
    // 타격감 효과: 성공 시 크기 확대, 실패 시 빨간색 깜빡임
    let scale = 1;
    let bgColor = color.bg;
    let shadow = isActive ? `0 0 30px ${color.shadow}` : 'none';
    
    if (isHit && hitAnimation) {
      scale = 1.3;
      bgColor = "#4ade80"; // 더 밝은 초록색
      shadow = "0 0 50px rgba(74, 222, 128, 0.8)";
    } else if (isMiss && hitAnimation) {
      scale = 1.1;
      bgColor = "#dc2626"; // 더 밝은 빨간색
      shadow = "0 0 40px rgba(220, 38, 38, 0.8)";
    }
    
    return {
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      transition: isHit || isMiss ? 'all 0.1s ease-out' : 'all 0.3s ease-in-out',
      background: bgColor,
      boxShadow: shadow,
      border: isActive ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid rgba(0, 0, 0, 0.3)',
      opacity: isActive ? 1 : 0.4,
      margin: '0 auto',
      transform: `scale(${scale})`,
      zIndex: isHit || isMiss ? 10 : 1
    };
  };

  // 위치에 따른 동그라미 렌더링
  const renderLightCircles = () => {
    const circles = [
      { color: 'red', position: lightPositions.red },
      { color: 'yellow', position: lightPositions.yellow },
      { color: 'green', position: lightPositions.green }
    ];
    
    // position 순서대로 정렬 (0: 위, 1: 중간, 2: 아래)
    circles.sort((a, b) => a.position - b.position);
    
    return circles.map((circle) => (
      <div 
        key={circle.color}
        style={getLightCircleStyle(circle.color)}
      />
    ));
  };

  return (
    <div
      onClick={handleTap}
      style={{
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: hitFeedback === 'fail' && hitAnimation ? '#2a1a1a' : '#1a1a1a',
        color: 'white',
        padding: '20px 16px',
        cursor: gameState === 'playing' ? 'pointer' : 'default',
        transition: 'background 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 타격감 피드백 메시지 */}
      {hitFeedback && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: hitFeedback === 'success' ? '48px' : '36px',
            fontWeight: 'bold',
            color: hitFeedback === 'success' ? '#4ade80' : '#ef4444',
            textShadow: hitFeedback === 'success' 
              ? '0 0 20px rgba(74, 222, 128, 0.8)' 
              : '0 0 20px rgba(239, 68, 68, 0.8)',
            zIndex: 1000,
            pointerEvents: 'none',
            animation: hitFeedback === 'success' 
              ? 'successPop 0.3s ease-out' 
              : 'failShake 0.4s ease-out',
            opacity: hitAnimation ? 1 : 0
          }}
        >
          {hitFeedback === 'success' ? '✓ 성공!' : '✗ 실패!'}
        </div>
      )}
      <h1 style={{ fontSize: '20px', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
        STOP THE LIGHT
      </h1>

      {/* 점수 및 시간 표시 */}
      {gameState === "playing" && (
        <div style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '16px',
          fontSize: '16px',
          fontWeight: 'bold',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div>
            점수: <span style={{ color: '#22c55e' }}>{score}</span>
          </div>
          <div>
            시간: <span style={{ color: '#eab308' }}>{timeLeft}초</span>
          </div>
        </div>
      )}

      {/* 신호등 - 3개의 동그라미 (위치가 랜덤하게 바뀜) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '20px',
        background: '#2a2a2a',
        borderRadius: '16px',
        border: '2px solid #444',
        width: 'auto',
        maxWidth: '280px',
        margin: '0 auto 24px auto',
        alignSelf: 'center'
      }}>
        {renderLightCircles()}
      </div>

      {/* 안내 문구 */}
      {gameState === "waiting" && (
        <>
          <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '20px', textAlign: 'center', lineHeight: '1.6', padding: '0 10px' }}>
            15초 동안 초록불을 최대한 많이 터치하세요!<br />
            빨강 → 노랑 → 초록 순서로 바뀝니다
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              startGame();
            }}
            style={{
              padding: '12px 24px',
              background: '#1976D2',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            게임 시작
          </button>
        </>
      )}

      {gameState === "playing" && (
        <p style={{ fontSize: '16px', opacity: 0.8, textAlign: 'center', padding: '0 10px' }}>
          {light === "red" && "빨강불 - 기다리세요..."}
          {light === "yellow" && "노랑불 - 준비하세요!"}
          {light === "green" && "초록불 - 지금 터치하세요! 🟢"}
        </p>
      )}

      {/* 할인권 발급 모달 */}
      {showCouponModal && (
        <div className="modal-overlay" style={{ zIndex: 2000 }} onClick={() => setShowCouponModal(false)}>
          <div className="modal" style={{ 
            maxWidth: '350px',
            textAlign: 'center',
            animation: 'bounce 0.5s ease-in-out'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
            <div className="modal-header" style={{ fontSize: '24px', fontWeight: 'bold', color: '#2E7D32', marginBottom: '16px' }}>
              1,000원 할인권이 당첨되었습니다
            </div>
            <div className="modal-content" style={{ marginBottom: '24px' }}>
              <div style={{
                background: '#FFF9E6',
                border: '2px solid #FFD700',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  - 2인이상 쉐어택시 이용시 사용가능 -
                </div>
                <div style={{ fontSize: '14px', color: '#d32f2f', fontWeight: 'bold' }}>
                  - 유효기간 1일 -
                </div>
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className="modal-button primary"
                onClick={() => setShowCouponModal(false)}
                style={{ width: '100%' }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === "finished" && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: '#2E7D32',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            width: '100%',
            maxWidth: '300px'
          }}>
            <p style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 'bold' }}>
              게임 종료!
            </p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>
              최종 점수: {score}
            </p>
            {couponEarned && (
              <div style={{
                background: '#FFD700',
                borderRadius: '8px',
                padding: '12px',
                marginTop: '16px',
                color: '#000',
                fontWeight: 'bold'
              }}>
                🎉 할인권 발급 완료!
              </div>
            )}
            {score < 5 && (
              <p style={{ fontSize: '14px', color: '#fff', opacity: 0.8, marginTop: '12px' }}>
                5점 이상 달성 시 할인권을 받을 수 있어요!
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              style={{
                padding: '12px 24px',
                background: '#1976D2',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              다시 하기
            </button>
            <button
              onClick={onBack}
              style={{
                padding: '12px 24px',
                background: '#2E7D32',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 프로필 화면
function ProfileScreen({ userInfo, onUpdateUserInfo }) {
  const [profileImage, setProfileImage] = useState(userInfo?.profileImage || null);
  const [coupons, setCoupons] = useState([]);

  // 할인권 로드
  useEffect(() => {
    const savedCoupons = JSON.parse(localStorage.getItem("user_coupons") || "[]");
    // 만료되지 않은 할인권만 표시
    const validCoupons = savedCoupons.filter(coupon => {
      return new Date(coupon.expiryDate) > new Date();
    });
    setCoupons(validCoupons);
    // 만료된 할인권 제거
    if (validCoupons.length !== savedCoupons.length) {
      localStorage.setItem("user_coupons", JSON.stringify(validCoupons));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        if (onUpdateUserInfo) {
          onUpdateUserInfo({ ...userInfo, profileImage: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div style={{ background: '#2E7D32', padding: '24px', color: 'white', textAlign: 'center' }}>
        <div 
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            margin: '0 auto 16px',
            background: profileImage ? `url(${profileImage}) center/cover` : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            cursor: 'pointer',
            border: '3px solid white',
            position: 'relative'
          }}
          onClick={() => document.getElementById('profile-edit-upload').click()}
        >
          {!profileImage && <span style={{ fontSize: '48px' }}>{userInfo?.emoji || '🐷'}</span>}
          <input
            id="profile-edit-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            background: '#1976D2',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white'
          }}>
            📷
          </div>
        </div>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{userInfo?.nickname || '벗123'}</h2>
        <p style={{ fontSize: '14px', opacity: 0.8 }}>{userInfo?.email || 'student@ewha.ac.kr'}</p>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ background: '#E8F5E9', border: '2px solid #2E7D32', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2E7D32' }}>🌱 에코점수</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2E7D32' }}>{userInfo?.ecoScore || 0}점</span>
          </div>
          <div style={{ height: '8px', background: '#ddd', borderRadius: '4px', overflow: 'hidden' }}>
            {(() => {
              const ecoScore = userInfo?.ecoScore || 0;
              let barColor = '#9E9E9E'; // 회색 (기본값, 10점 이하)
              
              if (ecoScore >= 90) {
                barColor = '#FFC107'; // 노란색 (90점 이상)
              } else if (ecoScore > 50) {
                barColor = '#C8E6C9'; // 아주 연한 연두색 (50점 초과 ~ 90점 미만)
              } else if (ecoScore <= 10) {
                barColor = '#9E9E9E'; // 회색 (10점 이하)
              }
              
              return (
                <div style={{ 
                  width: `${Math.min((ecoScore / 100) * 100, 100)}%`, 
                  height: '100%', 
                  background: barColor,
                  transition: 'all 0.3s ease'
                }}></div>
              );
            })()}
          </div>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', lineHeight: '1.5' }}>
            쉐어택시를 이용하면 기후위기에서 벗어날 수 있어요!<br />
            함께 택시를 타면 CO₂를 줄이고 지구를 지켜요 🌍
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={32} color="#2E7D32" />
            </div>
            <div className="stat-value">12</div>
            <div className="stat-label">완료한 팟</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={32} color="#2E7D32" />
            </div>
            <div className="stat-value">28</div>
            <div className="stat-label">만난 벗</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={32} color="#2E7D32" />
            </div>
            <div className="stat-value">₩42,500</div>
            <div className="stat-label">절약한 금액</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={32} color="#2E7D32" />
            </div>
            <div className="stat-value">8.5kg</div>
            <div className="stat-label">CO₂ 감소</div>
          </div>
        </div>

        <div className="section-title">내 할인권</div>
        {coupons.length === 0 ? (
          <div className="card">
            <div className="card-subtitle" style={{ textAlign: 'center', padding: '20px' }}>
              보유한 할인권이 없습니다
            </div>
            <div className="card-subtitle" style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>
              게임에서 5점 이상 달성하면 할인권을 받을 수 있어요!
            </div>
          </div>
        ) : (
          <div className="card" style={{
            background: '#FFFFFF',
            border: '2px solid #D0D0D0',
            color: '#333'
          }}>
            <div className="card-header">
              <div className="card-title" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                🎫 {coupons[0].type}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
                {coupons[0].discount} 할인
              </div>
            </div>
            <div className="card-subtitle" style={{ marginTop: '8px', color: '#666' }}>
              {coupons[0].description}
            </div>
            <div style={{
              marginTop: '8px',
              padding: '8px',
              background: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#666',
              fontWeight: 'bold'
            }}>
              ⚠️ 2인이상 쉐어택시 이용시 사용가능
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '8px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>발급일: {new Date(coupons[0].earnedDate).toLocaleDateString('ko-KR')}</span>
              <span>만료일: {new Date(coupons[0].expiryDate).toLocaleDateString('ko-KR')}</span>
            </div>
            {coupons.length > 1 && (
              <div style={{
                marginTop: '12px',
                padding: '8px',
                background: '#E8F5E9',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#2E7D32',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                +{coupons.length - 1}개의 할인권이 더 있습니다
              </div>
            )}
          </div>
        )}

        <div className="section-title">설정</div>
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={20} color="#2E7D32" />
            이용 내역
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={20} color="#2E7D32" />
            관심 목적지
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="#2E7D32" />
            알림 설정
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={20} color="#2E7D32" />
            개인정보 설정
          </div>
          <div className="card-subtitle">블라인드 모드: ON</div>
        </div>
      </div>
    </>
  );
}

// 매너온도 평가 화면 (택시기사만 평가)
function RatingScreen({ matchedRide, participants: matchedParticipants, onComplete, onCancel, onUpdateUserInfo, userInfo }) {
  const [driverRating, setDriverRating] = useState(0);
  const [ecoScoreAdded, setEcoScoreAdded] = useState(false);

  const handleSubmit = () => {
    // 택시기사 평가 완료 시 에코점수 추가
    if (!ecoScoreAdded && onUpdateUserInfo) {
      const currentScore = userInfo?.ecoScore || 0;
      const newScore = currentScore + 1; // 택시 이용 시 1점 추가
      onUpdateUserInfo({ ...userInfo, ecoScore: newScore });
      setEcoScoreAdded(true);
    }
    
    const allRatings = {
      driver: driverRating
    };
    onComplete(allRatings);
  };

  const canSubmit = driverRating > 0;

  // 택시기사 평가 단계
  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          택시기사 매너온도 평가
        </div>
        <div className="modal-content">
          <div style={{ 
            background: '#E8F5E9', 
            border: '2px solid #2E7D32', 
            borderRadius: '8px', 
            padding: '12px', 
            marginBottom: '16px',
            fontSize: '14px',
            color: '#2E7D32',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            🌱 쉐어택시를 이용하셨네요! 에코점수가 올라갑니다
          </div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#FFA726',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 16px'
            }}>
              🚕
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
              택시기사님
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              안전 운전과 서비스는 어떠셨나요?
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <p style={{ textAlign: 'center', marginBottom: '24px', fontSize: '16px', fontWeight: 'bold' }}>
              택시기사님의 서비스는 어떠셨나요?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { value: 1, label: '매우 불만족', emoji: '😡' },
                { value: 2, label: '불만족', emoji: '😕' },
                { value: 3, label: '보통', emoji: '😐' },
                { value: 4, label: '만족', emoji: '😊' },
                { value: 5, label: '매우 만족', emoji: '😍' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDriverRating(option.value)}
                  style={{
                    padding: '12px',
                    border: driverRating === option.value ? '3px solid #2E7D32' : '2px solid #ddd',
                    borderRadius: '12px',
                    background: driverRating === option.value ? '#E8F5E9' : 'white',
                    cursor: 'pointer',
                    minWidth: '70px',
                    transition: 'all 0.2s',
                    flex: '1 1 auto'
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>{option.emoji}</div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold' }}>
                    {option.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="modal-buttons">
            <button
              className="modal-button secondary"
              onClick={onCancel}
            >
              건너뛰기
            </button>
            <button
              className="modal-button primary"
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{
                opacity: canSubmit ? 1 : 0.5,
                cursor: canSubmit ? 'pointer' : 'not-allowed'
              }}
            >
              평가 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 매칭 화면
function MatchingScreen({ rideInfo, onCancel, onComplete, onRate, onUpdateUserInfo, userInfo }) {
  const [isMatching, setIsMatching] = useState(!rideInfo.skipMatching); // skipMatching이 true면 바로 완료 화면
  const [matchedRide, setMatchedRide] = useState(null);
  const [showRating, setShowRating] = useState(false);

  React.useEffect(() => {
    // 기존 팟에 참여하는 경우 바로 매칭 완료
    if (rideInfo.skipMatching && rideInfo.existingRide) {
      setIsMatching(false);
      setMatchedRide({
        ...rideInfo.existingRide,
        pickupZone: rideInfo.existingRide.pickupZone,
        destinationZone: rideInfo.existingRide.destinationZone,
        participants: rideInfo.existingRide.maxParticipants, // 인원이 다 참
        maxParticipants: rideInfo.existingRide.maxParticipants,
        estimatedCost: rideInfo.existingRide.estimatedCost,
        departureTime: rideInfo.existingRide.departureTime, // 출발 시간 포함
        matchedParticipants: rideInfo.existingRide.participantInfo || []
      });
      return;
    }

    // 새 팟 생성 시 5초 후 매칭 완료 시뮬레이션
    const timer = setTimeout(() => {
      setIsMatching(false);
      // 함께 탑승한 사람들 더미 데이터 (실제로는 매칭 결과에서 받아옴)
      // maxParticipants에 맞춰서 인원 조정 (본인 제외)
      const availableParticipants = [
        { id: 1, nickname: '귀여운 돼지', role: 'student', emoji: '🐷' },
        { id: 2, nickname: '치키차카', role: 'graduate', emoji: '🐱' }
      ];
      // maxParticipants - 1 (본인 제외)만큼만 선택
      const matchedParticipants = availableParticipants.slice(0, rideInfo.maxParticipants - 1);
      setMatchedRide({
        ...rideInfo,
        participants: rideInfo.maxParticipants, // 최대 인원만큼 참여
        estimatedCost: Math.floor(12000 / rideInfo.maxParticipants),
        departureTime: rideInfo.departureTime || 'now', // 출발 시간 포함
        matchedParticipants: matchedParticipants
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [rideInfo]);

  if (isMatching) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: 'calc(100vh - 140px)',
        padding: '20px 16px',
        textAlign: 'center'
      }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          background: '#2E7D32',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '3px solid #2E7D32',
            animation: 'pulse 1.5s infinite'
          }}></div>
          <span style={{ fontSize: '40px', zIndex: 1 }}>🚕</span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>매칭 중입니다</h2>
        <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
          <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>{rideInfo.destinationZone}</span> 방향으로<br />
          가는 이화인을 찾고 있어요
        </p>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <span style={{ color: '#666' }}>픽업존</span>
            <span style={{ fontWeight: 'bold' }}>{rideInfo.pickupZone}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <span style={{ color: '#666' }}>목적지</span>
            <span style={{ fontWeight: 'bold', color: '#2E7D32' }}>{rideInfo.destinationZone}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
            <span style={{ color: '#666' }}>예상 시간</span>
            <span style={{ fontWeight: 'bold' }}>약 15분</span>
          </div>
        </div>
        <button
          onClick={onCancel}
          style={{
            padding: '12px 24px',
            background: 'white',
            border: '2px solid #ddd',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          매칭 취소
        </button>
      </div>
    );
  }

  // matchedRide가 없으면 rideInfo를 사용
  const displayRide = matchedRide || rideInfo;

  return (
    <div style={{ 
      padding: '20px 16px',
      textAlign: 'center'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: '#2E7D32',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px'
      }}>
        <span style={{ fontSize: '40px' }}>✅</span>
      </div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>매칭 완료!</h2>
      <div style={{
        background: '#E8F5E9',
        border: '2px solid #2E7D32',
        borderRadius: '12px',
        padding: '12px',
        marginBottom: '20px',
        fontSize: '14px',
        color: '#2E7D32',
        textAlign: 'center',
        fontWeight: 'bold',
        maxWidth: '400px',
        margin: '0 auto 20px'
      }}>
        🌱 쉐어택시를 이용하면 기후위기에서 벗어날 수 있어요!<br />
        CO₂를 줄이고 지구를 지켜요 🌍
      </div>
      {displayRide && (
        <>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#666' }}>총 인원</span>
              <span style={{ fontWeight: 'bold' }}>{displayRide.participants || displayRide.maxParticipants}명</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#666' }}>예상 총 요금</span>
              <span style={{ fontWeight: 'bold' }}>₩{(displayRide.estimatedCost || 0) * (displayRide.participants || displayRide.maxParticipants)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #eee' }}>
              <span style={{ color: '#666' }}>1인당 예상 요금</span>
              <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#2E7D32' }}>₩{displayRide.estimatedCost || 0}</span>
            </div>
          </div>
          <div style={{
            background: '#E8F5E9',
            border: '2px solid #2E7D32',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '20px',
            width: '100%',
            maxWidth: '400px'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚕</div>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#2E7D32', marginBottom: '6px' }}>
              {displayRide.departureTime && displayRide.departureTime !== 'now' 
                ? `예약시간 ${displayRide.departureTime} 출발위치 도착해주세요`
                : '택시 출발위치로 이동해주세요'}
            </p>
            <p style={{ fontSize: '13px', color: '#666' }}>
              {displayRide.pickupZone}
            </p>
          </div>
        </>
      )}
      <button
        onClick={() => setShowRating(true)}
        style={{
          padding: '14px 24px',
          background: '#2E7D32',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        매너온도 평가하기
      </button>
      {showRating && matchedRide && (
        <RatingScreen
          matchedRide={matchedRide}
          onComplete={(ratings) => {
            if (onRate) onRate(ratings);
            setShowRating(false);
            if (onComplete) onComplete();
          }}
          onCancel={() => setShowRating(false)}
          onUpdateUserInfo={onUpdateUserInfo}
          userInfo={userInfo}
        />
      )}
    </div>
  );
}

// 메인 앱
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showSignup, setShowSignup] = useState(false);
  const [userInfo, setUserInfo] = useState({ ecoScore: 49 });
  const [matchingInfo, setMatchingInfo] = useState(null);
  const [userRatings, setUserRatings] = useState({}); // 사용자의 매너온도 저장

  if (!isLoggedIn) {
    if (showSignup) {
      return <SignupScreen onBack={() => setShowSignup(false)} onSignupComplete={(info) => { setUserInfo({ ...info, ecoScore: 49 }); setIsLoggedIn(true); }} />;
    }
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} onSignup={() => setShowSignup(true)} />;
  }

  if (matchingInfo) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>매칭 중</h1>
          <button className="icon-button" onClick={() => setMatchingInfo(null)}>
            ←
          </button>
        </header>
        <div className="content">
          <MatchingScreen 
            rideInfo={matchingInfo}
            onCancel={() => setMatchingInfo(null)}
            onRate={(ratings) => {
              // 평가 결과 저장 (실제로는 서버에 전송)
              console.log('택시기사 매너온도 평가:', ratings);
              setUserRatings(ratings);
              alert('택시기사 매너온도 평가가 완료되었습니다!');
            }}
            onComplete={() => {
              setMatchingInfo(null);
              setCurrentScreen('home');
            }}
            onUpdateUserInfo={setUserInfo}
            userInfo={userInfo}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          {currentScreen === 'home' && 'EWAY SHARE'}
          {currentScreen === 'create' && '팟 만들기'}
          {currentScreen === 'list' && '팟 찾기'}
          {currentScreen === 'community' && '후기 게시판'}
          {currentScreen === 'profile' && '내 정보'}
          {currentScreen === 'game' && '미니게임'}
        </h1>
        {currentScreen !== 'home' && (
          <button className="icon-button" onClick={() => setCurrentScreen('home')}>
            ←
          </button>
        )}
      </header>

      <div className="content">
        {currentScreen === 'home' && <HomeScreen onNavigate={setCurrentScreen} userInfo={userInfo} />}
        {currentScreen === 'create' && <CreateRideScreen onBack={() => setCurrentScreen('home')} onStartMatching={(info) => setMatchingInfo(info)} userInfo={userInfo} onUpdateUserInfo={setUserInfo} />}
        {currentScreen === 'list' && <RideListScreen onStartMatching={(info) => setMatchingInfo(info)} />}
        {currentScreen === 'community' && <CommunityScreen userInfo={userInfo} onUpdateUserInfo={setUserInfo} />}
        {currentScreen === 'profile' && <ProfileScreen userInfo={userInfo} onUpdateUserInfo={setUserInfo} />}
        {currentScreen === 'game' && <GameScreen onBack={() => setCurrentScreen('home')} />}
      </div>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${currentScreen === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('home')}
        >
          <Home size={24} className="icon" />
          <span className="label">홈</span>
        </button>
        <button
          className={`nav-item ${currentScreen === 'list' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('list')}
        >
          <List size={24} className="icon" />
          <span className="label">팟 목록</span>
        </button>
        <button
          className={`nav-item ${currentScreen === 'community' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('community')}
        >
          <MessageSquare size={24} className="icon" />
          <span className="label">커뮤니티</span>
        </button>
        <button
          className={`nav-item ${currentScreen === 'profile' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('profile')}
        >
          <User size={24} className="icon" />
          <span className="label">내 정보</span>
        </button>
        <button
          className={`nav-item ${currentScreen === 'game' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('game')}
        >
          <Gamepad2 size={24} className="icon" />
          <span className="label">게임</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
