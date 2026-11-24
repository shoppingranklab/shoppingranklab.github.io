# 쇼핑순위연구소 공식 홈페이지

2012년부터 플랫폼을 직접 운영해 온 법인 **쇼핑순위연구소**의 원페이지 랜딩 사이트입니다.
정적 HTML/CSS/JS로만 구성되어 있어 별도 백엔드 없이 GitHub Pages에서 바로 동작합니다.

## 구성

| 경로 | 설명 |
| --- | --- |
| `index.html` | 전체 페이지 마크업(히어로·진단 시뮬레이터·솔루션·채널·프로세스·CTA·푸터) |
| `styles.css` | 디자인 시스템, 반응형 레이아웃, 키프레임 애니메이션 |
| `script.js` | 스크롤 리빌, 카운트업, 진단 탭, 카드 틸트, 모바일 메뉴 |
| `assets/hero.webp` | 히어로 비주얼 |
| `assets/data-insight.webp` | 데이터 섹션 비주얼 |
| `assets/channel.webp` | 정보교류방 섹션 비주얼 |
| `assets/keyword-network.webp` | 하단 CTA 배경 |
| `assets/hero-og.jpg` | SNS 공유 이미지(1200×675) |

## 연결된 링크

- 마케팅 1:1 오픈카톡 — https://open.kakao.com/o/smnMRaYi
- 쇼핑몰 운영자 정보교류방 — https://open.kakao.com/o/gnQHf3Xi
- 상담 전화 — `tel:01076129292` (표기 `010 7612 9292`)
- 네이버 블로그 — https://blog.naver.com/mediccenter
- 네이버 밴드 — https://band.us/@ranklab

## 배포

`main` 브랜치 루트가 그대로 GitHub Pages로 게시됩니다(`shoppingranklab.github.io` 저장소).

```bash
git add .
git commit -m "쇼핑순위연구소 홈페이지"
git push origin main
```

## 메모

- 진단 리포트·퍼널 화면은 상담 항목을 보여주는 **예시 UI**이며, 실제 결과 수치가 아닙니다.
- 사업자등록번호·법인명 등 푸터 정보는 전달받은 뒤 추가해야 합니다.
