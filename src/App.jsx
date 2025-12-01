import React, { useState } from 'react';
import './App.css';
import { CheckCircle, Users, DollarSign, Leaf, History, Star, Bell, Shield, Home, List, User, Plus, Search, MapPin, User as UserIcon, MessageSquare, Send } from 'lucide-react';
import logoImage from './assets/logo.png';

// 더미 데이터
const mockRides = [
  {
    id: 'ride_1',
    pickupZone: '정문',
    destinationZone: '서울역',
    participants: 2,
    maxParticipants: 3,
    estimatedCost: 3500,
    departureTime: '14:30',
    isQuiet: true,
    femaleOnly: false,
    isBlindMode: true, // 아이디 비공개
    participantInfo: [] // 비공개
  },
  {
    id: 'ride_2',
    pickupZone: '후문',
    destinationZone: '서울역',
    participants: 2,
    maxParticipants: 3,
    estimatedCost: 3000,
    departureTime: '15:00',
    isQuiet: false,
    femaleOnly: true,
    isBlindMode: true, // 아이디 비공개
    participantInfo: [] // 비공개
  },
  {
    id: 'ride_3',
    pickupZone: 'ECC 앞',
    destinationZone: '서울역',
    participants: 2,
    maxParticipants: 3,
    estimatedCost: 4500,
    departureTime: '14:50',
    isQuiet: false,
    femaleOnly: false,
    isBlindMode: false, // 공개
    participantInfo: [
      { role: 'professor', nickname: '교수1' },
      { role: 'student', nickname: '학부1' }
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
            background: userInfo?.profileImage ? `url(${userInfo.profileImage}) center/cover` : undefined
          }}
        >
          {!userInfo?.profileImage && (userInfo?.nickname?.[0] || '벗')}
        </div>
        <div className="user-info">
          <h2>{userInfo?.nickname || '벗123'}</h2>
          <div className="manner-temp">
            🌡️ 매너온도 36.5°C
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

      <div className="section-title">인기 목적지</div>
      <div className="card" onClick={() => onNavigate('list')}>
        <div className="card-header">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#2E7D32" />
            신촌역
          </div>
        </div>
        <div className="card-subtitle">지금 3개 팟 대기중</div>
      </div>
      <div className="card" onClick={() => onNavigate('list')}>
        <div className="card-header">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#2E7D32" />
            홍대입구역
          </div>
        </div>
        <div className="card-subtitle">지금 5개 팟 대기중</div>
      </div>

      <div className="section-title">최근 이용 내역</div>
      <div className="card">
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
function CreateRideScreen({ onBack, onStartMatching }) {
  const [pickupZone, setPickupZone] = useState('');
  const [destinationZone, setDestinationZone] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(2);
  const [isQuiet, setIsQuiet] = useState(false);
  const [femaleOnly, setFemaleOnly] = useState(false);
  const [favorites, setFavorites] = useState(['서울시 마포구 신촌로 123', '서울시 마포구 홍익로 123']);
  const [showFavorites, setShowFavorites] = useState(false);

  const estimatedCost = Math.floor(12000 / maxParticipants);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupZone || !destinationZone) {
      alert('출발지와 목적지를 선택해주세요');
      return;
    }
    // 즐겨찾기에 추가 (중복 체크)
    if (!favorites.includes(destinationZone)) {
      setFavorites([...favorites, destinationZone]);
    }
    // 매칭 화면으로 이동
    onStartMatching({ pickupZone, destinationZone, maxParticipants, isQuiet, femaleOnly });
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
          </div>
        </div>

        <div className="cost-estimate">
          <div className="cost-label">예상 1인당 비용</div>
          <div className="cost-value">₩{estimatedCost}</div>
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
    // 승인 버튼 클릭 시 매칭 화면으로 이동
    onStartMatching({
      pickupZone: ride.pickupZone,
      destinationZone: ride.destinationZone,
      maxParticipants: ride.maxParticipants,
      isQuiet: ride.isQuiet,
      femaleOnly: ride.femaleOnly
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
          onClick={() => setSelectedRide(ride)}
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
            <div style={{ color: '#2E7D32', fontWeight: 'bold' }}>🚀 지금 출발</div>
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
                      fontWeight: 'bold'
                    }}
                  >
                    {participant.role === 'professor' ? '교수' : participant.role === 'student' ? '학부생' : participant.role} {participant.nickname}
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
          {(ride.isQuiet || ride.femaleOnly) && (
            <div className="ride-tags">
              {ride.isQuiet && <span className="tag quiet">조용히 가기</span>}
              {ride.femaleOnly && <span className="tag female">여학생만</span>}
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
              <p><strong>출발 시간:</strong> 지금 출발</p>
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
                    <p key={idx} style={{ marginBottom: '4px' }}>
                      {participant.role === 'professor' ? '교수' : participant.role === 'student' ? '학부생' : participant.role} {participant.nickname}
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
function CommunityScreen({ userInfo }) {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: '벗123', 
      content: '오늘 택시 쉐어링 너무 좋았어요! 함께 탄 분들이 모두 친절하셨고, 비용도 절약할 수 있어서 만족합니다 😊', 
      time: '2시간 전',
      likes: 5
    },
    { 
      id: 2, 
      author: '벗456', 
      content: '조용히 가기 옵션 덕분에 편하게 이동했어요. 다음에도 이용할게요!', 
      time: '5시간 전',
      likes: 3
    },
    { 
      id: 3, 
      author: '벗789', 
      content: '매너 온도 시스템이 있어서 더 안전하게 느껴져요. 이화인들만 모여서 신뢰가 가네요!', 
      time: '1일 전',
      likes: 8
    }
  ]);
  const [newPost, setNewPost] = useState('');
  const [showWriteForm, setShowWriteForm] = useState(false);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: userInfo?.nickname || '벗123',
        content: newPost,
        time: '방금 전',
        likes: 0
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowWriteForm(false);
    }
  };

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
            placeholder="후기를 작성해주세요..."
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
        {posts.map((post) => (
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
                background: '#2E7D32',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                {post.author[0]}
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
        ))}
      </div>
    </>
  );
}

// 프로필 화면
function ProfileScreen({ userInfo, onUpdateUserInfo }) {
  const [profileImage, setProfileImage] = useState(userInfo?.profileImage || null);

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
          {!profileImage && <span>{userInfo?.nickname?.[0] || '벗'}</span>}
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
        <div style={{ background: '#FFF3E0', border: '2px solid #FF9800', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>매너 온도</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>🌡️ 36.5°C</span>
          </div>
          <div style={{ height: '8px', background: '#ddd', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: '#FF9800' }}></div>
          </div>
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

// 매칭 화면
function MatchingScreen({ rideInfo, onCancel, onComplete }) {
  const [isMatching, setIsMatching] = useState(true);
  const [matchedRide, setMatchedRide] = useState(null);

  React.useEffect(() => {
    // 5초 후 매칭 완료 시뮬레이션
    const timer = setTimeout(() => {
      setIsMatching(false);
      setMatchedRide({
        ...rideInfo,
        participants: 2,
        estimatedCost: Math.floor(12000 / rideInfo.maxParticipants)
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isMatching) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          background: '#2E7D32',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '4px solid #2E7D32',
            animation: 'pulse 1.5s infinite'
          }}></div>
          <span style={{ fontSize: '48px', zIndex: 1 }}>🚕</span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>매칭 중입니다</h2>
        <p style={{ color: '#666', marginBottom: '32px' }}>
          <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>{rideInfo.destinationZone}</span> 방향으로<br />
          가는 이화인을 찾고 있어요
        </p>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
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

  return (
    <div style={{ 
      padding: '40px 20px',
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
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>매칭 완료!</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>함께 이동할 이화인을 찾았어요</p>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ color: '#666' }}>총 인원</span>
          <span style={{ fontWeight: 'bold' }}>{matchedRide.participants}명</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ color: '#666' }}>예상 총 요금</span>
          <span style={{ fontWeight: 'bold' }}>₩{matchedRide.estimatedCost * matchedRide.participants}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #eee' }}>
          <span style={{ color: '#666' }}>1인당 예상 요금</span>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#2E7D32' }}>₩{matchedRide.estimatedCost}</span>
        </div>
      </div>
      <div style={{
        background: '#E8F5E9',
        border: '2px solid #2E7D32',
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚕</div>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2E7D32', marginBottom: '8px' }}>
          택시 출발위치로 이동해주세요
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          {matchedRide.pickupZone}
        </p>
      </div>
    </div>
  );
}

// 메인 앱
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showSignup, setShowSignup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [matchingInfo, setMatchingInfo] = useState(null);

  if (!isLoggedIn) {
    if (showSignup) {
      return <SignupScreen onBack={() => setShowSignup(false)} onSignupComplete={(info) => { setUserInfo(info); setIsLoggedIn(true); }} />;
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
            onComplete={() => {
              alert('택시가 호출되었습니다!');
              setMatchingInfo(null);
              setCurrentScreen('home');
            }}
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
        </h1>
        {currentScreen !== 'home' && (
          <button className="icon-button" onClick={() => setCurrentScreen('home')}>
            ←
          </button>
        )}
      </header>

      <div className="content">
        {currentScreen === 'home' && <HomeScreen onNavigate={setCurrentScreen} userInfo={userInfo} />}
        {currentScreen === 'create' && <CreateRideScreen onBack={() => setCurrentScreen('home')} onStartMatching={(info) => setMatchingInfo(info)} />}
        {currentScreen === 'list' && <RideListScreen onStartMatching={(info) => setMatchingInfo(info)} />}
        {currentScreen === 'community' && <CommunityScreen userInfo={userInfo} />}
        {currentScreen === 'profile' && <ProfileScreen userInfo={userInfo} onUpdateUserInfo={setUserInfo} />}
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
      </nav>
    </div>
  );
}

export default App;
