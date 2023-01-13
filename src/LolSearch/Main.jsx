import { useEffect } from 'react';
import { useState } from 'react';

//tier images
import challengerTierImg from './img/tier/challenger.png';
import masterTierImg from './img/tier/master.webp';
import diamondTierImg from './img/tier/diamond.webp';
import platinumTierImg from './img/tier/platinum.webp';
import goldTierImg from './img/tier/gold.webp';
import silverTierImg from './img/tier/silver.webp';
import unrankTierImg from './img/tier/unrank.webp';

//champion images
import YasuoImg from './img/champion/Yasuo.webp';
import LeeSinImg from './img/champion/LeeSin.webp';
import EzrealImg from './img/champion/Ezreal.webp';
import YoneImg from './img/champion/Yone.webp';
import AhriImg from './img/champion/Ahri.webp';
import SyndraImg from './img/champion/Syndra.webp';
import ZedImg from './img/champion/Zed.webp';
import AkaliImg from './img/champion/Akali.webp';
import XinZhaoImg from './img/champion/XinZhao.webp';
import KindredImg from './img/champion/Kindred.webp';
import BlitzcrankImg from './img/champion/Blitzcrank.webp';
import IreliaImg from './img/champion/Irelia.webp';
import LucianImg from './img/champion/Lucian.webp';
import CaitlynImg from './img/champion/Caitlyn.webp';
import AatroxImg from './img/champion/Aatrox.webp';
import ThreshImg from './img/champion/Thresh.webp';
import ZoeImg from './img/champion/Zoe.webp';
import NautilusImg from './img/champion/Nautilus.webp';

//spell images
import FlashImg from './img/spell/Flash.webp';
import FireImg from './img/spell/Fire.webp';
import SmiteImg from './img/spell/Smite.webp';
import TeleportImg from './img/spell/Teleport.webp';
import HealImg from './img/spell/Heal.webp';
import ExhaustImg from './img/spell/Exhaust.webp';

//item images
import 돌풍 from './img/items/돌풍.webp';
import 월식 from './img/items/월식.webp';
import 세릴다의원한 from './img/items/세릴다의원한.webp';
import 자객의발톱 from './img/items/자객의발톱.webp';
import 징수의총 from './img/items/징수의총.webp';
import 고속연사포 from './img/items/고속연사포.webp';
import 무한의대검 from './img/items/무한의대검.webp';
import 몰락한왕의검 from './img/items/몰락한왕의검.webp';
import 수호천사 from './img/items/수호천사.webp';
import 지크의융합 from './img/items/지크의융합.webp';
import 굶주린히드라 from './img/items/굶주린히드라.webp';
import 루덴의폭풍 from './img/items/루덴의폭풍.webp';
import 죽음의무도 from './img/items/죽음의무도.webp';
import 마법사의최후 from './img/items/마법사의최후.webp';
import 해신작쇼 from './img/items/해신작쇼.webp';
import 존야의모래시계 from './img/items/존야의모래시계.webp';
import 삼위일체 from './img/items/삼위일체.webp';
import 만년서리 from './img/items/만년서리.webp';
import 공허의지팡이 from './img/items/공허의지팡이.webp';
import 그림자불꽃 from './img/items/그림자불꽃.webp';
import 크라켄학살자 from './img/items/크라켄학살자.webp';
import 선혈포식자 from './img/items/선혈포식자.webp';
import 칠흑의양날도끼 from './img/items/칠흑의양날도끼.webp';
import 타곤산 from './img/items/타곤산.webp';
import 솔라리 from './img/items/솔라리.webp';
import 얼음정수 from './img/items/얼음정수.webp';
import 무라마나 from './img/items/무라마나.webp';
import 도란의검 from './img/items/도란의검.webp';
import 도란의링 from './img/items/도란의링.webp';
import 도란의방패 from './img/items/도란의방패.webp';
import 로켓벨트 from './img/items/로켓벨트.webp';
import 망각의구 from './img/items/망각의구.webp';
import 불멸의철갑궁 from './img/items/불멸의철갑궁.webp';
import 광전사의군화 from './img/items/광전사의군화.webp';
import 판금장화 from './img/items/판금장화.webp';
import 마법사의신발 from './img/items/마법사의신발.webp';
import 핑크와드 from './img/items/핑크와드.webp';
import 와드 from './img/items/와드.webp';
import 렌즈 from './img/items/렌즈.webp';
import 구슬 from './img/items/구슬.webp';


export default function Main() {

  //검색창에 입력한 소환사 닉네임
  const [searchName, setSearchName] = useState('');

  //검색한 닉네임으로 소환사리스트 서버에서 탐색하여 id를 얻어서 searchId에 저장
  const [searchId, setSearchId] = useState('');

  //summoner.json 서버에서 소환사 리스트를 불러와 summoners에 저장
  const [summoners, setSummoners] = useState([]);

  //summoners에서 searchId를 가지고 찾은 소환사를 summoner에 저장
  const [summoner, setSummoner] = useState({});

  //history.json 서버에서 searchId를 가지고 해당 소환사의 게임 기록을 histories에 저장 
  const [histories, setHistories] = useState([]);

  //true, false값을 가지는 toggle
  const [toggle, setToggle] = useState(false);

  //처음 웹브라우저가 실행될 때 summoner.json 서버에서 소환사리스트를 summoners에 저장함
  useEffect(() => {
    fetch('http://localhost:3001/summoner').then(res => res.json()).then(arr => setSummoners(arr));
  }, [])

  //소환사 닉네임을 입력하고 검색버튼을 누르면 handleSearch함수가 실행되어 historySearch함수가 실행된다.
  //즉 버튼을 누르면 toggle값이 바뀌어 아래 useEffect함수의 update기능이 실행된다.
  //아래 useEffect함수의 기능은 소환사의 게임 기록이 있는 history.json 서버파일에서 소환사의 고유 id값을 이용해 그 기록을 histories에 저장한다.
  useEffect(() => {
    fetch(`http://localhost:3002/history`, { method: 'GET' }).then(res => res.json()).then(arr => {
      arr.map(({ id, matchHistory }) => {
        if (id == searchId) setHistories(matchHistory);
      })
    })
  }, [toggle])

  //소환사 닉네임을 입력하여 얻은 소환사의 고유 id값을 이용하여 summoner.json 서버파일에서 받아 저장해논 summoners배열에서 해당 소환사를 찾아 summoner에 저장함. 
  useEffect(() => {
    summoners.map(s => {
      if (s.id == searchId) setSummoner(s);
    })
  }, [toggle])

  //검색버튼을 누르면 toggle값이 바뀌게 함.
  const historySearch = () => {
    setToggle(!toggle);
  }

  return (
    <div style={{ background: '#31313C', height: '2000px' }}>
      <div style={{ height: '200px', background: '#5383E8' }}>
        <h1 style={{ textAlign: 'center', color: 'white', margin: '0px', padding: '20px 0px 0px 0px' }}>LoL 전적 검색 사이트</h1>
        <Search summoners={summoners} searchId={searchId} setSearchId={setSearchId} historySearch={historySearch} searchName={searchName} setSearchName={setSearchName} />
      </div>
      <div>
        <br />
        <SummonerInfo summoner={summoner} />
        <br />
        <br />
      </div>
      <History histories={histories} />
    </div>
  )
}

//소환사 상태 정보를 나타내는 컴포넌트
const SummonerInfo = ({ summoner }) => {
  const divStyle = {
    textAlign: 'center',
    fontSize: '20px',
    border: '1px solid grey',
    margin: '10px 30% 10px 30%',
    width: '735px',
    height: '180px',
  }

  //summoner.json 서버파일에 담겨있는 tier정보를 가지고 그 티어에 맞는 티어이미지를 리턴하는 함수.
  const Tier = () => {
    const imgStyle = {
      width: '144px',
      height: '144px',
      // float: 'left',
      // margin: '0px 0px 0px 0px',
      // border: '1px solid green'
    }

    let tierImg = unrankTierImg;
    switch (summoner.tier) {
      case '챌린저':
        tierImg = challengerTierImg;
        break;
      case '마스터':
        tierImg = masterTierImg;
        break;
      case '다이아':
        tierImg = diamondTierImg;
        break;
      case '플레티넘':
        tierImg = platinumTierImg;
        break;
      case '골드':
        tierImg = goldTierImg;
        break;
      case '실버':
        tierImg = silverTierImg;
        break;
      default:
        break;
    }

    return (
      <div style={{ float: 'left', margin: '3px 0px 0px 10px' }}>
        <img src={tierImg} style={imgStyle} alt="티어" />
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', textAlign: 'center', margin: '0px 0px 0px 10px' }}>{summoner.tier} {summoner.rank}</div>
      </div>
    )
  }

  //소환사 닉네임과 판수, 승률을 나타내는 컴포넌트 
  const Info = () => {

    const infoStyle = {
      float: 'left',
      margin: '30px 0px 30px 10px',
      // border: '1px solid red',
    }

    return (
      <div style={infoStyle}>
        <h2 style={{ margin: '0px 0px 0px 0px', color: 'white', textAlign: 'left' }}>{summoner.nickName}</h2>
        <div style={{ color: '#9e9eb1', fontSize: '16px', float: ' left', margin: '5px 0px 0px 0px' }}>
          <span style={{ float: 'left', fontSize: '15px' }}>{summoner.wins}승 {summoner.losses}패</span><br />
          <span style={{ float: 'left', fontSize: '18px', margin: '1px 0px 0px 0px' }}>승률({parseInt(summoner.wins / (summoner.wins + summoner.losses) * 100)}%)</span>
        </div>
      </div >
    )
  }

  return (
    <div style={divStyle}>
      <Tier /> <Info />
    </div>
  );
};

//검색한 소환사의 게임(대전) 기록을 나타내는 컴포넌트
const History = ({ histories }) => {

  const divStyle = {
    textAlign: 'center',
    // border: '1px solid blue',
    color: 'white'
  }

  const listStyle = (result) => {
    return {
      listStyle: 'none',
      border: '2px solid' + (result) ? '#27344e' : '#e84057',
      borderRadius: '4px',
      margin: '10px 30% 10px 30%',
      width: '740px',
      height: '100px',
      background: (result) ? '#27344e' : '#59343b'
    }
  };

  //검색한 소환사의 게임기록(histories)의 값 중 champion데이터를 이용하여 그에 맞는 사용한 챔피언 이미지를 리턴해주는 함수
  const championImg = (champion) => {
    switch (champion) {
      case '야스오':
        return YasuoImg;
      case '리신':
        return LeeSinImg;
      case '이즈리얼':
        return EzrealImg;
      case '요네':
        return YoneImg;
      case '아리':
        return AhriImg;
      case '신드라':
        return SyndraImg;
      case '제드':
        return ZedImg;
      case '아칼리':
        return AkaliImg;
      case '신짜오':
        return XinZhaoImg;
      case '킨드레드':
        return KindredImg;
      case '블리츠크랭크':
        return BlitzcrankImg;
      case '이렐리아':
        return IreliaImg;
      case '루시안':
        return LucianImg;
      case '케이틀린':
        return CaitlynImg;
      case '아트록스':
        return AatroxImg;
      case '쓰레쉬':
        return ThreshImg;
      case '조이':
        return ZoeImg;
      case '노틸러스':
        return NautilusImg;
    }
  }

  //position데이터를 이용하여 사용한 스펠 이미지를 리턴해주는 함수
  const spellCheck = (position) => {
    switch (position) {
      case '탑':
        return TeleportImg;
      case '정글':
        return SmiteImg;
      case '미드':
        return FireImg;
      case '원딜':
        return HealImg;
      case '서폿':
        return ExhaustImg;
    }
  }

  //histories값 중에서 해당 게임에서 사용한 아이템이 저장되어있는 items배열 안에 저장되어 있다.
  //각각의 item원소에 맞는 아이템 이미지를 리턴해주는 함수이다.
  const itemImg = (item) => {
    switch (item) {
      case '몰락한왕의검':
        return 몰락한왕의검;
      case '삼위일체':
        return 삼위일체;
      case '무한의대검':
        return 무한의대검;
      case '망각의구':
        return 망각의구;
      case '로켓벨트':
        return 로켓벨트;
      case '돌풍':
        return 돌풍
      case '월식':
        return 월식;
      case '세릴다의원한':
        return 세릴다의원한;
      case '자객의발톱':
        return 자객의발톱;
      case '해신작쇼':
        return 해신작쇼;
      case '지크의융합':
        return 지크의융합;
      case '굶주린히드라':
        return 굶주린히드라;
      case '마법사의최후':
        return 마법사의최후;
      case '존야의모래시계':
        return 존야의모래시계;
      case '도란의검':
        return 도란의검;
      case '도란의링':
        return 도란의링;
      case '도란의방패':
        return 도란의방패;
      case '선혈포식자':
        return 선혈포식자;
      case '죽음의무도':
        return 죽음의무도;
      case '칠흑의양날도끼':
        return 칠흑의양날도끼;
      case '그림자불꽃':
        return 그림자불꽃;
      case '징수의총':
        return 징수의총;
      case '고속연사포':
        return 고속연사포;
      case '루덴의폭풍':
        return 루덴의폭풍;
      case '공허의지팡이':
        return 공허의지팡이;
      case '만년서리':
        return 만년서리;
      case '크라켄학살자':
        return 크라켄학살자;
      case '수호천사':
        return 수호천사;
      case '타곤산':
        return 타곤산;
      case '솔라리':
        return 솔라리;
      case '얼음정수':
        return 얼음정수;
      case '무라마나':
        return 무라마나;
      case '불멸의철갑궁':
        return 불멸의철갑궁;
      case '광전사의군화':
        return 광전사의군화;
      case '판금장화':
        return 판금장화;
      case '마법사의신발':
        return 마법사의신발;
      case '핑크와드':
        return 핑크와드;
      default:
        return;
    }
  }

  const spell = {
    border: 'none',
    borderRadius: '4px',
    width: '35px',
    height: '35px',
    marginRight: '2px'
  };

  const itemListStyle = (result) => {
    return {
      float: 'left',
      background: (result) ? '#2f436e' : '#703c47',
      width: '40px',
      height: '40px',
      // border: '1px solid' + (result) ? '#27344e' : '#e84057',
      borderRadius: '5px',
      marginRight: '3px',
      overFlow: 'hidden',
      padding: '0px'
    }
  };

  //해당 게임에서 사용한 토템에 맞는 이미지를 리턴해주는 함수.
  const totemImg = (totem) => {
    switch (totem) {
      case '와드':
        return 와드;
      case '렌즈':
        return 렌즈;
      case '구슬':
        return 구슬;
    }
  }

  return (
    <div style={divStyle}>
      <h2 style={{ textAlign: 'left', marginLeft: '30%', color: '#9e9eb1' }}>* 최근 {histories.length}판 전적 </h2>
      {histories.map(({ champion, position, result, kda, items, totem }, i) => {
        return (
          <li key={champion + result + kda + i} style={listStyle(result)}>
            <div style={{ float: 'left', width: '110px', height: '100px' }}>
              <div style={{ margin: '10px 10px 0px 10px', textAlign: 'left', fontWeight: 'bold', color: (result) ? '#4e7bd7' : '#e84057' }}>{(i % 2) ? '일반' : '랭크'}</div>
              <div style={{ borderTop: '1px solid grey', margin: '20px 10px 10px 10px', paddingTop: '10px', textAlign: 'left', color: '#9e9eb1' }}>
                {(result) ? '승리' : '패배'} : {position}
              </div>
            </div>
            {/* 챔피언아이콘 */}
            <div style={{ float: 'left', width: '110px', height: '100px' }}>
              <img src={championImg(champion)} alt="챔피온" style={{ border: '1px solid' + (result) ? '#27344e' : '#e84057', borderRadius: '36px', width: '72px', height: '72px', margin: '12px 18px 12px 18px' }} />
            </div>
            {/* 스펠 및 KDA */}
            <div style={{ float: 'left', width: '110px', height: '100px' }}>
              <div style={{ margin: '13px 0px 0px 0px', float: 'left' }}>
                <img style={spell} src={spellCheck(position)} /><br />
                <img style={spell} src={FlashImg} />
              </div>
              <div style={{ margin: '37px 0px 0px 55px', fontSize: '20px', fontWeight: 'bold' }}>{kda[0]}
                <span style={{ color: '#7b7a8e', margin: '0 2px 0 2px' }}>/</span>
                <span style={{ color: 'red' }}>{kda[1]}</span>
                <span style={{ color: '#7b7a8e', margin: '0 2px 0 2px' }}>/</span>
                {kda[2]}</div>
            </div>
            {/* 아이템리스트 */}
            <div style={{ float: 'left', width: '400px', height: '100px' }}>
              <div style={{ height: '40px', margin: '30px 0px 0px 45px' }}>
                {items.map((item, i) => (
                  <li key={item + i}><img src={itemImg(item)} style={itemListStyle(result)} /></li>
                ))}
                <img src={totemImg(totem)} style={{ borderRadius: '19px', width: '38px', height: '38px', float: 'left', margin: '0px 0px 0px 5px' }} />
              </div>
            </div>
          </li>
        )
      })}
    </div>
  )
};

const Search = ({ setSearchId, summoners, historySearch, searchName, setSearchName }) => {

  const inputStyle = { border: 'none', outline: 'none', width: '350px', height: '38px', fontSize: '22px' };
  const buttonStyle = {
    float: 'right',
    border: 'none',
    borderRadius: '16px',
    width: '60px',
    height: '40px',
    backgroundColor: 'rgba(0, 79, 255, 0.8)',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0px 0px 0px 0px',
    cursor: 'pointer'
  };


  //searchName값에 검색창에 입력한 닉네임이 저장.
  const handleInput = e => { setSearchName(e.target.value) };

  //검색 버튼을 눌렀을 때 실행되는 함수.
  //아무것도 입력하지 않고 누르면 아무일도 안일어남.
  //소환사 리스트에서 입력한 소환사 닉네임이 있는지 탐색한다. 없으면 찾을 수 없다고 알림.
  //있으면 찾은 소환사의 고유 id값을 searchId값에 저장한다.
  //그리고 검색창 초기화
  //게임기록을 검색하는 historySearch함수 실행
  const handleSearch = () => {
    if (searchName === '') return;
    const summoner = summoners.find((s) => s.nickName == searchName);
    if (summoner == undefined) {
      alert('소환사를 찾을 수 없습니다.');
      return;
    }
    setSearchId(summoner.id);
    setSearchName('');
    historySearch();
  }

  return (
    <div style={{ textAlign: 'center', border: '1px solid black', borderRadius: '20px', margin: '37px 35% 37px 35%', height: '40px', background: 'white' }}>
      <input style={inputStyle} placeholder={"소환자명..."} onChange={handleInput} value={searchName} />
      <button style={buttonStyle} onClick={handleSearch} >검색</button>
    </div>
  )
};