Rest api를 이용한 롤 전적 검색

server폴더
- summoner.json : 소환사 정보 -> 3001포트에 서버돌리기
- history.json : 소환사 대전기록 정보 -> 3002포트에 서버돌리기

명령어
- json-server --watch ./summoner.json --port 3001
- json-server --watch ./history.json --port 3002

예제 소환사 닉네임-> 검색창에 입력해보기
- 직진개
- Faker
- JustLikeThat
- 두웬사냥꾼
- 추억에살아
- 영똑2
- 화희
- BioScience
- TXT최수빈

이 웹의 기능은 League of Legends(LOL : https://www.leagueoflegends.com/ko-kr/)에 대한 웹입니다. 자유 주제인 만큼 제가 다룰 수 있는 코딩 기술을 가지고 만들고 싶은 웹을 개발하고 싶었습니다. 바로 League of Legends 전적 검색 사이트입니다. 실제로 전적 검색. 사이트는 이미 여러 사이트가 있습니다. 대표적인 사이트는 OP.GG(https://fow.kr/), FOW.KR(https://fow.kr/)등이 있습니다. League of Legends게임 상의 닉네임을 검색하면 그 해당 플레이어의 게임 기록을 보여주는 것이 이 웹의 목적입니다. 실제로 제가 하는 좋아하는 게임이고, 제가 할 수 있는 React와 rest api를 통해 구현해보자고 결심했습니다. 실제로 전적 검색을 하려면 게임 측에서 API신청을 하고 서버를 받아와야 하는데 얼마나 걸릴지 모르기 때문에 시간 상의 문제로 예제 json파일을 제가 직접 만들었습니다. 총 2개의 summoner.json, history.json파일입니다. 

LOL게임에서의 플레이어는 “소환사(summoner)”라는 명칭으로 불립니다. 소환사가 대전을 할 때마다 162명의 챔피언 중 한 명을 선택하여 게임을 플레이합니다.

만들어 놓은 예제 닉네임
	직진개 , Faker , JustLikeThat , 두웬사냥꾼 , 추억에살아, 영똑2 , 화희
	검색창에 위 닉네임들을 검색.

summoner.json 설명
여러 소환사들의 정보가 담겨있는 소환사 목록입니다. 값으로는 id, nickname, wins, losses, tier, rank가 있습니다. id는 고유 id, nickName은 게임 상의 닉네임, wins는 승리, losses는 패배한 게임 수입니다. tier와 rank는 해당 소환사의 등급입니다.

history.json 설명
소환사들의 대전기록 목록입니다. 값으로는 id, matchHistory이 있습니다. Id는 summoners.json의 id값과 같습니다. matchHistory는 배열타입으로 해당 소환사의 대전기록 리스트입니다. 여러개의 대전이 있는데, 각 대전에 들어가는 값으로는 champion, position, result, kda, items, totem이 있습니다. Champion는 해당 대전에서 사용한 챔피언, position은 역할, result는 승패여부, kda는 kill, death, assist의 약자로 해당 게임에서 킬, 죽음, 어시스트 수입니다. Items는 배열타입으로 해당게임에서 사용한 아이템목록입니다. 최대 6개까지 아이템을 가질 수 있습니다. Totem도 하나의 서브 아이템이라고 생각하면 되고 1개를 사용할 수 있습니다. 이러한 엔트리 구성으로 여러 소환사들의 대전기록을 모아둔 파일이 history.json파일 입니다.

변수설명
종류 : summoners, summoner, searchName, searchId, histories, toggle
summoners - summoner.json파일에서 fetch-get하여 저장할 소환사배열(리스트).
summoner - 검색창에 적은 닉네임을 가지고 summoners에서 탐색하여 찾은 소환사.
searchName - 검색창에 적은 닉네임.
searchId – searchName으로 summoners에서 찾은 소환사의 고유 id를 저장.
Histories – searchId값으로 history.json에서 해당 소환사 대전기록을 탐색하여 그 기록을 저장
Toggle – true, false값을 가지며 상태의 변화를 알려 렌더링을 쉽게하기 위함.

힘수설명
코드 105 라인 useEffect문 – 처음 실행될 때 summoner.json서버에서 데이터를 받아와 summoners변수에 저장.


코드 112 라인 useEffect문 – toggle상태가 바뀔 때마다 history.json서버에서 데이터를 받아와 searchId값과 id가 같은 데이터(검색 대상 소환사의 대전기록)를 histories변수에 저장.

코드 121 라인 useEffect문 – toggle상태가 바뀔 때마다 summoners배열에서 searchId값과 id가 같은 데이터(검색 대상 소환사의 정보)를 summoner변수에 저장.

컴포넌트 설명
종류 : Search, SummonerInfo, History

Search 컴포넌트 – 검색창 부분
Input창에 닉네임을 적을 때마다 handleInput를 실행하여 searchName을 갱신한다.
검색버튼을 누르면 handleSearch함수가 실행되어 summoners배열에서 검색한 닉네임을 가지는 소환사를 찾아 해당 소환사의 고유id를 searchId에 저장. 그 다음 historySearch함수를 실행하여 toggle상태를 변경시켜 useEffect를 실행하여 update.

SummonerInfo 컴포넌트 – 소환사 상태 정보를 나타내는 부분
Tier함수 – 해당 소환사의 tier정보에 맞는 티어 이미지를 리턴.
티어, 닉네임, 판수, 승률을 나타냄. 

History 컴포넌트 – 대전기록을 리스트로 나타내는 부분
ChampionImg 함수 – histories의 champion값에 맞는 챔피언 이미지를 리턴
spellCheck 함수 – histories의 position값에 맞는 스펠 이미지를 리턴
itemImg 함수 – histories의 items배열의 각 원소(item)에 맞는 아이템 이미지를 리턴
totemImg 함수 – histories의 totem값에 맞는 토템 이미지를 리턴

<img width="1648" alt="스크린샷 2023-01-13 오후 2 37 42" src="https://user-images.githubusercontent.com/114221785/212245700-65bca765-bff9-4bc4-9d5e-f1b4ae34505d.png">
<img width="1648" alt="스크린샷 2023-01-13 오후 2 39 08" src="https://user-images.githubusercontent.com/114221785/212245727-df83b188-4913-4111-ab56-761dd3a63ffa.png">
<img width="1648" alt="스크린샷 2023-01-13 오후 2 39 22" src="https://user-images.githubusercontent.com/114221785/212245740-0556332e-f738-417e-9194-d672e5e0e372.png">

