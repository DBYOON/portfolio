![홈플러스 CMS 제작 화면](/images/project/cms.png)

#### 개요

**마케팅·운영 조직이 개발자 의존도를 낮추고 페이지를 직접 구성할 수 있는 CMS 제작 환경 구축**

#### 주요 작업

- CMS 전체 레이아웃 개발
- 사용자별 해상도·디바이스에 대응하는 적응형 UI 설계
- 전시 여부·노출, SEO 메타 정보 등 페이지 설정 기능 개발
- 실시간 미리보기, 디바이스 별 시뮬레이션 기능을 제공하는 Preview(프리뷰) 개발
- 네비게이션 탭, 공유하기, 이미지 업로드, 텍스트 등 컴포넌트 개발
- shadcn(Tailwindcss Base) 도입 검토

#### 사용성 개선

**1. 실시간 미리보기 Preview(프리뷰) 개발**

CMS 관리자가 페이지를 편집하면서 컴포넌트의 내용, 스타일, 레이아웃 배치 등 변경 결과를 즉시 확인할 수 있도록 실시간 Preview 기능을 개발

![실시간 프리뷰 데이터 반영](/images/project/preview-flow.png)

CMS 레이아웃은 컴포넌트가 중첩된 트리 구조
```javascript
const layoutData = {
    pageInfo: {
        layout: {
            id: 'root',
            children: [
                {
                    id: 'comp-1',
                    componentType: 'Container',
                    props: {},
                    children: [
                        {
                            id: 'comp-2',
                            componentType: 'Image',
                            props: {
                                imageUrl: 'old-image.jpg',
                                imageAlt: '기존 이미지'
                            },
                            children: []
                        }
                    ]
                }
            ]
        }
    }
};
```
위 구조에서 `comp-2`를 찾으려면 다음 구조를 탐색해야 합니다.

```text
pageInfo → layout → children → comp-1 → children → comp-2
```

❗ 매번 전체 트리를 재귀 탐색하면 편집 할 때마다 검색 비용과 구현 복잡도 증가

💡 위 문제를 해결하기 위해 컴포넌트 ID와 레이아웃 내부 경로를 연결하는 layoutIdMap 생성

```javascript
const layoutIdMap = {
    root: 'pageInfo.layout',
    'comp-1': 'pageInfo.layout.children:comp-1',
    'comp-2': 'pageInfo.layout.children:comp-1.children:comp-2'
};
```
