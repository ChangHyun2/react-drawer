https://codesandbox.io/s/github/ChangHyun2/react-drawer/tree/main/

# react-drawer
Created with CodeSandbox

## 생각해보기

- 애니메이션 popup에 대한 관심만 분리해서 훅으로 구현
- try.jsx에서 시도해봤는데 무한루프 돔

## 수정하기

- 백드랍 / 컨텐츠 / Drawer 분리하기 (z index 고려)
- Drawer Toggler로 setOn할 때 `e.stopPropagation`이 필요할 때도 있음
- onClose를 children에서 사용할 수 있도록 renderProp 패턴으로 
