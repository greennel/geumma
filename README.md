# GEUMMA 배포 가이드

이 폴더를 그대로 GitHub + Vercel에 올리면, 무료로 `geumma.vercel.app` 같은 실제 주소로 사이트를 열 수 있어요.

## 1. Anthropic API 키 발급받기
1. https://console.anthropic.com 접속 후 로그인 (Claude.ai 계정과는 별개예요)
2. 왼쪽 메뉴에서 **API Keys** → **Create Key**
3. 생성된 키(`sk-ant-...`로 시작)를 복사해서 잠깐 메모장에 보관 (다시는 못 봐요, 잃어버리면 새로 만들어야 해요)
4. 참고: 이 키는 사용량만큼 별도로 과금돼요 (Claude Pro 구독과는 별개의 요금이에요). 소규모 개인 프로젝트면 한 달에 몇 천 원 수준일 확률이 높아요.

## 2. GitHub에 코드 올리기
1. https://github.com 가입 (이미 있으면 생략)
2. 오른쪽 위 **+** → **New repository**
3. Repository name에 `geumma` 입력 → **Create repository**
4. 이 폴더(`geumma-site`) 안의 파일들을 그 저장소에 업로드
   - 웹에서 바로 하려면: 저장소 페이지 → **Add file** → **Upload files** → 이 폴더의 파일 전부 드래그 앤 드롭 → **Commit changes**

## 3. Vercel로 배포하기
1. https://vercel.com 접속 → **Sign Up** → "Continue with GitHub"로 가입 (계정 연동해두면 편해요)
2. 로그인 후 **Add New** → **Project**
3. 방금 만든 `geumma` 저장소를 찾아서 **Import**
4. **Project Name**을 `geumma`로 입력 (이게 주소가 돼요 → `geumma.vercel.app`)
   - 이미 다른 사람이 쓰고 있으면 `geumma-news`처럼 살짝 바꿔야 할 수도 있어요
5. **Environment Variables**를 펼쳐서:
   - Name: `ANTHROPIC_API_KEY`
   - Value: 1단계에서 복사해둔 키
   - **Add** 클릭
6. **Deploy** 클릭 → 1~2분 기다리면 완료
7. 완료되면 `https://geumma.vercel.app` (또는 배정된 주소)로 실제 접속 가능해요

## 4. 이후 수정할 때
코드를 고치고 싶으면:
- GitHub 저장소에서 파일을 다시 업로드(Upload files)하고 Commit하면
- Vercel이 자동으로 감지해서 몇 초 안에 새 버전을 다시 배포해요 (따로 뭘 누를 필요 없어요)

## 참고
- 뉴스 검색(GDELT)은 키가 필요 없어서 그대로 잘 작동해요.
- 요약/번역은 이제 `/api/claude`라는 자체 백엔드를 통해서 동작해요 — API 키가 브라우저에 노출되지 않고 서버(Vercel)에만 안전하게 저장돼요.
- 즐겨찾기는 이 사이트에서는 브라우저의 localStorage에 저장돼요 (그 브라우저·그 기기에서만 유지돼요).
