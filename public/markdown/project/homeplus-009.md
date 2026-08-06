![홈플러스 챗봇 서비스 화면](/images/project/chatbot.png)

#### 개요

**네이티브 앱에서 운영 중인 CogInsight Cogbot을 홈플러스 웹·모바일웹에서도 이용할 수 있도록 확장하여 중장년층 사용자도 반복 문의를 더 쉽게 찾을 수 있도록 개선**

**실제 대화 시나리오와 메시지 처리는 CogInsight 서비스가 담당하며, 저희는 인증 토큰 API 연동, Cogbot SDK 실행 설정, 챗봇 팝업 PC·모바일 반응형 UI를 구현하였습니다.**

#### 주요 작업

- Cogbot Web SDK 연동 및 PC·모바일 반응형 팝업 구현
- 앱스킴을 활용한 WebView ↔ Native 통신 구현

**1. Cogbot Web SDK 연동 및 PC·모바일 반응형 팝업 구현**

**SDK 및 인증 토큰 연동**

사용자가 챗봇을 처음 실행할 때 홈플러스 백엔드에서 인증 토큰을 발급받고, 서비스 URL·봇 ID·실행 버전과 함께 Cogbot SDK를 초기화하였습니다. 운영 환경은 배포 버전(`prd`), 비운영 환경은 개발 버전(`dev`)을 사용하도록 분리하였습니다.

```ts
window.Cogbot.create(containerElement, {
    url, // 챗봇 서비스 주소
    botId, // 챗봇 ID
    version, // 챗봇 버전
    token, // AUTH_TOKEN 값
});
```

API Key와 인증 세부정보는 브라우저에 포함하지 않았습니다. 발급받은 토큰은 `ChatbotContainer`의 React 상태에 저장하고, 해당 컴포넌트가 마운트된 동안 재사용해 중복 요청을 방지하였습니다. 브라우저를 새로고침하면 상태가 초기화되어 토큰을 다시 요청합니다.

**Context 기반 챗봇 상태 공유**

푸터, 고객센터, 마이페이지 등 서로 다른 위치의 진입점에서 하나의 챗봇 팝업을 제어할 수 있도록 React Context 기반의 `ChatbotProvider`를 구성하였습니다.

단순 UI 상태를 Redux에 추가하지 않고 챗봇 도메인 내부에서 관리했으며, Provider와 `ChatbotContainer`를 라우트 상위에 배치해 페이지 이동 후에도 동일한 상태와 챗봇 인스턴스를 유지하도록 하였습니다.

**PC·모바일 반응형 팝업 UI**

동일한 챗봇을 PC와 모바일 웹에서 사용할 수 있도록 반응형 팝업을 구현하였습니다.

| 화면   | UI 형태                                             |
| ------ | --------------------------------------------------- |
| PC     | 우측 하단 `320 × 550px` 팝업 |
| 모바일 | 전체 화면 챗봇, 상단 타이틀과 닫기 버튼 제공        |

Cogbot이 생성하는 iframe이 컨테이너 전체 영역을 사용하도록 크기를 지정하고, 모바일에서는 페이지 스크롤과 독립적으로 챗봇을 사용할 수 있도록 고정 레이어로 구성하였습니다.

**2. 앱스킴을 활용한 WebView → Native 통신 구현**

홈플러스 앱의 WebView에서 Native 기능을 실행할 수 있도록 `toApp://` 앱스킴 호출을 구현하였습니다. WebView가 기능명과 파라미터를 전달하면 Native가 스킴을 해석해 챗봇 또는 별도 WebView를 실행합니다.

```ts
const callNative = (scheme: string) => {
    if (isApp) {
        window.location.href = `toApp://${scheme}`;
    }
};

const openChatbot = () => callNative('chatbot');
```

| 앱스킴                                               | Native 동작                        |
| ---------------------------------------------------- | ---------------------------------- |
| `toApp://chatbot`                                    | 네이티브 챗봇 실행                 |
| `toApp://openWebView?url={encodedUrl}&title={title}` | 전달받은 URL을 별도 WebView로 실행 |

프론트엔드는 앱스킴 요청의 생성과 호출을 담당하고, Native 앱은 전달받은 스킴을 해석해 실제 화면을 실행하도록 역할을 분리하였습니다.