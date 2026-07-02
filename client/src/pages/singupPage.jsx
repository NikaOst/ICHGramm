import TargetButton from '../components/blueMainButton';
import { useForm } from 'react-hook-form';
import logo from '../assets/icons/logo.svg';
import FormFooter from '../components/formFooter';
import styles from '../styles/register.module.css';
import FormField from '../components/formField';
import { useDispatch } from 'react-redux';
import { registerReq } from '../redux/slices/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, reset } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (data) => {
    setErrorMessage('');
    const resultAction = await dispatch(registerReq(data));

    if (registerReq.fulfilled.match(resultAction)) {
      reset();
      navigate('/login', { replace: true });
    } else {
      const message = resultAction.payload
        ? resultAction.payload
        : resultAction.payload?.message || 'Register failed';
      setErrorMessage(message);
    }
  };

  const onInvalid = (formErrors) => {
    if (formErrors.email?.message) {
      setErrorMessage(formErrors.email.message);
      return;
    }
    if (formErrors.name?.message) {
      setErrorMessage(formErrors.name.message);
      return;
    }
    if (formErrors.username?.message) {
      setErrorMessage(formErrors.username.message);
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
      <div className={styles.loginMainForm}>
        <div className={styles.loginForm}>
          <div>
            <div className={styles.loginLogo}>
              <img src={logo} alt="logo" />
            </div>

            <div className={styles.textUnderLogo}>
              <span>Sign up to see photos and videos from your friends.</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(formSubmit, onInvalid)}>
              <FormField register={register} name="email" type="email" placeholder="Email" />

              <FormField register={register} name="name" type="text" placeholder="Full Name" />

              <FormField register={register} name="username" type="text" placeholder="Username" />

              <FormField
                register={register}
                name="password"
                type="password"
                placeholder="Password"
              />
              <div className={styles.learnMoreBox}>
                <span>People who use our service may have uploaded</span>
                <div>
                  <span>your contact information to Instagram. </span>
                  <span className={styles.forgotPasswordBox}>Learn More</span>
                </div>
              </div>

              <div className={styles.learnMoreBox}>
                <div>
                  <span>By signing up, you agree to our </span>
                  <span className={styles.forgotPasswordBox}>Terms</span>,
                  <span className={styles.forgotPasswordBox}> Privacy</span>
                </div>

                <div>
                  <span className={styles.forgotPasswordBox}>Policy </span>
                  <span>and </span>
                  <span className={styles.forgotPasswordBox}>Cookies Policy</span>.
                </div>
              </div>
              <div className={styles.submitButton}>
                <TargetButton type="submit" text="Sign up" />
              </div>
            </form>
          </div>
        </div>
        <FormFooter text="Have an account? " blueText="Log in" to="/login" />
        {errorMessage && <p className={styles.serverError}>{errorMessage}</p>}
      </div>
    </div>
  );
}
export default RegisterPage;
