import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';

export default function LayoutWithNav() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
