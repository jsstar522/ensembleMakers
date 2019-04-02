import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// class InputWithImage extends Component {
  
  // onFileChange(e, file) {
  //     if (!file.type.match(pattern)) {
  //         alert('파일을 찾을 수 없습니다.');
  //         return;
  //     }
      
  //     reader.onload = (e) => {
  //         postActions.postImg(e);
  //     }
      
  //     reader.readAsDataURL(file);
  // }
  
//   render() {
//     return(
//       <input type="file" accept="image/*"/>
//     );
//   }
// }

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const InputWithImage = ({label, ...rest}) => (
  <Wrapper>
    <Label>{label}</Label>  
    <input type="file" accept="image/*/" {...rest}/>
  </Wrapper>
);

export default InputWithImage;