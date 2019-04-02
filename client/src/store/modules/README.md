Ducks 구조 사용



# createAction

사실 action 생성자는 post = { type: POST, payload: {...}}과 같은 형식으로 만들었다. payload와 함께 해당 액션을 만들어 보낸다는 뜻이다. 하지만 post = createAction(POST)와 같이하면 " [POST]: (state, action) => return payload객체들 " 의 내용을 가지고 액션을 생성한다. 
createAction에는 3가지 파라미터가 들어갈 수 있다. 

1. 첫번째 파라미터에는 "액션타입"이 들어가야한다. 
2. 두번째 파라미터는 payload를 생성함수가 들어간다. createAction(POST, ({index, color}) => ({index,color}))로 사용하면 그대로 payload를 반환하는 것이다. 혹은 createAction(POST, ({index, color}) => axios.post('/posts', {index, color})로 사용하면 서버쪽으로 payload를 전달할 수도 있다.
3. 세번째 파라미터는 meta데이터를 생성하는 것이다.



예시 (post.js)

createAction(POST, postAPI.post)에서 postAPI.post는 함수형태.

postAPI.post = ({title, description, …}) => axios.post('/api/posts', {title, description…})

`즉, payload를 그대로 반환하는 것이 아닌, payload를 HTTP로 서버에 전송하는 작업을 수행한 것이다.`


# formData

axios.post에서 payload를 파일로 보낼 때.

```javascript 
/// postContainer의 handle메서드
handleChangeImg = (e) => {
    const formData = new FormData();
    const { PostActions } = this.props;
    console.log(e.target.files[0]);
    formData.append("images", e.target.files[0]);
    PostActions.postImg(formData);
  }

/// axios api부분
export const postImg = (formData) => axios.post('/api/posts/img', formData);