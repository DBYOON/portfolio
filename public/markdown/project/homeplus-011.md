#### 개요

**상품 리뷰의 사용성을 높이기 위해 기존 리뷰 영역을 개선한 프로젝트입니다.**

#### 주요 작업

- 상품 리뷰 콘텐츠 영역 공통 컴포넌트 개발
- 상품 리뷰 그래프, 별점 등 만족도 통계 개선
- 상품 리뷰 좋아요 기능 타 사이트 동작 분석 및 추가
- 포토 리뷰, 베스트&AI추천 리뷰, 전체 리뷰 추가

#### 문제 해결

**1. WebView 간 리뷰 좋아요 상태 동기화 개선**

상품상세와 리뷰 화면이 서로 다른 WebView에서 독립적으로 상태를 관리해 리뷰 화면의 좋아요 변경이 상품상세에 미반영

**AS-IS**

- 리뷰 전용 WebView에서는 좋아요가 반영됨
- 상품상세 WebView에서는 기존 좋아요 여부와 개수가 유지됨
- 사용자가 상품상세로 돌아왔을 때 동일 리뷰의 상태가 화면마다 다르게 노출됨
- 최신 상태를 확인하려면 데이터를 다시 조회하거나 화면을 새로고침해야 함

**TO-BE**

리뷰 WebView에서 좋아요 변경 시 `reviewNo`, `likeYn`, `likeCnt`를 `BroadcastChannel('review_like_update')`로 전달합니다. 상품상세 WebView는 동일한 채널을 구독하고 있다가 메시지를 수신해 동일 리뷰가 포함된 전체·포토·베스트 리뷰 캐시를 갱신하여 좋아요 상태를 즉시 동기화합니다.

**2. 포토·베스트 리뷰 슬라이드 데이터 구조 개선**

**구조 설명 및 문제점**

- 리뷰 API는 리뷰 한 건에 여러 이미지가 포함된 **리뷰 중심 구조**
- 전체보기 UI는 리뷰 이미지 한 장을 하나의 슬라이드로 표시하는 **이미지 중심 구조**
- 즉, **API의 리뷰 기준 데이터 구조와 UI의 이미지 기준 렌더링 구조가 불일치하는 문제**

😅 Swiper는 현재 슬라이드 위치를 하나의 `activeIndex`로 제공하기 때문에, 중첩 구조(API 리뷰 기준)를 유지하면 다음과 같은 추가 관리가 필요

- `activeIndex`를 `reviewIndex`와 `imageIndex`로 변환
- 현재 이미지가 속한 리뷰 탐색
- 리뷰 경계를 넘어갈 때 본문·작성자·좋아요 정보 변경
- 클릭한 리뷰의 시작 슬라이드 위치 계산
- 이전·다음 페이지 추가 시 리뷰와 이미지 index 동기화

👉 현재 UI는 리뷰가 아닌 **이미지 한 장을 하나의 슬라이드로 사용**하기 때문에, 두 index를 매핑하는 것보다 데이터를 이미지 기준으로 평탄화하는 방식이 UI 구조에 더 적합하다고 판단

**AS-IS**

```ts
// 리뷰 API 응답
[
  {
    reviewNo: 101,
    userId: 'userA',
    contents: '좋아요',
    likeCnt: 5,
    imageList: [
      { imgUrl: 'A-1.jpg', imgDesc: '이미지 설명1' },
      { imgUrl: 'A-2.jpg', imgDesc: '이미지 설명2' },
    ],
  },
];
```

리뷰 내부에 이미지 리스트가 중첩되어 있어 특정 이미지에 접근하려면 리뷰와 이미지 index가 모두 필요

```ts
const currentImage = reviews[reviewIndex].imageList[imageIndex];
```

반면 Swiper는 전체 이미지의 위치를 하나의 `activeIndex`로 관리

```text
activeIndex 0 → reviews[0].imageList[0]
activeIndex 1 → reviews[0].imageList[1]
activeIndex 2 → reviews[1].imageList[0]
```

❗ 따라서 다음과 같은 복잡성이 발생

- 리뷰 index와 이미지 index를 이중 관리
- Swiper index와 중첩 데이터 위치 간 매핑 로직 필요
- 슬라이드 이동 시 현재 리뷰 정보 동기화 필요
- 페이지 추가 시 index 불일치 가능성 증가

**TO-BE**

`flatMap`을 사용해 각 이미지에 원본 리뷰 정보를 결합하고 이미지 기준의 평탄한 배열로 변환

```ts
// 이미지 기준 배열로 변환
const reviewFlatList = flatListPhoto.flatMap((review) => {
  if (review.imageList.length === 0) {
    return [];
  }

  return review.imageList.map((image) => ({
    ...review,
    ...image,
  }));
});
```

```ts
// 이미지 평탄화 데이터
[
  {
    reviewNo: 101,
    userId: 'userA',
    contents: '좋아요',
    likeCnt: 5,
    imgUrl: 'A-1.jpg',
    imgDesc: '이미지 설명1',
  },
  {
    reviewNo: 101,
    userId: 'userA',
    contents: '좋아요',
    likeCnt: 5,
    imgUrl: 'A-2.jpg',
    imgDesc: '이미지 설명2',
  },
];
```

평탄화된 배열을 순회해 배열 원소 1개당 Swiper 슬라이드 1개를 생성

```tsx
{
  reviewFlatList.map((reviewImage, index) => (
    <SwiperSlide key={`review-image-${index}`} virtualIndex={index}>
      <img src={reviewImage.imgUrl} alt="리뷰 이미지" />
    </SwiperSlide>
  ));
}
```

👌 이에 따라 배열 index와 Swiper 슬라이드 index가 1:1로 대응

```text
reviewFlatList[0] ↔ SwiperSlide[0]
reviewFlatList[1] ↔ SwiperSlide[1]
reviewFlatList[2] ↔ SwiperSlide[2]
```

👍 슬라이드 이동 시에도 Swiper의 `activeIndex`만으로 현재 이미지와 해당 리뷰 정보에 바로 접근 가능

```ts
const activeReview = reviewFlatList[swiper.activeIndex];

console.log(activeReview.imgUrl); // 현재 이미지
console.log(activeReview.reviewNo); // 이미지가 속한 리뷰번호
console.log(activeReview.contents); // 현재 리뷰 내용
```

**개선 결과**

- 리뷰와 이미지 index 이중 관리 제거
- Swiper index와 데이터 index 간 별도 매핑 로직 제거
- `activeIndex`만으로 현재 이미지와 리뷰 정보 조회
- 슬라이드 이동 시 내용·작성자·좋아요 정보 동기화 단순화
- 클릭한 리뷰의 이미지부터 전체보기 시작 가능
- 포토·베스트 리뷰에 동일한 전체보기 구조 적용
- 이전·다음 페이지를 포함한 연속 이미지 탐색 구현
