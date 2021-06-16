import NavWrapper from '../../../components/NavWrapper';
import ChargerManage from '../../../components/ChargerManage';

export default function TerminalPage(props) {
  return (
    <NavWrapper backButton={true}>
      <ChargerManage />
    </NavWrapper>
  );
}
