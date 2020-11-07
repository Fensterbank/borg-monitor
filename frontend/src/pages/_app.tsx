import './tailwind.scss';
import 'pattern.css';
import { AuthProvider } from '@@/context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
