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

_**CMS 레이아웃은 컴포넌트가 중첩된 트리 구조**_

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
                imageAlt: '기존 이미지',
              },
              children: [],
            },
          ],
        },
      ],
    },
  },
};
```

위 구조에서 `comp-2`를 찾으려면 다음 구조를 탐색해야 합니다.

```text
pageInfo → layout → children → comp-1 → children → comp-2
```

❗ 매번 전체 트리를 재귀 탐색하면 편집 할 때마다 검색 비용과 구현 복잡도 증가

💡 위 문제를 해결하기 위해 컴포넌트 ID와 레이아웃 내부 경로를 연결하는 layoutIdMap 생성

_**`createIdMap()`은 전체 레이아웃(최상위부터 하위 컴포넌트까지)을 재귀적으로 순회하면서 컴포넌트 `id`와 데이터 경로를 `idMap`에 저장하는 함수**_

```javascript
function createIdMap(
    obj: any,
    parentPath = '',
    idMap: Record<string, string> = {}
) {
    // 1. 현재 보고 있는 객체의 속성을 하나씩 확인합니다.
    // 예: pageInfo, layout, children, props
    Object.entries(obj).forEach(([key, value]) => {
        // 2. 객체 또는 배열인 경우에만 하위 데이터를 계속 확인합니다.
        if (typeof value !== 'object' || value === null) {
            return;
        }

        // 3. 재귀 탐색 중 지나온 위치를 계속 연결하여 나중에 루트부터 대상 컴포넌트까지 찾아갈 수 있는 전체 주소를 만드는 역할
        // 예: "pageInfo" + "layout" → "pageInfo.layout"
        const newPath = parentPath ? `${parentPath}.${key}` : key;

        // 4. children 배열을 만나면 배열 안의 각 컴포넌트를 확인
        if (key === 'children' && Array.isArray(value)) {
            value.forEach((child) => {
                // 5. children 경로에 컴포넌트 ID를 붙여 대상 위치를 구분
                // 예: "pageInfo.layout.children:comp-1"
                const childPath = `${newPath}:${child.id}`;

                // 6. 컴포넌트 ID를 key, 생성한 경로를 value로 저장
                // 예: idMap["comp-1"] = "pageInfo.layout.children:comp-1"
                idMap[child.id] = childPath;

                // 7. 하위 트리를 계속 탐색하기 위해 현재 컴포넌트로 재귀 호출
                createIdMap(child, childPath, idMap);
            });
        } else {
            // 8. pageInfo, layout, props 같은 중첩 객체 내부 탐색
            createIdMap(value, newPath, idMap);
        }
    });

    // 9. 모든 탐색이 끝나면 ID와 경로가 연결된 Map을 반환합니다.
    return idMap;
}
```

_**layoutIdMap 생성**_

```javascript
const layoutIdMap = createIdMap(layoutData);
// 생성 예시
const layoutIdMap = {
  'comp-1': 'pageInfo.layout.children:comp-1',
  'comp-2': 'pageInfo.layout.children:comp-1.children:comp-2',
};
```

_**선택한 컴포넌트 ID로 데이터 경로 조회**_

```javascript
const selectedComponentId = 'comp-2'; // 컴포넌트 선택 ID
const componentPath = layoutIdMap[selectedComponentId]; // layoutIdMap에서 컴포넌트의 경로 조회
// 조회
pageInfo.layout.children:comp-1.children:comp-2
```

_**조회한 경로를 이용해 컴포넌트 속성 변경**_

```javascript
const currentComponent = messageHandler.getComponentById(selectedComponentId);

messageHandler.handleAction({
  path: componentPath,
  targetKey: 'props',
  data: {
    ...currentComponent.props,
    imageUrl: 'new-image.jpg',
  },
});
```

_**변경된 레이아웃을 Redux에 반영**_

```javascript
dispatch.cms.layoutReRender(messageHandler.currentLayoutData);
```

_**👍 Redux의 pageLayoutInfo가 갱신 > 컴포넌트 재렌더링 > Preview 노출**_
