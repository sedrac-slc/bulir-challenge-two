import FormUser from "../../components/FormUser";
import { LocalStorage } from "../../util/LocalStorage";

export default function Perfil() {
  return (
    <div>
      <FormUser isDisabled={true} isShowPassword={false} person={LocalStorage.getItemPerson()}/>
    </div>
  )
}