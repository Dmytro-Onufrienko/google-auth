import { Form, Input, Button } from 'antd';
import { useLoginMutation, useLoginWithGoogleMutation } from '../../../../types.d';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../../config/routes';
import { LOCALE_STORAGE_KEYS } from '../../../../config/localStorageKeys';

const { ACCESS_TOKEN, REFRESH_TOKEN } = LOCALE_STORAGE_KEYS;

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [login] = useLoginMutation();
  const [loginWithGoogle] = useLoginWithGoogleMutation();
  

  const onFinish = async (values: any) => {
    const { data } = await login({ variables: { input: values } });
    if (data?.login) {
      const { accessToken, refreshToken } = data?.login;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      // await currentUser.refetchData();
      navigate(Routes.Home, {
        replace: true,
      });
    }
  };

  const handleClick = async () => {
    const { data } = await login();
    console.log('data', data);
  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: '300px', margin: '0 auto' }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <button onClick={handleClick}>
        google login
      </button>
    </>
  );
};

export default LoginPage;
