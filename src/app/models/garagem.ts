export interface Garagem {
  id?: string;
  nome: string;
  telefone: string;
  modelo: string;
  veiculo: string;
  cliente: string;
  horaInicial: string;
  placa: string;
  status: boolean;
  lavagem: boolean;
  statusLavagem: string;
  valor: number;
  ordemLavagem: number;
}
