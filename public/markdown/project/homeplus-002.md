#### 주요 작업

- API 명세를 기준으로 any로 처리되던 Request/Response 구조를 DTO 기반 타입으로 재정의
- 화면에서 사용하는 데이터 구조와 API 스펙 간 타입 매핑 정리

#### 문제점

**기존 로그인 확인 API 호출 방식**

`const res = await requestAPI(APIList.loginCheck);`

- 호출 과정
  - `APIList.loginCheck`에서 HTTP 메서드와 URL 조회
  - `requestAPI`를 통해 Axios 요청 전송
  - 서버 응답을 `res`로 반환

`APIList.loginCheck`에는 API 경로 정보만 정의

```javascript
loginCheck: {
    method: 'get',
    url: '/user/login/getDisplayUserInfo.json'
}
```

경로 정보만으로는 `res`의 타입을 확인할 수 없고, `requestAPI`의 응답 타입 기본값이 `any`로 선언된 구조

```javascript
interface RequestAPI<
    T = DefaultRequestAPIParams,
    U = any
> {
    (
        args: IAPIListItem,
        params?: T
    ): Promise<AxiosResponse<U>>;
}
```

호출 시 제네릭 타입 `U`를 지정하지 않으면 기본값인 `any` 적용

```javascript
const res = await requestAPI(APIList.loginCheck);
// res: AxiosResponse<any>
// res.data: any
```

존재하지 않거나 오타가 있는 필드도 TypeScript 오류 없이 작성 가능

```javascript
res.data.loginInfo.userName;
res.data.notExistingProperty;
res.data.오타가있는필드;
```

- 컴파일 감지 불가
- 런타임 오류 확인 가능
- 핵심 문제
  - `requestAPI` 사용 자체가 아닌 응답 타입의 기본값
  - 호출부에서 응답 타입을 생략하면 `any`가 적용되는 구조

#### 개선

![폴더 구조](/images/project/directory.png)

**디렉터리 및 파일별 역할 분리**

- `common`: Axios 인스턴스 생성 로직
- `model`: API 통신 관련 타입
  - `dto`: 객체 타입 정의
  - `req`: 요청 파라미터 타입 정의
  - `res`: 응답 데이터 타입 정의
- `path`: Swagger에 정의된 API 경로
- `httpClient.ts`: 공통으로 사용하는 기본 Axios 인스턴스

**API 호출 구조**

```javascript
httpClient.get<응답 타입>(API 경로);
```

- 응답 타입과 API 경로를 호출부에서 명시

```javascript
const res = await httpClient.get<resLoginInfoDto>(
    LoginControllerPath.getLoginInfoUsingGet
);
```

**API 경로 정의**

- 문자열 직접 입력 대신 Swagger 기준의 Path 상수 사용

```javascript
export const LoginControllerPath = {
    getLoginInfoUsingGet:
        '/user/login/getDisplayUserInfo.json'
};
```

**응답 타입 정의**

- API 응답 구조를 `resLoginInfoDto`로 정의
- 응답 데이터, 코드, 메시지, 상태값의 타입 명시

```javascript
export type resLoginInfoDto = {
    data?: LoginInfoDto;
    returnCode?: string;
    returnMessage?: string;
    returnStatus?: number;
};
```

- `data` 내부의 로그인 정보를 별도 DTO로 분리

```javascript
export type LoginInfoDto = {
    loginInfo?: LoginUserInfoDto;
    loginUserGradeInfo?: LoginUserGradeInfoDto;
    storeIds?: StoreIds;
};
```

**타입 적용 결과**

- TypeScript에서 `res`와 `res.data`의 구조 확인 가능

```javascript
const res = await httpClient.get<resLoginInfoDto>(
    LoginControllerPath.getLoginInfoUsingGet
);

// res: resLoginInfoDto
// res.data: LoginInfoDto | undefined
```

- 존재하는 필드에 대한 자동완성 제공

`res.data?.loginInfo?.userType;`

- 존재하지 않는 필드 사용 시 컴파일 단계에서 오류 발생

```javascript
res.data?.notExistingProperty;
//          ^ TypeScript 오류
```
