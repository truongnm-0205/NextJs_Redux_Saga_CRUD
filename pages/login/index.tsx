import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions";
type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state: any) => state.auth
  );

  const router = useRouter();

  // useEffect(() => {

  //     if (localStorage.getItem('token')) {
  //         router.push('/')

  //     }

  // }, [dispatch, isAuthenticated])

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    router.push("/");
  };
  return (
    <>
      <div className="container" style={{ width: "400px" }}>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="examplx`eInputPxassword1" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Đăng nhập
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
