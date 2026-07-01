import backgroundImg from '../assets/images/backgroundAuth.png';
import TargetButton from '../components/blueMainButton';
import { useForm } from 'react-hook-form';
import logo from '../assets/icons/logo.svg';
import HorizontalDivider from '../assets/icons/HorizontalDivider.svg';
import FormFooter from '../components/formFooter';
import styles from '../styles/login.module.css';
import FormField from '../components/formField';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, reset } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (data) => {
    setErrorMessage('');
    const resultAction = await dispatch(login(data));

    if (login.fulfilled.match(resultAction)) {
      reset();
      navigate('/', { replace: true });
    } else {
      const message = resultAction.payload
        ? resultAction.payload
        : resultAction.payload?.message || 'Login failed';
      setErrorMessage(message);
    }
  };

  const onInvalid = (formErrors) => {
    if (formErrors.email_or_username?.message) {
      setErrorMessage(formErrors.email_or_username.message);
      return;
    }
    if (formErrors.password?.message) {
      setErrorMessage(formErrors.password.message);
      return;
    }
    setErrorMessage('Check form fields');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginMainContainer}>
        <img src={backgroundImg} alt="backgroundImg" />
        <div className={styles.loginMainForm}>
          <div className={styles.loginForm}>
            <div>
              <div className={styles.loginLogo}>
                <img src={logo} alt="logo" />
              </div>

              <form className={styles.form} onSubmit={handleSubmit(formSubmit, onInvalid)}>
                <FormField
                  register={register}
                  name="email_or_username"
                  type="text"
                  placeholder="Username, or email"
                />

                <FormField
                  register={register}
                  name="password"
                  type="password"
                  placeholder="Password"
                />

                <div className={styles.submitButton}>
                  <TargetButton type="submit" text="Log in" />
                </div>
              </form>

              <div className={styles.dividerBox}>
                <img src={HorizontalDivider} alt="divider" />
                <span>OR</span>
                <img src={HorizontalDivider} alt="divider" />
              </div>
            </div>
            <div className={styles.forgotPasswordBox}>
              <span>Forgot password?</span>
            </div>
          </div>
          <FormFooter text="Don't have an account?" blueText="Sign up" to="/register" />
          {errorMessage && <p className={styles.serverError}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
