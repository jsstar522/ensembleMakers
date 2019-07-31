import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthContent } from '../../components/Auth/AuthContent';
import { AuthButton } from '../../components/Auth/AuthButton';
import { AuthError } from '../../components/Auth/AuthError';
import { InputWithLabel } from '../../components/Auth/InputWithLabel';
import { RightAlignedLink } from '../../components/Auth/RightAlignedLink';
import { KindButton } from '../../components/Auth/KindButton';
import { MakersRegister } from '../../components/Auth/MakersRegister';
import * as authActions from '../../store/modules/auth';
import * as userActions from '../../store/modules/user';
import * as modalActions from '../../store/modules/modal';
import * as orderTemplateActions from '../../store/modules/orderTemplate';
import {isEmail, isLength, isAlphanumeric} from 'validator';

import storage from '../../lib/storage';

class RegisterContainer extends Component {

    //새로고침하면 항상 초기화
    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register');
    };

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });

        // 검증작업 진행
        const validation = this.validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
    }

    handleCompanyChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;
        AuthActions.changeCompanyInput({
            name,
            value,
            form: 'register'
        })

        // 검증작업 진행
        const validation = this.validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
    }

    handleChangeKind = (kind) => {
        const { AuthActions } = this.props;
        AuthActions.changeKind({
            form: 'register',
            kind: kind
        })
        if(kind === 'general'){
            AuthActions.initializeRole();
        }
    }

    handleChangeRole = (role) => {
        const { AuthActions } = this.props;
        AuthActions.changeRole({
            form: 'register',
            role: role
        })
    }

    handleOpenCompanySearchModal = () => {
        const { ModalActions } = this.props;
        ModalActions.show({
            visible: 'company',
        })
    }

    handleLocalRegister = async () => {
        const { form, error, history } = this.props;
        const { AuthActions, UserActions, OrderTemplateActions} = this.props;
        const { kind, role, email, username, password, passwordConfirm, company, group } = form.toJS();
        const { validate } = this;

        if(error) return; // 현재 에러가 있는 상태라면 진행하지 않음
        try {
            // 일반회원 검증작업
            if(kind==='general'){
                if(!validate['email'](email) 
                || !validate['username'](username) 
                || !validate['password'](password) 
                || !validate['passwordConfirm'](passwordConfirm)) { 
                // 하나라도 실패하면 진행하지 않음
                return;
                }
                await AuthActions.localRegister({
                email, password, username, kind
                });
            }
            // 사장님회원 검증작업 
            if(kind==='makers'&&role==='manager'){
                if(!validate['email'](email) 
                || !validate['username'](username) 
                || !validate['password'](password) 
                || !validate['passwordConfirm'](passwordConfirm)
                || !validate['companyName'](company.companyName)
                || !validate['companyAddress'](company.companyAddress)
                || !validate['companyPhone'](company.companyPhone)) { 
                // 하나라도 실패하면 진행하지 않음
                return;
                }
                let registerInfo = await AuthActions.localRegister({
                    email, password, username, kind, role, company
                })
                // orderTemplate 생성
                await OrderTemplateActions.postOrderTemplate({
                    userId: registerInfo.data._id, 
                    userNumber: registerInfo.data.userNumber
                });
                
            }
            // 제화공회원 검증작업
            if(kind==='makers'&&role==='maker'){
                if(!validate['email'](email) 
                || !validate['username'](username) 
                || !validate['password'](password) 
                || !validate['passwordConfirm'](passwordConfirm)
                || !validate['group'](group.grouped)) {
                // 하나라도 실패하면 진행하지 않음
                return;
                }
                await AuthActions.localRegister({
                    email, password, username, kind, role, group
                })
            }

            const loggedInfo = this.props.result.toJS();
            // console.log(loggedInfo);
            UserActions.setLoggedInfo(loggedInfo);
            UserActions.setValidated(true);
            // TODO: 로그인 정보 저장 (로컬스토리지/스토어)
            history.push('/'); // 회원가입 성공시 홈페이지로 이동
            
        } catch(e) {
            // 에러 처리하기
            if(e.response.status === 404) {
                const { key, message } = e.response.data;
                const errorMessage = key === 'email' ? message : '알 수 없는 에러가 발생했습니다.';
                return this.setError(errorMessage);
            }
            this.setError('알 수 없는 에러가 발생했습니다.')
        }
    };

    validate = {
        email: (value) => {
            if(!isEmail(value)) {
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            // 이메일 중복 확인하는 곳에 최종적으로 null을 만들 것
            else{
                this.setError(null);
            }

            return true;
        },
        username: (value) => {
            if(!value) {
                this.setError('이름을 입력하세요.');
                return false;
            }
            // 이메일 중복 확인하는 곳에 최종적으로 null을 만들 것
            else{
                this.setError(null);
            }
            return true;
        },
        password: (value) => {
            if(!isLength(value, { min: 6 })) {
                this.setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
            return true;
        },
        passwordConfirm: (value) => {
            if(this.props.form.get('password') !== value) {
                this.setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            this.setError(null); 
            return true;
        },
        companyName: (value) => {
            if(!value) {
                this.setError('업체 이름을 입력하세요.');
                return false;
            }
            else{
                this.setError(null);
            }
            return true;
        },
        companyAddress: (value) => {
            if(!value) {
                this.setError('업체 주소를 입력하세요.');
                return false;
            }
            else{
                this.setError(null);
            }
            return true;
        },
        companyPhone: (value) => {
            if(!value) {
                this.setError('전화번호를 입력하세요.');
                return false;
            }
            else{
                this.setError(null);
            }
            return true;
        },
        group: (value) => {
            if(!value) {
                this.setError('소속되어 있는 곳을 선택하세요.');
                return false;
            }
            else{
                this.setError(null);
            }
            return true;
        }
    };

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'register',
            message
        });
    }

    render() {
        const { error } = this.props;
        const { kind, role, email, username, password, passwordConfirm, company } = this.props.form.toJS();
        const { selectedGroup } = this.props;
        const { handleChange, handleCompanyChange, handleChangeRole, handleOpenCompanySearchModal,handleLocalRegister, handleChangeKind } = this;
        return (
            <AuthContent title='회원가입'>
                <KindButton kind={kind} onChangeKind={handleChangeKind}/>
                {kind === 'makers' && <MakersRegister 
                    role={role}
                    company={company}
                    selectedGroup={selectedGroup}
                    onChange={handleCompanyChange}
                    onOpenCompanySearchModal={handleOpenCompanySearchModal}
                    onChangeRole={handleChangeRole}
                />}
                <InputWithLabel 
                    label='이메일'
                    name='email'
                    placeholder='이메일' 
                    value={email} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label='이름' 
                    name='username' 
                    placeholder='이름' 
                    value={username} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label='비밀번호' 
                    name='password' 
                    placeholder='비밀번호'
                    type='password' 
                    value={password} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label='비밀번호 확인' 
                    name='passwordConfirm' 
                    placeholder='비밀번호 확인' 
                    type='password' 
                    value={passwordConfirm}
                    onChange={handleChange}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
                <RightAlignedLink to='/login/signin'>로그인</RightAlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        error: state.auth.getIn(['register', 'error']),
        exists: state.auth.getIn(['register', 'exists']),
        result: state.auth.get('result'),
        selectedGroup: state.auth.getIn(['register', 'selectedGroup'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        ModalActions: bindActionCreators(modalActions, dispatch),
        OrderTemplateActions: bindActionCreators(orderTemplateActions, dispatch)
    })
)(RegisterContainer);