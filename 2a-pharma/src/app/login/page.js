import LoginClient from "./LoginClient.jsx";

export const metadata = {
  title: "Login | 2A Pharma Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LoginPage() {
  return <LoginClient />;
}