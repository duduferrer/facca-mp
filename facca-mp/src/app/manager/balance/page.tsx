import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BalanceManCard from "./ui/balanceManagementCard";

const Balance = () => {
  return (
    <div className="">
      <h1 className="font-bold text-lg text-center mt-3">GERENCIAR SALDO</h1>
      <div className="mt-3 gap-1 mx-2 space-y-2 lg:flex lg:space-y-0 lg:justify-center">
        <div className="text-center space-y-2 p-2 bg-secondary rounded-md space-x-2">
          <h2 className="font-semibold">Usuários</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-60">Adicionar Saldo Usuário</Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden">
              <BalanceManCard type="ADD" balanceDialogContext="USER" />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-60">Remover Saldo Usuário</Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden">
              <BalanceManCard type="SUB" balanceDialogContext="USER" />
            </DialogContent>
          </Dialog>
        </div>
        <div className="text-center space-y-2 p-2 bg-secondary rounded-md space-x-2">
          <h2 className="font-semibold">FACCA</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-60">Adicionar Saldo FACCA</Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden">
              <BalanceManCard type="ADD" balanceDialogContext="FACCA" />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-60">Remover Saldo FACCA</Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden">
              <BalanceManCard type="SUB" balanceDialogContext="FACCA" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Balance;
