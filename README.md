## 주요 컴포넌트 및 기능

### `KakaoLoginButton.tsx`
- **기능**: 카카오 로그인 버튼을 렌더링하고, 버튼 클릭 시 카카오 로그인 프로세스를 시작합니다.
- **주요 코드**:
  - **카카오 SDK 초기화**: `window.Kakao.init(KAKAO_JS_KEY);`
    - 카카오 SDK를 초기화하여 사용할 준비를 합니다.
  - **로그인 요청**: `window.Kakao.Auth.authorize({ redirectUri: REDIRECT_URI });`
    - 카카오 로그인 버튼을 클릭하면 카카오 인증 페이지로 리디렉션합니다.

### `KakaoCallback.tsx`
- **기능**: 카카오 인증 후 콜백을 처리하여 사용자 정보를 받아오고, 첫 로그인인지 기존 유저인지에 따라 리디렉션합니다.
- **주요 코드**:
  - **인증 코드 추출**: `const params = new URLSearchParams(window.location.search); const code = params.get("code");`
    - URL에서 인증 코드를 추출합니다.
  - **액세스 토큰 요청**: `const response = await axios.post("http://localhost:8080/auth/kakao", { code });`
    - 인증 코드를 백엔드 서버에 POST 요청하여 액세스 토큰을 받아옵니다.
  - **Recoil 상태 설정 및 리디렉션**: 
    ```javascript
    const { token, message } = response.data;
    const firstLogin = message === "none";
    setAuthState({ token, firstLogin, authCode: code });
    localStorage.setItem("kakaoToken", token);
    if (firstLogin) {
      navigate("/firstlogin");
    } else {
      navigate("/success");
    }
    ```

### `FirstLoginPage.tsx`
- **기능**: 첫 로그인 시 추가 정보를 입력받아 서버에 전송합니다.
- **주요 코드**:
  - **추가 정보 전송**: 
    ```javascript
    const response = await axios.post("http://localhost:8080/register", {
      nickname,
      gender,
      age,
      code: auth.authCode,
    });
    const { token } = response.data;
    localStorage.setItem("kakaoToken", token);
    navigate("/success");
    ```

## 상태 관리

### `authState.ts`
- **기능**: Recoil을 사용하여 인증 상태를 관리합니다.
- **주요 코드**:
  - `authState`: 인증 상태를 저장하는 Recoil Atom입니다. 토큰, 첫 로그인 여부, 인증 코드를 포함합니다.
