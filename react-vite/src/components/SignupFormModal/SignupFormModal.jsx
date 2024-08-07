import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkSignup } from '../../redux/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [buttonDisable, setButtonDisable] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const errs = {};

    if ((firstName && firstName.length < 5) || firstName > 50) {
      errs.firstName = 'First name must be between 5 and 50 characters long.';
    }
    if ((lastName && lastName.length < 5) || lastName > 50) {
      errs.lastName = 'Last name must be between 5 and 50 characters long.';
    }
    if ((username && username.length < 5) || username > 50) {
      errs.username = 'Username must be between 5 and 50 characters long.';
    }
    if (password && password.length < 8) {
      errs.password = 'password must be greater than 8 characters.';
    }
    if ((email && email.length < 5) || !email.includes('@')) {
      errs.email = 'invalid email';
    }

    if (Object.values(errs).length) setButtonDisable(true);
    else setButtonDisable(false);

    setErrors(errs);
  }, [firstName, lastName, password, email, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: 'Confirm Password field must be the same as the Password field',
      });
    }

    if (Object.values(errors).length) {
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      }),
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} id="sign-up">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {email.length === 0 || (errors.email && <p className="errors">{errors.email}</p>)}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
        <button className="btn confirm-btn" type="submit" disabled={buttonDisable}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
