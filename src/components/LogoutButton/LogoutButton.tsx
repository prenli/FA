import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import { keycloakService } from "../../services/keycloakService";
import { Center } from "../Center/Center";

export const LogoutButton = () => (
  <div className="py-1.5 rounded cursor-pointer h-[40px] w-[40px]">
    <Center>
      <LogoutIcon
        className="h-full stroke-gray-600"
        onClick={() => keycloakService.onAuthLogout()}
      />
    </Center>
  </div>
);
